const env = import.meta.env;

export const CONTACT_EMAIL = 'summerlynadvisors@mail.grokbot.com';

export interface Offer {
  id: 'sprint' | 'pilot' | 'prioritize' | 'rush';
  name: string;
  price: number;
  cadence: string;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
  addon?: boolean;
}

export const STRIPE_LINKS = {
  sprint: env.VITE_STRIPE_LINK_SPRINT || 'https://buy.stripe.com/test_5kQdR9ccvdRg77GgZA5EY00',
  pilot: env.VITE_STRIPE_LINK_PILOT || 'https://buy.stripe.com/test_fZu7sL90j9B0ajS38K5EY01',
  prioritize: env.VITE_STRIPE_LINK_PRIORITIZE || 'https://buy.stripe.com/test_dRm3cvgsLdRg2Rq9x85EY02',
  rush: env.VITE_STRIPE_LINK_RUSH || 'https://buy.stripe.com/test_dRmbJ14K3eVkbnW24G5EY03',
};

export const offers: Offer[] = [
  {
    id: 'pilot', name: 'Pilot 15', price: 99, cadence: 'one-time',
    tagline: 'Test the quality before you commit.',
    features: ['15 researched, call-ready contacts', 'One contact per company', 'Reason to call + full script for each', 'Credited toward a Sprint within 14 days'],
    cta: 'Try 15 for $99', href: STRIPE_LINKS.pilot,
  },
  {
    id: 'sprint', name: 'Call Sprint 50', price: 399, cadence: 'one-time', featured: true,
    tagline: 'A full week of high-intent calls.',
    features: ['50 researched, call-ready contacts', 'Delivered in 3 business days', 'Dated, sourced trigger for every contact', 'Opener, talking points, objection reply, voicemail', 'Free replacements within 14 days'],
    cta: 'Get my 50 calls', href: STRIPE_LINKS.sprint,
  },
  {
    id: 'prioritize', name: 'Prioritize My List', price: 299, cadence: 'one-time',
    tagline: 'Already have leads? We rank them.',
    features: ['Upload up to 300 of your own leads', 'Every lead scored for ICP fit + timing', 'Top 50 fully researched and scripted', 'De-duped against your customers'],
    cta: 'Rank my list', href: STRIPE_LINKS.prioritize,
  },
];

export const rushAddon: Offer = {
  id: 'rush', name: 'Rush Delivery', price: 149, cadence: 'add-on', addon: true,
  tagline: 'Next business day delivery on any order.',
  features: ['Next business day turnaround'],
  cta: 'Add rush', href: STRIPE_LINKS.rush,
};

export const howItWorks = [
  { n: '01', title: 'Pay securely', body: 'Pick a plan and check out through Stripe. No contracts, no seats, no software to learn.' },
  { n: '02', title: 'Describe your ideal customer', body: 'A 5-minute form: what you sell, who buys it, your territory, and any leads you already have.' },
  { n: '03', title: 'Start dialing', body: 'In 3 business days you get a call-ready sheet: who to call, why now, and exactly what to say.' },
];

export const sampleRow = {
  company: 'Brightpath Family Clinics',
  location: 'Austin, TX · 51–200 employees',
  contact: 'Dana Whitaker',
  title: 'Director of Operations',
  phone: '+1 (512) 555-0147',
  phoneNote: 'Company main line · verified 2026-10-19',
  bestTime: 'Tue–Thu, 8:00–9:30 a.m. CT',
  reason: 'Posted 3 front-desk / scheduler openings across 2 new locations this month.',
  triggerDate: '2026-10-12',
  opener: '“Dana, I saw Brightpath is staffing up front desks at two new sites. Most ops leads I talk to say scheduling volume breaks before hiring catches up. Is that on your radar?”',
  objection: '“We’re too busy opening the new sites.”',
  response: '“That’s exactly why I called. Could we look at it for the new sites only, so it’s live on day one?”',
  voicemail: '“Dana, [Name] from [Company]. Saw the two new Brightpath locations. I have one idea for keeping new-patient calls from overwhelming the front desk. I’ll email a short note.”',
};

export const deliverables = [
  { title: 'The right person', body: 'A named decision-maker, confirmed in role, with the best number to reach them.' },
  { title: 'A reason to call now', body: 'A dated trigger with a source link: new locations, hiring, funding, launches.' },
  { title: 'What to say, word for word', body: 'A personalized opener, talking points, an objection reply, and a 20-second voicemail.' },
  { title: 'Already scrubbed', body: 'Phone type and Do-Not-Call status labeled. Your customers and competitors excluded.' },
  { title: 'Human-reviewed', body: 'Every list is checked by a former healthcare product and GTM leader before it ships.' },
  { title: 'Guaranteed', body: 'Bad numbers, departed contacts, or off-target leads replaced free within 14 days.' },
];

export const faqs = [
  { q: 'Is this a database or a software subscription?', a: 'Neither. You get a finished deliverable: a Google Sheet and CSV with one row per contact, plus a short script sheet. No logins, seats, or annual contracts.' },
  { q: 'Where does the data come from?', a: 'Public and licensed business sources, such as company websites, press releases, job postings, and professional profiles. Every reason to call includes a source link and a date. We never invent data; blank fields stay blank and confidence is labeled.' },
  { q: 'Do you make the calls for us?', a: 'No. Your team makes the calls. We tell you who to call, why now, and what to say.' },
  { q: 'Can I upload my own leads?', a: 'Yes. Prioritize My List takes up to 300 of your existing leads, scores each for fit and timing, and fully researches the top 50. You confirm you lawfully hold the data you upload.' },
  { q: 'Do you include mobile numbers?', a: 'We prioritize business lines. Mobile numbers are only included if you confirm your team dials manually, and every number is labeled by type.' },
  { q: 'Is this for B2C?', a: 'No. Summerlyn Call Lists is B2B only.' },
  { q: 'What about TCPA and Do-Not-Call compliance?', a: 'We use public business contact information and label phone type and DNC status where available. You, the buyer, are responsible for complying with the TCPA, the National Do-Not-Call Registry, state telemarketing rules, and CAN-SPAM when you contact anyone on your list. This is not legal advice; check with your counsel.' },
  { q: 'What if a contact is wrong?', a: 'Report any departed contact, wrong or disconnected number, or off-ICP lead within 14 days and we replace it free.' },
];

export const icpPoints = [
  { title: 'The right connection', body: 'Not the company, the person. The operator who owns the problem you solve, with the authority to act on it. We map titles to pain, not titles to org charts.' },
  { title: 'The right timing', body: 'A new location, a hiring spree, a funding round, a leadership change. Triggers open a window. We find the window and date it, so your call lands while it matters.' },
  { title: 'The right words', body: 'A reason that is about them, not you. Every opener references the trigger, names a likely problem, and asks one easy question.' },
];
