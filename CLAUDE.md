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

This is a single-page **Astro + Tailwind CSS** static marketing site (output: `"static"`, no SSR adapter). It deploys as static HTML to Vercel — `vercel.json` only sets response headers/caching and one rewrite (`/sitemap.xml`, see *Sitemap URLs*), it does not configure a server runtime.

It is **not** a Next.js app. There is no App Router, no SSR, no `src/pages/api`, and no database — briefs that assume those are describing a different project. The one piece of server code is the lead form's Vercel Function, `api/contact.js` (see *Lead magnet form* below), which Vercel deploys on its own alongside the static output. React exists only as an *island* layer (see below); `'use client'` is meaningless in Astro pages and only appears at the top of `.tsx` island files as a portability marker.

### Content is centralized, not scattered per-component

**`src/data/site.ts`** is the single source of truth for all copy: nav links, hero text, service descriptions, "why us" points, process steps, lead-magnet copy/field labels, FAQ items, and final CTA text, plus site-wide settings (`site.email`, `site.phone`, `site.social`, canonical URL). Every section component imports its content from this file rather than hardcoding text. When asked to change copy, edit `site.ts`, not the component markup.

**Positioning: sell the fix, not the AI.** Copy is problem-first: the business has *leaks* (missed calls, slow replies, unchased quotes, forgotten past customers, unasked reviews, hand-chased invoices) and we build *systems* that close them. Keep "AI" out of headlines and card titles and never describe a deliverable as a "chat widget"; AI is mentioned once, honestly, in the FAQ. `leaks` (rendered by `Leaks.astro`, directly under the hero) asks questions rather than quoting industry missed-call statistics, because most of those figures are vendor-sourced and unverifiable.

Two content rules are enforced deliberately and will look like bugs if "fixed" casually:

- **Eyebrows are rationed.** Only `hero` and `leadMagnet` carry an `eyebrow` field. Leaks / Services / WhyUs / Process / FAQ / Proof / Roi intentionally have none, so the label reads as an accent rather than a repeating template. Both are rendered as the two-part `.badge-split` pill (a gradient chip holding `eyebrowTag`, then the eyebrow text); the old uppercase `.eyebrow` label class no longer exists.
- **One CTA intent.** The primary CTA label is `Find My Lead Leaks` everywhere (header, hero, lead-magnet submit, final CTA). The hero's secondary CTA points at `#process` (a *learn* action), and `finalCta` has no secondary CTA at all, so nothing competes with the single conversion goal.

### No unverified client proof, anywhere

This site carries **no testimonials, star ratings, client quotes, or case-study figures**, and that is deliberate rather than an omission waiting to be filled. Two placeholders have already been deleted for the same reason — publishing invented performance claims on a live commercial site is a false-advertising risk:

- `trustStrip` (fake client monogram logos) — component and data export both gone.
- `Results.astro` + the `results` export (invented stats such as "+184% direction requests" and two fictional client stories) — deleted; recover from git history if real, permissioned figures ever arrive.

What stands in their place, and must not drift back:

- **`Proof.astro` publishes commitments, not outcomes.** `proof.metrics` are standards the business controls on day one (PageSpeed target, reply time, no contracts, plain-English reporting), and `proof.deliverables` ("System & Performance Guarantees") are concrete operational capabilities. Both describe what we do; neither describes what a past client got. Deliverable titles are worded as standards or targets ("Sub-Second Load Target", "Instant-Reply Target"), never as absolute results, and the FAQ describes how local SEO is tracked and reported rather than quoting client timelines (it is also published as `FAQPage` schema). Keep new copy in that register.
- **`proof.ticker` lists platforms we work in, not client logos** — the exact line the removed `trustStrip` crossed. It is rendered as the strip along the bottom of the hero ("Built on the platforms you already use"), where an Equinox-style layout would put a "trusted by" logo row; keep it platforms-only.
- **`Roi.astro` is arithmetic on the visitor's own inputs** (missed enquiries × close rate × customer value, framed as revenue lost). Its output is badged `proof.roi.modelLabel` ("Interactive Estimate Model") and its closing disclaimer states plainly that these are not verified historical client outcomes. Both are load-bearing; keep them visible if the component is restyled.
- **`Process.astro` builds trust through execution clarity**, not endorsement — an expandable 3-phase roadmap with a defined output per phase.

