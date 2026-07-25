import type { CollectionEntry } from 'astro:content';
import type { ModelImageData } from '../content.config';
import type { Lang, UIKey } from '../i18n/ui';
import { ui, useTranslations, localizePath } from '../i18n/ui';
import {
  deriveCommercialUse,
  licenseLabel,
  licenseUrl,
  sourceLabel,
  type License,
} from './licenses';

export function countryName(code: string, lang: Lang): string {
  const key = `country.${code}` as UIKey;
  return ui[lang][key] ?? code;
}

// Зображення з уже застосованою мовою і виведеними ліцензійними полями.
export type ModelImage = {
  src: string;
  alt: string;
  license: License;
  licenseLabel: string;
  licenseUrl: string | null;
  author: string;
  sourceUrl: string;
  sourceLabel: string;
  accessed: string;
  // ТЗ §14: виведено з license, не з даних.
  commercialUse: boolean;
  // ТЗ §7.3: готовий рядок «автор · ліцензія · джерело» для місць, де посилання
  // поставити не можна (картка каталогу — сама собою <a>, вкладені <a> невалідні).
  // Там, де можна (галерея на картці моделі), збирати з полів вище зі ссилками.
  credit: string;
};

export function normalizeImage(img: ModelImageData, lang: Lang): ModelImage {
  const label = licenseLabel(img.license, lang);
  const source = sourceLabel(img.source_url);
  return {
    src: img.src,
    alt: img.alt[lang],
    license: img.license,
    licenseLabel: label,
    licenseUrl: licenseUrl(img.license),
    author: img.author,
    sourceUrl: img.source_url,
    sourceLabel: source,
    accessed: img.accessed,
    commercialUse: deriveCommercialUse(img.license),
    credit: `${img.author} · ${label} · ${source}`,
  };
}

// Рядок таблиці характеристик. value: null → «невідомо» курсивом (ТЗ §6):
// порожнє поле чесніше за здогад, тому невідоме показуємо явно, а не ховаємо.
export type SpecRow = { key: string; label: string; value: string | null };

export type ModelSource = { title: string; url: string; accessed: string };

// Нормалізована модель для рендеру каталогу (мова вже застосована).
export type Model = {
  slug: string;
  title: string;
  desc: string;
  summary: string;
  maker: string;
  countryCode: string;
  countryLabel: string;
  year: string;
  ram: string;
  ramKb: number | null;
  images: ModelImage[];
  // Перше зображення — обкладинка картки. null → «Шукаємо фотографію» (ТЗ §15).
  cover: ModelImage | null;
  // Власне фото експоната (museum-own) для блоку «В експозиції». null → плейсхолдер.
  museumPhoto: ModelImage | null;
  specs: SpecRow[];
  sources: ModelSource[];
  inMuseum: boolean;
  lowConf: boolean;
  href: string;
};

// Таблиця характеристик (ТЗ §6, дизайн ModelDetailPage). Набір рядків однаковий
// для всіх моделей — так їх можна чесно порівнювати між собою, і саме цього
// потребуватиме компаратор (ТЗ §5.2). Чого не знаємо — показуємо «невідомо».
function buildSpecs(d: CollectionEntry<'models'>['data'], lang: Lang): SpecRow[] {
  const t = useTranslations(lang);
  const row = (key: string, value: string | null): SpecRow => ({
    key,
    label: t(`spec.${key}` as UIKey),
    value,
  });

  const cpu =
    d.cpu && d.cpuClockMhz
      ? `${d.cpu} · ${d.cpuClockMhz} ${t('unit.mhz')}`
      : (d.cpu ?? null);

  return [
    row('year', d.year),
    row('maker', d.manufacturerFull ?? d.manufacturer),
    row('country', countryName(d.country, lang)),
    row('cpu', cpu),
    row('ram', d.ramKb === null ? null : `${d.ramKb} KB`),
    row('rom', d.romKb === null ? null : `${d.romKb} KB`),
    row('video', d.video?.[lang] ?? null),
    row('sound', d.sound?.[lang] ?? null),
    row('storage', d.storage?.[lang] ?? null),
    row('keyboard', d.keyboard?.[lang] ?? null),
    row('mass', d.massG === null ? null : `${d.massG} ${t('unit.g')}`),
  ];
}

export function normalizeModels(
  entries: CollectionEntry<'models'>[],
  lang: Lang,
): Model[] {
  return entries.map((e) => {
    const d = e.data;
    const images = d.images.map((img) => normalizeImage(img, lang));
    return {
      slug: e.id,
      title: d.title[lang],
      desc: d.desc[lang],
      summary: d.summary[lang],
      maker: d.manufacturer,
      countryCode: d.country,
      countryLabel: `${d.country} · ${countryName(d.country, lang)}`,
      year: d.year,
      ram: d.ram,
      ramKb: d.ramKb,
      images,
      cover: images[0] ?? null,
      museumPhoto: d.museumPhoto ? normalizeImage(d.museumPhoto, lang) : null,
      specs: buildSpecs(d, lang),
      sources: d.sources.map((s) => ({
        title: s.title[lang],
        url: s.url,
        accessed: s.accessed,
      })),
      inMuseum: d.inMuseum,
      lowConf: d.confidence === 'low',
      href: localizePath(`/models/${e.id}/`, lang),
    };
  })
    // ТЗ §5: каталог — за роком випуску (найдавніші спершу). Сортування стабільне,
    // тож машини одного року зберігають порядок models.json (напр. 16K/48K — 1982).
    // Впливає й на циклічні prev/next картки моделі — навігація теж хронологічна.
    .sort((a, b) => Number(a.year) - Number(b.year));
}

export type FilterChip = { value: string; label: string };
export type FilterGroup = { key: string; label: string; chips: FilterChip[] };

// Групи фільтрів виводяться з наявних моделей (ТЗ §5.2:
// рік · виробник · обсяг ОЗП · наявність у музеї). Фільтр країни прибрано:
// після переносу Timex у клони всі моделі — GB, тож фільтр був однозначним.
export function buildFilterGroups(models: Model[], lang: Lang): FilterGroup[] {
  const t = useTranslations(lang);
  const uniq = <T>(arr: T[]): T[] => [...new Set(arr)];

  const years = uniq(models.map((m) => m.year)).sort();

  const makers = models
    .map((m) => m.maker)
    .filter((v, i, a) => a.indexOf(v) === i);

  const rams = uniq(models.map((m) => m.ram)).sort((a, b) => {
    const na = parseInt(a, 10);
    const nb = parseInt(b, 10);
    return na - nb;
  });

  return [
    {
      key: 'year',
      label: t('filter.year'),
      chips: years.map((y) => ({ value: y, label: y })),
    },
    {
      key: 'maker',
      label: t('filter.maker'),
      chips: makers.map((m) => ({ value: m, label: m })),
    },
    {
      key: 'ram',
      label: t('filter.ram'),
      chips: rams.map((r) => ({ value: r, label: r })),
    },
    {
      key: 'avail',
      label: t('filter.avail'),
      chips: [{ value: 'museum', label: t('filter.inMuseum') }],
    },
  ];
}
