// ---------------------------------------------------------------------------
// Single source of truth for all site copy & content.
// Edit text here to update the whole site. (Rewritten/improved copy — review me.)
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
  eyebrow: 'Local SEO • GBP • Web Design',
  title: 'Get Found by Local Customers Who Are Ready to Buy',
  highlight: 'Ready to Buy',
  subtitle:
    'We help local businesses climb the Google Map Pack, turn a Google Business Profile into a lead machine, and build websites that actually turn visitors into customers.',
  primaryCta: { label: 'Get Started', href: '#lead-magnet' },
  secondaryCta: { label: 'Get a Free Audit', href: '#lead-magnet' },
  trustSignals: [
    'Local SEO specialists',
    'Google Business Profile experts',
    'Conversion-focused web design',
  ],
};

export const services = {
  eyebrow: 'What We Do',
  title: 'Everything You Need to Dominate Local Search',
  subtitle:
    'Three focused services that work together to put your business in front of nearby customers and turn those clicks into booked jobs.',
  items: [
    {
      icon: 'search',
      name: 'Local SEO',
      blurb:
        'Rank at the top of local search results, so nearby customers call you before they call anyone else.',
      bullets: [
        'Local keyword & competitor research',
        'On-page & technical SEO optimization',
        'Citation building & local link outreach',
        'Transparent monthly ranking reports',
      ],
    },
    {
      icon: 'map-pin',
      name: 'Google Business Profile Optimization',
      blurb:
        'Turn your Google Business Profile into your #1 lead source with a fully optimized, review-rich listing.',
      bullets: [
        'Complete profile setup & optimization',
        'Map Pack ranking strategy',
        'Review generation & response system',
        'Posts, photos & Q&A management',
      ],
    },
    {
      icon: 'layout',
      name: 'Web Design',
      blurb:
        'Websites that load instantly, look great on any phone, and turn visitors into customers.',
      bullets: [
        'Conversion-focused design & copy',
        'Lightning-fast, SEO-ready builds',
        'Mobile-first & fully responsive',
        'Lead capture & click-to-call built in',
      ],
    },
  ],
};

export const whyUs = {
  eyebrow: 'Why GrowthPeak',
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
  eyebrow: 'How It Works',
  title: 'Your Path to Page One',
  subtitle: 'A proven process that takes you from first audit to a steady stream of leads.',
  steps: [
    {
      number: '01',
      title: 'Free Audit',
      text: 'We analyze your website, Google Business Profile, and local rankings to find your biggest growth opportunities.',
    },
    {
      number: '02',
      title: 'Custom Strategy',
      text: 'You get a tailored roadmap that puts the highest-impact actions first.',
    },
    {
      number: '03',
      title: 'Build & Optimize',
      text: 'We get to work: optimizing your profile, improving your site, and building your local authority.',
    },
    {
      number: '04',
      title: 'Grow & Report',
      text: 'You watch rankings, calls, and leads climb, with clear monthly reports showing exactly what we did.',
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
    subject: 'New Free Audit Request — GrowthPeak Digital',
    submitLabel: 'Send Me My Free Audit',
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
  eyebrow: 'Questions',
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
  primaryCta: { label: 'Get Started', href: '#lead-magnet' },
  secondaryCta: { label: 'Get a Free Audit', href: '#lead-magnet' },
};
