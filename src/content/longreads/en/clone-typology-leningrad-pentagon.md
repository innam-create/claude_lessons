---
# ── Метадані ──────────────────────────────────────────────────────
# EN-переклад. Тіло — англійською; спільні поля збігаються з UA-версією
# (src/content/longreads/clone-typology-leningrad-pentagon.md). Парування UA↔EN —
# за спільним slug (див. src/lib/longreads.ts).
slug: "clone-typology-leningrad-pentagon"
block: "Б"
card_id: "Б2"
title:
  uk: "Каталог клонів: «Ленінград», «Пентагон» і українські збірки"
  en: "A catalogue of clones: Leningrad, Pentagon and Ukrainian builds"
lead:
  uk: "«Клон Spectrum» — не одна машина, а ціле сімейство: від мінімалістичних аматорських плат до заводських моделей із власними доробками. Розкладаємо їх за походженням, способом відтворення ULA й сумісністю."
  en: "A “Spectrum clone” is not one machine but a whole family: from minimalist amateur boards to factory models with their own extensions. We sort them by origin, by how they reproduced the ULA, and by compatibility."
thesis:
  uk: "Пострадянські клони Spectrum утворюють чітку типологію: заводські проти аматорських, прості проти розширених, сумісні з оригіналом проти тих, під чиї власні особливості вже писали окреме ПЗ. Найвідоміші зразки — російські, тоді як колекція музею — про європейські та українські машини."
  en: "The post-Soviet Spectrum clones form a clear typology: factory versus amateur, simple versus extended, compatible with the original versus those whose own quirks software was already written for. The best-known examples are Russian, while the museum’s collection is about European and Ukrainian machines."
confidence: "medium"
reading_time_min: 9
status: "approved"
authors: ["SNC Museum"]
published: "2026-07-28"

# ── SEO ───────────────────────────────────────────────────────────
seo:
  keywords_uk: ["клони Spectrum", "Пентагон комп'ютер", "Ленінград ЕОМ", "Скорпіон ZS-256", "типологія клонів"]
  description_uk: "Типологія клонів ZX Spectrum: заводські й аматорські, «Ленінград», «Пентагон» і «Скорпіон», відтворення ULA на розсипу й БМК, українські збірки в каталозі музею."
  description_en: "A typology of ZX Spectrum clones: factory and amateur, Leningrad, Pentagon and Scorpion, reproducing the ULA in discrete logic and semi-custom chips, and Ukrainian builds."

# ── Блок «Експонат музею» ─────────────────────────────────────────
museum_exhibit:
  in_museum: false
  inventory_id: ""
  note_uk: "У колекції музею — європейські та українські клони (Didaktik, Elwro, Cobra, HC-85, Inves, Robik, Ікар-64, Орель БК-08), описані в каталозі /clones/. Російські еталонні моделі (Ленінград, Пентагон, Скорпіон) у зібранні не представлені."

# ── Розмежувальні примітки ────────────────────────────────────────
disambiguation:
  - "«Сумісний зі Spectrum» не означає «ідентичний». Клони різнилися таймінгом і пам'яттю: у «Пентагона», наприклад, ОЗП без «повільних» зон (non-contended), тож частина радянського ПЗ писалася вже під його таймінг — і на оригінальному Spectrum не працює. Не плутати сумісність із тотожністю."

# ── Джерела (ТЗ §12: ≥ 2) ─────────────────────────────────────────
sources:
  - title:
      uk: "List of ZX Spectrum clones — Wikipedia (англ.)"
      en: "List of ZX Spectrum clones — Wikipedia"
    url: "https://en.wikipedia.org/wiki/List_of_ZX_Spectrum_clones"
    accessed: "2026-07-28"
    confidence: "high"
  - title:
      uk: "Pentagon (computer) — Wikipedia (англ.)"
      en: "Pentagon (computer) — Wikipedia"
    url: "https://en.wikipedia.org/wiki/Pentagon_(computer)"
    accessed: "2026-07-28"
    confidence: "high"
  - title:
      uk: "History of computer hardware in Soviet Bloc countries — Wikipedia (англ.)"
      en: "History of computer hardware in Soviet Bloc countries — Wikipedia"
    url: "https://en.wikipedia.org/wiki/History_of_computer_hardware_in_Soviet_Bloc_countries"
    accessed: "2026-07-28"
    confidence: "high"
  - title:
      uk: "The Story of the Soviet Z80 Processor — The CPU Shack Museum"
      en: "The Story of the Soviet Z80 Processor — The CPU Shack Museum"
    url: "https://www.cpushack.com/2021/01/26/the-story-of-the-soviet-z80-processor/"
    accessed: "2026-07-28"
    confidence: "medium"

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

## Not one clone but a family

In the [previous article](/en/history/spectrum-behind-iron-curtain/) we showed why, behind the Iron Curtain, the Spectrum was rebuilt by hand. Now let us sort the result onto shelves: a “Spectrum clone” is not one machine but a whole family, and the machines in it are very different.

