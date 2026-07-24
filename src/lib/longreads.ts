import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { localizePath } from '../i18n/ui';

// Нормалізований лонгрід для рендеру (мова вже застосована). Тіло (Markdown)
// рендериться окремо через render(entry) — тут лише метадані навколо нього.
export type Longread = {
  slug: string;
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
  cta: { label: string; url: string };
  descriptionUk: string;
  href: string;
};

// ТЗ §2: на сайт виходять лише затверджені матеріали з датою публікації.
// draft/review лишаються поза збіркою, поки музей їх не затвердив.
export function isPublished(e: CollectionEntry<'longreads'>): boolean {
  return e.data.status === 'approved' && e.data.published !== null;
}

export function normalizeLongread(
  e: CollectionEntry<'longreads'>,
  lang: Lang,
): Longread {
  const d = e.data;
  return {
    slug: e.id,
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
    cta: { label: d.cta.label_uk, url: localizePath(d.cta.url, lang) },
    descriptionUk: d.seo.description_uk,
    href: localizePath(`/history/${e.id}/`, lang),
  };
}

// Найновіші згори: за датою публікації (спадання), потім за card_id.
export function sortLongreads(a: Longread, b: Longread): number {
  if (a.published && b.published && a.published !== b.published) {
    return a.published < b.published ? 1 : -1;
  }
  return a.cardId.localeCompare(b.cardId);
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
