// ---------------------------------------------------------------------------
// Single source of truth for all site copy & content.
// Edit text here to update the whole site.
// ---------------------------------------------------------------------------

export const site = {
  name: 'GrowthPeak Digital',
  domain: 'growthpeakdigital.com',
  url: 'https://growthpeakdigital.com',
  tagline: 'Local SEO, Google Business Profile & Web Design',
  description:
    'GrowthPeak Digital helps local businesses rank higher on Google and turn that visibility into calls, leads, and paying customers.',
  // Update these with real details before launch.
  email: 'hello@growthpeakdigital.com',
  phone: '',
  serviceArea: 'United States',
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    x: '',
  },
} as const;

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const hero = {
  // Rendered as the glowing cyan badge above the hero headline.
  eyebrow: 'Helping Local Businesses Reach Their Digital Peak',
  title: 'Get Found by Local Customers Ready to Buy',
  highlight: 'Ready to Buy',
  // Hard cap: 20 words. Keep it short enough to read in one glance.
  subtitle:
    'We put local businesses at the top of the Map Pack and turn those clicks into booked jobs.',
  primaryCta: { label: 'Get My Free Audit', href: '#lead-magnet' },
  // Secondary is a different intent (learn) so it never competes with the primary CTA.
  secondaryCta: { label: 'See how it works', href: '#process' },
  trustSignals: [
    'Local SEO specialists',
    'Google Business Profile experts',
    'Conversion-focused web design',
  ],
};

