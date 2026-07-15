# Software & Computer Museum (SnC) — Design System

A brand & UI design system for the **Software and Computer Museum (SnC)** — the first
permanent museum of software and computers in Ukraine.

> ⚠️ **Source note.** This system was reconstructed from the museum's **logo artwork**
> (the only design asset provided) plus **public information** about the museum (its
> website sncmuseum.org, the Computer History Museum profile, press, and reviews). There
> was **no codebase, Figma file, or live stylesheet** to reference. Colors are sampled
> directly from the logo; the rest (type pairing, components, UI kit) is an *original,
> on-brand* construction in the spirit of the mark — not a copy of the live site. See
> **Caveats** at the bottom. Treat this as a strong v1 to react to and refine.

---

## 1. Company / product context

The **Software and Computer Museum** (Ukrainian: *Музей програмного забезпечення та
комп'ютерів*), known as **SnC**, is a computer-history museum founded by Sergey Tsymbal,
Anton Trubnikov, and game-collector Oleksandr Kovalenko. It **opened in Kharkiv on
29 August 2017**, with a second branch opening in **Kyiv in 2018**. The idea was sparked
by a visit to the Computer History Museum (CHM) in Silicon Valley.

**What it is.** A hands-on museum tracing the evolution of computing and software — and
the inseparable relationship between the two ("hard and soft are two elements of one
essence, like body and soul"). The collection runs from the **1930s to the present**:
personal computers, portable devices, game consoles, prototypes, ex-USSR computer history,
documents, and recorded interviews with engineers. **150+ exhibits, ~70% still working**,
many of which visitors can **touch and operate**. Notable pieces: Apple II, Apple Newton
MessagePad, Osborne 1, Commodore Amiga 600, BBC Micro, Magnavox Odyssey, Soviet "Poisk"
computers, the VictorMaxx StuntMaster VR headset, Microsoft HoloLens, and a Jibo robot.

**What it offers (the "products" / surfaces):**
- **Visits & guided tours** — free entry, register on the website; passionate guides.
- **Education** — digital-literacy and professional courses, taught on-site and online.
- **Events / venue rental** — halls for conferences, business training, forums, Meet Ups.
- **Blog & community** — news, exhibit spotlights, and a community forum (forum.it-museum.com).

**Status.** Both physical museums are currently *temporarily closed* due to the war in
Ukraine; education programs continue online.

**Contact / facts.**
- Web: sncmuseum.org · Email: info@sncmuseum.org
- Kharkiv: Pushkinska str., 79/1 ("Giant" KhPI dormitory) · Kyiv branch (Kyianivskyi lane)
- Bilingual: **Ukrainian + English** (historically some Russian).

**Sources consulted** (reader may not have access; recorded for provenance):
- Brand logo: `uploads/photo_2026-06-02 17.59.22.jpeg` → cleaned in `assets/`
- sncmuseum.org (live site & /blog) · computerhistory.org/blog/ukraines-software-computer-museum
- museum-portal.com, kharkovinfo.com, Tripadvisor, Facebook/sncmuseum (copy & exhibit facts)

---

## 2. Content fundamentals — how SnC writes

The voice mixes **museum-grade clarity** with **enthusiast warmth and a little poetry**.
It is the voice of passionate hobbyists who happen to run a real institution.

- **Person.** Warm and direct — speaks of *"our exhibits,"* *"our museum,"* and addresses
  the reader as **you** (informal *ти* in Ukrainian). Inclusive, inviting, never corporate.
- **Tone.** Earnest, curious, a touch romantic about technology. Computing is framed as a
  human, collective story: *"Each of our exhibits is a tiny stone, without which developers
  would not build the modern world of technology."* Hardware & software as *"body and soul."*
- **Register.** Plain and accessible — explicitly *"IT without too deep knowledge."*
  Avoids jargon; explains, tells stories, surfaces *"facts even Wikipedia doesn't know."*
- **Casing.** Sentence case for body. The **brand display type is UPPERCASE** (the wordmark,
  section headers, eyebrows). Exhibit labels read like catalog entries.
- **Numbers & dates are first-class.** Years anchor everything ("In 1993, long before the
  terms 'PDA' and 'tablet'…", "Apple II … back in 1977"). Render years/specs in **mono**.
- **Bilingual.** English and Ukrainian sit side by side; keep copy translatable and avoid
  idioms that won't survive translation.
- **Emoji.** **Not** in formal site/UI copy. Light, occasional use on **social posts only**
  (🌟 🎹 🌐). Do **not** use emoji as UI iconography.
- **Calls to action.** Practical and low-pressure: *"Free enter,"* *"just sign on their
  website,"* *"fill in the form below,"* *"Детальніше"* ("Read more").

**Sample phrases (real, on-brand):**
- "The first permanent museum of software and computers in Ukraine."
- "Here maybe it's your discovery." *(label on a deliberately empty exhibit stand)*
- "More than 100 exhibits, 70% of which still work."
- "We are obliged to study the past in order to understand the present and create the future."

**Microcopy rules of thumb:** lead with the year or the object; one idea per line; prefer
verbs ("Visit", "Register", "Explore") over nouns; keep CTAs ≤ 3 words.

---

## 3. Visual foundations

The entire identity is encoded in the logo: **bold white outlines on a deep navy field,
arranged as a grid of squares that resolves into a stylized computer/monitor**, with a
**blue-over-yellow (Ukrainian flag) accent tile** and faint, hand-sketched tech objects
(the @ sign, speech bubbles, devices) ghosted into the background.

- **Color vibe.** Deep, confident, institutional **navy** (`#1a2b59`) as the hero surface;
  crisp **white**; and the **Ukrainian flag** blue (`#0a3c85`) + yellow (`#fed61f`) as
  accents. Yellow is the energy/CTA color; blue is interactive/links. Cool, serious base
  warmed by the yellow. See `colors_and_type.css`.
- **Type.** Bold, geometric, **UPPERCASE** display (**Montserrat**, self-hosted Bold —
  a close match to the logo's wide geometric wordmark) for wordmark/headers; **PT Sans**
  for body (the museum's body face, self-hosted); **IBM Plex Mono** for years, catalog
  numbers, specs, and the
  signature **wide-tracked eyebrow labels**.
- **The square-grid motif.** The brand's defining device: outlined squares/rectangles on a
  grid, reading as pixels / memory cells / UI tiles / a monitor. Use it for galleries,
  dividers, loaders, empty states, and decorative framing. Everything snaps to a grid.
- **Corners.** **Sharp.** Radius 0 by default; 2px max on inputs/chips. No pills except
  toggles/tags. The brand is rectilinear — honor it.
- **Borders over shadows.** Elevation is expressed with **bold outlines** (2–3px), not drop
  shadows — directly echoing the logo's white strokes. On navy: white/`rgba(255,255,255,.85)`
  outlines. On paper: `--border-ink` (#13213f). Shadows exist only for true overlays
  (menus, modals) and stay subtle/cool.
- **Cards.** Outlined rectangles. On navy → white-outlined box, transparent or `--navy-700`
  fill. On paper → 1px `--border-1` hairline or 2px ink outline, square corners, optional
  mono catalog tag in a corner. Hover raises border contrast, not a shadow.
- **Backgrounds.** Predominantly **flat navy or flat paper** — no gradients. The only
  permitted "texture" is the **ghosted square-grid / sketched-object motif** at very low
  contrast (like the logo backdrop). No photographic gradients, no glassmorphism by default.
- **Imagery.** Exhibit photography of vintage hardware — treat it **editorially**: place on
  navy or in white-outlined frames; allow it to be the color in an otherwise restrained
  palette. A subtle cool/neutral grade keeps it consistent; avoid heavy filters. Use
  `assets/` placeholders / the `<image-slot>` pattern until real photos are supplied.
- **Transparency & blur.** Minimal. A navy scrim over hero images (for legible text) is the
  main use; otherwise opaque. Blur reserved for modal backdrops.
- **Layout.** Grid-driven and modular, generous margins, strong left alignment, big
  uppercase headers with a mono eyebrow above. Fixed sticky header; content snaps to an
  8px square grid. Asymmetry is fine; whitespace (navy-space) is part of the design.
- **Motion.** Restrained and mechanical, suiting the subject. Short fades/translates
  (160–240ms, `--ease-out`); **no bounce, no parallax-heavy** effects. A nice signature is
  the square-grid "filling in" tile by tile on load. Respect `prefers-reduced-motion`.
- **Hover states.** Links → shift to `--blue-bright` / underline. Outlined elements →
  border contrast up (and/or yellow border). Yellow CTAs → darken to `--yellow-deep`.
- **Press states.** Slight darken + 1px translate-down (no scale-up). Tactile, like a key.
- **Focus.** 2px `--focus` (blue) outline with 2px offset — visible, never removed.

---

## 4. Iconography

The brand has **no proprietary icon font**. Its native "icon language" is the **outlined
square-grid motif** and the faint **hand-sketched line objects** behind the logo
(@, speech bubbles, devices, arrows) — decorative, single-weight, drawn in white/navy.

**Guidance for UI:**
- **Primary set (substitution — flagged):** use **[Lucide](https://lucide.dev)** via CDN —
  a clean, **2px stroke, square-cap, outline** set that matches the logo's stroke weight and
  rectilinear feel. This is a substitution (no original icon set was provided); swap for an
  official set if one exists. Keep stroke `2`, square/round joins, no fills.
- **Decorative motif:** the square-grid (pixels/tiles) and the ghosted sketch objects —
  reuse from `assets/mark-monitor.jpg` or rebuild as outlined squares. Great for empty
  states, loaders, section breaks.
- **Unicode/emoji:** **no** emoji in UI. Mono glyphs and the `#` (catalog) and `@` marks may
  appear as typographic accents, not as icons.
- **Logo usage:** keep the navy field around the mark; never place the white-outline mark on
  busy imagery without a navy plate. The blue/yellow flag tile is a fixed part of the mark.

**Assets in `assets/`:**
| File | What it is |
|---|---|
| `logo-full.jpg` | Full primary logo (square-grid monitor + wordmark + MUSEUM) on navy |
| `mark-monitor.jpg` | The mark only (square-grid monitor + flag tile, no wordmark) |
| `accent-flag.jpg` | The blue-over-yellow Ukrainian flag accent tile |
| `tile-square.jpg` | Square social/app tile (mark centered on navy) |

---

## 5. Index — what's in this system

| Path | Purpose |
|---|---|
| `README.md` | This file — context, content & visual foundations, iconography, index |
| `colors_and_type.css` | All design tokens: color (core + semantic light/dark), type roles, spacing, radii, strokes, motion |
| `SKILL.md` | Agent-Skills manifest so this system is usable as a portable skill |
| `assets/` | Cleaned logo, mark, flag tile, square tile |
| `preview/` | Small specimen cards that populate the Design System tab |
| `ui_kits/website/` | High-fidelity, click-through recreation of the museum **website** (home, collection, exhibit detail, visit/events) with reusable JSX components |

**Fonts:** **Montserrat** (display) and **PT Sans** (body) are **self-hosted** from
`fonts/` (user-supplied); **IBM Plex Mono** loads from Google Fonts CDN. Remaining
Montserrat / PT Sans weights also come from the CDN `@import` in `colors_and_type.css`.
Montserrat is a close geometric match to the wordmark; swap in the exact proprietary
face if one exists.

---

## 6. Caveats & open questions (please help me iterate)

- **Only a logo was provided** — no codebase/Figma/live CSS. The UI kit is an *original,
  on-brand* interpretation, not a 1:1 copy of the current site. Tell me where it should hew
  closer to (or diverge from) the real sncmuseum.org.
- **Display font** is **Montserrat** (self-hosted Bold), a close geometric match to the
  wordmark. If you have the exact proprietary wordmark face, send it and I'll swap it in.
- **No real exhibit photography** was available — the UI kit uses placeholders / image slots.
  Share a photo library and I'll wire it in.
- **Icon set is a substitution** (Lucide). Swap if you use something specific.
- Confirm the **primary languages/locales** to design for (EN/UK) and whether the flag
  blue/yellow accent should stay this prominent or be reserved for special moments.
