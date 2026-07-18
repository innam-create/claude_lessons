import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { countryName, normalizeImage, type ModelImage, type ModelSource } from './catalog';

// Нормалізована периферія для рендеру (мова вже застосована). Свідомо простіша
// за Model: у пристроїв немає таблиці характеристик і сторінки-картки — лише
// каталог (ТЗ §6, макет PeripheralsPage.dc.html не малює деталей пристрою).
export type Peripheral = {
  slug: string;
  title: string;
  desc: string;
  maker: string;
  countryName: string;
  countryCode: string;
  year: string;
  images: ModelImage[];
  // Перше зображення — обкладинка картки. null → «Шукаємо фотографію» (ТЗ §15).
  cover: ModelImage | null;
  sources: ModelSource[];
  inMuseum: boolean;
  // confidence === 'low' → видима позначка «⚠ уточнення» (ТЗ §2).
  lowConf: boolean;
};

export function normalizePeripherals(
  entries: CollectionEntry<'peripherals'>[],
  lang: Lang,
): Peripheral[] {
  return entries.map((e) => {
    const d = e.data;
    const images = d.images.map((img) => normalizeImage(img, lang));
    return {
      slug: e.id,
      title: d.title[lang],
      desc: d.desc[lang],
      maker: d.manufacturerFull ?? d.manufacturer,
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
