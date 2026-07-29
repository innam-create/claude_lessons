import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { LICENSES, type License } from './lib/licenses';

// ТЗ §14: дозволений enum ліцензій. Перелік — у src/lib/licenses.ts (єдине
// джерело істини, спільне зі скриптом CI). commercial_use виводиться автоматично
// (не пишеться руками) — див. deriveCommercialUse там само.
const license = z.enum(LICENSES as unknown as [License, ...License[]]);

const bilingual = z.object({ uk: z.string(), en: z.string() });

// ТЗ §7.2 (тверде правило): жодне зображення не потрапляє в репозиторій без
// license, author, source_url, accessed. Zod валить збірку, якщо бракує поля;
// scripts/check-licenses.ts додатково ловить те, чого схема не бачить —
// відсутній файл на диску, дату з майбутнього, джерело поза ієрархією §7.1.
const modelImage = z.object({
  // Ім'я файлу в src/assets/models/. Існування перевіряє check-licenses.
  src: z.string().min(1),
  // ТЗ §10: змістовний alt — опис того, що видно, а не «фото ZX Spectrum».
  alt: bilingual,
  license,
  // .min(1): порожній рядок — це відсутня атрибуція, а не заповнене поле.
  author: z.string().min(1),
  source_url: z.string().url(),
  accessed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'очікується формат YYYY-MM-DD'),
});
export type ModelImageData = z.infer<typeof modelImage>;

// ТЗ §6: джерело факту. Етап 4 (ТЗ §12) вимагає ≥ 2 джерела на картку;
// поки перелік порожній — картка показує чесний стан «Джерела ще не додано».
const source = z.object({
  title: bilingual,
  url: z.string().url(),
  accessed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'очікується формат YYYY-MM-DD'),
});
export type SourceData = z.infer<typeof source>;

// ТЗ §6: схема каталогу моделей. У MVP дані живуть у одному
// src/data/models.json (типізована колекція з валідацією на етапі збірки).
// Пізніше кожна модель може стати окремим src/content/models/{slug}.mdx —
// схема лишається тією ж.
const models = defineCollection({
  loader: file('src/data/models.json'),
  schema: z.object({
    title: bilingual,
    // Коротка назва — чипси фільтра в каталозі («Sinclair», «Amstrad»).
    manufacturer: z.string(),
    // Повна юридична назва — рядок «Виробник» у таблиці характеристик
    // («Sinclair Research», «Timex Portugal»). null → показуємо manufacturer.
    manufacturerFull: z.string().nullable().default(null),
    country: z.enum(['GB', 'PT', 'US', 'PL']),
    year: z.string(),
    ram: z.string(),
    // null = невідомо (ТЗ §6). Використовується фільтром і таблицею характеристик.
    ramKb: z.number().nullable(),
    // Короткий опис — картка в каталозі.
    desc: bilingual,
    // Розгорнутий опис — hero на /models/{slug}/.
    summary: bilingual,

    // --- Характеристики (ТЗ §6). Скрізь null = невідомо → у таблиці «невідомо»
    // курсивом. Не вигадувати значення: незаповнене поле чесніше за здогад.
    cpu: z.string().nullable().default(null),
    cpuClockMhz: z.number().nullable().default(null),
    romKb: z.number().nullable().default(null),
    video: bilingual.nullable().default(null),
    sound: bilingual.nullable().default(null),
    storage: bilingual.nullable().default(null),
    keyboard: bilingual.nullable().default(null),
    massG: z.number().nullable().default(null),

    sources: z.array(source).default([]),
    // Порожній масив → картка «Шукаємо фотографію цієї машини» (ТЗ §15).
    // Перше зображення — обкладинка картки в каталозі.
    images: z.array(modelImage).default([]),
    // Власне фото експоната в музеї (ТЗ §7.1: museum-own). Окреме від images[]:
    // images[] — довідкові фото (часто з Wikimedia) для hero/галереї, а це —
    // знімок реальної машини у вітрині, показується в блоці «В експозиції».
    // null → слот показує чесний плейсхолдер «фото музею».
    museumPhoto: modelImage.nullable().default(null),
    inMuseum: z.boolean(),
    // ТЗ §6: обов'язкове. 'low' → видима позначка «потребує уточнення».
    confidence: z.enum(['high', 'medium', 'low']),
  }),
});

// ТЗ §6: периферія — окрема колекція (Interface 1, Microdrive, ZX Printer тощо).
// Схема — підмножина моделей: у пристроїв немає CPU/ОЗП/ПЗП, тож характеристики
// не тягнемо. Ті самі тверді правила: ліцензійні поля обов'язкові (Zod), порожні
// images[]/sources[] → чесні стани «Шукаємо фотографію» / «Джерела ще не додано».
const peripherals = defineCollection({
  loader: file('src/data/peripherals.json'),
  schema: z.object({
    title: bilingual,
    // Виробник — коротка й повна назва, як у моделей (Sinclair / Kempston).
    manufacturer: z.string(),
    manufacturerFull: z.string().nullable().default(null),
    country: z.enum(['GB', 'PT', 'US', 'PL']),
    year: z.string(),
    // Короткий опис — картка в каталозі периферії.
    desc: bilingual,
    sources: z.array(source).default([]),
    images: z.array(modelImage).default([]),
    inMuseum: z.boolean(),
    confidence: z.enum(['high', 'medium', 'low']),
  }),
});

