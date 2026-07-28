---
# ── Метадані ──────────────────────────────────────────────────────
# EN-переклад. Тіло — англійською; спільні поля збігаються з UA-версією
# (src/content/longreads/what-is-inside-z80-ula-48k.md). Парування UA↔EN —
# за спільним slug (див. src/lib/longreads.ts).
slug: "what-is-inside-z80-ula-48k"
block: "А"
card_id: "A2"
title:
  uk: "Що всередині: Z80, ULA і магія 48 кілобайт"
  en: "What’s inside: the Z80, the ULA and the magic of 48 kilobytes"
lead:
  uk: "Під клиноподібним корпусом ZX Spectrum — лише кілька мікросхем: процесор Z80, 16 КБ ПЗП і 48 КБ ОЗП. Розбираємо, як ці частини ділять один адресний простір і чому пам'ять машини «не рівна»."
  en: "Under the ZX Spectrum’s wedge case sit only a handful of chips: a Z80 processor, 16 KB of ROM and 48 KB of RAM. We look at how they share a single address space — and why the machine’s memory is not “flat”."
thesis:
  uk: "Продуктивність Spectrum визначає не тактова частота, а те, як процесор і чип ULA ділять пам'ять: нижні 16 КБ ОЗП, де лежить екран, ULA притримує для себе, тож код у цій зоні виконується повільніше за код у «вільних» верхніх 32 КБ."
  en: "The Spectrum’s performance is set less by clock speed than by how the CPU and the ULA share memory: the ULA reserves the lower 16 KB of RAM, where the screen lives, so code there runs slower than code in the “free” upper 32 KB."
confidence: "medium"
reading_time_min: 9
status: "approved"
authors: ["SNC Museum"]
published: "2026-07-28"

# ── SEO ───────────────────────────────────────────────────────────
seo:
  keywords_uk: ["архітектура ZX Spectrum", "Z80", "ULA", "мапа пам'яті Spectrum", "contended memory", "48 кілобайт"]
  description_uk: "Як влаштований ZX Spectrum: процесор Z80 @ 3,5 МГц, 16 КБ ПЗП, 48 КБ ОЗП і чип ULA. Мапа пам'яті, екранний файл і чому нижня ОЗП повільніша."
  description_en: "How the ZX Spectrum works inside: a Z80 at 3.5 MHz, 16 KB ROM, 48 KB RAM and the ULA. The memory map, the screen file and why the lower RAM is slower."

# ── Блок «Експонат музею» ─────────────────────────────────────────
museum_exhibit:
  in_museum: true
  inventory_id: ""
  note_uk: "Базова 48-КБ модель у постійній експозиції — та сама машина, на платі якої видно всі описані тут вузли: процесор Z80, мікросхеми пам'яті та єдиний чип ULA."

# ── Розмежувальні примітки ────────────────────────────────────────
disambiguation:
  - "«48 кілобайт» — це обсяг ОЗП, а не всієї пам'яті. Процесор Z80 бачить 64 КБ адрес: 16 КБ ПЗП унизу плюс 48 КБ ОЗП. Не плутати обсяг ОЗП із адресним простором."

# ── Джерела (ТЗ §12: ≥ 2) ─────────────────────────────────────────
sources:
  - title:
      uk: "ZX Spectrum — Wikipedia (англ.)"
      en: "ZX Spectrum — Wikipedia"
    url: "https://en.wikipedia.org/wiki/ZX_Spectrum"
    accessed: "2026-07-28"
    confidence: "high"
  - title:
      uk: "Contended memory — Wikipedia (англ.)"
      en: "Contended memory — Wikipedia"
    url: "https://en.wikipedia.org/wiki/Contended_memory"
    accessed: "2026-07-28"
    confidence: "high"
  - title:
      uk: "Sinclair ZX Spectrum 48K — Centre for Computing History"
      en: "Sinclair ZX Spectrum 48K — Centre for Computing History"
    url: "https://www.computinghistory.org.uk/det/424/sinclair-zx-spectrum-48k/"
    accessed: "2026-07-28"
    confidence: "high"
  - title:
      uk: "Chris Smith. The ZX Spectrum ULA: How to Design a Microcomputer (2010)"
      en: "Chris Smith. The ZX Spectrum ULA: How to Design a Microcomputer (2010)"
    url: "https://books.google.com/books/about/The_ZX_Spectrum_ULA.html?id=IMPTcQAACAAJ"
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

## A handful of chips that have to be introduced

In the [previous article](/en/history/sinclair-price-of-a-television/) we showed how the ZX Spectrum became cheap through a radical simplification of its circuitry. Now let us lift the lid and see what that simplification produced as an engineering design. There are only a few players on stage: a Zilog Z80A processor running at 3.5 MHz, 16 KB of read-only memory (ROM) holding Sinclair BASIC, up to 48 KB of random-access memory (RAM), and a custom ULA chip that does everything the processor does not.

The thesis of this piece: the Spectrum’s speed is set less by its clock rate than by the way the Z80 and the ULA share memory between them. To see why, we first need to look at how those 64 kilobytes are laid out.

## The 64 kilobytes the processor sees

