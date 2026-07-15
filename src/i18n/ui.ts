export type Lang = 'uk' | 'en';

export const LANGS: Lang[] = ['uk', 'en'];
export const DEFAULT_LANG: Lang = 'uk';

// Префікс шляху для мови: uk — без префікса, en — /en (ТЗ §5).
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'uk' ? clean : `/en${clean === '/' ? '/' : clean}`;
}

export const ui = {
  uk: {
    // навігація
    'nav.history': 'Історія',
    'nav.models': 'Моделі',
    'nav.clones': 'Клони',
    'nav.exhibits': 'Експонати',
    'nav.software': 'Софт',
    'nav.peripherals': 'Периферія',
    'nav.contacts': 'Контакти',
    'nav.home': 'Головна',
    'nav.toMuseum': '← до музею',
    'crt.on': 'CRT ON',
    'crt.off': 'CRT OFF',

    // каталог
    'catalog.title': 'Моделі',
    'catalog.filters': 'Фільтри',
    'catalog.reset': 'Скинути фільтри',
    'catalog.count.suffix': 'моделей',
    'catalog.count.of': 'з',
    'catalog.empty.title': 'Нічого не знайдено',
    'catalog.empty.body':
      'За обраними фільтрами немає моделей. Спробуй прибрати частину умов або скинути фільтри.',
    'compare.title': 'Порівняти',
    'compare.add': '+ додати модель',
    'compare.cta': 'Порівняти',

    // групи фільтрів
    'filter.year': 'Рік',
    'filter.maker': 'Виробник',
    'filter.country': 'Країна',
    'filter.ram': 'Обсяг ОЗП',
    'filter.avail': 'Наявність',
    'filter.inMuseum': '★ Є в музеї',

    // картка
    'card.inMuseum': '★ В музеї',
    'card.unverified': '⚠ уточнення',
    'card.seeking': 'Шукаємо фотографію<br>цієї машини',

    // країни
    'country.GB': 'Велика Британія',
    'country.PT': 'Португалія',
    'country.US': 'США',
    'country.PL': 'Польща',

    // футер
    'footer.tagline':
      'Software & Computer Museum — перший постійний музей ПЗ та комп’ютерів в Україні.',
    'footer.address': 'вул. Григорія Сковороди, 79/1 · Харків',
    'footer.hours': 'вт–сб · 10:00–18:00',
    'footer.sections': 'Розділи',
    'footer.contact': 'Зв’язок',
    'footer.software': 'Софт та ігри',
    'footer.license':
      'Текст — CC BY-SA 4.0 · зображення — за ліцензіями під кожним. Проєкт SnC Museum.',
  },
  en: {
    'nav.history': 'History',
    'nav.models': 'Models',
    'nav.clones': 'Clones',
    'nav.exhibits': 'Exhibits',
    'nav.software': 'Software',
    'nav.peripherals': 'Peripherals',
    'nav.contacts': 'Contacts',
    'nav.home': 'Home',
    'nav.toMuseum': '← to museum',
    'crt.on': 'CRT ON',
    'crt.off': 'CRT OFF',

    'catalog.title': 'Models',
    'catalog.filters': 'Filters',
    'catalog.reset': 'Reset filters',
    'catalog.count.suffix': 'models',
    'catalog.count.of': 'of',
    'catalog.empty.title': 'Nothing found',
    'catalog.empty.body':
      'No models match the selected filters. Try removing some conditions or reset the filters.',
    'compare.title': 'Compare',
    'compare.add': '+ add model',
    'compare.cta': 'Compare',

    'filter.year': 'Year',
    'filter.maker': 'Manufacturer',
    'filter.country': 'Country',
    'filter.ram': 'RAM',
    'filter.avail': 'Availability',
    'filter.inMuseum': '★ In museum',

    'card.inMuseum': '★ In museum',
    'card.unverified': '⚠ unverified',
    'card.seeking': 'We’re looking for a photo<br>of this machine',

    'country.GB': 'United Kingdom',
    'country.PT': 'Portugal',
    'country.US': 'USA',
    'country.PL': 'Poland',

    'footer.tagline':
      'Software & Computer Museum — the first permanent museum of software and computers in Ukraine.',
    'footer.address': '79/1 Hryhoriia Skovorody St · Kharkiv',
    'footer.hours': 'Tue–Sat · 10:00–18:00',
    'footer.sections': 'Sections',
    'footer.contact': 'Contact',
    'footer.software': 'Software & games',
    'footer.license':
      'Text — CC BY-SA 4.0 · images — under the licenses shown beneath each. An SnC Museum project.',
  },
} as const;

export type UIKey = keyof (typeof ui)['uk'];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[DEFAULT_LANG][key] ?? key;
  };
}
