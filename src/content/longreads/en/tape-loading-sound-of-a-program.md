---
# ── Метадані ──────────────────────────────────────────────────────
# EN-переклад. Тіло — англійською; спільні поля збігаються з UA-версією
# (src/content/longreads/tape-loading-sound-of-a-program.md).
# Парування UA↔EN — за спільним slug (див. src/lib/longreads.ts).
slug: "tape-loading-sound-of-a-program"
block: "В"
card_id: "В9"
title:
  uk: "Звук завантаження: як касета ставала програмою"
  en: "The sound of loading: how a cassette became a program"
lead:
  uk: "Скрегіт і писк із побутового магнітофона, кольорові смуги на рамці екрана й фінальне «R Tape loading error» — так виглядало й звучало завантаження гри на ZX Spectrum. Розбираємо, як звук на касеті ставав програмою в пам'яті."
  en: "A screech and a squeal from a home tape recorder, coloured stripes on the screen border and the final “R Tape loading error” — that is how loading a game on the ZX Spectrum looked and sounded. We unpack how sound on a cassette became a program in memory."
thesis:
  uk: "Касетне завантаження Spectrum — це не метафора, а буквальне аудіокодування: дані записані як послідовність імпульсів різної довжини, і той самий чип ULA, що малює екран, перетворює цей звук на біти, показуючи свою роботу смугами на рамці."
  en: "Cassette loading on the Spectrum is not a metaphor but literal audio encoding: the data is recorded as a sequence of pulses of different lengths, and the same ULA chip that draws the screen turns that sound into bits, showing its work as stripes on the border."
confidence: "medium"
reading_time_min: 9
status: "draft"
authors: ["SNC Museum"]
published: null

# ── SEO ───────────────────────────────────────────────────────────
seo:
  keywords_uk: ["завантаження з касети", "Spectrum tape loading", "турбозавантажувач", "R Tape loading error", "тон-лідер"]
  description_uk: "Як ZX Spectrum завантажував програми з касети: тон-лідер, блоки заголовка й даних, смуги на рамці, помилка R Tape loading error і турбозавантажувачі."
  description_en: "How the ZX Spectrum loaded programs from cassette: the pilot tone, header and data blocks, border stripes, the R Tape loading error and turbo loaders."

# ── Блок «Експонат музею» ─────────────────────────────────────────
museum_exhibit:
  in_museum: false
  inventory_id: ""
  note_uk: ""
  note_en: ""

# ── Розмежувальні примітки ────────────────────────────────────────
disambiguation:
  - uk: "Кольорові смуги на рамці під час завантаження — не заставка й не «прикраса», а пряма візуалізація сигналу, який ULA зчитує з касети. Якщо смуг немає, а гра все одно вантажиться, — це майже завжди ознака турбозавантажувача, який працює інакше за стандартну підпрограму ПЗП."
    en: "The coloured stripes on the border during loading are not a splash screen or “decoration” but a direct visualisation of the signal the ULA reads from the cassette. If there are no stripes and the game still loads, it is almost always a sign of a turbo loader, which works differently from the standard ROM routine."

# ── Джерела (ТЗ §12: ≥ 2) ─────────────────────────────────────────
sources:
  - title:
      uk: "Spectrum tape interface — Sinclair Wiki (zxnet.co.uk)"
      en: "Spectrum tape interface — Sinclair Wiki (zxnet.co.uk)"
    url: "https://sinclair.wiki.zxnet.co.uk/wiki/Spectrum_tape_interface"
    accessed: "2026-07-30"
    confidence: "high"
  - title:
      uk: "TZX format — World of Spectrum (опис формату стрічкових блоків)"
      en: "TZX format — World of Spectrum (tape block format)"
    url: "https://worldofspectrum.net/zx-modules/fileformats/tzxformat.html"
    accessed: "2026-07-30"
    confidence: "high"
  - title:
      uk: "Speedlock — Wikipedia (англ.), система захисту й швидкого завантаження"
      en: "Speedlock — Wikipedia"
    url: "https://en.wikipedia.org/wiki/Speedlock"
    accessed: "2026-07-30"
    confidence: "high"
  - title:
      uk: "Spectrum loading (серія Cilla) — Shredzone"
      en: "Spectrum loading (Cilla series) — Shredzone"
    url: "https://shred.zone/cilla/story/440/spectrum-loading.html"
    accessed: "2026-07-30"
    confidence: "medium"
  - title:
      uk: "Old school tape loading — atomic14"
      en: "Old school tape loading — atomic14"
    url: "https://www.atomic14.com/2024/11/24/old-school-tape-loading"
    accessed: "2026-07-30"
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

