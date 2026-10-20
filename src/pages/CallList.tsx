import SEO from '../components/SEO';
import { CTA, FAQ, PageHeader, Photo, Pricing, SampleRow, SectionHead } from '../components/ui';
import { photoCredits } from '../data/photoCredits';
import { Link } from 'react-router-dom';
import { deliverables, howItWorks, SIGNUP_PATH } from '../data/callListOffer';

const columns = ['Name, title & company', 'Phone, phone type & verified date', 'Best time to call', 'Why they were selected (ICP fit)', 'Reason to call now + source + date', 'Opener, word for word', 'Discovery questions', 'Objection handling', 'The ask / next step', 'Voicemail script', 'DNC status label', 'Research confidence & notes'];

export default function CallList() {
  return (
    <>
      <SEO title="Daily call plans: pricing & details" description="Daily calls subscription: 2, 5, 10, or 20 researched B2B prospects every weekday, delivered as calendar invites with a reason to call and a call playbook. From $199/month." url="/call-list" />
      <PageHeader eyebrow="Summerlyn Call Lists" title={<>Know exactly who to call today <span className="serif-accent">and what to say.</span></>}>
        Every weekday we research your best-fit prospects, find a real reason to call each one now, and write the playbook. It all arrives in one email as calendar invites. No software to learn, cancel anytime.
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link to={SIGNUP_PATH} className="btn-primary">Sign up →</Link>
          <a href="#pricing" className="btn-ghost">Compare plans</a>
        </div>
      </PageHeader>

      <div className="container-x"><Photo photo={photoCredits.focusedResearch} priority className="aspect-[16/7] md:aspect-[3/1]" imgClassName="object-[center_35%]" /></div>

      <section className="container-x section !pt-8"><SampleRow /></section>

      <section className="container-x section grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="The deliverable" title="What lands in your inbox" body="One email each weekday morning with that day’s calendar invites attached. Accept them and your call blocks are booked, each with the research and playbook inside." />
          <Photo photo={photoCredits.repOnPhone} className="mb-8 aspect-[16/9]" />
          <div className="space-y-4">{howItWorks.map((s) => <div key={s.n} className="flex gap-4"><span className="font-serif text-2xl text-brand-300">{s.n}</span><div><p className="text-white font-medium">{s.title}</p><p className="text-sm text-zinc-400">{s.body}</p></div></div>)}</div>
        </div>
        <div className="card">
          <p className="eyebrow mb-5">Every invite includes</p>
          <ul className="grid gap-3 sm:grid-cols-2 text-sm">{columns.map((c) => <li key={c} className="flex gap-2"><span className="text-cyan-300">→</span>{c}</li>)}</ul>
        </div>
      </section>

      <section className="container-x section grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deliverables.map((d) => <div key={d.title} className="card"><h3 className="font-semibold">{d.title}</h3><p className="mt-2 text-sm text-zinc-400">{d.body}</p></div>)}
      </section>

      <section id="pricing" className="container-x section scroll-mt-20">
        <SectionHead center eyebrow="Pricing" title={<>Daily calls. <span className="serif-accent">Pick your volume.</span></>} />
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
