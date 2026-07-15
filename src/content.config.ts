import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// ТЗ §14: дозволений enum ліцензій. commercial_use виводиться автоматично
// (не пишеться руками) — див. helper deriveCommercialUse у src/lib/catalog.ts.
const license = z.enum([
  'PD',
  'CC0',
  'CC-BY-4.0',
  'CC-BY-SA-4.0',
  'CC-BY-NC-4.0',
  'CC-BY-NC-SA-4.0',
  'museum-own',
]);
export type License = z.infer<typeof license>;

// ТЗ §6: схема каталогу моделей. У MVP дані живуть у одному
// src/data/models.json (типізована колекція з валідацією на етапі збірки).
// Пізніше кожна модель може стати окремим src/content/models/{slug}.mdx —
// схема лишається тією ж.
const bilingual = z.object({ uk: z.string(), en: z.string() });

const models = defineCollection({
  loader: file('src/data/models.json'),
  schema: z.object({
    title: bilingual,
    manufacturer: z.string(),
    country: z.enum(['GB', 'PT', 'US', 'PL']),
    year: z.string(),
    ram: z.string(),
    // null = невідомо (ТЗ §6). Використовується фільтром і таблицею характеристик.
    ramKb: z.number().nullable(),
    desc: bilingual,
    // null → картка без фото («Шукаємо фотографію цієї машини»).
    image: z.string().nullable(),
    imageAlt: bilingual.nullable(),
    credit: z.string().nullable(),
    inMuseum: z.boolean(),
    // ТЗ §6: обов'язкове. 'low' → видима позначка «потребує уточнення».
    confidence: z.enum(['high', 'medium', 'low']),
  }),
});

export const collections = { models };
