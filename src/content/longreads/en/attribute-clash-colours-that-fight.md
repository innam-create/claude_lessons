---
# ── Метадані ──────────────────────────────────────────────────────
# EN-переклад. Тіло — англійською; спільні поля збігаються з UA-версією
# (src/content/longreads/attribute-clash-colours-that-fight.md). Парування UA↔EN —
# за спільним slug (див. src/lib/longreads.ts).
slug: "attribute-clash-colours-that-fight"
block: "А"
card_id: "A4"
title:
  uk: "Кольори, які сваряться: феномен attribute clash"
  en: "Colours that fight: the attribute clash phenomenon"
lead:
  uk: "На ZX Spectrum колір задавали не для кожної точки, а для цілої клітинки 8×8 — і тому фігури на екрані часто «фарбували» тло навколо себе. Розбираємо, як економія пам'яті створила найвпізнаваніший візуальний почерк платформи."
  en: "On the ZX Spectrum, colour was set not per pixel but per 8×8 cell — so shapes on screen often “painted” the background around them. We look at how saving memory created the platform’s most recognisable visual signature."
thesis:
  uk: "Attribute clash — не поломка, а прямий наслідок того, що колір на Spectrum коштував пам'яті: два кольори на клітинку 8×8 замість кольору на кожну точку. Це обмеження художники навчилися не приховувати, а перетворювати на стиль."
  en: "Attribute clash is not a fault but a direct consequence of colour costing memory on the Spectrum: two colours per 8×8 cell instead of a colour per pixel. Artists learned not to hide this limit but to turn it into a style."
confidence: "medium"
reading_time_min: 8
status: "approved"
authors: ["SNC Museum"]
published: "2026-07-28"

# ── SEO ───────────────────────────────────────────────────────────
seo:
  keywords_uk: ["графіка ZX Spectrum", "attribute clash", "колірна клітинка 8×8", "INK PAPER BRIGHT", "палітра Spectrum"]
  description_uk: "Що таке attribute clash на ZX Spectrum: колір на клітинку 8×8, палітра з 15 кольорів, INK/PAPER/BRIGHT і прийоми художників, що обходили «злипання» кольору."
  description_en: "What attribute clash on the ZX Spectrum is: colour per 8×8 cell, a 15-colour palette, INK/PAPER/BRIGHT, and the artist tricks that worked around colour “bleeding.”"

# ── Блок «Експонат музею» ─────────────────────────────────────────
museum_exhibit:
  in_museum: true
  inventory_id: ""
  note_uk: "На робочій 48-КБ моделі в експозиції ми запускаємо ігри тих років — і attribute clash видно наживо: варто рухомій фігурі перетнути тло іншого кольору, як межа 8×8 «спалахує» чужою барвою."

# ── Розмежувальні примітки ────────────────────────────────────────
disambiguation:
  - uk: "Attribute clash — це обмеження кольору, а не роздільної здатності. Точкова сітка Spectrum — 256×192, доволі детальна; «грубою» була саме колірна сітка 32×24 клітинки. Не плутати брак кольору з браком чіткості."
    en: "Attribute clash is a colour limitation, not a resolution one. The Spectrum’s pixel grid is 256×192 — quite detailed; what was coarse was the 32×24 colour-cell grid. Don’t confuse a lack of colour with a lack of sharpness."

# ── Джерела (ТЗ §12: ≥ 2) ─────────────────────────────────────────
sources:
  - title:
      uk: "Attribute clash — Wikipedia (англ.)"
      en: "Attribute clash — Wikipedia"
    url: "https://en.wikipedia.org/wiki/Attribute_clash"
    accessed: "2026-07-28"
    confidence: "high"
  - title:
      uk: "ZX Spectrum — Wikipedia (англ.)"
      en: "ZX Spectrum — Wikipedia"
    url: "https://en.wikipedia.org/wiki/ZX_Spectrum"
    accessed: "2026-07-28"
    confidence: "high"
  - title:
      uk: "ZX Spectrum BASIC Manual, розділ 16 «Colours» — World of Spectrum"
      en: "ZX Spectrum BASIC Manual, Chapter 16 “Colours” — World of Spectrum"
    url: "https://worldofspectrum.org/ZXBasicManual/zxmanchap16.html"
    accessed: "2026-07-28"
    confidence: "high"
  - title:
      uk: "Sinclair ZX Spectrum 48K — Centre for Computing History"
      en: "Sinclair ZX Spectrum 48K — Centre for Computing History"
    url: "https://www.computinghistory.org.uk/det/424/sinclair-zx-spectrum-48k/"
    accessed: "2026-07-28"
    confidence: "high"

# ── Зображення ─────────────────────────────────────────────────────
images: []

# ── Заклик до дії ─────────────────────────────────────────────────
cta:
  type: "excursion"
  label_uk: "Записатися на екскурсію"
  url: "https://sncmuseum.org/rozklad-ekskursiy"
---

<!-- ════════════ LONGREAD BODY ════════════
     900–1800 words · 5–8 H2 · every technical claim backed by sources[]. -->

