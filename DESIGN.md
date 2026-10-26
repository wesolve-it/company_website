---
name: wesolve-IT
description: Approachable, tactile agency site in deep forest green with a rare mint signal.
colors:
  forest-night: "#081c16"
  forest-deep: "#102d23"
  forest-dark: "#193e30"
  forest: "#245540"
  forest-mid: "#326d52"
  sage: "#78aa92"
  sage-line: "#cbe0d5"
  sage-mist: "#e6f0eb"
  sage-paper: "#f4f8f6"
  paper: "#ffffff"
  mint: "#36c99a"
  mint-light: "#73dfbf"
  mint-pale: "#abefd8"
typography:
  display:
    fontFamily: "Onest, sans-serif"
    fontSize: "clamp(2.6rem, 5.4vw, 4.9rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Onest, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Onest, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Onest, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Onest, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.16em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter: "24px"
  card: "28px"
  card-lg: "32px"
  section: "96px"
  section-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.forest-night}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.mint-light}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.forest-deep}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.sage-paper}"
  card-service:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.forest-night}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  tag:
    backgroundColor: "{colors.sage-mist}"
    textColor: "{colors.forest-dark}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
---

# Design System: wesolve-IT

## Overview

**Creative North Star: "The Green Workbench"**

The site feels like a well-kept workbench: solid, approachable, everything within reach. A single deep forest green carries the whole system, from near-black hero bands to pale sage card borders, so the page reads as one material in different tones, not a mix of colours. Rounded cards, gentle lift on hover and line illustrations make it tactile and friendly without becoming playful.

Pages alternate light paper sections with dark forest bands (hero, process timeline, contact). The dark hero carries a faint 64px drafting grid with a soft mint glow. Motion is calm and one-shot: staggered hero entrance, cards that fade up once on scroll, a timeline line that draws itself. Every motion respects `prefers-reduced-motion`. Dark mode (class-based) moves the light sections onto forest tones rather than neutral grey.

**Key Characteristics:**
- One green family in many tones; mint is the only other hue and is used sparingly.
- One typeface (Onest) for everything, tight-tracked bold headlines.
- Rounded, bordered cards that lift on hover with deep green-tinted shadows.
- Light/dark section rhythm; dark bands for hero, process and closing CTA.
- Headings stand on their own; numbering appears only where the sequence matters (the process timeline).

## Colors

A monochrome forest-green palette with a single mint signal.

### Primary
- **Forest Night** (forest-night): the dark-band and dark-mode background, primary text colour on light sections, and text on mint buttons.
- **Forest** (forest): the brand green named in the config; link and body-emphasis colour on light sections.
- **Forest Deep / Dark / Mid** (forest-deep, forest-dark, forest-mid): dark-mode card surfaces, borders on dark, eyebrow text.

### Secondary
- **Mint** (mint): primary CTA fill, active markers, focus rings on dark, timeline nodes.
- **Mint Light / Pale** (mint-light, mint-pale): CTA hover, focus ring halo, soft glow behind service cards.

### Neutral
- **Paper** (paper): light-section and card background.
- **Sage Paper / Mist** (sage-paper, sage-mist): hover fills, tags, soft illustration fills.
- **Sage Line** (sage-line): default card and input border, dividers.
- **Sage** (sage): placeholder text, hover border, grid lines on the hero.

### Named Rules
**The Rare Signal Rule.** Mint marks action and state only: CTAs, focus, active markers, small illustration accents. Never a section background or large fill.

**The One Material Rule.** Neutrals are green-tinted sage, not grey. Don't introduce `neutral-*` or `gray-*` greys on new surfaces.

## Typography

**Display Font:** Onest (self-hosted variable font, sans-serif fallback)
**Body Font:** Onest

**Character:** One geometric-humanist sans for everything. Hierarchy comes from weight and very tight negative tracking on large sizes, not from font pairing.

### Hierarchy
- **Display** (700, clamp 2.6–4.9rem, line-height 1, tracking −0.055em): page hero h1 only.
- **Headline** (700, clamp 2–3.5rem, 1.08, −0.035em): section titles.
- **Title** (600, ~1.5rem, −0.025em): card and sub-section headings.
- **Body** (400, 1rem, relaxed): copy; long-form legal text capped at 68ch.
- **Label** (600, 0.75–0.875rem, 0.16em tracking, uppercase): small standalone captions such as the client-logo strip. Never as a kicker above a heading.