Adding any client-attributed claim requires verified figures *and* the client's permission on file.

### Page assembly

`src/pages/index.astro` is the only page. It wraps everything in `src/layouts/BaseLayout.astro` and stacks section components in order: `Hero → Leaks → Services → Proof → WhyUs → Process → Roi → LeadMagnet → FAQ → CTA`. The whole page is dark; section backgrounds alternate deliberately (hero-gradient → abyss → navy → abyss → navy → deep → navy → abyss → navy → deep) so no two adjacent sections share a surface. The hero fades into `brand-abyss` at its bottom edge so it runs seamlessly into the abyss-coloured Leaks section. `BaseLayout` renders `Header`/`Footer` around the slot and pulls in `src/styles/global.css` and `Seo.astro` (meta tags, canonical, OG/Twitter tags, and JSON-LD — `LocalBusiness` always, `FAQPage` only when `includeFaqSchema` is passed).

### React island layer (`src/components/ui/*.tsx`)

React is present **only** for interactive widgets that would be unreasonable to hand-write in vanilla JS. It is wired via `@astrojs/react`, with `components.json`, the `@/*` alias (already in `tsconfig.json`) and `src/lib/utils.ts`'s `cn()` present so 21st.dev / shadcn components install without adaptation.

Four islands exist, all **below the fold** and all mounted `client:visible`:

| Island | Mounted by | Does |
| --- | --- | --- |
| `bento-grid.tsx` | `Services.astro` | Bento cards, cursor-tracked cyan border glow |
| `metric-counter.tsx` | `Proof.astro` | Count-up metrics on first view |
| `roi-estimator.tsx` | `Roi.astro` | Three sliders, live "revenue lost to missed leads" arithmetic |
| `launch-roadmap.tsx` | `Process.astro` | Expandable 3-phase roadmap |

Rules that keep this from regressing:

- **Nothing above the fold is an island.** The hero centrepiece is `HeroRibbon.astro` — an inline-SVG light ribbon swayed by CSS keyframes, zero JS (it replaced the earlier `GridBeams.astro` beams, under the same rule) — precisely because an earlier React version pulled React and framer-motion onto the LCP critical path. Ship decoration as CSS; reserve React for state and pointer maths.
- **Never convert the lead form to React.** `LeadMagnet.astro`'s form is deliberately vanilla so its native `action`/`method` fallback keeps working without JS. Restyle its container, never its mechanism.
- Pin versions: `@astrojs/react` **3.x** and React **18** — v4 / React 19 require Astro 5, the same trap documented for `@astrojs/sitemap` below.
- Islands are lazy, so the ~102 kB gz of React + framer-motion only downloads once a visitor scrolls past the hero. Adding an island above the fold forfeits that.
- `launch-roadmap.tsx` carries a real disclosure contract: an `<ol>` of `<li>`, each toggle wrapped in an `<h3>` and carrying `aria-expanded` + `aria-controls`, each panel `role="region"` with `aria-labelledby` pointing back at its button, and the step number `aria-hidden` (the `<ol>` already conveys order). Keep all of it if the visuals change.

### 21st.dev component provenance

`components.json` and the `ui/` folder exist so catalog components drop in (`npx @21st-dev/cli add <user>/<slug>`, or `npx shadcn@latest add "https://21st.dev/r/<user>/<slug>"`). The four islands currently in `ui/` were **hand-written in that idiom**, not pulled from the catalog — retrieving 21st component code is a paid/quota-limited operation. They can be replaced by real catalog components without touching the `.astro` callers, provided the replacement keeps the same props (`items` / `metrics` / none).

### Motion and interaction (`BaseLayout.astro` + `global.css`)

There are **no scroll listeners anywhere on this site**, by design. Everything scroll-related uses `IntersectionObserver`:

