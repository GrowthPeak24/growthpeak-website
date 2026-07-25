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

## Lead magnet form (Web3Forms)

The audit form posts to [Web3Forms](https://web3forms.com) — no backend required. Submissions are emailed to you instantly.

1. Get a free access key at https://web3forms.com (enter the email that should receive leads).
2. Copy `.env.example` to `.env` and set:
   ```
   PUBLIC_WEB3FORMS_KEY=your-access-key
   ```
3. On Vercel, add the same key as an Environment Variable named `PUBLIC_WEB3FORMS_KEY`.

The form includes a honeypot spam trap and works with async submit + a graceful error state.

## Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab).
2. Import it in Vercel — it auto-detects Astro (Framework preset: Astro).
3. Add the `PUBLIC_WEB3FORMS_KEY` env var.
4. Attach the custom domain `growthpeakdigital.com`.

## Brand tokens

Defined in `tailwind.config.mjs`: `brand.green #37ca37`, `brand.blue #188bf6`, `brand.cyan #00d4ff`, `brand.navy #0b2545`, `brand.light #f8fafc`, `brand.footer #050e1f`. Fonts: Montserrat (headings), Lato (body), Poppins (UI).

## To add before launch

- `public/og-image.jpg` — 1200×630 social share image (currently referenced but not included).
- Real logo asset if you have one (current logo is a styled text mark in `src/components/Logo.astro`).
- Contact details + social links in `src/data/site.ts`.