The thesis of this piece: the post-Soviet clones have a clear typology. They can be ordered along three axes — by origin (factory, workshop or kitchen table), by how they reproduced the ULA chip, and by compatibility with the original. Let us make an honest caveat at once: the best-known examples of this typology are Russian, while our museum’s collection is about European and Ukrainian machines. So below we explain the general picture, and the specific exhibits are to be found in the [clones catalogue](/en/clones/).

## By origin: factory, workshop, kitchen

The first axis is who made the machine, and how. At one end of the spectrum are the factory, industrially produced models: the Czechoslovak Didaktik, the Polish Elwro, the Romanian builds. This is serial production with relatively stable quality.

At the other end are the amateur machines, assembled from freely circulating documentation by the users themselves. The classic example is the Pentagon: according to the encyclopaedia, it was manufactured by amateurs, and its board drawings circulated freely from hand to hand. Between these poles is an intermediate type: simple, cheap designs deliberately meant for easy self-assembly. Such was the Leningrad.

## The Leningrad: simplicity as strategy

The Leningrad was a design by Sergey Zonov. The first version came out in 1988 and became the cheapest of the mass-made clones; the machine was deliberately designed to be as simple and compact as possible compared with the alternatives available at the time. The second version appeared in 1991.

This is an important type: a clone whose main value is not its specifications but its minimalism. Fewer chips meant a cheaper board, simpler assembly and a lower barrier for an amateur with a soldering iron. Where others added features, the Leningrad removed everything superfluous — and that is exactly why it spread so widely.

## The Pentagon: a clone that became the standard

The opposite type in philosophy is the Pentagon, an enhanced clone not of the 48K but of the larger Spectrum 128. Its board was copied all over the former USSR roughly between 1991 and 1996, and it became perhaps the most widespread of all.

The Pentagon had a technically interesting trait: its 128 KB of RAM had no “slow” zones — all the memory was non-contended. Recall the [architecture piece](/en/history/what-is-inside-z80-ula-48k/): in the original, the ULA held back the lower 16 KB of RAM, so code there ran slower. The Pentagon removed that compromise — and its timing became different from the original’s. The result is paradoxical: much Soviet software was written for the Pentagon’s timing, so it does not run on a real Spectrum. A clone of a copy turned into a standard in its own right, one the local community aligned to. On top of that, the Pentagon typically had a built-in Beta disk interface with the TR-DOS system in ROM — that is, a disk drive already, not just a cassette.

> **Design inheritance.** Here you can see how local engineering outgrew the original. The Pentagon did not merely copy the Spectrum — it rethought its bottleneck (contended memory) and became a platform of its own with its own library. A copy that began to set the rules.

## The Scorpion and the advanced edge

Further still in capability stood the Scorpion ZS-256, produced in St. Petersburg. Its memory ranged from 256 up to 1024 KB, and the ROM contained a built-in debugger, the Shadow Service Monitor, invoked by a dedicated button (NMI). Optionally it was fitted with a ProfROM carrying extra software — a clock, hard-disk utilities, a text editor.

The Scorpion shows the upper, almost “professional” edge of the typology: when a clone no longer simply repeats an 8-bit toy but becomes a full working tool with disks and system software.

## Reproducing the ULA: from discrete logic to semi-custom chips

The second technical axis is what replaced the original ULA, which was not on the market. The simplest route was to assemble its functions from standard logic chips. Such fully “discrete” designs existed (for instance, machines built entirely around series-74 chips) — at the cost of dozens of packages on the board.

In time a more compact option appeared. When production of Soviet Z80-compatible processors ramped up in the early 1990s, specialised gate-array chips (BMK) were made alongside them — folding that same logic back into a few packages, reducing the “sprawl” in a minimal configuration to about a dozen chips. So the typology of clones is also an evolution: from bulky discrete-logic boards to ever more integrated solutions.

> **What we are checking.** We verify the attribution of specific Ukrainian builds — who made them, where and when, from which schematics — with particular care: in public sources the dates and details differ. So in this overview we do not fix the exact years of individual machines, but present each one with notes on certainty in the [clones catalogue](/en/clones/). If you have documents or photographs of boards — write to the museum.

## What is in the museum’s collection

Our museum’s holdings illustrate not the Russian but the European and Ukrainian edge of this typology. In the [clones catalogue](/en/clones/) are the Czechoslovak Didaktik Gama and Didaktik M, the Polish Elwro 800 Junior, the Spanish Inves, the Romanian Cobra and HC-85, and the Ukrainian machines: the Robik, the Ikar-64 and the Orel BK-08 — each with a photograph and sources. The Russian reference models discussed above are not in the collection, so we deliberately do not pass off others’ exhibits as our own.

Later in this block: the infrastructure that fed this whole family — the radio market, where boards, memory and cassettes were bought, and the culture of self-assembly, when a clone was, quite literally, born on a kitchen table.
