import SEO from '../components/SEO';
import { CTA, FAQ, PageHeader, Photo, Pricing, SampleRow, SectionHead } from '../components/ui';
import { photoCredits } from '../data/photoCredits';
import { deliverables, howItWorks, STRIPE_LINKS } from '../data/callListOffer';

const columns = ['Priority rank & fit score', 'Company, website, industry, size, HQ', 'Contact name, title & why this person', 'Phone, phone type, source & verified date', 'DNC status label', 'Email & status', 'Best time to call', 'Reason to call + source link + date', 'Opener', 'Talking points', 'Discovery question', 'Likely objection & response', 'Voicemail script', 'Follow-up email line', 'Research confidence & notes'];

export default function CallList() {
  return (
    <>
      <SEO title="Call Lists: pricing & details" description="Call Sprint 50 ($399): 50 researched, call-ready B2B contacts with a reason to call and a script for each, delivered in 3 business days. Pilot 15 for $99." url="/call-list" />
      <PageHeader eyebrow="Summerlyn Call Lists" title={<>Know exactly who to call this week <span className="serif-accent">and what to say.</span></>}>
        We research your best-fit prospects, find a real reason to call each one now, and write the opener. You get a call-ready list in 3 business days. No software to learn, no annual contract.
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href={STRIPE_LINKS.sprint} className="btn-primary">Get my 50 calls →</a>
          <a href={STRIPE_LINKS.pilot} className="btn-ghost">Try 15 for $99</a>
        </div>
      </PageHeader>

      <div className="container-x"><Photo photo={photoCredits.focusedResearch} priority className="aspect-[16/7] md:aspect-[3/1]" imgClassName="object-[center_35%]" /></div>

      <section className="container-x section !pt-8"><SampleRow /></section>

      <section className="container-x section grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="The deliverable" title="What lands in your inbox" body="A Google Sheet (and CSV), a 1–2 page script sheet with your master talk track and top three objections, and a delivery note with method, DNC scrub date, and replacement instructions." />
          <Photo photo={photoCredits.repOnPhone} className="mb-8 aspect-[16/9]" />
          <div className="space-y-4">{howItWorks.map((s) => <div key={s.n} className="flex gap-4"><span className="font-serif text-2xl text-brand-300">{s.n}</span><div><p className="text-white font-medium">{s.title}</p><p className="text-sm text-zinc-400">{s.body}</p></div></div>)}</div>
        </div>
        <div className="card">
          <p className="eyebrow mb-5">Every row includes</p>
          <ul className="grid gap-3 sm:grid-cols-2 text-sm">{columns.map((c) => <li key={c} className="flex gap-2"><span className="text-cyan-300">→</span>{c}</li>)}</ul>
        </div>
      </section>

      <section className="container-x section grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deliverables.map((d) => <div key={d.title} className="card"><h3 className="font-semibold">{d.title}</h3><p className="mt-2 text-sm text-zinc-400">{d.body}</p></div>)}
      </section>

      <section id="pricing" className="container-x section scroll-mt-20">
        <SectionHead center eyebrow="Pricing" title={<>Simple, <span className="serif-accent">one-time</span> pricing.</>} />
        <Pricing />
      </section>

      <section className="container-x section grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div><p className="eyebrow mb-4">FAQ</p><h2 className="h-section">Before you buy</h2></div>
        <FAQ />
      </section>
      <CTA />
    </>
  );
}
