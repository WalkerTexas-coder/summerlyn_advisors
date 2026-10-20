import SEO from '../components/SEO';
import { CTA, PageHeader, Photo } from '../components/ui';
import { photoCredits } from '../data/photoCredits';

const pillars = [
  ['Healthcare domain', 'Direct-to-consumer telehealth, men’s health, complex diagnoses, compound medication platforms, LegitScript & SureScripts certification, pharmacy integrations.'],
  ['Product & GTM', '0→1 product development, roadmaps and C-suite presentations, medical and sales team training, pre- and post-sales solutions.'],
  ['Technical depth', 'Ruby on Rails engineering, Dosespot, ShipStation, and e-prescribing integrations, telehealth SaaS, AI-assisted research workflows.'],
];

export default function About() {
  return (
    <>
      <SEO title="About" description="Summerlyn Advisors LLC is a Texas company led by Austin Walker, a former healthcare product leader and engineer." url="/about" />
      <PageHeader eyebrow="About" title={<>Built by someone who’s <span className="serif-accent">sat on both sides</span> of the call.</>} />
      <section className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr] pb-10">
        <div className="space-y-5 text-lg text-zinc-300 leading-relaxed">
          <p>Hi, I’m Austin Walker. I started as a software engineer building men’s health platforms like Rugiet and FightingWeight, moved into solutions engineering at CompoundLive, led a telehealth SaaS platform from 0→1 at Teligant, and most recently ran product at Hedfirst, an AI-first telehealth company.</p>
          <p>Along the way I watched great sales teams lose hours every week to the same problem: a CRM full of names and no idea who to call today or what to say. Summerlyn Call Lists is the fix. AI agents do the heavy research, and I review every list before it ships.</p>
          <p>Summerlyn Advisors LLC is a Texas limited liability company. Alongside Call Lists, we still offer <a href="/advisory" className="text-brand-300 underline">fractional product leadership</a> for healthcare and telehealth companies.</p>
        </div>
        <div className="space-y-4"><Photo photo={photoCredits.handshakeAgreement} className="aspect-[4/3]" />{pillars.map(([t, b]) => <div key={t} className="card"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm text-zinc-400">{b}</p></div>)}</div>
      </section>
      <CTA />
    </>
  );
}
