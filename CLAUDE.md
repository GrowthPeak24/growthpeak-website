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

**`src/data/site.ts`** is the single source of truth for all copy: nav links, hero text, service descriptions, "why us" points, process steps, lead-magnet copy/field labels, FAQ items, and final CTA text, plus site-wide settings (`site.email`, `site.phone`, `site.social`, canonical URL). The `results` export (case-study stats/copy) also lives here but is not currently rendered — see the placeholder note below. Every section component imports its content from this file rather than hardcoding text. When asked to change copy, edit `site.ts`, not the component markup.

Two content rules are enforced deliberately and will look like bugs if "fixed" casually:

- **Eyebrows are rationed.** Only `hero` and `leadMagnet` carry an `eyebrow` field. Services / WhyUs / Process / FAQ intentionally have none, so the label reads as an accent rather than a repeating template.
- **One CTA intent.** The primary CTA label is `Get My Free Audit` everywhere (header, hero, lead-magnet submit, final CTA). The hero's secondary CTA points at `#process` (a *learn* action), and `finalCta` has no secondary CTA at all, so nothing competes with the single conversion goal.

### Placeholder content that must not ship as-is

`src/components/Results.astro` (with the `results` export in `site.ts`) contains invented stats and case-study figures, flagged with `TODO` comments in both files. It is currently **not** rendered in `src/pages/index.astro` for exactly this reason — publishing invented performance claims on a live commercial site is a false-advertising risk. Do not re-add `<Results />` to the page (or its nav entry to `nav` in `site.ts`) until every figure has been replaced with a verified client result and the client's permission is on file. An earlier `trustStrip` placeholder (fake client monogram logos) was removed entirely — component file and data export both gone.

### Page assembly

`src/pages/index.astro` is the only page. It wraps everything in `src/layouts/BaseLayout.astro` and stacks section components in order: `Hero → Services → WhyUs → Process → LeadMagnet → FAQ → CTA`. Section backgrounds alternate deliberately (navy → white → white → light → navy → white → white) so no two adjacent sections share a surface. `BaseLayout` renders `Header`/`Footer` around the slot and pulls in `src/styles/global.css` and `Seo.astro` (meta tags, canonical, OG/Twitter tags, and JSON-LD — `LocalBusiness` always, `FAQPage` only when `includeFaqSchema` is passed).

### Motion and interaction (`BaseLayout.astro` + `global.css`)

There are **no scroll listeners anywhere on this site**, by design. Everything scroll-related uses `IntersectionObserver`:

- **Scroll reveal.** Add `data-reveal` (plus optional `data-reveal-index` for stagger) to any element. The observer in `BaseLayout.astro`'s `<script>` adds `.is-revealed`. The hidden state is scoped to `html.js`, a class set by an inline head script, so the page renders fully visible without JS.
- **Header elevation.** `Header.astro` observes a zero-height `#header-sentinel` div to toggle `shadow-md` once the page scrolls.
- **Cursor spotlight.** `.spotlight` cards get `--mx`/`--my` written on `pointermove`; the radial gradient itself is pure CSS on `::before` (needs the `isolation: isolate` + `z-index: -1` pairing to sit above the card background but below its content). Gated behind `(hover: hover) and (pointer: fine)`, with an `:active` tint fallback under `(hover: none)`.
- **Magnetic CTAs.** `.magnetic` is applied to a *wrapper* around `.btn-primary`, not the button itself, because `.btn-primary`'s `hover:-translate-y-0.5` would otherwise fight the magnet transform.

`prefers-reduced-motion: reduce` zeroes out reveals, magnets, and transitions. Verify motion changes with reduced-motion **off**; several preview/headless browsers report `reduce` and will silently skip these code paths.

### Design tokens live in `tailwind.config.mjs`

Brand colors (`brand.green/blue/cyan/navy/light/footer`) and font families (`heading` = Montserrat, `body` = Lato, `ui` = Poppins) are Tailwind theme extensions — always reference them as Tailwind classes (e.g. `text-brand-navy`, `font-heading`) rather than raw hex/font values in components.

Colors have fixed roles across the page: **`brand-blue` is the single UI accent** (eyebrows, icons, rules, metrics, spotlight glow, focus rings), **`brand-cyan`** is reserved for primary CTA fills and the hero headline highlight, and **`brand-green`** appears only on affirmative checkmarks. The global `:focus-visible` ring uses `brand-blue` rather than `brand-cyan` because cyan on white is roughly 1.7:1 and fails the 3:1 non-text contrast minimum.

