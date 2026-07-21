// Структуровані дані Schema.org / JSON-LD (ТЗ §9).
//
// Принцип проєкту — не вигадувати фактів: усі значення тут виводяться з уже
// верифікованих джерел, що вже показані на сайті (i18n/ui.ts, Footer, ContactsView).
// Нових тверджень схема НЕ вносить — лише машиночитно дублює те, що людина вже бачить.
//
// Чисті функції без залежності від Astro: приймають примітиви, повертають прості
// обʼєкти. Рендер — через serializeJsonLd() у <script type="application/ld+json">.

import type { Lang } from '../i18n/ui';
import { useTranslations, localizePath } from '../i18n/ui';

/** Стабільні дані музею (збігаються з Footer.astro та og:site_name). */
const MUSEUM_NAME = 'Software & Computer Museum';
const MUSEUM_URL = 'https://sncmuseum.org';
const MUSEUM_EMAIL = 'contact@sncmuseum.org';
const MUSEUM_SAMEAS = [
  'https://www.instagram.com/sncmuseum/',
  'https://www.facebook.com/sncmuseum/',
];
// Графік музею у форматі schema.org (i18n: contacts.hours = «вт–сб · 10:00–18:00»).
const MUSEUM_OPENING_HOURS = 'Tu-Sa 10:00-18:00';

interface SchemaCtx {
  /** Origin сайту без хвостового слеша, напр. "https://spectrum.sncmuseum.org". */
  site: string;
  lang: Lang;
}

/**
 * Музей як видавець (@type Museum) — site-wide, спільний @id для посилань.
 * Адреса й опис локалізовані з тих самих рядків, що на /contacts/ і у футері.
 */
export function museumSchema({ site, lang }: SchemaCtx) {
  const t = useTranslations(lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'Museum',
    '@id': `${site}/#museum`,
    name: MUSEUM_NAME,
    description: t('footer.tagline'),
    url: MUSEUM_URL,
    email: MUSEUM_EMAIL,
    sameAs: MUSEUM_SAMEAS,
    openingHours: MUSEUM_OPENING_HOURS,
    address: {
      '@type': 'PostalAddress',
      streetAddress: t('contacts.addr.value'),
      addressLocality: t('contacts.addr.sub'),
      addressCountry: 'UA',
    },
  };
}

/**
 * WebSite + SearchAction (sitelinks searchbox). Лише на головній кожної мови.
 * Ціль пошуку — реальний ендпоінт сайту /search/?q= (див. SearchView.astro).
 */
export function webSiteSchema({ site, lang }: SchemaCtx) {
  const searchUrl = `${site}${localizePath('/search/', lang)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site}${localizePath('/', lang)}#website`,
    url: `${site}${localizePath('/', lang)}`,
    name: `ZX Spectrum — ${MUSEUM_NAME}`,
    inLanguage: lang === 'uk' ? 'uk' : 'en',
    publisher: { '@id': `${site}/#museum` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${searchUrl}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface Crumb {
  label: string;
  /** Локалізований шлях, напр. "/models/". Останній елемент (поточна сторінка) — без href. */
  href?: string;
}

/**
 * BreadcrumbList із тих самих items, що й видимі хлібні крихти (Breadcrumbs.astro).
 * `currentUrl` — абсолютний URL поточної сторінки для останнього елемента без href.
 */
export function breadcrumbSchema(site: string, items: Crumb[], currentUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => {
      const url = it.href ? `${site}${it.href}` : currentUrl;
      return {
        '@type': 'ListItem',
        position: i + 1,
        name: it.label,
        item: url,
      };
    }),
  };
}

/**
 * JSON.stringify із екрануванням «<», щоб рядок гарантовано не міг закрити тег
 * <script> (жоден `</script>` у даних не пройде). Дані наші, але захист дешевий.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