## A ritual that began with a sound

Before you could start a game on the ZX Spectrum, you had to hear it. A cassette with the program was put into an ordinary home tape recorder — the same one you listened to music on at home — its audio output was connected to the computer’s input, you typed the load command and pressed “Play”. Then a characteristic harsh squeal came from the speaker, the screen border filled with coloured stripes, and after a minute or two (and sometimes much longer) the picture either came alive as a game or broke off in a dry line: **`R Tape loading error`**.

The main thesis of this piece is simple, but easy to miss: cassette loading on the Spectrum is not a metaphor and not “digitisation”. The data on the tape is literally recorded as sound, and that sound is turned into bits by the very ULA chip that draws the image on the screen. The coloured stripes on the border are not a splash screen but the visible work of that chip. To understand the ritual, let us first deal with the technology.

## How sound encodes data

Magnetic tape can store just one thing — the variation of signal level over time. To record zeros and ones on it, the Spectrum uses pulse length. The unit of measure here is not the second but the processor clock tick (T-state): at 3.5 MHz one tick lasts about 0.3 microseconds.

By the description of the format, a “0” is encoded by two pulses of 855 ticks each, and a “1” by two pulses of 1710 ticks — that is, twice as long. The loading routine does not “listen” to the absolute signal level — it measures the time between transitions and decides whether a pulse is short or long. That is exactly why loading is so sensitive to recording quality: if the tape recorder’s speed “drifts” a little, the pulse lengths are distorted and the machine begins to read ones instead of zeros.

Because of this encoding, the transfer rate is not constant: a stream of all ones goes more slowly than a stream of zeros, because the ones are “longer”. The effective rate of the standard loader varies roughly between one and two thousand baud depending on the data; the approximate nominal figure usually cited for the Spectrum is around fifteen hundred baud. That is slow: a large game could take several minutes to load.

## Pilot tone, synchronisation and blocks

You cannot simply switch on the data in the middle of the tape — the recorder does not start instantly, and the machine needs to “catch” the rhythm of the signal. So every recording begins with a **pilot tone**: a steady tone of pulses of 2168 ticks. It lasts a noticeable stretch — the standard routine waits for the leader for at least several hundred milliseconds before moving on. For a header the leader is longer (about 8063 pulses), for a data block shorter (about 3223).

After the leader come two **sync pulses** (667 and 735 ticks) — shorter than the leader pulses, marking: what follows is the data proper. Every block on the tape begins with a marker byte (`0x00` for a header, `0xFF` for data) and ends with a checksum byte. This “check sum” is in fact not a sum but a bitwise XOR of all the block’s bytes: if at the end the XOR computed by the machine does not match the one recorded on the tape, the block is considered corrupted.

The data was recorded in pairs of blocks: first a short **header** (the program name, type, length, address), then a long **data** block. It was the header that let the Spectrum print the familiar `Program: NAME` on screen and start loading the body. There is more on how this data was then laid into the machine’s memory in the piece [“What’s inside: the Z80, the ULA and the magic of 48 kilobytes”](/en/history/what-is-inside-z80-ula-48k/).

## Stripes on the border: a signal made visible