## Colours in short supply

In the [architecture piece](/en/history/what-is-inside-z80-ula-48k/) we saw that the ZX Spectrum’s image lives in memory as two blocks: one for which dots are lit, and a separate one for what colour they are. And while the machine spent 6144 bytes on the dots, it spent only 768 on all of the colour. That imbalance produced the platform’s most recognisable visual effect, which went down in history under the name attribute clash — the “bleeding” or “clashing” of colours.

The thesis of this piece: attribute clash is neither a fault nor a programmer’s oversight but a direct consequence of colour costing memory on the Spectrum. Let us look at how that colour is arranged, why shapes “paint” the background around themselves — and how artists turned the limit into a style.

## One byte per 8×8 cell

The Spectrum’s screen is divided into cells of 8×8 dots — 32 across and 24 down. Colour is set not per dot but for a whole such cell: each one gets a single attribute byte.

The eight bits of that byte are split up like this: the three lowest set the “ink” colour (INK) — that is, the lit dots; the next three set the “paper” colour (PAPER), the background; one more bit switches on extra brightness (BRIGHT), and the highest one switches on flashing (FLASH), which periodically swaps ink and paper. These same commands — INK, PAPER, BRIGHT, FLASH — are available to the programmer directly from Sinclair BASIC.

The arithmetic has a simple consequence: within a single 8×8 cell there can be only **two** colours — one ink and one paper. The whole palette is 15 colours: eight base ones (black, blue, red, magenta, green, cyan, yellow, white) at two levels of brightness, with black identical in both, so there are fifteen distinct shades rather than sixteen. There is a further limit: the brightness bit is one per cell, so you cannot combine bright ink with non-bright paper in the same cell — both colours must come either from the “bright” or the “ordinary” half of the palette.

## What attribute clash is

Now picture a moving shape — say, a hero sprite — travelling across the screen over a background of a different colour. The machine can turn the shape’s dots on with single-dot precision: the pixel grid here is detailed. But it changes colour only in whole 8×8 cells. The moment the edge of the shape enters a cell that is mostly background, that entire cell must settle for just two colours between them. The result: either the shape “repaints” a chunk of background in its own colour, or it takes on the colour of the background. Characteristic colour patches appear along the edges and “jump” along with the motion. This is attribute clash.

The cause, as we can see, is purely economic. The colour subsystem was deliberately designed to take up as little memory as possible and to suit text above all rather than moving graphics: for a character that already fits inside an 8×8 cell, two colours are plenty. Games, where sprites fly around the screen, ran into this limit every single frame.

> **Design inheritance.** Attribute clash is the same logic of thrift as the rubber keyboard or the ULA chip: remove the cost where you can do without it. Storing a colour for every dot would mean several times more video memory — and therefore a more expensive machine. The Spectrum chose cheapness and accepted its visual consequences.

## How artists worked around the limit

The interesting part began when programmers stopped fighting the limit and started designing around it. There were several tricks.

The most radical was to give up colour where there is motion. Games like **Knight Lore** drew the action in monochrome: a single pair of colours for the whole play area — and there is simply nowhere for the clash to come from. Visually this gave a recognisable “three-dimensional” black-and-white style.

Another route was to align the graphics to the grid. Artists designed sprites and their paths so that they moved and lined up, as far as possible, along the 8×8 boundaries. Don Priestley went further in his games (**Popeye**, **The Trap Door**): his large, cartoon-like figures deliberately spanned whole cells, so colour did not “leak” onto the background. And the game **Light Force** became famous for achieving full-colour moving graphics almost without clash — at the price of extremely careful design of every screen.

There was also a purely technical trick: to change the colour area of memory at exactly the moments when the television beam is drawing a particular part of the screen. This required tricky code synchronised with the raster scan — the same tight bond of timing and screen we discussed in the [architecture piece](/en/history/what-is-inside-z80-ula-48k/).

## A limit that became a style

Years passed — and it turned out that attribute clash itself had become the Spectrum’s visual signature. Those colour patches, the monochrome worlds of Knight Lore, the large blocky sprites — all of it is recognised today at a glance. What had been an engineering compromise for the sake of price turned, aesthetically, into the character of the platform, one still deliberately imitated by the authors of modern “Spectrum” games.

For the museum this is again the same lesson that runs through the whole Spectrum block: limits do not only spoil — they shape. An artist forced to work with two colours per cell invented solutions they would never have looked for given complete freedom.

## The museum exhibit

Attribute clash is best not described but seen. On the working 48K model in the museum’s exhibition we run games of the period — and the effect is visible live: the moment a moving figure crosses a background of a different colour, the 8×8 cell boundary “flares” with an alien hue. On the tour we show both the clash itself and the tricks used to tame it — so that an abstract limit becomes clear within seconds in front of the screen.

<!-- TODO: given freely licensed games or our own screen recording, add an illustration of the clash (license: museum-own for our own photo/video frame). We do not use screenshots of commercial games (§7.1). -->
