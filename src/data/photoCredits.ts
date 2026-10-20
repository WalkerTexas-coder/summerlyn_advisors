// Photos from Unsplash, used under the Unsplash License (https://unsplash.com/license).
// Credit isn't required, but we keep a record of every photo and photographer.
export interface PhotoCredit {
  file: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  unsplashUrl: string;
  usedOn: string;
}

export const photoCredits: Record<string, PhotoCredit> = {
  heroSalesCall: {
    file: '/images/hero-sales-call.webp',
    alt: 'Sales professional talking on his phone at a desk in a busy open-plan office',
    photographer: 'Vitaly Gariev',
    photographerUrl: 'https://unsplash.com/@silverkblack',
    unsplashUrl: 'https://unsplash.com/photos/man-talking-on-phone-in-modern-office-with-team-rrE2NMMxJX0',
    usedOn: 'Home hero, og:image social share',
  },
  teamStrategy: {
    file: '/images/team-strategy-whiteboard.webp',
    alt: 'Small team in a strategy session around a whiteboard in a modern office',
    photographer: 'Vitaly Gariev',
    photographerUrl: 'https://unsplash.com/@silverkblack',
    unsplashUrl: 'https://unsplash.com/photos/team-collaborating-around-a-whiteboard-in-a-modern-office-K0aM-ztA76Q',
    usedOn: 'Home: How it works',
  },
  founderLaptopCall: {
    file: '/images/founder-laptop-call.webp',
    alt: 'Founder on a headset call at his laptop in a sunlit office',
    photographer: 'Austin Distel',
    photographerUrl: 'https://unsplash.com/@austindistel',
    unsplashUrl: 'https://unsplash.com/photos/mens-blue-collared-top-near-silver-macbook-97HfVpyNR1M',
    usedOn: 'Home: Ideal customer profiles',
  },
  handshakeAgreement: {
    file: '/images/handshake-agreement.webp',
    alt: 'Two people shaking hands across a meeting room',
    photographer: 'Cytonn Photography',
    photographerUrl: 'https://unsplash.com/@cytonn_photography',
    unsplashUrl: 'https://unsplash.com/photos/two-people-shaking-hands-n95VMLxqM2I',
    usedOn: 'About',
  },
  dealHandshake: {
    file: '/images/deal-handshake-table.webp',
    alt: 'Two business partners shaking hands over a signed agreement at a table',
    photographer: 'Vitaly Gariev',
    photographerUrl: 'https://unsplash.com/@silverkblack',
    unsplashUrl: 'https://unsplash.com/photos/two-businessmen-shaking-hands-across-a-table-lZXX-QVdyXY',
    usedOn: 'Advisory',
  },
  focusedResearch: {
    file: '/images/focused-late-night-research.webp',
    alt: 'Woman in glasses focused on her screen in a dark office',
    photographer: 'Vitaly Gariev',
    photographerUrl: 'https://unsplash.com/@silverkblack',
    unsplashUrl: 'https://unsplash.com/photos/woman-wearing-glasses-looking-intently-at-screen-AAJjYPEsRCY',
    usedOn: 'Call Lists page header',
  },
  repOnPhone: {
    file: '/images/rep-on-desk-phone.webp',
    alt: 'Sales rep making a call from his desk phone',
    photographer: 'Berkeley Communications',
    photographerUrl: 'https://unsplash.com/@berkeleycommunications',
    unsplashUrl: 'https://unsplash.com/photos/man-using-ip-phone-inside-room-WEDDt-u3q3o',
    usedOn: 'Call Lists page: deliverable',
  },
};
