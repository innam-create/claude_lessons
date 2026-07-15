// @ts-check
import { defineConfig } from 'astro/config';

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
});