The Z80 addresses exactly 64 KB of memory — the physical limit of its 16-bit address bus. In the 48K Spectrum this space is used in full, with no bank switching at all: the bottom 16 KB is ROM, and everything above it is RAM.

The layout is simple. Addresses 0 to 16383 (in hexadecimal, `0000`–`3FFF`) hold the ROM: the Sinclair BASIC interpreter and the system routines that start the moment you switch the machine on. From address 16384 (`4000`) upwards runs the 48 KB of RAM. Here lies the first thing worth pinning down: **“48 kilobytes” is the amount of RAM, not the machine’s whole memory.** 16 KB of ROM plus 48 KB of RAM make up the 64 KB of the Z80’s address space.

The smaller 16K model differed from the larger one only in the amount of RAM — everything else on the board was identical. That is why we keep talking about the 48K version: it shows the architecture in full.

## The ULA: a second “processor” you never see

Beside the Z80 on the board sits a chip that neither counts nor runs programs, yet without which the Spectrum does not work — the ULA (Uncommitted Logic Array). It is a custom chip that Ferranti of Britain manufactured for Sinclair; its inner workings are documented in detail in Chris Smith’s specialist study, *The ZX Spectrum ULA*.

Functionally, the ULA is “everything else” of the computer packed into a single die. It generates the video signal for the television, scans the keyboard, drives cassette input and output, the sound beeper and the colour of the screen border. Where pricier machines would carry dozens of separate ICs, the Spectrum runs one chip — and that is exactly why the machine cost what it cost.

> **Design inheritance.** A custom ULA could not be “picked up at the radio market.” So the post-Soviet and Ukrainian clones, assembled without access to the original chip, reproduced its functions with a set of ordinary discrete-logic ICs. As a result they often had different timing from the original — and some games sensitive to exact timing behaved on the clones not quite as their authors intended.

## Why the memory “quarrels”: contended and uncontended

Now for the heart of it. To paint the picture on screen, the ULA must read the contents of the screen memory fifty times a second. And the screen memory lives in RAM — the very same array the processor also wants to use. Two devices cannot read one memory chip at the same instant, so the designers gave the ULA priority: when it needs the memory to draw a line of the screen, the processor waits.

But it does not always wait. This “queue” applies only to the lower 16 KB of RAM — addresses `4000` to `7FFF`, where the screen sits. This zone is called **contended**: the ULA holds back access to it. The upper 32 KB (from address `8000` up) is **uncontended**: the ULA never touches it, so the processor runs there at full speed with no delays.

The effect appears only while the ULA is actually drawing the image. While the beam is over the border, or the television is in horizontal or vertical retrace, the ULA does not access memory — and there are no delays. In practice this meant something odd to a newcomer: the same code ran faster if you placed it in the upper 32 KB and slower in the lower 16 KB. Experienced programmers learned to keep speed-critical routines away from the screen zone.

## A screen wired into memory

It is worth a separate look at how that “expensive” lower RAM is arranged. The Spectrum’s image is 256×192 dots. The data for them lives in memory in two separate blocks, right at the start of the RAM.

The first block is the **display file**: addresses 16384–22527, exactly 6144 bytes. It stores which dot is lit and which is not — but without colour. Colour lives in the second block, the **attribute file**: addresses 22528–23295, another 768 bytes. Together that is 6912 bytes for the whole picture.

The reason for the split is, again, saving memory. Colour is set not per dot but per 8×8 block of dots: each such block gets one attribute byte encoding the “ink” colour (INK), the “paper” colour (PAPER), extra brightness (BRIGHT) and flashing (FLASH). The whole palette is 15 colours: seven saturated ones at two brightness levels plus black. That is eight times less data than storing colour per dot — but the price is known: within a single 8×8 block you cannot have more than two colours. This is the origin of the characteristic colour “clash” at the edges of sprites (attribute clash), which became the platform’s visual signature. That is a large topic of its own — we will devote the next article in this block to it.

## The magic of 48 kilobytes

Let us put it all together. The Spectrum is not a “weak processor” but a carefully balanced design in which a single ULA chip takes on video and input/output, while all the memory is squeezed into 64 KB of addresses with no banking whatsoever. The 48 kilobytes of RAM here are not just a marketing figure: they are exactly enough to hold the screen, the system variables, the interpreter at work and — above all — the user’s own program, with enough headroom for the games and serious applications of its day.

The price of this was unevenness: the lower part of memory is slower, colour is scarce, timing is tied to the television beam. But for a machine costing £175 that was a fair equation. And — importantly for the museum — this architecture became the template that dozens of clones would later reproduce, now without the original ULA, in discrete logic, with all the errors such copying entails. More on that in the articles of the clones block.

## The museum exhibit

In the museum’s permanent exhibition stands a basic 48K ZX Spectrum. It is the very machine whose parts we have just examined: under the lid, on the board, the Z80 processor sits alongside the RAM chips and the single ULA that stands in for dozens of separate components. On the tour we show how these few chips together make a full home computer.

<!-- TODO photo capture: macro shot of the 48K board with the Z80, RAM and ULA labelled. Add to images[] with license: museum-own once shot. -->
