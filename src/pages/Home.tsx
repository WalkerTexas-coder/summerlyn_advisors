import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { CTA, FAQ, Photo, Pricing, SampleRow, SectionHead } from '../components/ui';
import { photoCredits } from '../data/photoCredits';
import { deliverables, howItWorks, icpPoints, STRIPE_LINKS } from '../data/callListOffer';
import { insights } from '../data/insights';

export default function Home() {
  return (
    <>
      <SEO title="Know who to call and what to say" description="Don't lose time with CRMs. Summerlyn Call Lists delivers researched B2B prospects with a dated reason to call and a script for each, in 3 business days." url="/" />

      <section className="container-x pt-20 pb-24 md:pt-32 md:pb-32 text-center">
        <div className="animate-fadeUp">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" /> Call-ready lists in 3 business days
          </span>
          <h1 className="h-display mt-8 max-w-5xl mx-auto">
            Don’t lose time with CRMs.<br />
            <span className="serif-accent">Know who to call and what to say.</span>
          </h1>
          <p className="lead mt-8 max-w-2xl mx-auto">We research your best-fit prospects, find a real, dated reason to call each one now, and write the opener for you. You just dial.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={STRIPE_LINKS.sprint} className="btn-primary">Get my 50 calls · $399</a>
            <a href="#sample" className="btn-ghost">See an example row</a>
          </div>
          <p className="mt-5 text-xs text-zinc-500">No software. No seats. No annual contract. Or <a href={STRIPE_LINKS.pilot} className="underline hover:text-white">try 15 for $99</a>.</p>
        </div>
        <div className="relative mt-16 md:mt-20 animate-fadeUp">
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-r from-brand-500/20 via-transparent to-cyan-400/20 blur-3xl" />
          <Photo photo={photoCredits.heroSalesCall} priority className="aspect-[16/9] md:aspect-[21/9] shadow-2xl shadow-brand-500/10" imgClassName="object-[center_30%]" />
        </div>
      </section>

      <section className="container-x section border-t border-white/5">
        <SectionHead eyebrow="How it works" title={<>Three steps. <span className="serif-accent">Zero CRM archaeology.</span></>} />
        <Photo photo={photoCredits.teamStrategy} overlay="full" className="mb-8 aspect-[16/7] md:aspect-[3/1]" />
        <div className="grid gap-6 md:grid-cols-3">
          {howItWorks.map((s) => (
            <div key={s.n} className="card group hover:border-brand-400/40 transition">
              <p className="font-serif text-5xl text-brand-300/70">{s.n}</p>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-zinc-400">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sample" className="container-x section scroll-mt-20">
        <SectionHead eyebrow="What you get" title={<>Every row answers <span className="serif-accent">who, why now, and what to say.</span></>} body="A Google Sheet and CSV, one row per contact, plus a script sheet with your master talk track and top objections." />
        <SampleRow />
        <div className="grid gap-px mt-12 rounded-3xl overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((d) => (
            <div key={d.title} className="bg-ink-950 p-7"><h3 className="font-semibold">{d.title}</h3><p className="mt-2 text-sm text-zinc-400">{d.body}</p></div>
          ))}
        </div>
      </section>

      <section className="section relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-brand-500/5 to-transparent" />
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr] items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4">Ideal customer profiles</p>
            <h2 className="h-section">The right connection.<br /><span className="serif-accent">The right timing.</span></h2>
            <p className="lead mt-6">A great ICP isn’t a list of industries. It’s a person with a problem, at the moment the problem becomes urgent. That intersection is where calls turn into meetings, and it’s what we research for every contact.</p>
            <Photo photo={photoCredits.founderLaptopCall} className="mt-10 aspect-[4/3]" />
          </div>
          <div className="space-y-5">
            {icpPoints.map((p, i) => (
              <div key={p.title} className="card flex gap-6">
                <span className="font-serif text-3xl text-cyan-300/70">{i + 1}</span>
                <div><h3 className="text-xl font-semibold">{p.title}</h3><p className="mt-2 text-zinc-400">{p.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="container-x section scroll-mt-20">
        <SectionHead center eyebrow="Pricing" title={<>Pay per list. <span className="serif-accent">Not per seat.</span></>} body="Plain contact data is cheap. Knowing why to call and what to say is the hard part. That’s what you’re buying." />
        <Pricing />
      </section>

      <section className="container-x section">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <SectionHead eyebrow="Insights" title={<>Lessons from the best <span className="serif-accent">sales books</span>, applied.</>} />
          <Link to="/insights" className="btn-ghost mb-14">All insights →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {insights.slice(0, 3).map((a) => (
            <Link key={a.slug} to={`/insights/${a.slug}`} className="card group hover:border-brand-400/40 transition flex flex-col">
              <p className="text-xs text-cyan-300">{a.tag}</p>
              <h3 className="mt-3 text-xl font-semibold group-hover:text-brand-300 transition">{a.title}</h3>
              <p className="mt-3 text-sm text-zinc-400 flex-grow">{a.dek}</p>
              <p className="mt-6 text-xs text-zinc-500">From <em>{a.book}</em> · {a.author}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x section grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div><p className="eyebrow mb-4">FAQ</p><h2 className="h-section">Questions, answered.</h2></div>
        <FAQ />
      </section>

      <CTA />
    </>
  );
}
