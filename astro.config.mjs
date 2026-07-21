// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ТЗ §3/§5: статичний Astro, i18n з українською за замовчуванням БЕЗ префікса,
// англійська під /en/. /uk/* → 301 на /* налаштовується на рівні хостингу.
export default defineConfig({
  site: 'https://spectrum.sncmuseum.org',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'uk',
    locales: ['uk', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // ТЗ §9: sitemap із hreflang-альтернативами UA/EN. Інтеграція сама зіставляє
  // /path/ ↔ /en/path/ і додає <xhtml:link rel="alternate"> у кожен запис.
  // 404 виключаємо — її не індексують.
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'uk',
        locales: { uk: 'uk', en: 'en' },
      },
      filter: (page) => !/\/404\/?$/.test(page),
    }),
  ],
});
