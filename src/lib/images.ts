import type { ImageMetadata } from 'astro';

// Всі фото моделей імпортуються з src/assets/models через astro:assets,
// щоб отримати оптимізацію (розміри, WebP/AVIF, lazy). Ключ — ім'я файлу,
// як воно записане в src/data/models.json (поле image).
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/models/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export const modelImages: Record<string, ImageMetadata> = {};
for (const path in files) {
  const name = path.split('/').pop();
  if (name) modelImages[name] = files[path].default;
}

export function getModelImage(filename: string | null): ImageMetadata | null {
  if (!filename) return null;
  return modelImages[filename] ?? null;
}

// Периферія — окрема тека ассетів (ТЗ §6, окрема колекція). Поки фото немає
// (усі картки показують «Шукаємо фотографію»), тож glob повертає порожньо —
// це коректно: додасться файл у src/assets/peripherals/ і резолвер його підхопить.
const peripheralFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/peripherals/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export const peripheralImages: Record<string, ImageMetadata> = {};
for (const path in peripheralFiles) {
  const name = path.split('/').pop();
  if (name) peripheralImages[name] = peripheralFiles[path].default;
}

export function getPeripheralImage(filename: string | null): ImageMetadata | null {
  if (!filename) return null;
  return peripheralImages[filename] ?? null;
}

// Клони — знову окрема тека ассетів (ТЗ §8.3, окрема колекція). Наразі фото
// немає (усі картки «Шукаємо фотографію»); ТЗ §8.5 передбачає, що більшість
// фото клонів дасть сам музей (museum-own) — тоді файли ляжуть у
// src/assets/clones/ і резолвер їх підхопить.
const cloneFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/clones/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export const cloneImages: Record<string, ImageMetadata> = {};
for (const path in cloneFiles) {
  const name = path.split('/').pop();
  if (name) cloneImages[name] = cloneFiles[path].default;
}

export function getCloneImage(filename: string | null): ImageMetadata | null {
  if (!filename) return null;
  return cloneImages[filename] ?? null;
}
