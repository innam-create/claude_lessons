import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import { LICENSES, type License } from './lib/licenses';

// ТЗ §14: дозволений enum ліцензій. Перелік — у src/lib/licenses.ts (єдине
// джерело істини, спільне зі скриптом CI). commercial_use виводиться автоматично
// (не пишеться руками) — див. deriveCommercialUse там само.
const license = z.enum(LICENSES as unknown as [License, ...License[]]);

const bilingual = z.object({ uk: z.string(), en: z.string() });

// ТЗ §7.2 (тверде правило): жодне зображення не потрапляє в репозиторій без
// license, author, source_url, accessed. Zod валить збірку, якщо бракує поля;
// scripts/check-licenses.mjs додатково ловить те, чого схема не бачить —
// відсутній файл на диску, дату з майбутнього, джерело поза ієрархією §7.1.
const modelImage = z.object({
  // Ім'я файлу в src/assets/models/. Існування перевіряє check-licenses.
  src: z.string().min(1),
  // ТЗ §10: змістовний alt — опис того, що видно, а не «фото ZX Spectrum».
  alt: bilingual,
  license,
  // .min(1): порожній рядок — це відсутня атрибуція, а не заповнене поле.
  author: z.string().min(1),
  source_url: z.string().url(),
  accessed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'очікується формат YYYY-MM-DD'),
});
export type ModelImageData = z.infer<typeof modelImage>;

// ТЗ §6: схема каталогу моделей. У MVP дані живуть у одному
// src/data/models.json (типізована колекція з валідацією на етапі збірки).
// Пізніше кожна модель може стати окремим src/content/models/{slug}.mdx —
// схема лишається тією ж.
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
    // Порожній масив → картка «Шукаємо фотографію цієї машини» (ТЗ §15).
    // Перше зображення — обкладинка картки в каталозі.
    images: z.array(modelImage).default([]),
    inMuseum: z.boolean(),
    // ТЗ §6: обов'язкове. 'low' → видима позначка «потребує уточнення».
    confidence: z.enum(['high', 'medium', 'low']),
  }),
});

export const collections = { models };
