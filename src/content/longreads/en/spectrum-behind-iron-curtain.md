---
# ── Метадані ──────────────────────────────────────────────────────
# EN-переклад. Тіло — англійською; спільні поля збігаються з UA-версією
# (src/content/longreads/spectrum-behind-iron-curtain.md). Парування UA↔EN —
# за спільним slug (див. src/lib/longreads.ts).
slug: "spectrum-behind-iron-curtain"
block: "Б"
card_id: "Б1"
title:
  uk: "Spectrum за залізною завісою: як клони прийшли в Україну"
  en: "The Spectrum behind the Iron Curtain: how clones came to Ukraine"
lead:
  uk: "На Заході Spectrum здешевлювали замовним чипом і масовим конвеєром. За залізною завісою його ціну збивали інакше — реверс-інжинірингом, дискретною логікою й самозбіркою. Розбираємо, чому саме Spectrum став народним комп'ютером тут."
  en: "In the West the Spectrum was made cheap by a custom chip and mass production. Behind the Iron Curtain its price was driven down differently — by reverse-engineering, discrete logic and self-assembly. We look at why the Spectrum, of all machines, became the people’s computer here."
thesis:
  uk: "Spectrum став масовим у пострадянському просторі не попри залізну завісу, а завдяки їй: ембарго відрізало офіційний імпорт, а відносно проста й добре зрозуміла архітектура машини дала змогу відтворювати її з доступних деталей — спершу в лабораторіях, згодом на кухнях."
  en: "The Spectrum went mass-market in the post-Soviet space not despite the Iron Curtain but because of it: the embargo cut off official imports, while the machine’s relatively simple, well-understood architecture allowed it to be rebuilt from available parts — first in laboratories, later on kitchen tables."
confidence: "medium"
reading_time_min: 9
status: "approved"
authors: ["SNC Museum"]
published: "2026-07-28"

# ── SEO ───────────────────────────────────────────────────────────
seo:
  keywords_uk: ["клони ZX Spectrum", "Spectrum Україна", "радянські клони", "COCOM", "історія комп'ютерів Україна"]
  description_uk: "Чому ZX Spectrum став народним комп'ютером у пострадянській Україні: ембарго COCOM, реверс-інжиніринг 1985 року, клони на дискретній логіці й радянський Z80."
  description_en: "Why the ZX Spectrum became the people’s computer in post-Soviet Ukraine: the CoCom embargo, the 1985 reverse-engineering, clones in discrete logic and the Soviet Z80."

# ── Блок «Експонат музею» ─────────────────────────────────────────
museum_exhibit:
  in_museum: false
  inventory_id: ""
  note_uk: "Українські клони (Robik, Ікар-64, Орель БК-08) — у колекції музею, описані в каталозі /clones/. У постійній експозиції наразі фізично не представлені."

# ── Розмежувальні примітки ────────────────────────────────────────
disambiguation:
  - uk: "«Клон» у цьому тексті — несанкціонована копія Spectrum, зібрана без ліцензії Sinclair (часто на розсипу дискретної логіки). Не плутати з офіційними ліцензійними варіантами на кшталт Timex — ті виходили за угодою й із фірмовими чипами. Обидва типи описані в каталозі клонів, але це різні речі."
    en: "A “clone” in this text is an unlicensed copy of the Spectrum, built without a Sinclair licence (often from discrete logic). Don’t confuse it with official licensed variants such as the Timex — those were made under agreement and with proprietary chips. Both types appear in the clone catalogue, but they are different things."

# ── Джерела (ТЗ §12: ≥ 2) ─────────────────────────────────────────
sources:
  - title:
      uk: "History of computer hardware in Soviet Bloc countries — Wikipedia (англ.)"
      en: "History of computer hardware in Soviet Bloc countries — Wikipedia"
    url: "https://en.wikipedia.org/wiki/History_of_computer_hardware_in_Soviet_Bloc_countries"
    accessed: "2026-07-28"
    confidence: "high"
  - title:
      uk: "List of ZX Spectrum clones — Wikipedia (англ.)"
      en: "List of ZX Spectrum clones — Wikipedia"
    url: "https://en.wikipedia.org/wiki/List_of_ZX_Spectrum_clones"
    accessed: "2026-07-28"
    confidence: "high"
  - title:
      uk: "The Story of the Soviet Z80 Processor — The CPU Shack Museum"
      en: "The Story of the Soviet Z80 Processor — The CPU Shack Museum"
    url: "https://www.cpushack.com/2021/01/26/the-story-of-the-soviet-z80-processor/"
    accessed: "2026-07-28"
    confidence: "medium"
  - title:
      uk: "ZX Spectrum — Wikipedia (англ.)"
      en: "ZX Spectrum — Wikipedia"
    url: "https://en.wikipedia.org/wiki/ZX_Spectrum"
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

