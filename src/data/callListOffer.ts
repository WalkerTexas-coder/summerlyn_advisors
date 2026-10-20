const env = import.meta.env;

export const CONTACT_EMAIL = 'summerlynadvisors@mail.grokbot.com';
export const LEGAL_EFFECTIVE_DATE = 'October 20, 2026';

export const STRIPE_LINKS = {
  daily2: env.VITE_STRIPE_LINK_DAILY2 || 'https://buy.stripe.com/test_28E8wPb8r7sSeA8aBc5EY05',
  daily5: env.VITE_STRIPE_LINK_DAILY5 || 'https://buy.stripe.com/test_3cIdR94K300qdw424G5EY04',
  daily10: env.VITE_STRIPE_LINK_DAILY10 || 'https://buy.stripe.com/test_8x2fZh4K37sS77GcJk5EY06',
  daily20: env.VITE_STRIPE_LINK_DAILY20 || 'https://buy.stripe.com/test_28E14n0tN7sS3Vu24G5EY07',
};

export const SIGNUP_PATH = '/signup';

export interface DailyTier {
  featured?: boolean;
  id: string;
  name: string;
  callsPerDay: number;
  price: number | null; // monthly USD; null = pricing pending (hidden from site)
  href: string;
  tagline: string;
  features: string[];
  cta: string;
  cadence: string;
}

// Daily-calls subscription tiers. Add a tier here (plus its Stripe link) to show it on the site.
// Daily-calls subscription tiers. Add a tier here (plus its Stripe link) to show it on the site.
// Tiers with price === null are hidden.
export const dailyCommonFeatures = [
  'One email each weekday with that day’s calendar invites',
  'Each invite: name, phone, why they were selected, reason to call now',
  'Call playbook: opener, discovery questions, objection handling, the ask',
  'Mon–Fri, skipping US federal holidays',
  'Never repeats a contact · bad numbers replaced',
  'Cancel anytime',
];

const tier = (id: string, calls: number, price: number, href: string, tagline: string, featured = false): DailyTier => ({
  id, name: `Daily ${calls}`, callsPerDay: calls, price, href, tagline, featured, cadence: 'month',
  cta: `Start Daily ${calls}`,
  features: [`${calls} high-target calls every weekday`, `About ${calls * 21} researched contacts a month`],
});

export const dailyTiers: DailyTier[] = [
  tier('daily2', 2, 199, STRIPE_LINKS.daily2, 'For founders who sell between everything else.'),
  tier('daily5', 5, 499, STRIPE_LINKS.daily5, 'A focused hour of calls every morning.', true),
  tier('daily10', 10, 899, STRIPE_LINKS.daily10, 'For a full-time rep’s prospecting block.'),
  tier('daily20', 20, 1599, STRIPE_LINKS.daily20, 'Keep a small team’s pipeline full.'),
];
export const daily5Plan = dailyTiers[1];


export const activeDailyTiers = () => dailyTiers.filter((t) => t.price !== null);

export const daily5Steps = [
  { n: '01', title: 'Subscribe', body: 'Check out once through Stripe. Billed monthly, cancel anytime.' },
  { n: '02', title: 'Tell us your ICP', body: 'Your calendar email, timezone, preferred delivery time, and who you want to reach.' },
  { n: '03', title: 'Open your calendar', body: 'Each weekday, one email lands with your call invites: who, their number, why they were picked, why now, and a call playbook. Accept and they’re on your calendar.' },
];

export const howItWorks = [
  { n: '01', title: 'Pick a plan and sign up', body: 'Choose 2, 5, 10, or 20 calls a day and check out securely through Stripe. Billed monthly, cancel anytime.' },
  { n: '02', title: 'Tell us who you sell to', body: 'A 10-minute onboarding brief: your offer, ideal customer, titles, geography, exclusions, and any leads you already have.' },
  { n: '03', title: 'Calls land every weekday', body: 'Each weekday morning one email arrives with that day’s calendar invites: who to call, their number, why they were picked, why now, and a playbook.' },
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
  { title: 'Why they were selected', body: 'How they match your ideal customer: industry, size, title, and the problem they likely own.' },
  { title: 'A reason to call now', body: 'A dated trigger with a source link: new locations, hiring, funding, launches.' },
  { title: 'A call playbook', body: 'Opener, discovery questions, objection handling, and the ask, written for that person.' },
  { title: 'On your calendar', body: 'Every contact is a calendar invite. Accept and your call blocks are booked.' },
  { title: 'Never repeated', body: 'No contact is sent twice. Bad numbers or departed contacts are replaced.' },
];

export const faqs = [
  { q: 'How does delivery work?', a: 'Every weekday (Monday to Friday, excluding US federal holidays) you get one email with that day’s calendar invites attached, one per contact. Each invite includes the name, phone number, why they were selected, the reason to call now, and a suggested call playbook.' },
  { q: 'Is this software or a database?', a: 'Neither. It is a done-for-you research service. No logins, seats, or CRM to learn. Your calls simply show up on your calendar.' },
  { q: 'How does billing work? Can I cancel?', a: 'Plans are billed monthly through Stripe and renew automatically. You can cancel anytime, effective at the end of your current billing month. We do not refund partial months.' },
  { q: 'Where does the data come from?', a: 'Public and licensed business sources such as company websites, press releases, job postings, and professional profiles. We use AI service providers to help research and draft, and every reason to call includes a source and date. See our Privacy Policy.' },
  { q: 'Can I give you my existing leads or customer list?', a: 'Yes. During onboarding you can paste, upload, or link a list. We use it to exclude current customers and to prioritize leads you already have. You confirm you lawfully hold any data you share.' },
  { q: 'Do you make the calls for us?', a: 'No. Your team makes the calls, manually. We tell you who to call, why now, and what to say.' },
  { q: 'What about TCPA and Do-Not-Call compliance?', a: 'You are responsible for complying with the TCPA, the National Do-Not-Call Registry, state telemarketing rules, and CAN-SPAM. Our service is for human, manually dialed business calls only; no robocalls or autodialers. This is not legal advice.' },
  { q: 'Is this for B2C?', a: 'No. Summerlyn Call Lists is B2B only.' },
];

export const icpPoints = [
  { title: 'The right connection', body: 'Not the company, the person. The operator who owns the problem you solve, with the authority to act on it. We map titles to pain, not titles to org charts.' },
  { title: 'The right timing', body: 'A new location, a hiring spree, a funding round, a leadership change. Triggers open a window. We find the window and date it, so your call lands while it matters.' },
  { title: 'The right words', body: 'A reason that is about them, not you. Every opener references the trigger, names a likely problem, and asks one easy question.' },
];
