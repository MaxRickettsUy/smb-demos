# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

A showroom of demonstration small-business websites built to show to potential customers. Each demo is a hand-built, distinct mini-site for a specific trade (tree service, plumber, salon, etc.) — they are intentionally NOT templated off a shared component library, so each one can establish its own aesthetic and feel like a real business's site.

## Commands

```bash
npm run dev      # astro dev server
npm run build    # static build to ./dist
npm run preview  # preview built site
```

Node `>=22.12.0` required.

## Architecture

Single Astro app, static output, Tailwind v4 via the Vite plugin (no `tailwind.config.js` — theme tokens live in CSS).

- `src/pages/index.astro` — the "Showroom" catalog index listing all demos.
- `src/pages/demos/<slug>/index.astro` — one folder per demo site. Each demo is a single page, self-contained, and free to define its own visual language. Add a new demo by creating a new folder here and adding an entry to the `demos` array in `src/pages/index.astro`.
- `src/layouts/Layout.astro` — the only shared layout: imports global.css, loads Google Fonts, accepts `title` and `description` props. Used by both the index and the demos.
- `src/styles/global.css` — Tailwind v4 entrypoint (`@import "tailwindcss"`) plus a `@theme` block defining the color and font tokens, and a small set of utility classes (`.grain`, `.topo`, `.label`, `.font-display`, `.link-quill`, `.ticker-track`, `.rise`, etc.) that demos can opt into.

Theme tokens declared in `@theme` automatically become Tailwind utilities — e.g. `--color-moss` → `bg-moss`, `text-moss`, `border-moss`. When adding a new demo with its own palette, prefer adding tokens to `@theme` over inline hex colors.

## Conventions for new demos

- Invent a fictional but plausible business name, location, and details (license #, founding year, etc.). Treat the demo as a real site, not a template.
- Commit to a distinct aesthetic direction per demo — don't reuse the tree-service look. The point of the showroom is variety.
- Unsplash URLs (`https://images.unsplash.com/photo-...?w=1400&q=80&auto=format`) are fine for placeholder imagery.
- Forms should have `action="#"` — these are visual demos, not wired to a backend.