## Two economies of one machine

In the first article we showed that in the West the [Spectrum was made cheap by a custom chip and mass production](/en/history/sinclair-price-of-a-television/). In the post-Soviet space the same goal — making a computer affordable — was reached by the opposite route: not by the scale of a factory, but by the ingenuity of individual engineers and amateurs. The result was the same — the Spectrum became a people’s machine — but the road to it ran quite differently.

The thesis of this piece: the Spectrum went mass-market here not despite the Iron Curtain but, to a large degree, because of it. Buying a Western computer officially was all but impossible — and that is exactly why reverse-engineering, an available component base and a “do-it-yourself” culture came into play.

## Why clones at all: the CoCom embargo

The key reason was the CoCom trade embargo, which restricted the sale of Western computers and microelectronics to the Eastern Bloc. Because of it, importing machines from the West on any noticeable scale was impossible, so Eastern Bloc manufacturers created copies of Western designs — based on intelligence gathering and reverse engineering.

In this situation the Spectrum was well placed for several reasons at once. Its architecture was relatively simple and well understood — the very thing we examined in the [piece on the Z80 and the ULA](/en/history/what-is-inside-z80-ula-48k/). The machine could be rebuilt from parts that could, one way or another, be obtained. And although copying Western designs was a Union-wide phenomenon, one specific milestone matters for us: according to the encyclopaedia, as early as 1985 Ukrainian researchers reverse-engineered the Spectrum chip and built a hardware clone from readily available parts.

## The main obstacle: a chip that was not there

The hardest part for any cloner was not the processor but the custom ULA chip. Recall that in the Spectrum it was the ULA that took on video, sound, the keyboard and input/output. The original ULA was made by Ferranti of Britain — and “getting hold of” it on the post-Soviet market was impossible.

So the clones took a detour: they reproduced the ULA’s functions with a set of ordinary logic chips. This is the same design logic in reverse — where Sinclair folded dozens of chips into one, the cloners unfolded that one chip back into dozens. The price was different timing and small incompatibilities, because of which some games sensitive to exact timing behaved on clones not quite as on the original.

> **Design inheritance.** Here you can see clearly how Sinclair’s engineering decision shaped the fate of the platform thousands of kilometres away. The custom ULA, devised to cut costs on a British production line, became the main technical challenge for a Ukrainian amateur — and at the same time a spur to their own engineering creativity out of a handful of logic chips.

## The processor: imports and analogues

The second key component was the Z80 processor itself. At first it had to be imported (often semi-legally), and it was precisely the shortage of processors that held back scale. Analogues also helped: for instance the East German Z80 clone, the U880, which turns up in some Ukrainian builds too (the Orel BK-08 could be fitted with the UA880A version).

At the turn of the decade, in the late 1980s and early 1990s, Z80-compatible chips became more available, and this removed the main bottleneck. It is the early 1990s that saw the most active wave of self-assembly.

## The landscape of clones: the Ukrainian machines

Against this background, dozens of different clones appeared across the whole post-Soviet space — researchers count over fifty versions. But what interests us above all is the Ukrainian part of this landscape: the machines that were designed and built in Ukraine.

Our museum’s catalogue describes, in particular, the Robik (Cherkasy), the Ikar-64 (Kharkiv) and the Orel BK-08 (Dnipro) — each with photographs and sources. We deliberately do not give their exact dates and details here: in public sources the years of individual Ukrainian builds differ, so it is more honest to treat each machine separately, in the [clones catalogue](/en/clones/), where the attribution comes with notes on the level of certainty.

> **What we are checking.** The most delicate part of this topic is the local specifics: who soldered a given machine, where and when, from which schematics, and where they got the parts. Forums and recollections are not a sufficient source here. If you have documents, photographs of boards or schematics from the magazines of those years — send them to the museum: it is from such evidence that a verified history of the Ukrainian Spectrum is built.

## Clones in the museum’s collection

The post-Soviet clones are not a side branch but a distinct, very Ukrainian page in the Spectrum’s history — and it is the core of our collection. The Ukrainian machines — the Robik, the Ikar-64, the Orel BK-08 — are kept in the museum and documented in the [clones catalogue](/en/clones/); they are not currently on physical display in the permanent exhibition, but it is around them that our story of how a global platform became a local one is built.

Later in this block, in more detail: the individual Ukrainian machines, such as the Kharkiv-made Ikar-64; the radio market as the infrastructure of the parts-and-cassettes trade; and the culture of self-assembly, when a computer was, quite literally, soldered together on a kitchen table.
