# Product

<!-- impeccable:product-schema 1 -->

> Written 2026-10-16 from the repository (CLAUDE.md, `src/data/site.ts`) and the owner's statements in the working session. The owner asked for this to be created without an interview, so facts marked *(inferred)* come from the repo and have not been separately confirmed.

## Platform

web

## Users

Owners and managers of small US local service businesses: plumbers, roofers, HVAC, electricians, landscapers, car wash and detailing, dental offices and pet groomers. They are usually on a job or with a client when a call or message arrives, so leads slip through: calls go to voicemail, web inquiries wait, quotes are never chased, past customers go quiet, reviews go unasked and invoices are chased by hand. Their job on this site is to decide whether GrowthPeak Digital can close those leaks and, if so, to request the free audit. *(Situation inferred from the site's own Leaks section.)*

## Product Purpose

GrowthPeak Digital builds lead-capture, follow-up, invoicing and payment systems, plus local SEO and Google Business Profile work, social posting and websites, for those businesses. The site has one conversion goal: a free audit request ("Get My Free Audit"). Success measure is not yet defined. *(Open decision: what counts as a qualified request, and the target volume.)*

## Positioning

Sell the fix, not the AI. The copy is problem-first: the business has leaks and GrowthPeak builds the systems that close them. Terms are month to month with no lock-in, reporting is in plain English (calls caught, leads booked, invoices paid), and the audit is produced with the owner's own auditing system, which returns a free audit in minutes (stated by the owner).

## Operating Context

- A small remote operation serving US businesses.
- A US phone number and `hello@growthpeakdigital.com` are the published contact points. A callback or response-time promise beyond "replies within 24 hours on weekdays" is deliberately not made yet.
- No street address is published, on purpose.
- Leads submit through a form to a Vercel Function that forwards to the owner's CRM. There is no SMS or texting program running yet; US business-texting registration and consent wording are still to be done before one starts.
- The founder's name is published (Marlon Cotterell). No photo and no years-of-experience figure are published, by the owner's choice.

## Capabilities and Constraints

- Static Astro site with a few React islands; deployed on Vercel with an enforced same-origin Content-Security-Policy. Third-party scripts, fonts, images and analytics need a CSP change.
- The lead form must keep working without JavaScript.
- Copy lives in `src/data/site.ts` and uses US English throughout.
- The site makes no unverifiable performance claims: standards and targets only, never past-client outcomes.
- Privacy Policy and Terms of Use pages exist as plain-language drafts and have not had legal review.

## Brand Commitments

- Name: GrowthPeak Digital. Voice: plain English, problem-first, no jargon in card copy.
- One primary CTA label ("Get My Free Audit") everywhere; no competing second conversion action.
- Positioning rules in CLAUDE.md are binding (rationed eyebrows, one gradient highlight, dark surface system, no scroll listeners).

## Evidence on Hand

None that may be published as client proof. There are **no testimonials, case studies, client logos, ratings or measured client results**, and none may be invented. Real, permissioned results are the only thing that unlocks adding them. The platform ticker lists tools the business works in, not clients.

## Product Principles

1. Name the leak before the tool.
2. One conversion goal per page, stated the same way every time.
3. Publish commitments the business controls, never outcomes it cannot show.
4. Be honest about who is behind the work and where it comes from; say less rather than imply more.
5. Plain language a busy owner can read in one glance.

## Accessibility & Inclusion

Target WCAG 2.2 AA: visible focus, 44px touch targets for primary controls, labeled form fields, reduced-motion support and no horizontal scroll from 320px up. *(Inferred from existing implementation and the site's own audit.)*
