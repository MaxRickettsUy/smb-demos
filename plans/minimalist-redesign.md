# Plan: Strip the showroom back to minimalist, contact-first demos

**Status:** Proposed — not yet implemented.
**Date:** 2026-05-21

## Goal

Move away from the heavily art-directed look (paper grain, topo maps, animated
seals, marquee tickers, variable display fonts, 7 narrative sections) toward
**simple, fast, quick-reference business sites**. A visitor should find the
company name, phone, email, address, hours, and what the business does within a
second or two — aesthetics serve legibility, not the other way around.

## Decisions locked in (from review)

1. **Shared simple template.** Demos will reuse one minimal layout + a small set
   of components. This reverses the current CLAUDE.md "intentionally NOT
   templated" convention — CLAUDE.md will be updated to match.
2. **Contact-first minimal content.** Each demo shows: business name, tagline,
   phone, email, address + hours, a short services list, and a simple contact
   form. Drop the photo gallery, service-area map, testimonials, animated seal,
   and ticker.
3. **Simplify the showroom index too**, in the same minimalist style.

## Assumptions (override if wrong)

- **Imagery stays optional and light.** "Drop Unsplash photos" was not selected,
  so the template supports one optional header/hero image per demo, but demos
  read fine with none. No photo galleries.
- **Tree-service is preserved, not overwritten.** "Rewrite in place" was not
  selected. The ornate version moves to `demos/tree-service-classic/` as an
  archived "before"; the new minimal `demos/tree-service/` is built from the
  shared template. (If you'd rather just overwrite it, say so and I'll skip the
  archive step.)

## Target architecture

```
src/
  layouts/
    Layout.astro              # unchanged role: <head>, fonts, global.css
  components/                 # NEW
    SiteHeader.astro          # business name + phone + nav (sticky, minimal)
    ContactCard.astro         # phone / email / address / hours block
    Services.astro            # simple list of services
    ContactForm.astro         # name / phone / email / message, action="#"
    SiteFooter.astro          # name, contact, license, back-to-showroom
  pages/
    index.astro               # simplified showroom catalog
    demos/
      <slug>/index.astro      # thin: defines a `business` data object, composes components
```

### Data-driven demos

Each demo's `index.astro` becomes mostly a typed data object plus a short
composition of shared components. A shared TypeScript interface keeps them
consistent:

```ts
interface Business {
  name: string;
  trade: string;            // "Tree Service", "Plumbing", ...
  tagline?: string;
  location: string;
  phone: string;            // display form
  phoneHref: string;        // tel: form
  email: string;
  address: string[];        // street, city/state lines
  hours: { days: string; time: string }[];
  services: { title: string; blurb?: string }[];
  license?: string;
  founded?: string;
  heroImage?: string;       // optional Unsplash URL
  accent?: string;          // optional per-demo accent color token
}
```

The "bespoke per trade" variety is reduced to a single optional **accent color**
plus copy — enough to feel distinct without per-demo art direction.

## Page layout (every demo)

1. **Header** — business name (left), phone as a tap-to-call button (right).
   Sticky, thin, no logo seals.
2. **Hero** — name, one-line tagline, location, primary phone + email CTA.
   Optional single image.
3. **Services** — plain list/grid of service names with one-line blurbs. No
   numbered editorial layout, no hover choreography.
4. **Contact** — `ContactCard` (phone, email, address, hours) beside a short
   `ContactForm` (name, phone, email, message; `action="#"`).
5. **Footer** — name, contact repeat, license #, "← Back to Showroom".

## global.css cleanup

Strip the decorative layer; keep a small, neutral token set.

- **Remove:** `.grain` / `.grain-light`, `.topo`, `.rule-thick`, `.rise*`
  animations, `.ticker-track`, `.spin-slow`, `.link-quill`, `.font-display-soft`,
  and the moss/bark/kraft/rust palette.
- **Keep / replace:** a neutral base palette (ink, paper/white, muted gray, one
  accent), a single readable sans/serif pairing, and `.label` only if still
  useful. Per-demo accents come from `@theme` tokens or a CSS var set on the demo
  root.
- **Fonts:** drop Fraunces variable-font axes and the three-family load. Use one
  clean system-friendly pairing (e.g. a single Google sans) to cut weight and the
  "designed" feel. Update the `<link>` in `Layout.astro` accordingly.

## Showroom index (`pages/index.astro`)

- Replace the "Field Catalog / Volume 01" editorial framing with a plain title +
  one-line description.
- Demo cards become simple: business name, trade, location, and a "View" link.
  Drop the color-swatch tiles, oversized index numerals, grain, and the dashed
  "coming soon" panel (or reduce it to a single muted line).
- Keep the `demos` array as the single source of truth for the catalog.

## CLAUDE.md updates

- Rewrite the **Purpose** and **Conventions** sections: demos now share a minimal
  template and a `Business` data shape; the goal is quick-reference clarity, not
  per-demo art direction.
- Document the `components/` directory and the `Business` interface.
- Note that accent color + copy are the only per-demo variation.
- Keep the Unsplash and `action="#"` form notes.

## Implementation steps (when approved)

1. Add the neutral token set / font change to `global.css`; remove decorative
   utilities. Update `Layout.astro` font `<link>`.
2. Create the `Business` interface (e.g. `src/lib/business.ts`) and the five
   shared components.
3. Archive the current demo to `demos/tree-service-classic/` (unless overwriting).
4. Build the minimal `demos/tree-service/index.astro` from the template as the
   reference implementation.
5. Simplify `pages/index.astro`.
6. Update CLAUDE.md.
7. `npm run build` to confirm static output is clean; spot-check `npm run dev`.

## Open questions

- Keep the archived `tree-service-classic`, or just overwrite (drop the ornate
  version entirely)?
- Any specific minimalist reference you like (e.g. plain black-on-white, or a
  light brand accent)? Default plan: near-monochrome with one accent per demo.
- Add a second minimal demo (plumber/salon) now to prove the template, or keep
  scope to tree-service + index for this pass?
```
