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
    'compare.pick': '+ порівняти',
    'compare.picked': '✓ у порівнянні',
    'compare.remove': 'Прибрати з порівняння',
    'compare.full': 'Обрано максимум — 3 моделі',
    'compare.clear': 'Очистити',
    'compare.dialogTitle': 'Порівняння моделей',
    'compare.close': 'Закрити',
    'compare.diffOnly': 'Лише відмінності',
    'compare.diffMark': 'відрізняється',
    'compare.same': 'збігається',
    'compare.noDiff':
      'Серед відомих характеристик відмінностей немає. Рядки з невідомими значеннями приховано.',

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

    // картка моделі /models/{slug}/
    'detail.specs': 'Характеристики',
    'detail.gallery': 'Галерея',
    'detail.sources': 'Джерела',
    'detail.sources.empty': 'Джерела ще не додано',
    'detail.sources.emptyBody':
      'Кожен факт на цій сторінці має отримати посилання на джерело — це вимога редакційної політики музею. Поки їх немає, дані тут вважай попередніми.',
    'detail.gallery.empty':
      'Інших фотографій цієї машини ми поки не маємо. Якщо у вас є фото з вільною ліцензією — напишіть нам.',
    'detail.unknown': 'невідомо',
    'detail.inExpo': 'В експозиції музею',
    'detail.inExpo.body': 'Цей експонат можна побачити наживо.',
    'detail.museumPhoto': 'фото музею',
    'detail.licensing': 'Ліцензування',
    'detail.licensing.body':
      'Текст — CC BY-SA 4.0. Зображення — за ліцензіями, вказаними під кожним.',
    'detail.prev': '← Попередня',
    'detail.next': 'Наступна →',
    'detail.source': 'джерело',

    // рядки таблиці характеристик
    'spec.year': 'Рік',
    'spec.maker': 'Виробник',
    'spec.country': 'Країна',
    'spec.cpu': 'Процесор',
    'spec.ram': 'ОЗП',
    'spec.rom': 'ПЗП',
    'spec.video': 'Відео',
    'spec.sound': 'Звук',
    'spec.storage': 'Носій',
    'spec.keyboard': 'Клавіатура',
    'spec.mass': 'Маса',
    'unit.mhz': 'МГц',
    'unit.g': 'г',

    // 404 (ТЗ §7.2 / NotFoundPage.dc.html)
    'notFound.title': 'Сторінку не знайдено',
    'notFound.body':
      'Схоже, касета не завантажилась. Спробуй перемотати назад — або повернутися на головну.',
    'notFound.home': 'На головну',
    'notFound.models': 'До моделей',

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
    'compare.pick': '+ compare',
    'compare.picked': '✓ in comparison',
    'compare.remove': 'Remove from comparison',
    'compare.full': 'Maximum reached — 3 models',
    'compare.clear': 'Clear',
    'compare.dialogTitle': 'Model comparison',
    'compare.close': 'Close',
    'compare.diffOnly': 'Differences only',
    'compare.diffMark': 'differs',
    'compare.same': 'identical',
    'compare.noDiff':
      'No differences among the known specifications. Rows with unknown values are hidden.',

    'filter.year': 'Year',
    'filter.maker': 'Manufacturer',
    'filter.country': 'Country',
    'filter.ram': 'RAM',
    'filter.avail': 'Availability',
    'filter.inMuseum': '★ In museum',

    'card.inMuseum': '★ In museum',
    'card.unverified': '⚠ unverified',
    'card.seeking': 'We’re looking for a photo<br>of this machine',

    'detail.specs': 'Specifications',
    'detail.gallery': 'Gallery',
    'detail.sources': 'Sources',
    'detail.sources.empty': 'Sources not added yet',
    'detail.sources.emptyBody':
      'Every fact on this page must carry a link to its source — that is the museum’s editorial policy. Until they are here, treat the data as provisional.',
    'detail.gallery.empty':
      'We don’t have any further photos of this machine yet. If you have a freely licensed one, please get in touch.',
    'detail.unknown': 'unknown',
    'detail.inExpo': 'On display at the museum',
    'detail.inExpo.body': 'You can see this exhibit in person.',
    'detail.museumPhoto': 'museum photo',
    'detail.licensing': 'Licensing',
    'detail.licensing.body':
      'Text — CC BY-SA 4.0. Images — under the licenses shown beneath each of them.',
    'detail.prev': '← Previous',
    'detail.next': 'Next →',
    'detail.source': 'source',

    'spec.year': 'Year',
    'spec.maker': 'Manufacturer',
    'spec.country': 'Country',
    'spec.cpu': 'CPU',
    'spec.ram': 'RAM',
    'spec.rom': 'ROM',
    'spec.video': 'Video',
    'spec.sound': 'Sound',
    'spec.storage': 'Storage',
    'spec.keyboard': 'Keyboard',
    'spec.mass': 'Mass',
    'unit.mhz': 'MHz',
    'unit.g': 'g',

    'notFound.title': 'Page not found',
    'notFound.body':
      'Looks like the tape didn’t load. Try rewinding — or head back to the home page.',
    'notFound.home': 'Back to home',
    'notFound.models': 'Browse models',

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
