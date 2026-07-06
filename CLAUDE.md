# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Build CSS (one-time)
npm run build
# or directly:
npx tailwindcss -i ./css/tailwind.css -o ./dist/styles.css

# Watch CSS during development
npm run watch

# Serve locally — use a live server (e.g. VS Code Live Server or `npx serve .`)
```

There are no tests. CSS changes require a rebuild to take effect in `dist/styles.css`.

## Architecture

This is a **static HTML website** with no build step beyond Tailwind CSS compilation. There is no framework, bundler, or server-side rendering.

### Page structure

- **`index.html`** — self-contained landing page. Nav and Alpine.js are embedded inline; does NOT use `navigation.js`.
- **`leistungen/*.html`**, **`referenzen/*.html`**, and top-level pages (`kontakt.html`, `referenzen.html`, etc.) — use `<script src="../js/navigation.js" defer>` to inject the shared nav/footer at runtime via `fetch()`.
- **`parts/`** — shared HTML fragments (navigation, footer, hero, services, etc.) fetched client-side. `navigation.js` fetches `navigation.html` and `footer.html` and injects them into the DOM.
- **`parts/navigation.html`** is the shared nav for all sub-pages. It has dark scroll-state styling baked in. `index.html` embeds its own light nav inline to avoid this constraint.

### Styling

- Tailwind CSS 3.x, compiled from `css/tailwind.css` → `dist/styles.css`
- All pages link to `./dist/styles.css` (or `../dist/styles.css` from subdirectories)
- Brand tokens defined in `tailwind.config.js`:
  - `brand-primary`: `#0ea5e9` (sky blue)
  - `brand-accent`: `#84cc16` (lime green)
  - `brand-text`: `#0f172a` (dark slate)
  - `brand-light`: `#f8fafc` (near white)
- Font: **Plus Jakarta Sans** (Google Fonts) — set as the default `sans` family
- Tailwind content scanning covers `./*html`, `./parts/**/*.html`, `./js/**/*.{js,ts}` — subdirectory HTML (e.g. `leistungen/`, `referenzen/`) is **not scanned**, so only use classes already present elsewhere or rebuild after adding new ones in those files

### Interactivity

- **Alpine.js 3.x** (CDN) handles all interactivity: mobile menus, FAQ accordions, card hover states, entrance animations
- Entrance animations on `index.html` use Alpine `x-init` + `:class` bindings for load-triggered transitions, and an **Intersection Observer** script (bottom of body) for scroll-triggered `.reveal` / `.reveal-left` / `.reveal-right` classes
- Older sub-pages may use **AOS (Animate On Scroll)** via CDN

### Key conventions

- Rounded corners use non-standard values like `rounded-[2.5rem]`, `rounded-[3rem]` — these are JIT-generated
- Clay/neumorphic shadows are applied via inline `style` or the `.clay-card` utility class in `index.html`'s `<style>` block
- `x-cloak` is used on elements that should be hidden before Alpine loads; `[x-cloak] { display: none !important; }` must be in the page's `<style>` block
- Infinite-scroll carousels duplicate their inner HTML via a small inline `<script>` to create a seamless loop
