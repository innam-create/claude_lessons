---
# ── Метадані ──────────────────────────────────────────────────────
# EN-переклад. Тіло — англійською; спільні поля збігаються з UA-версією
# (src/content/longreads/beeper-music-one-channel-many-notes.md).
# Парування UA↔EN — за спільним slug (див. src/lib/longreads.ts).
slug: "beeper-music-one-channel-many-notes"
block: "В"
card_id: "В11"
title:
  uk: "Один канал, багато нот: музика на біпері"
  en: "One channel, many notes: music on the beeper"
lead:
  uk: "У 48K ZX Spectrum не було звукового чипа — лише крихітний динамік, яким керує один-єдиний біт. І все ж із цієї «пищалки» програмісти витискали багатоголосі мелодії. Розбираємо, як звучав біпер і що змінив чип AY у моделях 128K."
  en: "The 48K ZX Spectrum had no sound chip — just a tiny speaker driven by a single bit. Yet programmers squeezed multi-voice melodies out of this “beeper”. We unpack how the beeper sounded and what the AY chip changed in the 128K models."
thesis:
  uk: "«Багатоголосся» на 48K Spectrum — не апаратна властивість, а програмний трюк: процесор так швидко перемикає один біт динаміка, що вухо чує кілька нот одразу. Справжні окремі канали з'явилися лише в 128K із чипом AY-3-8912."
  en: "Polyphony on the 48K Spectrum is not a hardware feature but a software trick: the CPU toggles the speaker's single bit so fast that the ear hears several notes at once. Real separate channels arrived only in the 128K with the AY-3-8912 chip."
confidence: "medium"
reading_time_min: 9
status: "draft"
authors: ["SNC Museum"]
published: null

# ── SEO ───────────────────────────────────────────────────────────
seo:
  keywords_uk: ["музика ZX Spectrum", "beeper", "AY chip", "1-бітна музика", "AY-3-8912"]
  description_uk: "Як 48K ZX Spectrum грав музику одним бітом біпера, звідки бралося «багатоголосся» і що додав звуковий чип AY-3-8912 у моделях 128K."
  description_en: "How the 48K ZX Spectrum played music with a single beeper bit, where its “polyphony” came from, and what the AY-3-8912 sound chip added in the 128K models."

# ── Блок «Експонат музею» ─────────────────────────────────────────
museum_exhibit:
  in_museum: false
  inventory_id: ""
  note_uk: ""
  note_en: ""

# ── Розмежувальні примітки ────────────────────────────────────────
disambiguation:
  - uk: "48K Spectrum не має окремого звукового чипа: звук дає 1-бітний біпер, яким керує ULA через порт вводу-виводу. Чип AY-3-8912 із трьома каналами з'явився лише в моделях 128K/+2/+3. Тому «багатоголосся» на 48K — це програмний трюк (надшвидке перемикання одного біта), а не апаратні канали."
    en: "The 48K Spectrum has no dedicated sound chip: audio comes from a 1-bit beeper driven by the ULA through an I/O port. The three-channel AY-3-8912 chip appeared only in the 128K/+2/+3 models. So polyphony on the 48K is a software trick (ultra-fast toggling of a single bit), not hardware channels."

# ── Джерела (ТЗ §12: ≥ 2) ─────────────────────────────────────────
sources:
  - title:
      uk: "ZX Spectrum — Wikipedia (розділ про звук: біпер, десять октав, AY у 128K)"
      en: "ZX Spectrum — Wikipedia (sound section: beeper, ten octaves, AY in 128K)"
    url: "https://en.wikipedia.org/wiki/ZX_Spectrum"
    accessed: "2026-07-31"
    confidence: "high"
  - title:
      uk: "General Instrument AY-3-8910 / AY-3-8912 — Wikipedia (3 канали, 28-пінований корпус, ZX Spectrum 128)"
      en: "General Instrument AY-3-8910 / AY-3-8912 — Wikipedia (3 channels, 28-pin package, ZX Spectrum 128)"
    url: "https://en.wikipedia.org/wiki/General_Instrument_AY-3-8910"
    accessed: "2026-07-31"
    confidence: "high"
  - title:
      uk: "The Sound of 1-bit: Technical Constraint as a Driver for Musical Creativity on the 48k Sinclair ZX Spectrum — G|A|M|E Journal"
      en: "The Sound of 1-bit: Technical Constraint as a Driver for Musical Creativity on the 48k Sinclair ZX Spectrum — G|A|M|E Journal"
    url: "https://www.gamejournal.it/the-sound-of-1-bit-technical-constraint-as-a-driver-for-musical-creativity-on-the-48k-sinclair-zx-spectrum/"
    accessed: "2026-07-31"
    confidence: "medium"
  - title:
      uk: "The 1-Bit Instrument: The Fundamentals of 1-Bit Synthesis — Journal of Sound and Music in Games (UC Press)"
      en: "The 1-Bit Instrument: The Fundamentals of 1-Bit Synthesis — Journal of Sound and Music in Games (UC Press)"
    url: "https://online.ucpress.edu/jsmg/article/1/1/44/2337/The-1-Bit-InstrumentThe-Fundamentals-of-1-Bit"
    accessed: "2026-07-31"
    confidence: "medium"
  - title:
      uk: "ZX-Spectrum-1-Bit-Routines (BEEPERTOY та ін.) — репозиторій движків біпера, utz82 / GitHub"
      en: "ZX-Spectrum-1-Bit-Routines (BEEPERTOY et al.) — beeper engine repository, utz82 / GitHub"
    url: "https://github.com/utz82/ZX-Spectrum-1-Bit-Routines"
    accessed: "2026-07-31"
    confidence: "medium"

