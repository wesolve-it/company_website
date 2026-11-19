---
name: wesolve-IT
description: Warm, direct agency site in ink blue on warm white, with a coral-to-orange code-bracket signal.
colors:
  ink: "#242f4d"
  ink-hover: "#364569"
  night: "#171f35"
  coral: "#f15256"
  orange: "#ff9b58"
  coral-text: "#ab343d"
  coral-soft: "#ff9f8d"
  coral-soft-hover: "#ffc0aa"
  periwinkle: "#8d9bd9"
  paper: "#fffcf9"
  surface: "#ffffff"
  warm: "#f8efeb"
  line: "#eaddd7"
  muted: "#526079"
  hero-glow: "#ffebe2"
  night-glow: "#382d48"
  node-text: "#ffbf9a"
  panel-glow: "#45537b"
  panel-line: "#465472"
  panel-line-strong: "#5c698a"
  device: "#0d1210"
  whatsapp: "#18764a"
  dark-heading: "#fff9f5"
  dark-accent-text: "#ff9f92"
  dark-muted: "#c6cddd"
  dark-surface: "#242f4d"
  dark-warm: "#1e2841"
  dark-line: "#414b65"
typography:
  display:
    fontFamily: "Onest, sans-serif"
    fontSize: "clamp(2.125rem, 5.7vw, 5rem)"
    fontWeight: 750
    lineHeight: 1.04
    letterSpacing: "-0.058em"
  headline:
    fontFamily: "Onest, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  result:
    fontFamily: "Onest, sans-serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)"
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Onest, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Onest, sans-serif"
    fontSize: "clamp(1rem, 1.6vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Onest, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 650
    lineHeight: 1.4
rounded:
  sm: "0.5rem"
  md: "0.625rem"
  lg: "1rem"
  xl: "1.125rem"
  frame: "1.25rem"
  pill: "999px"
spacing:
  gutter: "1rem"
  section: "clamp(3.25rem, 7vw, 6rem)"
  section-lg: "clamp(4rem, 9vw, 7.5rem)"
  card: "clamp(1.125rem, 2.7vw, 2rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.5rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
  button-primary-on-dark:
    backgroundColor: "{colors.coral-soft}"
    textColor: "{colors.night}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.5rem"
    height: "48px"
  button-primary-on-dark-hover:
    backgroundColor: "{colors.coral-soft-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.5rem"
    height: "48px"
  project-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card}"
  contact-band:
    backgroundColor: "{colors.night}"
    textColor: "{colors.dark-heading}"
    rounded: "{rounded.xl}"
    padding: "clamp(1.25rem, 4vw, 3rem)"
  nav-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
---

# Design System: wesolve-IT

## Overview

**Creative North Star: "Ink and Ember"**

The site reads like a well-kept workshop notebook: ink-blue type on warm white paper, with one glowing ember of coral and orange taken straight from the logo's right-hand code bracket. The ink carries everything that needs to be read and trusted (headlines, navigation, the primary button); the ember appears only where something should catch the eye: a result, an accent phrase, a focus ring, a step number.

Density is relaxed. Sections breathe, headlines are large and tightly tracked, and proof (real client projects, real results) is shown as concrete cards rather than claims. Dark night-blue bands act as calm counterweights: the process timeline and the closing contact banner on sub-pages, plus the footer. Thin orbit rings borrowed from the hero frame the top of every page so the whole site feels like one place.

Implementation lives in `css/home.css`, scoped under `.brand-page` (pages opt in with that body class). The older forest-green Tailwind palette in `tailwind.config.js` is legacy and must not be used on brand pages.

**Key Characteristics:**
- Ink blue for reading, coral/orange for signalling, warm white for space
- One typeface (Onest) carrying every role through weight and tracking
- Real project proof as cards with a large coral result line
- Calm night-blue bands for process and contact moments
- Orbit rings and the code bracket as the recurring brand geometry

## Colors

A two-temperature palette: cool ink and night for structure, warm coral, orange and paper for life.

### Primary
- **Ink Blue** (ink): headlines, body text on light, navigation, the primary button. The default voice of the site.
- **Night Blue** (night): dark bands (process timeline, contact banners, footer) and the dark-mode page background.

### Secondary
- **Ember Coral** (coral): the right code bracket, quotation marks, step-number rings, focus outlines on dark surfaces. Never a large fill.
- **Warm Orange** (orange): partner to coral in the bracket gradient and small illustration dots; timeline node rings.
- **Coral Text** (coral-text): the accessible coral for text on light backgrounds: accent phrases in headlines, project results, hover states of text links.
- **Soft Coral** (coral-soft): the primary button on dark surfaces and in dark mode, with night-blue text.

### Tertiary
- **Periwinkle** (periwinkle): third dot colour in illustrations and the light variant of the logo's left bracket. Illustration use only.

### Neutral
- **Warm Paper** (paper): page background in light mode.
- **Surface White** (surface): cards, nav bar, raised panels.
- **Blush Warm** (warm): alternating section background (projects, contact section) and hover fill for nav links.
- **Blush Line** (line): every hairline border and divider.
- **Slate Muted** (muted): secondary text, captions, descriptions.
- Dark mode swaps these via the `dark-*` tokens; section structure stays identical.

### Named Rules
**The Ember Rule.** Coral and orange are signals, not surfaces. They appear on text accents, rings, markers and small illustration details; a section background or a large card fill in coral is off-system.

