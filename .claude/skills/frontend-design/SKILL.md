---
name: frontend-design
description: Design, build, or refine frontend UI for the GrowthPeak Digital site — new sections, component layouts, or visual polish — consistent with the existing Astro + Tailwind brand system. Invoke via /frontend-design when adding or reworking any visual/UI element.
user-invocable: true
argument-hint: "[what to design or improve, e.g. 'add a testimonials section']"
---

# Frontend Design Skill

Use this skill whenever building a new UI section/component or refining the visual design of the GrowthPeak Digital site (Astro + Tailwind CSS, see `CLAUDE.md` at the repo root for full architecture context).

## Before making changes

1. Read `tailwind.config.mjs` for the brand design tokens — never invent new colors/fonts:
   - Colors: `brand.green` `#37ca37`, `brand.blue` `#188bf6`, `brand.cyan` `#00d4ff`, `brand.navy` `#0b2545`, `brand.light` `#f8fafc`, `brand.footer` `#050e1f`
   - Fonts: `font-heading` (Montserrat), `font-body` (Lato), `font-ui` (Poppins)
   - Reusable gradients (`bg-brand-gradient`, `bg-hero-gradient`) and shadows (`shadow-card`, `shadow-card-hover`)
2. Read `src/styles/global.css` for existing component classes (`.btn-primary`, `.btn-secondary`, `.btn-outline`, `.section`, `.eyebrow`) — reuse these instead of rewriting button/section styles inline.
3. Skim 1-2 existing components in `src/components/` (e.g. `Services.astro`, `WhyUs.astro`) that resemble what you're building, to match structure and spacing conventions (`section` padding via `.section`, `container` max-widths, `grid`/`gap` patterns, `rounded-2xl` cards with `shadow-card`).
4. Check `src/components/Icon.astro`'s existing icon set before adding a new icon library — extend its `paths` map for new icons rather than pulling in a dependency.

## Design principles for this site

- **Mobile-first, responsive**: build the mobile layout first, then add `sm:`/`lg:` breakpoints. Every new section must look correct at 375px, 768px, and 1280px+ widths.
- **Zero unnecessary JS**: this site ships near-zero client JS by design (Astro static output). Only add a `<script>` block for genuine interactivity (e.g. accordions, mobile menu, form submit) — never for things CSS/HTML can already do (`:hover`, `<details>`, scroll anchors).
- **Accessibility**: semantic HTML first (`<section>`, `<article>`, `<nav>`, `<details>`), one `<h1>` per page, meaningful `alt` text, visible focus states (the global `:focus-visible` ring already handles most cases), sufficient contrast against the brand navy/cyan palette.
- **Content stays in `src/data/site.ts`**: never hardcode marketing copy directly in a `.astro` file. Add new copy fields to the relevant export in `site.ts` and reference them from the component.
- **Conversion-focused**: this is a lead-gen marketing site — every new section should visually reinforce the path toward the lead-magnet form (`#lead-magnet`) or a clear next action, consistent with the existing CTA styling.

## Workflow when invoked

1. Clarify scope if ambiguous (new section vs. restyle vs. full page).
2. Reuse existing components/classes wherever possible; only introduce new Tailwind utility combinations when no existing pattern fits.
3. Build the component in `src/components/`, wire its copy into `src/data/site.ts`, and add it to `src/pages/index.astro` (or the relevant page) in the correct visual order.
4. If a dev/preview server is running, verify the result visually (screenshot) at mobile and desktop widths before reporting done.
5. Note any new asset needs (images, icons) rather than inventing placeholder content silently.