// Eyebrows are deliberately rationed across the page (hero + lead magnet only)
// so they read as accents rather than a repeating template.
export const services = {
  title: 'Everything You Need to Dominate Local Search',
  subtitle:
    'Three services that compound: get found, convert the click, then let automation work the lead while you work the job.',
  items: [
    {
      icon: 'map-pin',
      name: 'Local SEO & Google Business Profile Optimization',
      span: 3,
      blurb:
        'Rank in the Map Pack so nearby customers call you before they call anyone else.',
      bullets: [
        'Complete Google Business Profile buildout',
        'Map Pack & local keyword strategy',
        'Citation building & local link outreach',
        'Review generation and response system',
      ],
    },
    {
      icon: 'server',
      name: 'High-Performance Web Development & Managed Hosting',
      span: 3,
      blurb:
        'Sites that load instantly, convert on mobile, and stay online without you thinking about it.',
      bullets: [
        'Conversion-focused, mobile-first builds',
        'Core Web Vitals tuned for speed',
        'Managed hosting, SSL & daily backups',
        'Ongoing updates and uptime monitoring',
      ],
    },
    {
      icon: 'bot',
      name: 'AI Chat Widgets & Automated Lead Workflows',
      span: 6,
      blurb:
        'An AI assistant that answers, qualifies, and follows up the moment a lead lands, day or night.',
      bullets: [
        'AI chat widget trained on your services',
        'Instant replies to after-hours enquiries',
        '24/7 lead capture and qualification',
        'Booking and quote requests handled automatically',
        'Automated follow-up via email & SMS',
        'CRM handoff so no lead goes cold',
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// PROOF
// Deliberately NOT client results. Every metric below is a standard we control
// and can honour on day one, so nothing here is an unverifiable performance
// claim (see the RESULTS note below for why that distinction matters here).
// The ticker lists platforms we work in - not client logos, which is the trap
// the removed trustStrip fell into.
// ---------------------------------------------------------------------------
export const proof = {
  title: 'The Standard We Hold Ourselves To',
  subtitle:
    'No invented case-study numbers. These are the commitments every engagement starts with.',
  metrics: [
    {
      value: 90,
      suffix: '+',
      label: 'Mobile PageSpeed target',
      detail: 'What every build we ship is measured against.',
    },
    {
      value: 24,
      suffix: 'h',
      label: 'Reply time on weekdays',
      detail: 'You get a human answer, not a ticket number.',
    },
    {
      value: 0,
      label: 'Long-term contracts',
      detail: 'Month to month. We re-earn it every cycle.',
    },
    {
      value: 100,
      suffix: '%',
      label: 'Plain-English reporting',
      detail: 'Rankings, calls and leads. No vanity metrics.',
    },
  ],
  ticker: [
    'Google Business Profile',
    'Google Search Console',
    'Google Analytics 4',
    'Core Web Vitals',
    'Google Maps',
    'Schema.org',
    'PageSpeed Insights',
    'Local Citations',
  ],
  deliverables: [
    {
      icon: 'layout',
      title: '100% Mobile Responsive',
      text: 'Every build is designed mobile-first and checked at phone, tablet and desktop widths before it ships.',
    },
    {
      icon: 'bolt',
      title: 'Sub-Second Page Loads',
      text: 'The load-time target we build to, measured on mobile against Core Web Vitals.',
    },
    {
      icon: 'bot',
      title: '24/7 AI Chat Lead Capture',
      text: 'An AI widget answers, qualifies and logs enquiries around the clock, including after hours.',
    },
    {
      icon: 'map-pin',
      title: 'Google Business Profile Standard',
      text: 'Categories, services, photos, posts and review handling configured to a fixed optimization checklist.',
    },
  ],
  roi: {
    modelLabel: 'Interactive Estimate Model',
    title: 'Run the Numbers Before You Talk to Us',
    subtitle:
      'Move the sliders to your own figures and see what a lift in local visibility would actually be worth to your business.',
  },
};

export const whyUs = {
  title: 'A Growth Partner Built Around Your Business',
  subtitle:
    'We keep it simple: real results, straight communication, and decisions that protect your bottom line.',
  points: [
    {
      icon: 'target',
      title: 'Local-First Focus',
      text: 'We only work with local businesses, so every tactic is built to win the Map Pack and nearby search results.',
    },
    {
      icon: 'chart',
      title: 'Results You Can Measure',
      text: 'Every month you get a plain-English report on your rankings, calls, and leads. No vanity metrics to wade through.',
    },
    {
      icon: 'bolt',
      title: 'Speed & Performance',
      text: 'We build for Core Web Vitals and mobile first, because a fast site ranks higher and converts more visitors.',
    },
    {
      icon: 'handshake',
      title: 'No Long-Term Lock-In',
      text: "We earn your business every month with results, and you're never locked into a long-term contract.",
    },
  ],
};

export const process = {
  title: 'Your 3-Step Launch Roadmap',
  subtitle:
    'Three phases, no mystery. Each one has a defined output you can hold us to before the next begins.',
  // Verb-first labels. Step numbers are a design device in Process.astro, not
  // part of the copy. `detail` is revealed by the expandable roadmap island.
  steps: [
    {
      title: 'Audit & Strategy',
      text: 'We analyse your site, Google Business Profile and local rankings, then hand you a prioritised roadmap.',
      detail: [
        'Local ranking and Map Pack position snapshot',
        'Google Business Profile health check',
        'Competitor and local keyword research',
        'Prioritised action plan, highest impact first',
      ],
    },
    {
      title: 'Build & Deploy',
      text: 'We optimise the profile, build or rebuild the site, and put the automation live.',
      detail: [
        'Profile optimisation against the full checklist',
        'Mobile-first build tuned for Core Web Vitals',
        'AI chat widget and lead workflows connected',
        'Managed hosting, SSL and backups configured',
      ],
    },
    {
      title: 'Peak Optimization',
      text: 'We keep tuning against real data and report on rankings, calls and leads in plain English.',
      detail: [
        'Ongoing citation and local authority building',
        'Review generation and response cadence',
        'Monthly plain-English performance reporting',
        'Continuous conversion and speed tuning',
      ],
    },
  ],
};

export const leadMagnet = {
  eyebrow: 'Free, No Obligation',
  title: 'Claim Your Free Local SEO & Google Business Profile Audit',
  subtitle:
    "See exactly where you rank, what's holding you back, and the fastest wins to get more local customers. We'll dig into your profile, website, and competitors, then send you a personalized action plan.",
  benefits: [
    'Your current local ranking snapshot',
    'Google Business Profile health check',
    'Website speed & conversion review',
    'A prioritized list of quick wins',
  ],
  form: {
    subject: 'New Free Audit Request | GrowthPeak Digital',
    submitLabel: 'Get My Free Audit',
    successTitle: 'Request received!',
    successMessage:
      "Thanks, we've got your details and will send your personalized audit shortly. Keep an eye on your inbox.",
    fields: {
      name: { label: 'Full Name', placeholder: 'Jane Smith' },
      email: { label: 'Email Address', placeholder: 'you@business.com' },
      business: { label: 'Business Name (optional)', placeholder: 'Smith & Co.' },
      website: { label: 'Website URL (optional)', placeholder: 'yourbusiness.com' },
    },
  },
};

export const faq = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know before getting started.',
  items: [
    {
      q: 'How long until I see results from local SEO?',
      a: 'Most clients see early movement in Google Business Profile visibility within 30 to 60 days, with real ranking and lead gains typically building over the next 3 to 6 months. Local SEO compounds, so the results keep growing the longer you stick with it.',
    },
    {
      q: 'What exactly is Google Business Profile optimization?',
      a: 'Your Google Business Profile (formerly Google My Business) is the listing that shows up on Google Maps and in the local Map Pack. We optimize everything on it: categories, services, photos, posts, and reviews, so you rank higher and get more calls, direction requests, and clicks to your website.',
    },
    {
      q: 'Do you build the website, or just optimize it?',
      a: 'Both. We build new sites from scratch and improve existing ones. Either way, every build loads fast, works on mobile, and is designed to turn visitors into leads.',
    },
    {
      q: 'Are there long-term contracts?',
      a: 'No lock-in. We earn your business every month with real, measurable results. You can adjust or pause your plan as your needs change.',
    },
    {
      q: 'How do you report on progress?',
      a: 'Every month you get a report covering your rankings, Google Business Profile performance, and the leads you generated, written in plain English.',
    },
    {
      q: 'How much does it cost?',
      a: 'It depends on your goals and how competitive your market is. Start with a free audit, and we\u2019ll recommend a plan that fits your budget.',
    },
  ],
};

export const finalCta = {
  title: 'Ready to Peak Your Local Growth?',
  subtitle:
    'Let\u2019s get your business in front of more local customers. Start with a free audit and see the opportunity before you commit to anything.',
  // Single CTA on purpose: the page has one conversion goal, so the closing
  // section does not offer a competing second action.
  primaryCta: { label: 'Get My Free Audit', href: '#lead-magnet' },
  reassurance: 'Free, no obligation, and no long-term contract.',
};