- **Scroll reveal.** Add `data-reveal` (plus optional `data-reveal-index` for stagger) to any element. The observer in `BaseLayout.astro`'s `<script>` adds `.is-revealed`. The hidden state is scoped to `html.js`, a class set by an inline head script, so the page renders fully visible without JS. **Never put `data-reveal` on hero content**: the `<h1>` is the LCP element, and a reveal keeps it at `opacity: 0` until the deferred script runs (or forever, if the script fails). The hero paints immediately; reveals start at the Leaks section.
- **Header elevation.** `Header.astro` observes a zero-height `#header-sentinel` div to toggle `shadow-md` once the page scrolls.
- **Cursor spotlight.** `.spotlight` cards get `--mx`/`--my` written on `pointermove`. The listener is **delegated on `document`** rather than bound per card, because the bento and metric cards are rendered by React islands that mount *after* `BaseLayout`'s script runs — a `querySelectorAll` pass at load would miss them. The radial gradient itself is pure CSS on `::before` (needs the `isolation: isolate` + `z-index: -1` pairing to sit above the card background but below its content). Gated behind `(hover: hover) and (pointer: fine)`, with an `:active` tint fallback under `(hover: none)`. `bento-grid.tsx` layers a second, brighter border glow on top via framer-motion motion values — that one is React's, the `--mx`/`--my` one is not.
- **Magnetic CTAs.** `.magnetic` is applied to a *wrapper* around `.btn-primary`, not the button itself, because `.btn-primary`'s `hover:-translate-y-0.5` would otherwise fight the magnet transform.

`prefers-reduced-motion: reduce` zeroes out reveals, magnets, and transitions. Verify motion changes with reduced-motion **off**; several preview/headless browsers report `reduce` and will silently skip these code paths.

### Design tokens live in `tailwind.config.mjs`

Brand colors (`brand.abyss/navy/deep/blue/cyan/glow/green/light`) and font families (`heading` = Montserrat, `body` = Lato, `ui` = Poppins, `accent` = Instrument Serif italic) are Tailwind theme extensions — always reference them as Tailwind classes (e.g. `text-brand-navy`, `font-heading`) rather than raw hex/font values in components.

