# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Purpose

A showroom of demonstration small-business websites built for fast customer review. Each demo should feel like a clear, plausible business site where visitors can quickly find the company name, phone, email, address, hours, services, and contact form.

Demos now share a minimal contact-first template. Per-demo variation should come from the business copy, optional hero image, and one accent color, not from separate art-directed layouts.

## Commands

```bash
npm run dev      # astro dev server
npm run build    # static build to ./dist
npm run preview  # preview built site
```

Node `>=22.12.0` required.

## Architecture

Single Astro app, static output, Tailwind v4 via the Vite plugin (no `tailwind.config.js` — theme tokens live in CSS).

- `src/pages/index.astro` — the minimalist showroom catalog listing all demos.
- `src/pages/demos/<slug>/index.astro` — one folder per demo site. New demos should be thin pages that define a `Business` data object and compose shared components.
- `src/lib/business.ts` — the shared `Business` interface used by demo pages and components.
- `src/components/` — shared minimal demo components:
  - `SiteHeader.astro` — business name, simple nav, and tap-to-call button.
  - `ContactCard.astro` — phone, email, address, and hours.
  - `Services.astro` — simple service cards.
  - `ContactForm.astro` — visual-only form with `action="#"`.
  - `SiteFooter.astro` — repeated contact details and showroom link.
- `src/layouts/Layout.astro` — imports `global.css`, loads the Google Font, accepts `title` and `description` props.
- `src/styles/global.css` — Tailwind v4 entrypoint plus a neutral token set and small shared utilities.
- `src/styles/classic.css` — legacy styling for archived before-state demos only.

## Business Data

New demos should follow this shape:

```ts
interface Business {
  name: string;
  trade: string;
  tagline?: string;
  location: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string[];
  hours: { days: string; time: string }[];
  services: { title: string; blurb?: string }[];
  license?: string;
  founded?: string;
  heroImage?: string;
  accent?: string;
}
```

## Conventions for New Demos

- Invent a fictional but plausible business name, location, and details such as license number or founding year.
- Use the shared minimal template unless there is a strong reason not to.
- Keep content contact-first: name, tagline, phone, email, address, hours, services, and a simple contact form.
- Use one optional hero image only; Unsplash URLs (`https://images.unsplash.com/photo-...?w=1400&q=80&auto=format`) are fine for placeholder imagery.
- Use a single accent color via the `Business.accent` value when a demo needs light differentiation.
- Forms should have `action="#"` — these are visual demos, not wired to a backend.
