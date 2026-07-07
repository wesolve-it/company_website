# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for wesolve-IT (German-language, targeting gastronomy clients). Plain HTML pages styled with Tailwind CSS, interactivity via Alpine.js and AOS (scroll animations). No bundler, no framework, no tests — pages are served directly (e.g. via Live Server).

## Commands

```bash
npm install          # install dependencies
npm run build        # compile css/tailwind.css -> dist/styles.css (PostCSS + Tailwind + Autoprefixer)
npm run watch        # same, in watch mode — run this during development alongside a live server
```

There is no lint or test setup (`npm test` is a stub).

## Architecture

- **Pages**: top-level HTML files (`index.html`, `kontakt.html`, `leistungen.html`, `referenzen.html`, `impressum.html`, `datenschutz.html`, `agbs.html`, `thank-you.html`) plus detail pages in `leistungen/` (services) and `referenzen/` (client references). All content is in German.
- **Shared navigation/footer**: `navigation.html` and `footer.html` are partials fetched at runtime by `js/navigation.js`, which prepends the nav to `<body>` and injects the footer into `#footer-placeholder`. Every page must include `js/navigation.js` and a `<div id="footer-placeholder">`. Changes to nav/footer only need to be made in the two partial files.
- **Styling**: `css/tailwind.css` is the Tailwind entry point (also holds custom `data-aos="safe-fade-left/right"` animation classes). It compiles to `dist/styles.css`, which every page links. The compiled `dist/styles.css` is committed. After editing HTML classes or `css/tailwind.css`, rebuild (or have `npm run watch` running) so `dist/styles.css` stays current.
- **Tailwind config**: `tailwind.config.js` defines the brand palette (`wesolve-green` with 700 as primary, `wesolve-gray`, `wesolve-accent` amber for CTAs, `wesolve-accent-coral` with 500 as primary) and fonts (`font-heading` = Barlow Condensed, `font-body` = Montserrat). Use these tokens instead of raw colors.
- **JavaScript**: `js/app.js` starts Alpine from `node_modules` as an ES module; pages additionally load the Alpine CDN build. Alpine directives (`x-data`, `x-show`, etc.) are used inline in the HTML, mainly for the mobile navigation.
- **Dark mode**: Tailwind `darkMode: 'class'`. `js/theme.js` must be loaded synchronously in every page `<head>` (right after `dist/styles.css`) — it sets the `dark` class from localStorage/system preference before paint and exposes `window.toggleTheme()`, which the toggle button in `navigation.html` calls. New pages need both the script tag and `dark:` variants on light-specific utilities.
- **Analytics**: each page embeds Google Tag Manager (`GTM-PQ4KTLTR`) and gtag (`G-5G6WZV8BEF`) snippets in `<head>`/`<body>` — keep these when creating new pages.
- **SEO**: `sitemap.xml` and `robots.txt` at the root; new pages should be added to the sitemap.
