import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/ui';
import {
  countryName,
  normalizeImage,
  type FilterGroup,
  type ModelImage,
  type ModelSource,
} from './catalog';

// Нормалізований клон для рендеру (мова вже застосована). Форма — як у Peripheral
// (лише каталог карток, без таблиці характеристик), але maker може бути null:
// частина клонів аматорські / без відомого виробника (ТЗ §8.3).
export type Clone = {
  slug: string;
  title: string;
  desc: string;
  // null → виробник невідомий: у картці показуємо лише країну, без здогаду.
  maker: string | null;
  countryName: string;
  countryCode: string;
  year: string;
  images: ModelImage[];
  // Перше зображення — обкладинка картки. null → «Шукаємо фотографію» (ТЗ §15).
  cover: ModelImage | null;
  sources: ModelSource[];
  inMuseum: boolean;
  // confidence === 'low' → видима позначка «⚠ уточнення» (ТЗ §2/§8.3).
  lowConf: boolean;
};

export function normalizeClones(
  entries: CollectionEntry<'clones'>[],
  lang: Lang,
): Clone[] {
  return entries.map((e) => {
    const d = e.data;
    const images = d.images.map((img) => normalizeImage(img, lang));
    return {
      slug: e.id,
      title: d.title[lang],
      desc: d.desc[lang],
      maker: d.manufacturer,
      countryName: countryName(d.country, lang),
      countryCode: d.country,
      year: d.year,
      images,
      cover: images[0] ?? null,
      sources: d.sources.map((s) => ({
        title: s.title[lang],
        url: s.url,
        accessed: s.accessed,
      })),
      inMuseum: d.inMuseum,
      lowConf: d.confidence === 'low',
    };
  })
    // За роком випуску (найдавніші спершу); стабільне сортування зберігає порядок
    // clones.json для машин одного року. Той самий підхід, що й у каталозі моделей.
    .sort((a, b) => Number(a.year) - Number(b.year));
}

// Порядок країн у фільтрі клонів (наявні відфільтруються). Клони — з різних
// країн, тож перелік ширший за моделі: Чехословаччина, Польща, Іспанія, Румунія,
// Португалія, США, Україна.
const CLONE_COUNTRY_ORDER = ['CS', 'PL', 'ES', 'RO', 'PT', 'US', 'UA'] as const;

// Фільтри розділу клонів (ТЗ §5.2, за аналогією з каталогом моделей): рік і країна.
// Виводяться з наявних даних — додаси клон, чипси оновляться самі.
export function buildCloneFilterGroups(clones: Clone[], lang: Lang): FilterGroup[] {
  const t = useTranslations(lang);
  const years = [...new Set(clones.map((c) => c.year))].sort(
    (a, b) => Number(a) - Number(b),
  );
  const countries = CLONE_COUNTRY_ORDER.filter((c) =>
    clones.some((cl) => cl.countryCode === c),
  );
  return [
    {
      key: 'year',
      label: t('filter.year'),
      chips: years.map((y) => ({ value: y, label: y })),
    },
    {
      key: 'country',
      label: t('filter.country'),
      chips: countries.map((c) => ({ value: c, label: countryName(c, lang) })),
    },
  ];
}
