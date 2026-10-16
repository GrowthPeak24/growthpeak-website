// ---------------------------------------------------------------------------
// Single source of truth for all site copy & content.
// Edit text here to update the whole site.
// ---------------------------------------------------------------------------

export const site = {
  name: 'GrowthPeak Digital',
  domain: 'growthpeakdigital.com',
  url: 'https://growthpeakdigital.com',
  tagline: 'Lead Capture Systems, Automation & Local SEO',
  description:
    'GrowthPeak Digital builds systems that help local service businesses catch every lead, cut hours of admin, and get paid faster, plus the local SEO and websites that get them found.',
  // Update these with real details before launch.
  email: 'hello@growthpeakdigital.com',
  phone: '',
  serviceArea: 'United States',
  social: {
    facebook: 'https://www.facebook.com/growthpeakdigital',
    instagram: 'https://www.instagram.com/growthpeakdigital/',
    linkedin: '',
    x: '',
  },
} as const;

export const nav = [
  { label: 'Leaks', href: '#leaks' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const hero = {
  // Rendered as the glowing cyan badge above the hero headline. Together the
  // chip and text name who the site is for ("Built for local service
  // businesses") so a visitor can self-select within the first glance.
  eyebrow: 'local service businesses',
  // Solid chip at the start of the two-part hero badge.
  eyebrowTag: 'Built for',
  title: 'Turn Missed Calls Into Paying Customers',
  // Italic serif phrase; in the hero it also carries the page's one gradient.
  accent: 'Paying Customers',
  // Hard cap: 20 words. Keep it short enough to read in one glance.
  subtitle:
    'Get found on Google, reply to every inquiry in seconds, and get paid faster, without hiring anyone.',
  // Concrete trades under the CTAs so a plumber, groomer or dentist can see
  // themselves in the page. Customers served by type, never client names.
  audience:
    'Plumbers, roofers, HVAC, electricians, landscapers, detailers, groomers, dental offices and more.',
  primaryCta: { label: 'Find My Lead Leaks', href: '#lead-magnet' },
  // Secondary is a different intent (learn) so it never competes with the primary CTA.
  secondaryCta: { label: 'See how it works', href: '#process' },
  trustSignals: [
    { icon: 'target', label: 'Built around how your business runs' },
    { icon: 'handshake', label: 'Month to month, no lock-in' },
    { icon: 'chart', label: 'Plain-English reporting' },
  ],
};

// ---------------------------------------------------------------------------
// LEAKS
// Problem-first framing: each card asks a question the owner can answer about
// their own business, then names the system that fixes it. Questions, not
// industry statistics, on purpose - most "missed call" figures in circulation
// come from vendors selling call tools and can't be verified.
// ---------------------------------------------------------------------------
export const leaks = {
  title: 'Where Service Businesses Quietly Lose Money',
  accent: 'Lose Money',
  subtitle:
    "Most businesses don't have a marketing problem. They have leaks. See how many of these sound familiar.",
  items: [
    {
      icon: 'phone',
      question: 'How many calls went to voicemail while you were on a job?',
      fix: 'Missed-call text back',
    },
    {
      icon: 'clock',
      question: 'How long does a web inquiry wait before someone replies?',
      fix: 'Instant lead response',
    },
    {
      icon: 'message',
      question: 'How many quotes went out and never got chased?',
      fix: 'Automatic follow-up',
    },
    {
      icon: 'refresh',
      question: 'When did your past customers last hear from you?',
      fix: 'Customer reactivation',
    },
    {
      icon: 'star',
      question: 'How many happy customers would leave a review if someone asked?',
      fix: 'Review requests',
    },
    {
      icon: 'receipt',
      question: 'How many evenings go into chasing invoices by hand?',
      fix: 'Invoicing & payment reminders',
    },
  ],
};

// Eyebrows are deliberately rationed across the page (hero + lead magnet only)
// so they read as accents rather than a repeating template.
export const services = {
  title: 'Systems That Get You Found, Booked and Paid',
  accent: 'Booked and Paid',
  subtitle:
    'Every system fixes one leak. Together they run the busywork so you can run the business.',
  items: [
    {
      icon: 'phone-incoming',
      name: 'Lead Capture System',
      span: 6,
      blurb:
        'Never lose another inquiry. Every call, form and message gets an answer in seconds, day or night, even when you are elbow-deep in a job.',
      bullets: [
        'Missed-call text back, sent instantly',
        'Instant replies to web inquiries, 24/7',
        'Leads qualified before they reach you',
        'Bookings and quote requests handled automatically',
        'Every lead logged in your CRM',
        'Hand-off to you the moment a human is needed',
      ],
    },
    {
      icon: 'refresh',
      name: 'Follow-Up & Reactivation System',
      span: 3,
      blurb:
        'Quotes get chased and past customers come back, without you having to remember to do it.',
      bullets: [
        'Automatic quote follow-up by email & SMS',
        'Past-customer reactivation campaigns',
        'Review requests after every job',
      ],
    },
    {
      icon: 'receipt',
      name: 'Invoicing & Payment System',
      span: 3,
      blurb:
        'Get paid faster with no awkward chasing. Invoices go out on time and reminders follow up politely until they are paid.',
      bullets: [
        'Invoices sent automatically when work is done',
        'Polite payment reminders on a schedule',
        'Pay-by-link so customers can pay in one tap',
      ],
    },
    {
      icon: 'map-pin',
      name: 'Local SEO & Google Business Profile',
      span: 2,
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
      icon: 'megaphone',
      name: 'Social Media Management & Posting',
      span: 2,
      blurb:
        'Stay visible without stopping work to post. Your profiles stay active and on-brand every week.',
      bullets: [
        'Content planned and written for you',
        'Consistent posting on a set schedule',
        'Profiles kept current and on-brand',
      ],
    },
    {
      icon: 'rocket',
      name: 'Websites, Hosting & Launch Pages',
      span: 2,
      blurb:
        'Sites that load instantly, convert on mobile, and stay online without you thinking about it.',
      bullets: [
        'Conversion-focused, mobile-first builds',
        'Managed hosting, SSL & daily backups',
        'Ongoing updates and uptime monitoring',
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// PROOF
// Deliberately NOT client results. Every metric below is a standard we control
// and can honor on day one, so nothing here is an unverifiable performance
// claim (see the RESULTS note below for why that distinction matters here).
// The ticker lists platforms we work in - not client logos, which is the trap
// the removed trustStrip fell into.
// ---------------------------------------------------------------------------
export const proof = {
  title: 'The Standard We Hold Ourselves To',
  accent: 'Hold Ourselves To',
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
      detail: 'Calls caught, leads booked, invoices paid. No vanity metrics.',
    },
  ],
  ticker: [
    'Google Business Profile',
    'Google Search Console',
    'Google Analytics 4',
    'Core Web Vitals',
    'Google Maps',
    'Facebook',
    'Instagram',
    'Schema.org',
    'PageSpeed Insights',
    'Local Citations',
  ],
  deliverables: [
    {
      icon: 'layout',
      title: 'Mobile-First Build Standard',
      text: 'Every build is designed mobile-first and checked at phone, tablet and desktop widths before it ships.',
    },
    {
      icon: 'bolt',
      title: 'Sub-Second Load Target',
      text: 'The load-time target we build to, measured on mobile against Core Web Vitals.',
    },
    {
      icon: 'phone',
      title: 'Instant-Reply Target',
      text: 'Calls, forms and messages are set up to get an automatic reply within seconds and land in one place, including after hours.',
    },
    {
      icon: 'map-pin',
      title: 'Google Business Profile Standard',
      text: 'Categories, services, photos, posts and review handling configured to a fixed optimization checklist.',
    },
  ],
  roi: {
    modelLabel: 'Interactive Estimate Model',
    title: 'What Are Missed Leads Costing You?',
    accent: 'Costing You?',
    subtitle:
      "Put in your own numbers. See what the inquiries you miss or answer too late add up to over a year.",
    // Shown under the estimator, when the visitor has just seen the cost of
    // missed leads. Same single CTA intent as the header, hero and final CTA.
    cta: {
      text: 'That is an estimate built from your own numbers. A free Lead Leak Audit shows where your real leaks are.',
      label: 'Find My Lead Leaks',
      href: '#lead-magnet',
    },
  },
};

export const whyUs = {
  title: "We Fix Problems. We Don't Sell Software.",
  accent: "We Don't Sell Software.",
  subtitle:
    "You don't need another app to learn. You need the leaks closed, so the business makes more and takes less of your evening.",
  points: [
    {
      icon: 'target',
      title: 'We Start With the Leak, Not the Tool',
      text: 'First we find where time and money are slipping away. Then we build only what fixes it, nothing you have to babysit.',
    },
    {
      icon: 'bolt',
      title: 'Built to Run Without You',
      text: "After hours, on weekends, while you're mid-job. The systems keep answering, following up and invoicing so you stop being the bottleneck.",
    },
    {
      icon: 'chart',
      title: 'Results in Plain English',
      text: 'Every month you see calls caught, leads booked and invoices paid. No dashboards to decode.',
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
  accent: 'Launch Roadmap',
  subtitle:
    'Three phases, no mystery. Each one has a defined output you can hold us to before the next begins.',
  // Verb-first labels. Step numbers are a design device in Process.astro, not
  // part of the copy. `detail` is revealed by the expandable roadmap island.
  steps: [
    {
      title: 'Find the Leaks',
      text: 'We look at how customers find you, how inquiries reach you, and where they drop off, then hand you a prioritized plan.',
      detail: [
        'Local ranking and Map Pack position snapshot',
        'Google Business Profile health check',
        'Map of how calls, forms and messages are handled today',
        'Prioritized action plan, biggest leak first',
      ],
    },
    {
      title: 'Build the Systems',
      text: 'We set up the systems that close your leaks, optimize your profile, and build or rebuild the site.',
      detail: [
        'Lead capture, follow-up and invoicing systems switched on',
        'Profile optimization against the full checklist',
        'Mobile-first build tuned for Core Web Vitals',
        'Managed hosting, SSL and backups configured',
      ],
    },
    {
      title: 'Tune & Report',
      text: 'We keep tuning against real data and report on calls, leads and payments in plain English.',
      detail: [
        'Follow-up and reminder timing adjusted to what works',
        'Ongoing citation and review building',
        'Monthly plain-English performance reporting',
        'Continuous conversion and speed tuning',
      ],
    },
  ],
};

export const leadMagnet = {
  // Same two-part pill as the hero: solid chip, then the reassurance text.
  eyebrowTag: 'Free',
  eyebrow: 'No obligation, no long-term contract',
  title: 'Get Your Free Lead Leak Audit',
  accent: 'Lead Leak Audit',
  subtitle:
    "Find out where customers, hours and money are slipping through the cracks. We'll look at your Google presence, your website, and how inquiries reach you, then send a plain-English action plan.",
  benefits: [
    'Where you rank on Google Maps',
    'Google Business Profile health check',
    'How inquiries reach you and what happens next',
    'The leaks costing you most, fixed first',
  ],
  // Tells the visitor exactly what happens after they click. The reply window
  // restates the 24h weekday commitment in proof.metrics; change them together.
  nextSteps: [
    'Send your details. It takes about a minute.',
    'We review your Google presence, your website, and how inquiries reach you.',
    'You get a plain-English action plan by email.',
  ],
  reassurance: 'Free, no credit card, no contract. We reply within 24 hours on weekdays.',
  form: {
    // The CRM subject line is set server-side in api/contact.js, not here.
    submitLabel: 'Find My Lead Leaks',
    successTitle: 'Request received!',
    successMessage:
      "Thanks, we've got your details. You'll hear from us within 24 hours on weekdays with your plain-English Lead Leak Audit. Keep an eye on your inbox, and your spam folder just in case.",
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
  accent: 'Questions',
  subtitle: 'Everything you need to know before getting started.',
  items: [
    {
      q: 'Do I need to understand AI or tech to use this?',
      a: "No. Some of what we build runs on AI behind the scenes, but you never have to touch it. What you see is the result: missed callers texted back, jobs booked, invoices paid.",
    },
    {
      q: "Will my customers feel like they're talking to a robot?",
      a: "Messages are written in your business's voice, and anything the system can't handle is passed straight to you or your team. The goal is a faster reply, not a colder one.",
    },
    {
      q: 'Can this work with the tools I already use?',
      a: "Usually, yes. We connect to the phone, calendar, CRM and invoicing tools you already rely on where we can, and only suggest a switch when what you have can't do the job.",
    },
    {
      q: 'How long until I see results from local SEO?',
      a: 'Local SEO is gradual, and the timeline depends on your market, your competitors and where your profile starts. We track your Google Business Profile visibility from the first week and report on it monthly in plain English, so you can see what is moving and what we are working on next.',
    },
    {
      q: 'Are there long-term contracts?',
      a: 'No lock-in. We earn your business every month with real, measurable results. You can adjust or pause your plan as your needs change.',
    },
    {
      q: 'How much does it cost?',
      a: 'It depends on which leaks you need closed and how competitive your market is. Start with a free Lead Leak Audit, and we’ll recommend a plan that fits your budget.',
    },
  ],
};

export const finalCta = {
  title: 'Ready to Stop the Leaks?',
  accent: 'Stop the Leaks?',
  subtitle:
    'Start with a free Lead Leak Audit and see where time and money are slipping away before you commit to anything.',
  // Single CTA on purpose: the page has one conversion goal, so the closing
  // section does not offer a competing second action.
  primaryCta: { label: 'Find My Lead Leaks', href: '#lead-magnet' },
  reassurance: 'Free, no obligation, and no long-term contract.',
};
