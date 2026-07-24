import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { localizePath, useTranslations } from '../i18n/ui';

// Єдине джерело істини для кнопки «Записатися на екскурсію»: сторінка розкладу
// екскурсій на головному сайті музею. CTA з type: "excursion" веде сюди на
// всьому сайті — незалежно від того, що записано у frontmatter конкретної статті.
export const EXCURSION_URL = 'https://sncmuseum.org/rozklad-ekskursiy';

// Нормалізований лонгрід для рендеру (мова вже застосована). Тіло (Markdown)
// рендериться окремо через render(entry) — тут лише метадані навколо нього.
export type Longread = {
  slug: string;
  lang: Lang;
  title: string;
  lead: string;
  thesis: string;
  block: string;
  cardId: string;
  readingTime: number;
  authors: string[];
  published: string | null;
  lowConf: boolean;
  inMuseum: boolean;
  museumNote: string;
  disambiguation: string[];
  sources: { title: string; url: string; host: string }[];
  cta: { label: string; url: string; external: boolean };
  description: string;
  href: string;
};

// Мова матеріалу — з розташування файлу: UA в корені колекції, EN у підтеці en/
// (`en/<slug>.md`). Так тіло (Markdown) лишається одномовним на файл, а render()
// віддає правильну мову без спліту всередині одного запису.
export function entryLang(e: CollectionEntry<'longreads'>): Lang {
  return e.id.startsWith('en/') ? 'en' : 'uk';
}

// Спільний slug матеріалу (без мовного префікса) — ключ для парування UA↔EN.
export function entrySlug(e: CollectionEntry<'longreads'>): string {
  return e.id.replace(/^en\//, '');
}

// ТЗ §2: на сайт виходять лише затверджені матеріали з датою публікації.
// draft/review лишаються поза збіркою, поки музей їх не затвердив.
export function isPublished(e: CollectionEntry<'longreads'>): boolean {
  return e.data.status === 'approved' && e.data.published !== null;
}

export function normalizeLongread(e: CollectionEntry<'longreads'>): Longread {
  const d = e.data;
  const lang = entryLang(e);
  const slug = entrySlug(e);
  return {
    slug,
    lang,
    title: d.title[lang] || d.title.uk,
    lead: d.lead[lang] || d.lead.uk,
    thesis: d.thesis[lang] || d.thesis.uk,
    block: d.block,
    cardId: d.card_id,
    readingTime: d.reading_time_min,
    authors: d.authors,
    published: d.published,
    lowConf: d.confidence === 'low',
    inMuseum: d.museum_exhibit.in_museum,
    museumNote: d.museum_exhibit.note_uk,
    disambiguation: d.disambiguation,
    sources: d.sources.map((s) => ({
      title: s.title[lang] || s.title.uk,
      url: s.url,
      host: hostOf(s.url),
    })),
    cta: resolveCta(d.cta, lang),
    description: (lang === 'en' && d.seo.description_en) || d.seo.description_uk,
    href: localizePath(`/history/${slug}/`, lang),
  };
}

// Найновіші згори: за датою публікації (спадання), потім за card_id.
export function sortLongreads(a: Longread, b: Longread): number {
  if (a.published && b.published && a.published !== b.published) {
    return a.published < b.published ? 1 : -1;
  }
  return a.cardId.localeCompare(b.cardId);
}

// Резолвер CTA. Екскурсійна кнопка веде на єдину сторінку розкладу екскурсій
// (EXCURSION_URL) на всьому сайті — frontmatter.url для неї не використовуємо, а
// підпис локалізуємо (label_uk — лише для нестандартних CTA інших типів).
// Інші типи: абсолютний URL — як є (зовнішній), внутрішній шлях — локалізуємо.
function resolveCta(
  cta: CollectionEntry<'longreads'>['data']['cta'],
  lang: Lang,
): Longread['cta'] {
  const t = useTranslations(lang);
  if (cta.type === 'excursion') {
    return { label: t('longread.cta.excursion'), url: EXCURSION_URL, external: true };
  }
  const external = /^https?:\/\//.test(cta.url);
  return {
    label: cta.label_uk,
    url: external ? cta.url : localizePath(cta.url, lang),
    external,
  };
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