**The Readable Coral Rule.** On light backgrounds, coral text is always Coral Text (#ab343d); bright Ember Coral is reserved for graphics and outlines where contrast rules don't apply.

## Typography

**Display Font:** Onest (self-hosted variable font, sans-serif fallback)
**Body Font:** Onest

**Character:** One geometric-humanist sans used at two extremes: very bold, very tightly tracked headlines that feel engineered, and calm regular-weight body copy with generous leading.

### Hierarchy
- **Display** (750, clamp(2.125rem → 5rem), 1.04, -0.058em): the hero H1 and page heroes. Balanced wrapping; the closing phrase may switch to Coral Text.
- **Headline** (700, clamp(2rem → 3.5rem), 1.08, -0.035em): section titles.
- **Result** (750, clamp(1.6rem → 2.4rem), 1.1, -0.045em): the coral outcome line on project cards and key-result boxes ("Platz 1 bei Google", "Minuten statt Stunden").
- **Title** (700, ~1.2rem): card titles, step titles, FAQ questions.
- **Body** (400, 1rem → 1.2rem, 1.65): paragraphs, max ~54–60ch.
- **Label** (650, 0.8125rem): small captions and meta under titles. Sentence case, never tracked-out caps.

### Named Rules
**The One Family Rule.** Onest is the only shipped typeface. Barlow Condensed, Montserrat and Space Grotesk remain in the Tailwind config as legacy and are never used.

**The Long Word Rule.** Hero headlines hyphenate automatically only for long German compounds (`hyphenate-limit-chars: 12 5 5`); short words never break.

## Layout

Content sits in a centred container (max-width 1280px, `max-w-screen-xl`) with a 1rem gutter on phones and 1.5rem from 640px. Sections use a consistent vertical rhythm (`section` spacing, larger `section-lg` for statement sections such as the review). Two-column layouts appear from 960px (hero text + media, story heading + list, contact text + steps) and stack on smaller screens with text first. Text is left-aligned everywhere except the homepage hero, which is centred around the orbit graphic.

## Elevation & Depth

Mostly flat with tonal layering: depth comes from paper → warm → surface → night shifts and hairline borders, not shadows. Shadows are rare, soft and ink-tinted.

### Shadow Vocabulary
- **Nav float** (`box-shadow: 0 6px 24px #171f3510`): the floating nav bar once the page scrolls.
- **Mark lift** (`box-shadow: 0 8px 24px #242f4d12`): the small logo tile in the hero.
- **Screenshot depth** (`box-shadow: 0 18px 40px #0a0f1f59`): website screenshots inside dark media frames.

### Named Rules
**The Tonal First Rule.** Separate areas by background tone and a 1px Blush Line before reaching for a shadow.

## Shapes

Soft, consistent rounding: small controls at 0.5–0.625rem, cards and bands at 1.125rem, logo strip at 1rem, media and device frames at 1.25rem (`frame`), tags as pills. Circles are reserved for step numbers, orbit dots and icon badges. The orbit ellipses (1px Blush Line rings) and the code bracket are the recurring brand geometry.

## Components

### Buttons
- **Shape:** gently rounded (0.5rem), at least 48px tall.
- **Primary:** Ink Blue fill with white text; hover lightens to Ink Hover.
- **Primary on dark / dark mode:** Soft Coral fill with Night Blue text; hover to the lighter coral.
- **Secondary:** white surface with a Blush Line border and ink text; hover border turns coral (orange on dark).
- **Text link:** underlined ink text with a small ↗ or ← where it leaves or returns; hover turns Coral Text.

### Cards / Containers
- **Project card:** white surface, Blush Line border, 1.125rem radius, image on top (2:1, dark ink backdrop for device frames), then client name, coral Result line, description and "Fallstudie lesen ↗".
- **Contact band:** Night Blue rounded panel with headline, one sentence and a coral primary button; closes sub-pages.

### Navigation
- **Style:** floating bar with a 1.125rem radius; transparent over the hero, white with a soft nav-float shadow once scrolled.
- **Links:** ink text with 0.625rem rounded hover fill in Blush Warm; current page shown in Coral Text on that fill.
- **CTA:** "Kontakt" as a small primary button.

### Process Timeline (signature)
Numbered steps on a night-blue band; nodes are night circles with an orange ring and orange numerals. Only used for real sequences.

### Review (signature)
One large quote (Display-adjacent size, weight 600) introduced by a coral quotation mark, then an author row with client logo, name, role and a link to the case study, separated by a Blush Line.

### Device Frames
Tablet and phone frames (`device-tablet`, `device-phone`) and a browser frame with three dots show real client screens; they sit on night-blue panels in heroes and cards.

## Do's and Don'ts

### Do:
- **Do** scope new pages with `brand-page` on `<body>` and use the CSS variables (`--ink`, `--coral`, `--muted`, `--line` …) rather than raw hex.
- **Do** use Coral Text (#ab343d) for coral text on light backgrounds.
- **Do** show proof as real projects with a concrete result line.
- **Do** keep one primary action per section; secondary paths are text links.

### Don't:
- **Don't** use the legacy `wesolve-green-*` or `wesolve-accent-*` Tailwind colours on brand pages.
- **Don't** fill large areas with coral or orange.
- **Don't** use typefaces other than Onest.
- **Don't** put the dark logo on a dark background behind a light box; use `wesolve-tinte-koralle-hell.svg` on dark surfaces.