# ── Зображення ─────────────────────────────────────────────────────
# images: [] — свідомо. Hero — фірмова графіка (RainbowBar, ТЗ §8.2), а не фото.
# Скриншоти й обкладинки комерційних ігор та копірайтне аудіо не вставляємо (ТЗ §7.1).
# Атрибутований аудіоприклад (beeper vs AY) і власне фото чипа AY-3-8912 з колекції
# — окремі майбутні кроки; додамо в images[] (license: museum-own) після зйомки.
images: []

# ── Заклик до дії ─────────────────────────────────────────────────
cta:
  type: "excursion"
  label_uk: "Записатися на екскурсію"
  url: "https://sncmuseum.org/rozklad-ekskursiy"
---

<!-- ════════════ LONGREAD BODY ════════════
     900–1800 words · 5–8 H2 · every technical claim backed by sources[]. -->

## A speaker driven by a single bit

The base ZX Spectrum had nothing resembling a sound card. Instead of a dedicated chip, the machine had a tiny piezo speaker whose state was set by exactly one bit: on or off. The same ULA chip that draws the picture and reads the cassette is also responsible for this output — the program changes the bit's value through an I/O port, and the speaker's diaphragm jumps from one position to another. We wrote more about the ULA and its role in the piece [“What's inside: the Z80, the ULA and the magic of 48 kilobytes”](/en/history/what-is-inside-z80-ula-48k/).

The main thesis of this text follows directly from this. When we hear a multi-voice melody on the 48K Spectrum, in hardware there is still, all the same, only a single bit at work. There are no “channels” in the silicon — there is a processor toggling that bit so fast and so cleverly that the ear reconstructs a whole musical pattern out of separate clicks. This is not hardware music but music computed by the processor. And in that lies its entire unusual history.

<!-- TODO audio/photo: an attributed short audio example (48K beeper vs 128K AY)
     and an own photo of the AY-3-8912 chip from the collection (license: museum-own
     once photographed). Screenshots and covers of commercial games and copyrighted
     audio are not to be inserted. -->

## How a note comes out of the “squeaker”

Any tone is an oscillation at a given frequency. To get a note of a certain pitch, the Spectrum has to toggle the speaker bit with the matching regularity: the more frequent the toggles, the higher the tone. Sinclair BASIC has the `BEEP` command for this, which is given a pitch and a duration. By the description of the machine's capabilities, the beeper can span roughly ten octaves — a range quite sufficient for a melody.

The price of this simplicity of circuitry is processor time. While `BEEP` is sounding, the Z80 is occupied exclusively with generating that tone: it counts out the required pauses between bit toggles and cannot do anything else at the same time. That is why “music” by BASIC means is almost always a pause in the game: first the melody plays, then the action continues. It was precisely this limitation that pushed programmers to look for ways to squeeze far more out of a single bit than the built-in `BEEP` provided.

## Where the “polyphony” comes from

A single bit physically cannot produce two notes at once — at any given moment it is either on or off. The trick is to alternate. If the processor switches very fast between the rhythm of one note and the rhythm of another, the speaker does not have time to “finish” each change, and the ear perceives the mixture as two tones sounding together. In the literature on 1-bit sound, this and related approaches are described as software, “virtual” polyphony — a many-voicedness that does not exist in the silicon but that hearing constructs.

There are several techniques for this. One relies on the speaker's inertia: the diaphragm has mass, so when the signal is toggled very often it does not have time to swing fully, and the overlap of short pulses gives a more complex timbre and a sense of several voices (in the sources this is called “pulse interleaving”). Other engines vary pulse width (pulse-width modulation) to control volume and timbre, or use precomputed waveform tables. What they share is this: the whole “synthesizer” lives in the code, not in a chip, and every note costs processor time.

> **A shared design lineage.** Since the ULA is what drives the beeper, the 48K's music routines depend directly on the precise timings of the Z80 processor. On clones where the ULA was reproduced with discrete logic, small differences in timing could in theory affect the pitch or timbre of complex 1-bit engines. Whether this is actually audible on specific Ukrainian machines is a separate question that needs verification on real hardware; as things stand, we have no documented museum measurements.

## The craft of 1-bit engines

Around the beeper a distinct engineering culture developed. Programmers wrote specialised sound routines (often called “engines”), each with its own way of getting the richest possible sound out of a single bit. Such routines are still being catalogued and documented: for example, open collections like the compilation of 1-bit routines for the Spectrum show that even a single engine (such as BEEPERTOY) can combine several synthesis methods — pulse frequency modulation, pulse interleaving and table-based synthesis.

The number of simultaneous “voices” is worth discussing cautiously. Academic and community sources cite fairly high figures — individual experimental routines claim many simultaneous voices — but these are the records of specific engines, not a property of the machine. The more voices the code simulates, the harsher the timing requirements and the less resource is left for the game itself. So in real games the number of voices is usually more modest than the laboratory records. We deliberately do not cite exact figures for specific titles without checking them against primary sources.

> **What we are checking.** We deliberately do not attribute a “polyphony record” to any particular game or author here without documentary confirmation, since these figures diverge in popular retellings. If you are an author or researcher of 1-bit engines and have documented data on specific routines, their capabilities, or their use in Ukrainian/post-Soviet releases, please write to the museum: we will refine this section and, with your consent, add an attributed audio example.

## The AY-3-8912: when real channels arrived

The situation changed with the 128K models. The ZX Spectrum 128 (and later the +2/+3) added a separate sound chip — the General Instrument AY-3-8912. This is a programmable sound generator (PSG) with three independent tone channels, a shared noise generator and an envelope generator, which allows a note's attack and decay to be shaped. Technically, the AY-3-8912 is the very same die as the better-known AY-3-8910, but in a 28-pin package where one of the parallel ports is simply not brought out.

The difference from the beeper is fundamental. Now, to get a chord, the processor does not need to “juggle” a single bit: three channels sound in parallel inside the chip itself, and the Z80 only sets their parameters and can otherwise get on with the game. That same chip, incidentally, was used across a whole family of home computers and arcade machines of the late 1970s and 1980s, so for many listeners its timbre is the recognisable “voice” of an entire era of 8-bit music. For more on the model itself, see the [ZX Spectrum 128](/en/models/zx-spectrum-128/) card in our catalogue.

> **Not to be confused.** The 48K Spectrum has no sound chip — there it is a 1-bit beeper through the ULA, with the processor computing the “polyphony”. The three-channel AY-3-8912 appeared only in the 128K/+2/+3 models. So the phrase “music on the AY” refers specifically to the 128K lines, not the base 48K machine.

## Two aesthetics of one computer

Interestingly, the arrival of the AY did not push the beeper out — it rather split Spectrum music into two aesthetics. The chip gave cleaner, “more correct” tones and chords — a sound closer to other home computers. But the 1-bit beeper remained an expressive tool in its own right: its coarse, characteristically “ringing” timbre later became the subject of separate research and musical interest, and the limitation of a single bit came to be seen not as a flaw but as a driver of creativity. Academic work on 48K sound directly treats this technical constraint as a source of original musical solutions.

For the museum, both lines matter. The beeper tells the story of programmers' inventiveness in turning the most primitive output into a musical instrument. The AY-3-8912 tells the story of the platform's next step toward full multi-channel sound. They are worth showing side by side: as one machine that learned to sing with two very different voices.

## What to listen to and where this fits in the exhibition

Spectrum music is best not described but heard — and that is exactly what this page still lacks. Our next step is to prepare a short attributed audio example that places the same melody side by side in its 1-bit rendition and on the AY, so that the difference between “computed” and “chip” sound becomes obvious to the ear. Also planned is an own photo of the AY-3-8912 chip from the collection once we get to photographing it; we deliberately do not add invented images or copyrighted audio.

In the meantime, Spectrum music is conveniently heard in the context of games and loading: the melody often started even before the game came alive on screen. We told the story of the loading ritual itself in the piece [“The sound of loading: how a cassette became a program”](/en/history/tape-loading-sound-of-a-program/), and the specific titles in which these routines sounded we are gradually describing in the [software catalogue](/en/software/).
