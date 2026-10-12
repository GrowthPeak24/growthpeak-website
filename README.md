# GrowthPeak Digital Website

Marketing & lead-generation site for **growthpeakdigital.com**, built with **Astro + Tailwind CSS** and deployed to **Vercel**.

## Quick start

```bash
npm install
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build to ./dist
npm run preview    # preview the production build
```

## Editing content

All copy (headlines, services, FAQ, contact details, form labels) lives in a single file:

**`src/data/site.ts`** — edit text here and it updates across the whole site.

Update these real details before launch: `site.email`, `site.phone`, `site.social.*`.

## Lead magnet form (Cenvyro CRM)

The audit form posts to `/api/contact`, a Vercel Function (`api/contact.js`) that validates the lead and forwards it as JSON to the Cenvyro CRM webhook.

1. Copy `.env.example` to `.env` and set:
   ```
   CENVYRO_WEBHOOK_URL=your-cenvyro-webhook-url
   ```
2. On Vercel, add the same value as an Environment Variable named `CENVYRO_WEBHOOK_URL`. Leave off the `PUBLIC_` prefix, because it's a server-only secret.
3. `npm run dev` does not run the function. Use `vercel dev` to test the form end-to-end locally.

The form includes a honeypot spam trap, async submit with a graceful error state, and a no-JS fallback (the function returns a plain confirmation page).

## Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab).
2. Import it in Vercel — it auto-detects Astro (Framework preset: Astro).
3. Add the `CENVYRO_WEBHOOK_URL` env var.
4. Attach the custom domain `growthpeakdigital.com`.

## Brand tokens

Defined in `tailwind.config.mjs`:

- Surfaces, darkest to lightest: `brand.abyss #020B1A`, `brand.navy #0B132B`, `brand.deep #0A2540`.
- Accents: `brand.cyan #00D2FF` (the single UI accent), `brand.glow #00E5FF` (glows, gradient end), `brand.blue #0077B6` (gradient start).
- `brand.green #37ca37` (checkmarks only) and `brand.light #f8fafc` (text).

Fonts: Montserrat (headings), Lato (body), Poppins (UI), Instrument Serif italic (one accent phrase per heading).

## Before launch

- Contact details and social links in `src/data/site.ts` (`site.email`, `site.phone`, `site.social.*`).
- `CENVYRO_WEBHOOK_URL` set in Vercel and in your local `.env`.

The social share image (`public/og-image.jpg`, 1200×630) and the logo artwork (`public/assets/logo*.png`, see `CLAUDE.md` for how the dark-ground versions are generated) are already in place.