Colors have fixed roles across the page. Surfaces run darkest to lightest: `brand-abyss` (#020B1A, deepest ground — header, footer, alternating sections), `brand-navy` (#0B132B, the default section background and `body` colour), `brand-deep` (#0A2540, raised panels). **`brand-cyan` (#00D2FF) is the single UI accent** (eyebrows, icons, rules, focus rings, glass borders, spotlight glow); **`brand-glow` (#00E5FF)** is the brightest cyan, used for beams, glows and the end of the gradient; **`brand-blue` (#0077B6)** is the gradient's start and never appears alone as a text colour; **`brand-green`** still appears only on affirmative checkmarks. The `brand-gradient` (blue → glow) carries primary CTA fills and the one gradient-text headline highlight per page.

The global `:focus-visible` ring uses `brand-cyan` — on the dark ground it measures ~10.3:1, comfortably clearing the 3:1 non-text minimum. This is the reverse of the old light theme, where cyan on white was ~1.7:1 and the ring had to use blue instead. **If any section is ever returned to a light surface, the focus ring on it must go back to `brand-blue`.**

Corner radii follow one documented system: **pill** (`rounded-full`) for buttons, **16px** (`rounded-2xl`) for cards and panels, **8px** (`rounded-lg`) for form inputs. `global.css` also defines `.section-title` and `.section-lede` so every section header shares one type scale.

### Visual style (Equinox-inspired)

The look is modelled on the "Equinox" SaaS template, translated into the brand palette: calm, centred hero, semibold (not extra-bold) headings with tight tracking, and **one italic serif phrase per heading**. Each section's copy object in `site.ts` carries an `accent` string; `AccentTitle.astro` splits the title on it and wraps that phrase in `.accent` (`font-accent` italic at 1.08em). Only the hero passes `gradient`, keeping the one-gradient-highlight-per-page rule. If you change a `title`, keep its `accent` an exact substring or the phrase silently renders plain.

Two shared surfaces carry the style, both defined once in `global.css`: `.glass` (deep-blue panel, lighter at the top, faint cyan border, lit top rim, soft blue drop glow) and `.icon-tile` (glossy blue-to-cyan square heading a card, used by Leaks, Proof and the bento cards). Restyle those classes rather than re-styling individual cards. `.glass` deliberately has **no** `backdrop-filter`: the panels sit on near-flat grounds where a blur is invisible but still costs a GPU pass per panel; keep blur only where something real sits behind the surface (header, hero badge, hero platform strip).

Typography floor, verified by audit: headings and card titles are semibold (600), display numerals (Proof metrics, calculator total) are bold (700) solid white with `tabular-nums` — not gradient, since the hero phrase is the page's only gradient text. Montserrat ships 600/700 only; adding a heading at another weight means adding its `@fontsource` import. Readable text never goes darker than `text-slate-400` on these grounds (`slate-500` measured 3.9–4.1:1, failing AA), and that includes input placeholders. Micro-labels are sentence case; the one uppercase label left is the calculator's required "Interactive Estimate Model" badge. `BaseLayout.astro` preloads the two hero faces (Montserrat 600, Instrument Serif italic) via `?url` imports — update those paths if the hero's fonts change. The calculator's `.roi-slider` is a 44px-tall input with the 6px line drawn as a centred background, so the touch target never shrinks to the line. Footer links and contact rows are `min-h-11` (44px) for the same reason, and the social buttons `h-11 w-11`. Equinox's per-section outlined labels were deliberately **not** adopted (eyebrows stay rationed), and neither was its "trusted by" logo row.

The header puts the nav beside the logo and shows "Weekday replies within 24h" on the right at `xl` — a restatement of the reply-time commitment in `proof.metrics`, not a live presence indicator. Change both together.

### Lead magnet form (`src/components/LeadMagnet.astro`)

Submits client-side via `fetch` to `/api/contact`, a Vercel Function in the root `api/contact.js` — not `src/pages/api/`, since the site is static with no SSR adapter. `npm run dev` does not serve it; use `vercel dev`. The function validates the fields, silently drops honeypot hits, and forwards the lead as JSON to the Cenvyro CRM webhook read from the server-only `CENVYRO_WEBHOOK_URL` (Vercel project env vars, and `.env` locally — never give it a `PUBLIC_` prefix). It answers `{ success, message }` JSON when the request accepts JSON, and a minimal HTML confirmation page for the no-JS native post. Includes a honeypot field for spam, an inline `<script>` handling async submit/loading/success/error states, and a native `action`/`method` fallback so the form still works without JS. The success panel is a `role="status" aria-live="polite"` region, and its heading takes programmatic focus (`tabindex="-1"` + `.focus()`) after a successful submit so screen-reader and keyboard users get the confirmation instead of landing on the now-hidden submit button. Each input carries an `autocomplete` token (`name`, `email`, `organization`, `url`) so mobile keyboards can autofill; keep them on any new or renamed field. Any change to form fields must stay in sync with the labels/placeholders defined in `leadMagnet.form.fields` in `site.ts`.

The panel is styled with `.glass .glass-glow` (frosted surface + cyan edge glow). That is presentation only — the `<form>`, its inline `<script>`, the honeypot and the no-JS fallback are untouched and must stay that way.

### Logo handling (`src/components/Logo.astro`)

`variant="dark"` (default, for light backgrounds) renders the original artwork `/public/assets/logo.png` (opaque white ground, navy wordmark). Since the dark rebrand **nothing on the page uses it**; it is kept for any future light surface.

`variant="light"` is what the header and footer use, and it has **no white card** — it renders artwork recoloured for dark grounds, so it sits directly on the navy bar:
- **Header** (`<Logo variant="light" />`): a lockup of `/public/assets/logo-mark-light.png` (the mountain only, `alt=""`) plus the name as live text — "GrowthPeak" white, "Digital" brand cyan, Montserrat semibold. The stacked artwork is not used here because at header height its "DIGITAL" line would shrink to ~6px.
- **Footer** (`<Logo variant="light" stacked />`): the full stacked artwork, `/public/assets/logo-light.png`, at `w-44`.

Both light PNGs are generated with ffmpeg from the transparent source `src/assets/brand/logo-transparent-source.png` (500×500; not shipped — nothing imports it): rows ≥370 ("DIGITAL") → brand cyan `#00D2FF`, rows 300–369 ("GROWTH PEAK") → `#F8FAFC`, and in the mountain, navy pixels (`b<115 && g<75`) → brand blue `#0077B6`; alpha is preserved so edges stay anti-aliased. The mark is cropped to the mountain (x 99–404, y 48–289) and scaled to 144px tall; the stacked logo is trimmed to the artwork and scaled to 440px wide. If the logo artwork changes, regenerate both from a new transparent source the same way — they are not derived at build time.

`public/favicon.ico` (16/32/48px, embedded-PNG multi-res ICO), `public/favicon.png` (32×32), and `public/apple-touch-icon.png` (180×180) are all crops of just the mountain-peak mark (no wordmark) from `/public/assets/logo.png`, padded onto a solid white square. There is no `favicon.svg` — a generic placeholder icon previously shipped there was removed since it didn't match the brand mark and could take precedence over the real logo in browsers that prefer SVG favicons. If the logo artwork changes, regenerate these crops manually — they aren't derived automatically at build time. Referenced via `<link rel="icon">`/`<link rel="apple-touch-icon">` tags in `BaseLayout.astro`.

### Marketing images

`public/og-image.jpg` (1200×630) is the social-share image `Seo.astro`'s default `image` prop points to. Its former partner, `public/assets/hero-visual.png`, was deleted once the centred hero replaced it with the code-drawn `HeroRibbon.astro` (recover it from git history if a split hero returns). Both were AI-generated (Higgsfield, `gpt_image_2`) as a matched pair in a premium glassmorphism dashboard-mockup style (navy/blue/cyan/green glow, floating glassy cards) on a **solid, opaque navy gradient background** (`#0b2545` → `#123a63` → `#0b2545`, matching `hero-gradient` in `tailwind.config.mjs`) — if regenerating either, prompt explicitly for a solid/opaque background (never "transparent"), since this pipeline's models render transparency requests as a literal checkerboard graphic baked into opaque RGB pixels rather than real PNG alpha. Keep the same style and the same path so existing references and visual consistency hold.

### Known dependency pin

`@astrojs/sitemap` is pinned to the exact version `3.2.1` (no `^` range) in `package.json`. Newer versions (3.7.x+) depend on the `astro:routes:resolved` integration hook, which only exists in Astro 5 — installing a newer sitemap version against this project's Astro 4.x will crash `astro build` with `Cannot read properties of undefined (reading 'reduce')`. Do not loosen this version pin without also upgrading Astro to v5.

### Sitemap URLs

`@astrojs/sitemap` writes `sitemap-index.xml` and `sitemap-0.xml` only; it never emits `sitemap.xml`, so that path would 404. `vercel.json` therefore rewrites `/sitemap.xml` to `/sitemap-index.xml` (a rewrite, not a redirect, so crawlers get a 200), and `robots.txt` advertises `https://growthpeakdigital.com/sitemap.xml`. A `vercel.json` header rule forces `Content-Type: application/xml; charset=UTF-8` on `/sitemap.xml`, `/sitemap-index.xml` and `/sitemap-0.xml` (Vercel's default omits the charset). The Vercel primary domain is the apex; `www` 308-redirects to it, and that redirect lives in the Vercel dashboard, not in `vercel.json`. `site` in `astro.config.mjs` is the apex `https://growthpeakdigital.com`, and every sitemap `<loc>`, canonical and `og:url` is built from it, so keep the Vercel primary domain and `site` on the same host (Search Console flags sitemap URLs that redirect as "Page with redirect").

### Hero sizing constraint

The header is `position: fixed` at `h-16 lg:h-20`, and `<main>` compensates with `pt-16 lg:pt-20`. The hero therefore uses `min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100dvh-5rem)]` — **not** `h-screen`, which jumps when the iOS Safari address bar collapses. If you change the header height, update all three values together. The hero is a centred single column; its headline is tuned to wrap to two lines from `lg` up (`max-w-4xl`, up to `xl:text-[4.25rem]`), and to three on phones. A longer `hero.title` or a larger size will add a line.

### Icons

Two icon sets, split by rendering layer:

- **`.astro` components** use `src/components/Icon.astro`, a minimal inline-SVG set keyed by name (`search`, `map-pin`, `layout`, `target`, `chart`, `bolt`, `handshake`, `bot`, `check`, `phone`, `mail`, `arrow`, `clock`, `message`, `refresh`, `star`, `receipt`). Add new icons by extending its `paths` map — do not pull an icon library into the Astro layer, since it would ship SVG that inline markup already covers.
- **`.tsx` islands** use `lucide-react`. `bento-grid.tsx` maps the string `icon` names from `site.ts` to Lucide components through its own `ICONS` record; **every `icon` value used by `services.items` must have an entry there**, or the card silently falls back to the search glyph. Import icons individually (`import { Bot } from 'lucide-react'`) so tree-shaking holds.
