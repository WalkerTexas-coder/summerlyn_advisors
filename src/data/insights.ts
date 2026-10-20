export interface Insight {
  slug: string;
  title: string;
  dek: string;
  book: string;
  author: string;
  readMinutes: number;
  tag: 'Who to call' | 'What to say' | 'Timing' | 'Offer';
  quote?: string;
  sections: { heading?: string; paragraphs?: string[]; bullets?: string[]; link?: { to: string; label: string } }[];
}

export const insights: Insight[] = [
  {
    slug: 'prospecting-is-a-numbers-game-with-a-short-list',
    title: 'Prospecting is a numbers game played with a short list',
    dek: 'Why consistent daily outreach beats sporadic heroics, and why the list matters more than the hustle.',
    book: 'Fanatical Prospecting', author: 'Jeb Blount', readMinutes: 4, tag: 'Who to call',
    sections: [
      { paragraphs: [
        'Jeb Blount’s core argument is blunt: the number one reason pipelines run dry is that salespeople stop prospecting. Not because they lack talent, but because prospecting is uncomfortable and easy to postpone when deals are in motion. His remedy is discipline: protected blocks of time, every day, where the only job is to reach new people.',
        'He also warns against what he calls the trap of perfect research, where reps spend so long preparing that they never pick up the phone. The goal is enough context to make the call relevant, then volume.',
      ]},
      { heading: 'Applied to who to call', paragraphs: [
        'Blount’s discipline works best when the list is ready before the time block starts. If your “prospecting hour” begins with 40 minutes of digging through a CRM, the hour is gone. Separate the research from the dialing.',
      ], bullets: [
        'Build the list the day before, not during the block.',
        'Rank contacts so the highest-fit people get your freshest energy.',
        'Cap research at what changes the opener: one trigger, one role, one likely problem.',
        'Track attempts, not just connects. Consistency is the leading indicator.',
      ]},
      { paragraphs: ['That separation is the entire premise of a call list: someone else does the digging, so your blocks are spent talking.'] },
    ],
  },
  {
    slug: 'ask-better-questions-spin',
    title: 'Ask the question that makes the problem real',
    dek: 'SPIN Selling’s research on large deals, reduced to the four questions that matter on a first call.',
    book: 'SPIN Selling', author: 'Neil Rackham', readMinutes: 5, tag: 'What to say',
    sections: [
      { paragraphs: [
        'Neil Rackham’s team studied thousands of sales calls and found that the techniques that win small transactions often backfire in larger ones. Pushy closes and feature dumps work when the stakes are low. In bigger decisions, the reps who won asked more, and better, questions.',
        'His framework sorts those questions into four kinds: Situation, Problem, Implication, and Need-payoff.',
      ]},
      { heading: 'The four questions, in our words', bullets: [
        'Situation: facts about their world. Use sparingly; good research should answer most of these before you dial.',
        'Problem: where it hurts. “How are new-patient calls handled when the front desk is short?”',
        'Implication: what the problem costs. “What happens to booked visits when calls go to voicemail?”',
        'Need-payoff: let them describe the value. “If those calls were handled, what would that free up?”',
      ]},
      { heading: 'Why research changes the ratio', paragraphs: [
        'Rackham observed that weaker reps lean on situation questions, which bore busy buyers. When a call list already tells you their size, locations, and recent hiring, you can skip straight to problem and implication questions. That is why every row we deliver includes a discovery question, not just a phone number.',
      ]},
    ],
  },
  {
    slug: 'lead-with-an-insight-not-a-pitch',
    title: 'Lead with an insight, not a pitch',
    dek: 'The Challenger Sale argues that teaching beats relationship-building. Here is how to do it in 20 seconds.',
    book: 'The Challenger Sale', author: 'Matthew Dixon & Brent Adamson', readMinutes: 4, tag: 'What to say',
    sections: [
      { paragraphs: [
        'Dixon and Adamson grouped sales reps into profiles and found that the top performers in complex sales were not the friendliest. They were the ones who taught customers something new about their own business, tailored the message to the person, and were comfortable taking control of the conversation.',
        'In practice, that means opening with a perspective the buyer has not considered, connected to a cost they are already paying.',
      ]},
      { heading: 'Turning that into an opener', bullets: [
        'Name the trigger: “I saw you are opening two new sites.”',
        'Offer the reframe: “Most ops leads find scheduling breaks before hiring catches up.”',
        'Ask, do not tell: “Is that on your radar?”',
      ]},
      { paragraphs: [
        'Tailoring is the hard part. The same insight lands differently for a CFO and a director of operations. That is why our scripts are written per contact, keyed to the title and the trigger, not copied across the list.',
      ]},
    ],
  },
  {
    slug: 'tactical-empathy-on-cold-calls',
    title: 'Tactical empathy for the first 30 seconds',
    dek: 'A former FBI hostage negotiator’s tools, adapted for the moment someone picks up a cold call.',
    book: 'Never Split the Difference', author: 'Chris Voss', readMinutes: 5, tag: 'What to say',
    quote: 'No deal is better than a bad deal.',
    sections: [
      { paragraphs: [
        'Chris Voss spent his career negotiating in situations where the stakes were lives. His central claim is that people decide emotionally and justify rationally, so the negotiator’s first job is to make the other side feel understood.',
        'Several of his techniques translate directly to the first moments of a cold call.',
      ]},
      { heading: 'Three moves to borrow', bullets: [
        'Labeling: name their likely feeling before they do. “It probably feels like every vendor calls right when you are busiest.”',
        'Accusation audit: say the objection out loud first. “You weren’t expecting my call, and I’ll be quick.”',
        'Calibrated questions: “How” and “what” questions that invite them to solve the problem with you. “What would have to be true for this to be worth a look?”',
      ]},
      { heading: 'Why “no” is useful', paragraphs: [
        'Voss argues that people relax when they are allowed to say no. A question like “Would it be a bad idea to send you a short note?” feels safer to answer than a push for a meeting. Our objection replies are written in that spirit: acknowledge, reframe, and offer the smallest possible next step.',
      ]},
    ],
  },
  {
    slug: 'the-principles-of-a-good-reason-to-call',
    title: 'The psychology of a good reason to call',
    dek: 'Robert Cialdini’s principles of persuasion explain why a dated trigger outperforms a generic pitch.',
    book: 'Influence: The Psychology of Persuasion', author: 'Robert B. Cialdini', readMinutes: 4, tag: 'Timing',
    sections: [
      { paragraphs: [
        'Cialdini identified a handful of shortcuts people use to decide whom to say yes to: reciprocity, commitment and consistency, social proof, authority, liking, scarcity, and, in later editions, unity. They are not tricks; they are how busy people filter a noisy world.',
      ]},
      { heading: 'How each shows up on a call', bullets: [
        'Reciprocity: open with something useful, an observation about their market, before asking for anything.',
        'Social proof: “Other multi-site clinics we talk to” is more persuasive than any feature.',
        'Liking: specific, accurate references to their business signal that you did your homework.',
        'Scarcity and timing: a trigger with a date implies a window that will close.',
        'Commitment: ask for a small yes first, like permission to email a note.',
      ]},
      { paragraphs: [
        'A reason to call that cites a real, recent event uses several of these at once. That is why every row on our lists includes a trigger, its source, and its date.',
      ]},
    ],
  },
  {
    slug: 'specialize-before-you-scale',
    title: 'Specialize before you scale outbound',
    dek: 'Predictable Revenue made outbound a system. Its first lesson is about focus.',
    book: 'Predictable Revenue', author: 'Aaron Ross & Marylou Tyler', readMinutes: 4, tag: 'Who to call',
    sections: [
      { paragraphs: [
        'Aaron Ross helped build the outbound engine at Salesforce and later wrote it down with Marylou Tyler. The book’s best-known idea is role specialization: separate the people who generate pipeline from the people who close it, so prospecting never gets crowded out.',
        'Underneath that is a simpler point. Outbound only becomes predictable when the target is narrow and well defined. A vague ideal customer produces vague results, no matter how many emails go out.',
      ]},
      { heading: 'Define the ICP before the list', bullets: [
        'Pick one industry and one buyer title to start.',
        'Write down what makes an account a great fit, and what disqualifies it.',
        'Choose two or three triggers that signal they are in-market.',
        'Measure meetings per 100 contacts, then refine.',
      ]},
      { paragraphs: ['Our intake form asks those exact questions, because the quality of a list is capped by the clarity of the ICP behind it.'] },
    ],
  },
  {
    slug: 'make-the-customer-the-hero',
    title: 'Make the customer the hero of the call',
    dek: 'Donald Miller’s StoryBrand framework, compressed into a voicemail.',
    book: 'Building a StoryBrand', author: 'Donald Miller', readMinutes: 3, tag: 'What to say',
    sections: [
      { paragraphs: [
        'Donald Miller’s framework borrows from storytelling: the customer is the hero, they have a problem, and they meet a guide who gives them a plan and calls them to action. Most marketing fails, he argues, because companies cast themselves as the hero.',
      ]},
      { heading: 'A voicemail as a story', bullets: [
        'The hero: say their name and their company first.',
        'The problem: one sentence, in their terms, tied to the trigger.',
        'The guide: one line of credibility, not a résumé.',
        'The plan: a single, low-risk next step.',
      ]},
      { paragraphs: ['Count the “I” and “we” words in your script. If they outnumber the “you” words, rewrite it. Every voicemail we write is built to fit in about 20 seconds with the buyer as the subject.'] },
    ],
  },
  {
    slug: 'sell-the-gap-not-the-product',
    title: 'Sell the gap, not the product',
    dek: 'Gap Selling and Getting to Yes agree on one thing: understand their problem better than they do.',
    book: 'Gap Selling & Getting to Yes', author: 'Keenan; Roger Fisher, William Ury & Bruce Patton', readMinutes: 5, tag: 'Offer',
    sections: [
      { paragraphs: [
        'In Gap Selling, Keenan argues that buyers do not purchase products; they purchase a move from their current state to a better future state. The size of that gap, and the cost of standing still, is what drives a decision.',
        'Getting to Yes, from the Harvard Negotiation Project, makes a parallel point for negotiation: focus on interests, not positions. What someone says they want is a position; why they want it is the interest you can actually solve.',
      ]},
      { heading: 'Using both on a first call', bullets: [
        'Current state: confirm what the trigger suggests is happening now.',
        'Future state: ask what good looks like in six months.',
        'The gap: quantify the difference together, in their numbers.',
        'Interests: when they object, ask why, and solve for the reason behind it.',
      ]},
      { paragraphs: ['A good reason to call is a hypothesis about their current state. The call exists to test it.'] },
    ],
  },
  {
    slug: 'make-an-offer-too-good-to-ignore',
    title: 'Make the next step an offer, not a request',
    dek: 'Alex Hormozi’s value equation, applied to what you ask for at the end of a call.',
    book: '$100M Offers', author: 'Alex Hormozi', readMinutes: 3, tag: 'Offer',
    sections: [
      { paragraphs: [
        'Hormozi frames value as an equation: the dream outcome and the likelihood of achieving it, divided by the time it takes and the effort or sacrifice required. Raise the top, shrink the bottom, and the offer becomes hard to refuse.',
      ]},
      { heading: 'The value equation for a meeting request', bullets: [
        'Dream outcome: name the specific result the trigger suggests they want.',
        'Likelihood: cite proof from similar companies.',
        'Time delay: offer something they can see this week.',
        'Effort: make it 15 minutes, a one-site pilot, or a short note, not a “demo.”',
      ]},
      { paragraphs: ['We used the same logic on our own pricing: Daily 2, two researched calls every weekday for $199/month, cancel anytime, so the cost of finding out is small.'], link: { to: '/signup?tier=daily2', label: 'Start Daily 2 · $199/mo →' } },
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
