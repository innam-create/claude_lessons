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

const COUNTRY_ORDER = ['GB', 'PT', 'US', 'PL'] as const;

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

function normalizeImage(img: ModelImageData, lang: Lang): ModelImage {
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

// Нормалізована модель для рендеру каталогу (мова вже застосована).
export type Model = {
  slug: string;
  title: string;
  desc: string;
  maker: string;
  countryCode: string;
  countryLabel: string;
  year: string;
  ram: string;
  ramKb: number | null;
  images: ModelImage[];
  // Перше зображення — обкладинка картки. null → «Шукаємо фотографію» (ТЗ §15).
  cover: ModelImage | null;
  inMuseum: boolean;
  lowConf: boolean;
  href: string;
};

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
      maker: d.manufacturer,
      countryCode: d.country,
      countryLabel: `${d.country} · ${countryName(d.country, lang)}`,
      year: d.year,
      ram: d.ram,
      ramKb: d.ramKb,
      images,
      cover: images[0] ?? null,
      inMuseum: d.inMuseum,
      lowConf: d.confidence === 'low',
      href: localizePath(`/models/${e.id}/`, lang),
    };
  });
}

export type FilterChip = { value: string; label: string };
export type FilterGroup = { key: string; label: string; chips: FilterChip[] };

// Групи фільтрів виводяться з наявних моделей (ТЗ §5.2:
// рік · виробник · країна · обсяг ОЗП · наявність у музеї).
export function buildFilterGroups(models: Model[], lang: Lang): FilterGroup[] {
  const t = useTranslations(lang);
  const uniq = <T>(arr: T[]): T[] => [...new Set(arr)];

  const years = uniq(models.map((m) => m.year)).sort();

  const makers = models
    .map((m) => m.maker)
    .filter((v, i, a) => a.indexOf(v) === i);

  const countries = COUNTRY_ORDER.filter((c) =>
    models.some((m) => m.countryCode === c),
  );

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
      key: 'country',
      label: t('filter.country'),
      chips: countries.map((c) => ({ value: c, label: countryName(c, lang) })),
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
