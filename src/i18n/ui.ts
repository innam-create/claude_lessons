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

    // пошук (Pagefind, ТЗ §5.2)
    'search.title': 'Пошук',
    'search.open': 'Пошук',
    'search.placeholder': 'Пошук по сайту…',
    'search.hint': 'Введіть запит — шукаємо серед моделей, периферії та матеріалів.',
    'search.loading': 'Шукаю…',
    'search.noResults': 'Нічого не знайдено',
    'search.noResultsBody': 'Спробуй інші слова або перевір правопис.',
    'search.unavailable': 'Пошук працює у зібраній версії сайту.',

    // головна (HomePage.dc.html)
    'home.eyebrow': 'Software & Computer Museum',
    'home.hero.lead':
      '8-бітний комп’ютер, що приніс програмування й ігри у тисячі домівок. Історія, моделі, клони та софт — і те, що можна побачити наживо в музеї.',
    'home.hero.cta': 'Дивитися моделі',
    'home.about.label': 'Про проєкт',
    'home.about.body':
      'Освітній розділ музею про машину, з якої для багатьох почалося знайомство з комп’ютерами. Чернетки готує ШІ, а публікуємо лише після перевірки й затвердження музеєм.',
    'home.sections': 'Розділи',
    'home.more': 'Детальніше →',
    'home.soon': 'незабаром',
    'home.tile.history': '1980–1992: від задуму Sinclair до кінця епохи.',
    'home.tile.models': 'Офіційні машини: 16K, 48K, +, 128K, +2, +3.',
    'home.tile.clones': 'Європейські та українські клони Spectrum.',
    'home.tile.exhibits': 'Що можна побачити й торкнутися в музеї.',
    'home.tile.software': 'Програми, ігри та легендарні касети.',
    'home.tile.peripherals': 'Друк, джойстики, накопичувачі та інтерфейси.',
    'home.tile.contacts': 'Як дістатися, графік роботи та мапа музею.',

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

    // периферія (ТЗ §6 / PeripheralsPage.dc.html)
    'peripherals.title': 'Периферія',
    'peripherals.intro':
      'Пристрої, що розширювали можливості Spectrum: завантаження й друк, джойстики та накопичувачі.',
    'peripherals.count.suffix': 'пристроїв',

    // клони (ТЗ §8.3 / ClonesPage.dc.html)
    'clones.title': 'Клони',
    'clones.intro':
      'Європейські та українські машини, зібрані «за мотивами» Spectrum. Фотографій із чистою ліцензією обмаль — деякі машини ще шукають своє фото.',
    'clones.count.suffix': 'машин',
    'clones.draftNote':
      'Чернетка: перелік і атрибуцію клонів музей звіряє з інвентарем перед публікацією. Роки й походження можуть уточнюватися.',

    // історія (HistoryHubPage.dc.html)
    'history.title': 'Історія',
    'history.intro':
      'Від задуму Клайва Сінклера до кінця епохи 8-бітних машин. Дванадцять років, що змінили те, як мільйони людей уперше зустріли комп’ютер.',
    'history.range': '1980 — 1992',
    'history.articles': 'Статті',
    'history.articles.empty':
      'Розгорнуті матеріали про ключові моменти історії Spectrum готуються. Кожен вийде з посиланнями на джерела — щойно їх звірить і затвердить музей.',

    // лонгрід /history/{slug}/
    'longread.min': 'хв читання',
    'longread.published': 'Опубліковано',
    'longread.thesis': 'Головна теза',
    'longread.notConfuse': 'Не плутати',
    'longread.unverified': '⚠ потребує уточнення',
    'longread.read': 'Читати →',
    'longread.sources': 'Джерела',
    'longread.backToHistory': '← Усі матеріали',
    'longread.cta.excursion': 'Записатися на екскурсію',

    // експонати (ExhibitsPage.dc.html)
    'exhibits.title': 'Експонати',
    'exhibits.intro':
      'Те, що можна побачити наживо. Ці машини є в колекції музею — до багатьох експонатів можна доторкнутися.',
    'exhibits.empty':
      'Перелік експонатів ще звіряється з інвентарем музею. Тут зʼявляться машини, наявність яких підтверджено.',
    'exhibits.visit.title': 'Приходьте подивитися наживо',
    'exhibits.visit.cta': 'Як дістатися →',

    // софт (SoftwarePage.dc.html)
    'software.title': 'Софт та ігри',
    'software.intro':
      'Програми та ігри, що виходили на касетах для Spectrum. Наведені відомості — попередні й потребують звірки з джерелами.',
    'software.note':
      'Обкладинки та скриншоти додамо, щойно знайдемо їх із вільною ліцензією. Поки що — текстовий каталог.',

    // контакти (ContactsPage.dc.html)
    'contacts.title': 'Контакти',
    'contacts.intro':
      'Приходьте подивитися й доторкнутися до історії обчислювальної техніки. Завітайте у робочий час — і ми покажемо колекцію наживо.',
    'contacts.addr.label': 'Адреса',
    'contacts.addr.value': 'вул. Григорія Сковороди, 79/1',
    'contacts.addr.sub': 'Харків',
    'contacts.hours.label': 'Графік',
    'contacts.hours.value': 'вт–сб · 10:00–18:00',
    'contacts.hours.sub': 'неділя, понеділок — вихідні',
    'contacts.email.label': 'Пошта',
    'contacts.directions': 'Як дістатися',
    'contacts.openMaps': 'Відкрити в Google Maps →',

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
    'country.CS': 'Чехословаччина',
    'country.UA': 'Україна',
    'country.ES': 'Іспанія',
    'country.RO': 'Румунія',

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

    'search.title': 'Search',
    'search.open': 'Search',
    'search.placeholder': 'Search the site…',
    'search.hint': 'Type a query — we search across models, peripherals and materials.',
    'search.loading': 'Searching…',
    'search.noResults': 'Nothing found',
    'search.noResultsBody': 'Try different words or check the spelling.',
    'search.unavailable': 'Search runs on the built version of the site.',

    'home.eyebrow': 'Software & Computer Museum',
    'home.hero.lead':
      'The 8-bit computer that brought programming and games into thousands of homes. History, models, clones and software — and what you can see in person at the museum.',
    'home.hero.cta': 'Browse models',
    'home.about.label': 'About',
    'home.about.body':
      'The museum’s educational section on the machine that introduced computers to so many. Drafts are AI-prepared; we publish only after review and approval by the museum.',
    'home.sections': 'Sections',
    'home.more': 'Learn more →',
    'home.soon': 'coming soon',
    'home.tile.history': '1980–1992: from Sinclair’s idea to the end of an era.',
    'home.tile.models': 'The official machines: 16K, 48K, +, 128K, +2, +3.',
    'home.tile.clones': 'European and Ukrainian Spectrum clones.',
    'home.tile.exhibits': 'What you can see and touch at the museum.',
    'home.tile.software': 'Programs, games and the legendary cassettes.',
    'home.tile.peripherals': 'Printing, joysticks, storage and interfaces.',
    'home.tile.contacts': 'How to get here, opening hours and a map.',

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

    'peripherals.title': 'Peripherals',
    'peripherals.intro':
      'Devices that extended the Spectrum: loading and printing, joysticks and storage.',
    'peripherals.count.suffix': 'devices',

    'clones.title': 'Clones',
    'clones.intro':
      'European and Ukrainian machines built “after” the Spectrum. Cleanly-licensed photos are scarce — some machines are still looking for their photo.',
    'clones.count.suffix': 'machines',
    'clones.draftNote':
      'Draft: the museum verifies the list and attribution of clones against its inventory before publishing. Years and origins may be refined.',

    'history.title': 'History',
    'history.intro':
      'From Clive Sinclair’s idea to the end of the 8-bit era. Twelve years that changed how millions of people first met a computer.',
    'history.range': '1980 — 1992',
    'history.articles': 'Articles',
    'history.articles.empty':
      'In-depth pieces on the key moments of the Spectrum’s history are in preparation. Each will ship with links to its sources — once the museum has checked and approved them.',

    'longread.min': 'min read',
    'longread.published': 'Published',
    'longread.thesis': 'Key point',
    'longread.notConfuse': 'Don’t confuse',
    'longread.unverified': '⚠ needs checking',
    'longread.read': 'Read →',
    'longread.sources': 'Sources',
    'longread.backToHistory': '← All articles',
    'longread.cta.excursion': 'Book a guided tour',

    'exhibits.title': 'Exhibits',
    'exhibits.intro':
      'What you can see in person. These machines are in the museum’s collection — many exhibits are yours to touch.',
    'exhibits.empty':
      'The exhibit list is still being checked against the museum’s inventory. Machines confirmed to be here will appear below.',
    'exhibits.visit.title': 'Come and see them in person',
    'exhibits.visit.cta': 'How to get here →',

    'software.title': 'Software & games',
    'software.intro':
      'Programs and games that shipped on cassette for the Spectrum. The details below are provisional and need checking against sources.',
    'software.note':
      'Covers and screenshots will be added once we find freely licensed ones. For now — a text catalogue.',

    'contacts.title': 'Contacts',
    'contacts.intro':
      'Come and see — and touch — the history of computing. Drop by during opening hours and we’ll show you the collection in person.',
    'contacts.addr.label': 'Address',
    'contacts.addr.value': '79/1 Hryhoriia Skovorody St',
    'contacts.addr.sub': 'Kharkiv',
    'contacts.hours.label': 'Hours',
    'contacts.hours.value': 'Tue–Sat · 10:00–18:00',
    'contacts.hours.sub': 'Sunday, Monday — closed',
    'contacts.email.label': 'Email',
    'contacts.directions': 'How to get here',
    'contacts.openMaps': 'Open in Google Maps →',

    'notFound.title': 'Page not found',
    'notFound.body':
      'Looks like the tape didn’t load. Try rewinding — or head back to the home page.',
    'notFound.home': 'Back to home',
    'notFound.models': 'Browse models',

    'country.GB': 'United Kingdom',
    'country.PT': 'Portugal',
    'country.US': 'USA',
    'country.PL': 'Poland',
    'country.CS': 'Czechoslovakia',
    'country.UA': 'Ukraine',
    'country.ES': 'Spain',
    'country.RO': 'Romania',

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
