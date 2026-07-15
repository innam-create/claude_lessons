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