The most recognisable part of the ritual is the coloured stripes on the screen border. They arise not because someone drew a “loading indicator”. It is more prosaic: the ULA, as it reads the signal from the cassette, simultaneously sets the border colour according to the level currently at the input. Because the border is the zone the ULA is responsible for, changes in the signal are instantly reflected as a change of colour.

Because of this the stripes have a recognisable structure. During the pilot tone the border flashes **red-and-cyan** — a steady tone gives a steady, calm pattern. When the data stream begins, the colours change to **blue-and-yellow**, and the pattern becomes uneven, “ragged” — because now the pulse lengths differ. An experienced user could tell by the look and sound of the stripes whether loading was going normally or the signal was “noisy”.

> **Design inheritance.** Since it was the ULA that was responsible for reading the cassette, clones that reproduced its functions in discrete logic rather than the proprietary chip could have slightly different input thresholds and timings. In practice this meant that a cassette recorded on one machine did not always read cleanly on another — a separate reason why “clean” master copies were so prized in the communities.

## “R Tape loading error”: why it broke off

The line `R Tape loading error` became iconic precisely because it appeared often and almost always — annoyingly. It is the standard message that the loading routine could not read a block correctly. The general mechanism is clear: the machine either timed out without receiving the next expected pulse, or read the block to the end but the computed XOR did not match the checksum byte. Either way the result is the same — the block is discarded and loading stops.

The causes at the everyday level were various: the wrong volume level, a skewed tone setting, a dirty magnetic head, a stretched or over-recorded tape, the speed “drift” of a cheap recorder. Hence the folk ritual — turning the volume and tone knobs, looking for “that” position at which the border stripes became crisp and the game finally loaded.

> **What we are checking.** The exact conditions under which the ROM gives precisely the letter `R` rather than another code are described with nuances that differ between sources, so we deliberately present the mechanism in general terms (a timeout or a checksum mismatch). If you have a documented layout of the loader’s error codes, or your own recollections of typical failures on specific recorders — write to the museum: we will refine this section.

## Turbo loaders: faster and “under lock”

The standard ROM loader was reliable but slow and the same for everyone — and therefore easily copied. So publishers began replacing it with their own **turbo loaders** (custom loaders): routines that used shorter pulses and denser encoding to read the same game noticeably faster. The price was an even greater sensitivity to tape quality.

The best-known example is the **Speedlock** system. By the available data, it was written by David Aubrey-Jones and David Looker back in 1983, and its first commercial use was the game *Daley Thompson’s Decathlon* by Ocean in late 1984. The fast versions of Speedlock loaded a game about one and a half times faster than the standard and at the same time served as copy protection: the system relied on quirks of the Z80 (such as the memory-refresh register), and its later versions were recognisable in that the loading screen appeared suddenly, **with no coloured stripes on the border**, often with a countdown timer. The disappearance of the stripes here is no accident: a turbo loader did not have to “light up” every pulse the way the ROM did — it managed the border at its own discretion.

It was turbo loaders and protection schemes that made cassette copying a craft of its own, and their “cracking” a whole subculture. But that is already the subject of the games library and pirated compilations, which we will return to separately; the programs that loaded from such cassettes we are gradually describing in the [software catalogue](/en/software/).

## What is left of the sound

Today cassette loading seems an inconvenient relic — and so it was. But behind that inconvenience lay an elegant engineering idea: to do without any special storage device at all, relying on equipment that already stood in every home. A tape recorder, an audio cable, a few routines in ROM — and an everyday tape became a carrier of programs.

For the museum this sound is an exhibit in itself. It captures a whole layer of everyday culture: the waiting, the tweaking of the volume, the anxiety before the final error line. That is why, alongside the machine, we plan to show the loading chain itself — the tape recorder and the cassette — and later to add a short audio clip to the site, so that a visitor can hear exactly how a program sounded before it became a game.

> **Not to be confused.** The presence of coloured stripes on the border is a sign of the standard ROM loader. Their absence during working loading does not mean a fault: it is almost always a turbo loader that manages the border differently.