// ТЗ §8.3: клони — окрема колекція (Didaktik, українські машини тощо). Схема —
// та сама підмножина, що й периферія (без CPU/ОЗП/таблиці характеристик:
// макет ClonesPage.dc.html малює лише сітку карток). Відмінності від периферії:
//   • country — власний enum (CS/UA…, не GB/PT/US/PL): клони з інших країн;
//     розширювати список при появі нових машин. countryName() бере підпис із
//     i18n (country.CS/country.UA), тож нова країна = ще один рядок у ui.ts.
//   • manufacturer — nullable: багато клонів аматорські / без відомого виробника
//     (ТЗ §8.3: назви й місця часто приписані постфактум). null → у картці
//     показуємо лише країну, без вигаданого виробника.
// Тверді правила ті самі: ліцензійні поля обов'язкові (Zod), порожні images[]/
// sources[] → чесні стани «Шукаємо фотографію» / «Джерела ще не додано».
const clones = defineCollection({
  loader: file('src/data/clones.json'),
  schema: z.object({
    title: bilingual,
    manufacturer: z.string().nullable().default(null),
    // ТЗ §8.3 відносить машини Timex (US/PT) до «клонів і ліцензійних варіантів».
    country: z.enum(['CS', 'UA', 'PL', 'ES', 'RO', 'US', 'PT']),
    year: z.string(),
    desc: bilingual,
    sources: z.array(source).default([]),
    images: z.array(modelImage).default([]),
    inMuseum: z.boolean(),
    // ТЗ §8.3: атрибуцію клонів слід звірити фізично → чернетки виходять
    // з 'low' і видимою позначкою «потребує уточнення» (ТЗ §2).
    confidence: z.enum(['high', 'medium', 'low']),
  }),
});

// ── Лонгріди (ТЗ §5: /history/{slug}/, §8.4) ───────────────────────
// Тіло — Markdown; тому glob-loader, а не file(). Тверді правила ті самі, що
// й для моделей: кожне зображення несе license/author/source_url/accessed
// (Zod валить збірку без них), license — лише з дозволеного enum (ТЗ §14).
// Джерела за єдиним шаблоном longread-template.md: тут ще й per-source confidence.
const longreadSource = source.extend({
  confidence: z.enum(['high', 'medium', 'low']).default('medium'),
});

const longreads = defineCollection({
  // **/*.md: UA в корені, EN у підтеці en/ (`en/<slug>.md`). Мову виводимо з
  // розташування файлу (src/lib/longreads.ts → entryLang), тіло лишається
  // одномовним на файл. generateId зберігає підтеку в id (типовий slugify її
  // відкидає → `en/foo.md` і `foo.md` колізують в один id) — тож id тут: шлях
  // без розширення (`en/foo`, `foo`).
  loader: glob({
    pattern: '**/*.md',
    base: 'src/content/longreads',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    // Slug дублюється у frontmatter для звірки з іменем файлу (id = ім'я файлу).
    slug: z.string().min(1),
    // Блок серії (А/Б/В) і номер картки за контент-планом.
    block: z.string(),
    card_id: z.string(),
    title: bilingual,
    // Лід/теза можуть бути ще без EN (переклад — після затвердження UA).
    lead: bilingual,
    thesis: bilingual,
    // ТЗ §2: confidence:low → на сторінці видима плашка «потребує уточнення».
    confidence: z.enum(['high', 'medium', 'low']),
    reading_time_min: z.number().int().positive(),
    // approved → матеріал показується; draft/review лишаються поза сайтом.
    status: z.enum(['draft', 'review', 'approved']),
    authors: z.array(z.string().min(1)).min(1),
    // Дата публікації; ставиться після затвердження музеєм. null → ще не видано.
    published: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'очікується формат YYYY-MM-DD')
      .nullable(),
    seo: z.object({
      keywords_uk: z.array(z.string()).default([]),
      description_uk: z.string().default(''),
      description_en: z.string().default(''),
    }),
    museum_exhibit: z.object({
      in_museum: z.boolean(),
      inventory_id: z.string().default(''),
      // Двомовна примітка експоната: мову вибирає normalizeLongread за lang
      // (fallback note_en → note_uk). EN може бути порожнім — тоді покажемо UA.
      note_uk: z.string().default(''),
      note_en: z.string().default(''),
    }),
    // Розмежувальні примітки — двомовні: на EN-сторінці рендериться .en
    // (fallback на .uk, як title/lead/thesis). Див. src/lib/longreads.ts.
    disambiguation: z.array(bilingual).default([]),
    // ТЗ §12: ≥ 2 джерела на матеріал — інакше збірка падає ще на схемі.
    sources: z.array(longreadSource).min(2, 'ТЗ §12: потрібно ≥ 2 джерела'),
    // Зображення живуть у src/assets/longreads/. Порожній масив припустимий
    // (ілюстрація може бути лише в тілі), але кожен запис — з повною атрибуцією.
    images: z.array(modelImage).default([]),
    cta: z.object({
      type: z.enum(['excursion', 'support', 'newsletter', 'archive_call']),
      label_uk: z.string(),
      url: z.string(),
    }),
  }),
});

export const collections = { models, peripherals, clones, longreads };
