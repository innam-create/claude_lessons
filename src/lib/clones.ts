import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { countryName, normalizeImage, type ModelImage, type ModelSource } from './catalog';

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
  });
}
