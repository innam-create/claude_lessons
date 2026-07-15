# Аналіз стану проекту

_Started 2026-07-15 10:01 UTC_

---

## User

Continuing from "ZX Spectrum музейний сайт".

## Assistant

We've built a comprehensive ZX Spectrum museum website design system and macros. Here's the exact current state:

**What we worked on and why:**
We designed a Ukrainian-language educational website about ZX Spectrum for the Software and Computer Museum (Kharkiv), extending sncmuseum.org. The goal was a retro-aesthetic UI (true ZX Spectrum colours, pixel typeface) paired with modern readability and accessibility (4.5:1 contrast minimum, no colour as sole meaning carrier).

**Decisions made:**
- **Pixel typeface:** Settled on Retroville NC after testing Pixelify Sans (weak Cyrillic) and others — it renders Ukrainian uniformly without baseline shifts.
- **Colour tokens:** Pure black background (#000000), light grey text (#D7D7D7), 8 ZX BRIGHT colours with hard rules (green/blue text forbidden on black; only as fills/borders/icons), museum navy/gold reserved for footer and CTA buttons.
- **Image strategy:** For real models, Wikimedia Commons photos only (CC BY-SA). For clones/software with no clean-licence photos, honest "Шукаємо фотографію" placeholder cards. For hero, used a real photo of 48K from Bill Bertram instead of vector art.
- **Navigation:** All internal links wired (header menu, tiles, breadcrumbs, prev/next nav); external source links stubbed.
- **Filters:** Country filter kept because Timex TC2048 is from Portugal; year/manufacturer/RAM/museum-presence filters live-toggle and combine.

**Exact current state:**
Canvas has 13 template frames (desktop + mobile pairs):
1. Design system (Retroville NC pixel font, colour palette, component specs)
2. HomePage (with Contacts menu item, Contacts page wired, 7 category tiles, map section removed, Timex/+2A keep "seeking photo" state)
3. Catalog (8 real model images Wikimedia photos, per-model detail pages wired, filters toggle+filter+combine, Timex and +2A show "no photo" honestly)
4–11. Model detail pages (16K, 48K, +, 128, +2, +3, Timex, +2A), each with breadcrumb "Моделі", prev/next nav, characteristics table, gallery, sources
12. History hub (3 articles with real images: ZX81 photo, cassette photo, 48K board photo; each article opens its own longread via dedicated wrapper file)
13–18. History longread wrappers (48k/cassette/zx81, each title/body/image/quote/BASIC listing/sources differ per theme)
19. Clones hub (no-photo cards + "seeking photo" placeholder)
20. Software page (covers + no emulator buttons)
21. Exhibits page (museum badges)
22. Peripherals page (uses catalog pattern)
23. Contacts page (Google Maps iframe embed, Instagram @sncmuseum, Facebook facebook.com/sncmuseum, address Гігант ХПІ, free admission)
24. 404 (R Tape loading error retro style)

All links verified working; CRT toggle renders scanlines+glow on homepage. Accessibility audit passed (no colour-only meaning, 4.5:1+ contrast throughout).

**Open next steps:**
- You just asked to fix clone section images ("на розсипних мікросхемах" label) — awaiting exact photos or confirmation of which clones need real images.
- Clone photos exist for several models — need filenames or Wikimedia URLs to wire them.
- Software page and Exhibits page images are placeholders — need real game covers / exhibit photos.
- Sources/Credits page and About project page (mission, editorial principles, contacts) are not yet built if you want them.
- EN translation toggles in header but no EN content exists — defer or build placeholder?

**Project files:**
Design system: `Дизайн-система.dc.html` + `5by7_Bold.ttf` + fonts/Retroville_NC.ttf
Canvas macros: `Макети.dc.html` (master frame list)
Reusables: `Header.dc.html`, `Footer.dc.html`, `ExhibitCard.dc.html`
Pages: `HomePage.dc.html`, `CatalogPage.dc.html`, `ModelDetailPage.dc.html`, `Model-*.dc.html` (×8 wrappers), `HistoryHubPage.dc.html`, `Лонгрід-*.dc.html` (×3 wrappers), `ClonesPage.dc.html`, `SoftwarePage.dc.html`, `ExhibitsPage.dc.html`, `PeripheralsPage.dc.html`, `ContactsPage.dc.html`, `NotFoundPage.dc.html`

## User

Проаналізуй стан проекту, чи достатньо цього, щоб передати роботу агенту щодо розробки безпосередньо сайту

## Assistant

Гляну на ключові файли, щоб дати обґрунтовану оцінку готовності до передачі в розробку.

_[tool: read_file]_

_[tool: list_files]_

_[tool: grep]_

_[tool: grep]_

Проаналізував макети, каталог та модель-сторінки. Ось чесна оцінка готовності до передачі в розробку.

## Що вже готове (сильна частина)
- **Повний UX/візуальний шар.** 11 типів сторінок у desktop + mobile, стани (CRT, порожній каталог, 404), дизайн-система з токенами, шрифтами й компонентами, спільні `Header`/`Footer`/`ExhibitCard`.
- **Навігація зшита** між усіма сторінками, реальна структура сайту читається з `Макети.dc.html`.
- **Дизайн-система прив'язана** до бренду музею (`_ds/`), кольори й типографіка узгоджені.

Цього достатньо, щоб розробник **зрозумів вигляд і поведінку** кожної сторінки. Але як самодостатній пакет для передачі — **ще ні**. Чотири прогалини:

## Чого бракує для чистої передачі

**1. Зображення — критично.** Фото моделей підвантажуються «наживо» з Wikimedia через `Special:FilePath` (гарячі посилання). Це ненадійно в проді й порушує етикет Wikimedia. Треба: завантажити файли локально в `assets/`, зафіксувати автора+ліцензію (CC BY-SA) для кожного. Софт/експонати/клони досі плейсхолдери «Шукаємо фотографію».

**2. Формат.** Це Design Components (прототип), а не продакшн-код. Розробнику потрібен або явно вибраний стек (React/статичний генератор/CMS), або рішення, що DC — лише візуальний еталон, а верстка пишеться з нуля.

**3. Контент-модель.** Дані вшиті в кожен файл. Для реального сайту потрібно винести моделі/статті/експонати в структуру (JSON/CMS), особливо якщо контент оновлюватиме музей.

**4. Спека для агента.** Немає письмового документа: sitemap, інвентар компонентів, breakpoints, стани взаємодій, правила доступності, EN-локалізація (перемикач є — контенту нема).

## Рекомендація
Перед передачею варто зібрати **handoff-документ** (у мене є навичка «Handoff to Claude Code»), який зафіксує стек, структуру контенту, інвентар компонентів і атрибуцію зображень. Тоді агент-розробник зможе працювати без здогадок.

Хочете, щоб я:
1. Згенерував цей handoff-пакет (специфікація + мапа компонентів + структура контенту), і/або
2. Спочатку закрив питання зображень (завантажив реальні фото локально з атрибуцією)?

Що робимо першим?

## User

2

## Assistant

_[tool: read_file]_

_[tool: grep]_

Зображення зараз гарячо-лінкуються з Wikimedia. Спробую завантажити їх локально в `assets/` через скрипт.

_[tool: run_script]_

fetch заблоковано в пісочниці. Спробую через `readImage` + canvas.

_[tool: run_script]_

_[tool: list_files]_

Не можу — середовище блокує завантаження бінарних файлів із зовнішніх сайтів (і `fetch`, і `readImage` не приймають URL). Тобто програмно втягнути фото з Wikimedia звідси неможливо.

Зберу повний перелік решти зображень, щоб підготувати ґрунт.

_[tool: grep]_

_[tool: grep]_

Клони та периферія — усі плейсхолдери без фото; реальних зображень із Wikimedia лише **7 файлів**. Оскільки втягнути бінарники звідси неможливо, підготую повний маніфест атрибуцій — це робить локалізацію фото механічним кроком для вас або розробника.

_[tool: write_file]_

Готово настільки, наскільки дозволяє середовище. Підсумок і що потрібно від вас.

**Що я зробив:** склав повний реєстр атрибуцій `assets/IMAGE-CREDITS.md` — усі 7 реальних Wikimedia-зображень з автором, ліцензією, локальним іменем файлу та переліком місць використання, плюс список плейсхолдерів, де фото ще бракує.

**Блокер:** з цього середовища неможливо програмно завантажити бінарні файли із зовнішніх сайтів (і мережевий `fetch`, і завантажувач зображень не приймають зовнішні URL). Тому фізично покласти фото Wikimedia в `assets/` звідси я не можу.

**Два шляхи закрити питання — оберіть:**

1. **Ви завантажуєте 7 файлів** (перетягніть у чат за іменами з таблиці — `zx-48k.jpg`, `zx-plus.jpg`, `zx-128.jpg`, `zx-plus3.jpg`, `zx-board.jpg`, `cassette.jpg`, `zx81.jpg`). Я одразу перепишу хелпер `fp()` та інлайн-URL на локальні шляхи `assets/…` у всіх файлах і збережу підписи-атрибуції. Це «чистий» продакшн-варіант.

2. **Залишаємо санкціоновані `Special:FilePath` хотлінки** (Wikimedia їх дозволяє як стабільні URL), а `IMAGE-CREDITS.md` слугує інструкцією локалізації для розробника — тоді це просто механічний крок під час верстки.

Оскільки ви з домену музею, для реального сайту раджу варіант 1. Скиньте файли — і я зашию їх локально.

## User

Ось файли

## User

Ось файли

## Assistant

_[tool: list_files]_

Усі 7 надійшли. Копіюю в `assets/` під локальними іменами.

_[tool: copy_files]_

Тепер знайду, як саме `fp()` та URL вживаються у кожному файлі, щоб точно переписати.

_[tool: grep]_

Історія/Лонгрід уже вказують на локальні `assets/…`. Треба перевірити, що робить `fp()` у каталозі та деталях моделі, і що з `IMAGE-CREDITS.md` (grep показує іншу версію, ніж я писав).

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Усе вже локалізовано: `fp()` мапить на `assets/…`, історія/лонгрід посилаються на локальні шляхи напряму, а всі 7 файлів тепер лежать в `assets/`. Перевірю, що каталог реально показує фото.

_[tool: show_html]_

_[tool: show_html]_

Локальні фото завантажуються коректно — картки 16K і 48K показують реальні знімки з підписами атрибуції.

**Питання зображень закрито:**
- Усі 7 реальних фото завантажені в `assets/` (`zx-48k`, `zx-plus`, `zx-128`, `zx-plus3`, `zx-board`, `cassette`, `zx81`).
- Код уже мапить на локальні шляхи: `fp()` у каталозі й деталях моделі, прямі `assets/…` в історії та лонгрідах. Хотлінків на Wikimedia більше немає.
- `assets/IMAGE-CREDITS.md` фіксує автора, ліцензію й місця використання кожного файлу — плюс перелік плейсхолдерів, де потрібні фото музею (+2, Timex, +2A, клони, периферія, софт, експонати; CC BY-SA 4.0).

Тепер проект чистий для передачі в частині медіа. Залишається лише те, що потребує реальних матеріалів від музею (фото експонатів/клонів/софту) — це вже організаційний, а не технічний блокер.

Готові переходити до **handoff-документа** (варіант 1 з мого аналізу: sitemap, інвентар компонентів, breakpoints, контент-модель, правила доступності), щоб агент-розробник міг будувати сайт без здогадок?

## User

Так, переходимо

## Assistant

_[tool: read_skill_prompt]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

I have enough to write a self-sufficient handoff. Creating the folder, README, and copying the design files.

_[tool: write_file]_

Тепер скопіюю всі файли дизайну в пакет.

_[tool: run_script]_

_[tool: copy_files]_

Пакет зібрано. Готую завантаження.

_[tool: present_fs_item_for_download]_

Пакет `design_handoff_zx_spectrum/` готовий до завантаження — самодостатній README + усі прототипи, компоненти, шрифт, фото з атрибуцією та зв'язана дизайн-система (`_ds/`).

README покриває: токени (точні hex, типографіка, правила доступності), усі 11 сторінок + спільні компоненти з точними значеннями, взаємодії/стан, реєстр ассетів і — окремо — п'ять відкритих рішень для замовника (EN-локалізація, фото музею, контент-модель, стек).

Один момент: стек цільового сайту досі не заданий. Розробник зможе обрати сам, але якщо ви вже знаєте (інтеграція в наявний sncmuseum.org чи новий застосунок) — скажіть, і я допишу конкретну секцію під нього.

Хочете, щоб я додав у пакет **скриншоти** екранів (за замовчуванням не включаю)?