### Named Rules
**The Balanced Lines Rule.** Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`; long German compounds get `&shy;` break points rather than smaller type.

## Layout

Content sits in a max-width container of 1280px (`max-w-screen-xl`) with 16px gutters on mobile and 24px from `sm`. Sections breathe: 96px vertical padding, 128px from `lg`. Cards use 28px padding (32px from `sm`). Grids collapse to one column on mobile; the process timeline turns from a horizontal 3- or 4-step row (md+) into a vertical rail with nodes on the left.

## Elevation & Depth

Flat at rest; depth appears on interaction. Cards have a 1px sage border and no shadow until hover, when they lift (−4 to −8px) and gain a long, soft, green-tinted shadow. Image case cards on dark carry a resting shadow. Shadows are always tinted with forest-night, never neutral black.

### Shadow Vocabulary
- **Hover lift** (`0 24px 70px -36px rgba(8,28,22,0.45)`): service cards on hover.
- **Feature hover** (`0 30px 80px -40px rgba(8,28,22,0.5)`): reference cards on hover.
- **Case resting / hover** (`0 24px 70px -40px rgba(8,28,22,0.65)` → `0 34px 90px -42px rgba(8,28,22,0.75)`): image case cards.

### Named Rules
**The Lift-on-Touch Rule.** Surfaces are flat until hovered or focused; lift and shadow are a response, never decoration.

## Shapes

Softly rounded throughout: 16px on cards, 12px on secondary panels and contact rows, 8px on buttons, inputs and filter pills, 6px on tags. Circles only for timeline nodes and blurred glow shapes. Borders are 1px sage (white at 10–25% on dark).

## Components

### Buttons
- **Shape:** gently rounded (8px), at least 48px tall, semibold 1rem text, optional trailing arrow that nudges 4px right on hover.
- **Primary:** mint fill with forest-night text; hover lightens to mint-light.
- **Secondary:** paper fill, sage-line border, forest-deep text; hover deepens the border and fills sage-paper. Dark mode: forest-deep fill.
- **Secondary on dark:** transparent with a white 25% border, white text.
- **Focus:** 2px outline, offset 4px (mint-light on dark, forest-mid on light).

### Chips
- **Tag:** sage-mist fill, forest-dark text, 6px radius, 12px semibold. Used for project categories.
- **Filter pill:** 40px min height, 8px radius; active state filled, inactive plain (Referenzen filter).

### Cards / Containers
- **Service card:** paper, 16px radius, sage-line border, 28–32px padding, min 320px tall, a blurred mint-pale glow in the bottom-right corner that drifts on hover, small line illustration top-right.
- **Case card:** forest-night base, full-bleed screenshot, bottom gradient overlay for text, image scales 1.035 on hover.
- **Reference card / tile:** paper, 16px radius, bordered; screenshot rises on hover and the "Projekt ansehen" arrow nudges right.
- **Contact channel / guide link (on dark):** 12px radius, white 15% border, 3% white fill; hover tints the border mint.

### Inputs / Fields
- **Style:** paper, sage-line border, 8px radius, 12px × 16px padding, sage placeholder.
- **Focus:** border shifts to forest-mid plus a 4px mint-pale halo ring (mint at 20% in dark mode).

### Navigation
- Fetched partial (`navigation.html`). Text links with a 2px underline that grows from the left on hover (forest-mid on light, mint on dark/hero). Over dark heroes (`data-hero="dark"`) links and logo switch to white and the CTA to mint. Mobile: burger toggle (Alpine.js). Theme toggle in the bar.

### Process Timeline (signature)
Numbered steps joined by a thin white line on a dark band. Nodes are 32px circles with a mint border and tabular Onest numerals; on scroll the line draws itself and nodes light up in sequence.

### Line Illustrations (signature)
Simple stroked SVG illustrations in forest-dark (mint on dark) with paper, sage-mist and mint-light fills set through classes so they follow the theme. Mint accent shapes pop in once on reveal.

## Do's and Don'ts

### Do:
- **Do** build every new surface from the forest-green ramp and sage neutrals, with both light and `dark:` variants.
- **Do** keep mint for CTAs, focus and markers only (The Rare Signal Rule).
- **Do** set all type in Onest; use weight and tight tracking for hierarchy.
- **Do** keep cards flat and bordered at rest, lifting with a forest-tinted shadow on hover.
- **Do** make every motion one-shot or hover-driven and disable it under `prefers-reduced-motion`.

### Don't:
- **Don't** use neutral greys (`gray-*`, `neutral-*`) or black shadows on new surfaces.
- **Don't** fill large areas or section backgrounds with mint.
- **Don't** use Barlow Condensed, Montserrat or Space Grotesk; they remain in the Tailwind config but are not shipped or self-hosted.
- **Don't** add looping decorative animation beyond the existing logo ticker and hero float.
- **Don't** put an eyebrow or kicker label above a heading, or decorative numbering (01 / WEB) on cards.
- **Don't** use monospace or Unicode glyphs (↗) as styling; arrows are stroked inline SVG.