Corner radii follow one documented system: **pill** (`rounded-full`) for buttons, **16px** (`rounded-2xl`) for cards and panels, **8px** (`rounded-lg`) for form inputs. `global.css` also defines `.section-title` and `.section-lede` so every section header shares one type scale.

### Lead magnet form (`src/components/LeadMagnet.astro`)

Submits client-side via `fetch` to Web3Forms (`https://api.web3forms.com/submit`), using an access key read from `PUBLIC_WEB3FORMS_KEY` (set in `.env`, gitignored — see `.env.example`). If the env var is unset, the frontmatter falls back to a placeholder string and logs a build-time `console.warn` so a broken form doesn't ship silently; the key must be configured in the deploy environment (e.g., Vercel project env vars) before launch. Includes a honeypot field for spam, an inline `<script>` handling async submit/loading/success/error states, and a native `action`/`method` fallback so the form still works without JS. The success panel is a `role="status" aria-live="polite"` region, and its heading takes programmatic focus (`tabindex="-1"` + `.focus()`) after a successful submit so screen-reader and keyboard users get the confirmation instead of landing on the now-hidden submit button. Any change to form fields must stay in sync with the labels/placeholders defined in `leadMagnet.form.fields` in `site.ts`.

### Logo handling (`src/components/Logo.astro`)

Both variants render the same artwork from `/public/assets/logo.png`. `variant="dark"` (default, for light backgrounds like the header) renders it directly; `variant="light"` (for the dark footer) wraps it in a small white rounded card, since the artwork has an opaque white background and navy tones that would vanish directly on a dark footer. If replacing the logo asset, both variants pick it up automatically since neither hardcodes colors from it.

`public/favicon.ico` (16/32/48px, embedded-PNG multi-res ICO), `public/favicon.png` (32×32), and `public/apple-touch-icon.png` (180×180) are all crops of just the mountain-peak mark (no wordmark) from `/public/assets/logo.png`, padded onto a solid white square. There is no `favicon.svg` — a generic placeholder icon previously shipped there was removed since it didn't match the brand mark and could take precedence over the real logo in browsers that prefer SVG favicons. If the logo artwork changes, regenerate these crops manually — they aren't derived automatically at build time. Referenced via `<link rel="icon">`/`<link rel="apple-touch-icon">` tags in `BaseLayout.astro`.

### Marketing images

`public/og-image.jpg` (1200×630) is the social-share image `Seo.astro`'s default `image` prop points to. `public/assets/hero-visual.png` (currently 1599×1194) is rendered in the right-hand column of `Hero.astro`'s asymmetric 7/5 split — its `width`/`height` attributes must be kept in sync with the actual file dimensions. Both were AI-generated (Higgsfield, `gpt_image_2`) as a matched pair in a premium glassmorphism dashboard-mockup style (navy/blue/cyan/green glow, floating glassy cards) on a **solid, opaque navy gradient background** (`#0b2545` → `#123a63` → `#0b2545`, matching `hero-gradient` in `tailwind.config.mjs`) — if regenerating either, prompt explicitly for a solid/opaque background (never "transparent"), since this pipeline's models render transparency requests as a literal checkerboard graphic baked into opaque RGB pixels rather than real PNG alpha. Keep the same style and exact paths so existing references and visual consistency hold.

### Known dependency pin

`@astrojs/sitemap` is pinned to the exact version `3.2.1` (no `^` range) in `package.json`. Newer versions (3.7.x+) depend on the `astro:routes:resolved` integration hook, which only exists in Astro 5 — installing a newer sitemap version against this project's Astro 4.x will crash `astro build` with `Cannot read properties of undefined (reading 'reduce')`. Do not loosen this version pin without also upgrading Astro to v5.

### Hero sizing constraint

The header is `position: fixed` at `h-16 lg:h-20`, and `<main>` compensates with `pt-16 lg:pt-20`. The hero therefore uses `min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100dvh-5rem)]` — **not** `h-screen`, which jumps when the iOS Safari address bar collapses. If you change the header height, update all three values together. The hero headline is tuned to wrap to two lines at desktop (`xl:text-5xl` against a 7-column track); a longer `hero.title` or a larger font will push it to three.

### Icons

`src/components/Icon.astro` is a minimal inline-SVG icon set keyed by name (`search`, `map-pin`, `layout`, `target`, `chart`, `bolt`, `handshake`, `check`, `phone`, `mail`, `arrow`). Add new icons by extending the `paths` map rather than pulling in an icon library.
