# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev         # start dev server at http://localhost:4321
npm run build       # production build to ./dist (also generates the sitemap)
npm run preview     # serve the production build locally
```

There is no test suite, linter, or type-check script configured. `tsconfig.json` extends `astro/tsconfigs/strict`, so type errors will surface in editor tooling and during `astro build`'s type-collection step, but there is no standalone `astro check` script — run `npx astro check` manually if needed.

## Architecture

This is a single-page **Astro + Tailwind CSS** static marketing site (output: `"static"`, no SSR adapter). It deploys as static HTML to Vercel — `vercel.json` only sets response headers/caching, it does not configure a server runtime.

### Content is centralized, not scattered per-component

**`src/data/site.ts`** is the single source of truth for all copy: nav links, hero text, service descriptions, "why us" points, process steps, lead-magnet copy/field labels, FAQ items, and final CTA text, plus site-wide settings (`site.email`, `site.phone`, `site.social`, canonical URL). Every section component imports its content from this file rather than hardcoding text. When asked to change copy, edit `site.ts`, not the component markup.

### Page assembly

`src/pages/index.astro` is the only page. It wraps everything in `src/layouts/BaseLayout.astro` and stacks section components in order: `Hero → Services → WhyUs → Process → LeadMagnet → FAQ → CTA`. `BaseLayout` renders `Header`/`Footer` around the slot and pulls in `src/styles/global.css` (Tailwind directives + `@fontsource` imports + custom `.btn-*`/`.section`/`.eyebrow` component classes) and `Seo.astro` (meta tags, canonical, OG/Twitter tags, and JSON-LD — `LocalBusiness` always, `FAQPage` only when `includeFaqSchema` is passed).

### Design tokens live in `tailwind.config.mjs`

Brand colors (`brand.green/blue/cyan/navy/light/footer`) and font families (`heading` = Montserrat, `body` = Lato, `ui` = Poppins) are Tailwind theme extensions — always reference them as Tailwind classes (e.g. `text-brand-navy`, `font-heading`) rather than raw hex/font values in components.

### Lead magnet form (`src/components/LeadMagnet.astro`)

Submits client-side via `fetch` to Web3Forms (`https://api.web3forms.com/submit`), using an access key read from `PUBLIC_WEB3FORMS_KEY` (set in `.env`, gitignored — see `.env.example`). Includes a honeypot field for spam, an inline `<script>` handling async submit/loading/success/error states, and a native `action`/`method` fallback so the form still works without JS. Any change to form fields must stay in sync with the labels/placeholders defined in `leadMagnet.form.fields` in `site.ts`.

### Logo handling (`src/components/Logo.astro`)

Both variants render the same artwork from `/public/assets/logo.png`. `variant="dark"` (default, for light backgrounds like the header) renders it directly; `variant="light"` (for the dark footer) wraps it in a small white rounded card, since the artwork has an opaque white background and navy tones that would vanish directly on a dark footer. If replacing the logo asset, both variants pick it up automatically since neither hardcodes colors from it.

`public/favicon.png` is a 32×32 crop of just the mountain-peak mark (no wordmark) from `/public/assets/logo.png`, padded onto a solid white square. If the logo artwork changes, regenerate this crop manually — it isn't derived automatically at build time. Referenced alongside `public/favicon.svg` via two `<link rel="icon">` tags in `BaseLayout.astro`.

### Marketing images

`public/og-image.jpg` (1200×630) is the social-share image `Seo.astro`'s default `image` prop points to. `public/assets/hero-visual.png` (currently 1599×1194) is rendered directly in `Hero.astro` below the trust-signal badges — its `width`/`height` attributes must be kept in sync with the actual file dimensions. Both were AI-generated (Higgsfield, `gpt_image_2`) as a matched pair in a premium glassmorphism dashboard-mockup style (navy/blue/cyan/green glow, floating glassy cards) on a **solid, opaque navy gradient background** (`#0b2545` → `#123a63` → `#0b2545`, matching `hero-gradient` in `tailwind.config.mjs`) — if regenerating either, prompt explicitly for a solid/opaque background (never "transparent"), since this pipeline's models render transparency requests as a literal checkerboard graphic baked into opaque RGB pixels rather than real PNG alpha. Keep the same style and exact paths so existing references and visual consistency hold.

### Known dependency pin

`@astrojs/sitemap` is pinned to the exact version `3.2.1` (no `^` range) in `package.json`. Newer versions (3.7.x+) depend on the `astro:routes:resolved` integration hook, which only exists in Astro 5 — installing a newer sitemap version against this project's Astro 4.x will crash `astro build` with `Cannot read properties of undefined (reading 'reduce')`. Do not loosen this version pin without also upgrading Astro to v5.

### Icons

`src/components/Icon.astro` is a minimal inline-SVG icon set keyed by name (`search`, `map-pin`, `layout`, `target`, `chart`, `bolt`, `handshake`, `check`, `phone`, `mail`, `arrow`). Add new icons by extending the `paths` map rather than pulling in an icon library.
