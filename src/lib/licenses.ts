import type { Lang } from '../i18n/ui';

// ТЗ §14: дозволений перелік ліцензій — єдине джерело істини.
// Zod-схема (src/content.config.ts) будується з нього, і scripts/check-licenses.ts
// звіряється з ним же, щоб перелік не роздвоївся між збіркою та CI.
//
// Версії 2.5/3.0 додано за рішенням від 2026-07-17 (ТЗ §14, примітка): фото
// Spectrum на Wikimedia Commons завантажені 2006 року під CC BY-SA 2.5 — версії
// 4.0 тоді ще не існувало. Принципів §14 це не порушує: обидві дозволяють і
// кадрування (не ND), і комерційне використання (не NC).
//
// ND-ліцензії сюди не додавати: кадрування під 4:3 — похідний твір (ТЗ §7.4).
export const LICENSES = [
  'PD',
  'CC0',
  'CC-BY-4.0',
  'CC-BY-SA-2.5',
  'CC-BY-SA-3.0',
  'CC-BY-SA-4.0',
  'CC-BY-NC-4.0',
  'CC-BY-NC-SA-4.0',
  'museum-own',
] as const;

export type License = (typeof LICENSES)[number];

// ТЗ §14: commercial_use не пишеться руками — виводиться зі значення license.
// Потрібне для фільтра при майбутньому повторному використанні матеріалів.
export function deriveCommercialUse(license: License): boolean {
  return !license.includes('-NC-') && !license.endsWith('-NC');
}

// ТЗ §7.3: під кожним зображенням — автор · ліцензія (посилання на текст
// ліцензії) · джерело. Тут — довідник назв і канонічних URL текстів ліцензій.
//
// label — міжнародний ідентифікатор, не перекладається (CC BY-SA 4.0 звучить
// однаково будь-якою мовою). Локалізується лише PD, де є усталений український
// відповідник; його бере licenseLabel() нижче.
const LICENSE_URLS: Record<License, string | null> = {
  PD: null,
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
  'CC-BY-4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC-BY-SA-2.5': 'https://creativecommons.org/licenses/by-sa/2.5/',
  'CC-BY-SA-3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC-BY-SA-4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC-BY-NC-4.0': 'https://creativecommons.org/licenses/by-nc/4.0/',
  'CC-BY-NC-SA-4.0': 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  // ТЗ §7.1: фото музею публікуються під CC BY-SA 4.0 від імені музею.
  'museum-own': 'https://creativecommons.org/licenses/by-sa/4.0/',
};

const LICENSE_LABELS: Record<License, string> = {
  PD: 'Public domain',
  CC0: 'CC0 1.0',
  'CC-BY-4.0': 'CC BY 4.0',
  'CC-BY-SA-2.5': 'CC BY-SA 2.5',
  'CC-BY-SA-3.0': 'CC BY-SA 3.0',
  'CC-BY-SA-4.0': 'CC BY-SA 4.0',
  'CC-BY-NC-4.0': 'CC BY-NC 4.0',
  'CC-BY-NC-SA-4.0': 'CC BY-NC-SA 4.0',
  'museum-own': 'CC BY-SA 4.0',
};

export function licenseUrl(license: License): string | null {
  return LICENSE_URLS[license];
}

export function licenseLabel(license: License, lang: Lang): string {
  if (license === 'PD') return lang === 'uk' ? 'Суспільне надбання' : 'Public domain';
  return LICENSE_LABELS[license];
}

// ТЗ §7.1: ієрархія дозволених джерел. Хост → людська назва для рядка
// атрибуції. Ключі використовує і scripts/check-licenses.mjs, щоб не пускати
// в репозиторій зображення з джерела поза цим переліком.
export const ALLOWED_SOURCES: Record<string, string> = {
  'commons.wikimedia.org': 'Wikimedia Commons',
  'archive.org': 'Internet Archive',
  'www.computinghistory.org.uk': 'Centre for Computing History',
  'collection.sciencemuseumgroup.org.uk': 'Science Museum Group',
  'www.instagram.com': 'Instagram @sncmuseum',
};

export function sourceLabel(sourceUrl: string): string {
  let host: string;
  try {
    host = new URL(sourceUrl).hostname;
  } catch {
    return sourceUrl;
  }
  return ALLOWED_SOURCES[host] ?? host.replace(/^www\./, '');
}
