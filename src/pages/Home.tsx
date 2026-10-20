import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { CTA, FAQ, Pricing, SampleRow } from '../components/ui';
import { photoCredits } from '../data/photoCredits';
import { deliverables, howItWorks, icpPoints, STRIPE_LINKS } from '../data/callListOffer';
import { insights } from '../data/insights';

function SectionLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 rule pt-5 mb-10 md:mb-14">
      <span className="sec-num">№ {n}</span>
      <span className="kicker">{children}</span>
    </div>
  );
}

function EdImage({ photo, className = '', pos = '' }: { photo: { file: string; alt: string; photographer: string }; className?: string; pos?: string }) {
  return (
    <figure className={className}>
      <img src={photo.file} alt={photo.alt} loading="lazy" decoding="async" className={`w-full h-full object-cover ${pos}`} />
      <figcaption className="mt-2 text-[11px] uppercase tracking-[0.2em] text-zinc-500">Photo · {photo.photographer} / Unsplash</figcaption>
    </figure>
  );
}

export default function Home() {
  const hero = photoCredits.focusedResearch;
  return (
    <>
      <SEO title="Know who to call and what to say" description="Don't lose time with CRMs. Summerlyn Call Lists delivers researched B2B prospects with a dated reason to call and a script for each, in 3 business days." url="/" />

      {/* Hero: type set directly on the photo's dark negative space */}
      <section className="relative overflow-hidden bg-black">
        <img src={hero.file} alt={hero.alt} loading="eager" fetchPriority="high" decoding="async"
          className="absolute inset-x-0 top-0 h-[600px] md:h-full w-full object-cover object-[34%_center] md:object-[100%_center]" />
        <div aria-hidden className="md:hidden absolute inset-x-0 top-[520px] h-20 bg-gradient-to-b from-transparent to-black" />
        <div className="relative container-x flex md:min-h-[min(calc(100svh-4rem),820px)] flex-col justify-between pt-16 pb-12 md:pt-20 md:pb-14">
          <div className="min-h-[520px] md:min-h-0 max-w-[13rem] sm:max-w-md md:max-w-xl animate-fadeUp">
            <div className="flex items-center gap-3 kicker !text-zinc-300">
              <span className="h-px w-8 bg-zinc-400" /> Issue 01 · Call Lists
            </div>
            <h1 className="h-ed mt-6 text-[2.4rem] sm:text-6xl md:text-7xl lg:text-[5rem] [text-shadow:0_2px_24px_rgba(0,0,0,.45)]">
              Know who to call <br className="hidden md:inline" /><span className="italic text-brand-300">&amp; </span>what to say.
            </h1>
            <p className="mt-6 font-display italic text-lg md:text-2xl text-zinc-300 [text-shadow:0_1px_12px_rgba(0,0,0,.6)]">Don’t lose time with CRMs.</p>
          </div>
          <div className="sm:max-w-md animate-fadeUp">
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed [text-shadow:0_1px_10px_rgba(0,0,0,.7)]">We research your best-fit prospects, find a real, dated reason to call each one now, and write the opener for you. You just dial.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href={STRIPE_LINKS.sprint} className="btn-primary !shadow-none">Get my 50 calls · $399</a>
              <a href="#sample" className="btn-ghost !border-white/40 backdrop-blur-sm">See an example row</a>
            </div>
            <p className="mt-4 text-xs text-zinc-400">Call-ready in 3 business days. No software, no seats. Or <a href={STRIPE_LINKS.pilot} className="underline hover:text-white">try 15 for $99</a>.</p>
          </div>
        </div>
      </section>

      {/* Standfirst */}
      <section className="container-x pt-20 md:pt-28">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="kicker md:col-span-3 pt-2">The premise</p>
          <p className="md:col-span-8 md:col-start-5 font-display font-light text-2xl md:text-4xl leading-snug text-white">
            <span className="float-left mr-3 mt-1 font-display text-6xl md:text-7xl leading-[.8] text-brand-300">P</span>lain contact data is cheap. Knowing <em>why</em> to call and <em>what</em> to say is the hard part. That’s what you’re buying.
          </p>
        </div>
      </section>

      {/* 01 How it works */}
      <section className="container-x section">
        <SectionLabel n="01">How it works</SectionLabel>
        <div className="grid gap-10 md:grid-cols-12">
          <h2 className="h-ed text-4xl md:text-6xl md:col-span-5">Three steps. <em className="text-brand-300">Zero CRM archaeology.</em></h2>
          <EdImage photo={photoCredits.teamStrategy} className="md:col-span-6 md:col-start-7 aspect-[4/3]" />
        </div>
        <ol className="mt-16 grid md:grid-cols-3 border-t border-white/15">
          {howItWorks.map((s) => (
            <li key={s.n} className="py-8 md:pr-8 md:[&:not(:first-child)]:pl-8 md:[&:not(:first-child)]:border-l border-b md:border-b-0 border-white/15">
              <p className="font-display italic text-5xl text-zinc-500">{s.n}</p>
              <h3 className="mt-5 font-display text-2xl font-normal">{s.title}</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 02 What you get */}
      <section id="sample" className="container-x section scroll-mt-20">
        <SectionLabel n="02">What you get</SectionLabel>
        <div className="grid gap-8 md:grid-cols-12 mb-12">
          <h2 className="h-ed text-4xl md:text-6xl md:col-span-7">Every row answers <em className="text-brand-300">who, why now,</em> and what to say.</h2>
          <p className="md:col-span-4 md:col-start-9 self-end text-zinc-400 leading-relaxed">A Google Sheet and CSV, one row per contact, plus a script sheet with your master talk track and top objections.</p>
        </div>
        <SampleRow />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {deliverables.map((d, i) => (
            <div key={d.title} className="border-t border-white/15 py-6">
              <p className="kicker !text-zinc-500">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-display text-xl font-normal">{d.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section className="container-x py-12 md:py-20">
        <blockquote className="mx-auto max-w-4xl border-y border-white/15 py-12 md:py-16 text-center">
          <p className="font-display italic font-light text-3xl md:text-5xl leading-tight text-white">“A person with a problem, at the moment the problem becomes urgent.”</p>
          <footer className="mt-6 kicker">On what makes a great ICP</footer>
        </blockquote>
      </section>

      {/* 03 ICP */}
      <section className="container-x section">
        <SectionLabel n="03">Ideal customer profiles</SectionLabel>
        <div className="grid gap-14 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="h-ed text-4xl md:text-6xl">The right connection. <em className="text-brand-300">The right timing.</em></h2>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">A great ICP isn’t a list of industries. It’s a person with a problem, at the moment the problem becomes urgent. That intersection is where calls turn into meetings, and it’s what we research for every contact.</p>
            <EdImage photo={photoCredits.founderLaptopCall} className="mt-10 aspect-[4/5] md:aspect-[4/3]" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {icpPoints.map((p, i) => (
              <div key={p.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-white/15 py-8 last:border-b">
                <span className="font-display italic text-3xl text-zinc-500">{i + 1}</span>
                <div><h3 className="font-display text-2xl font-normal">{p.title}</h3><p className="mt-2 text-zinc-400 leading-relaxed">{p.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Pricing */}
      <section id="pricing" className="container-x section scroll-mt-20">
        <SectionLabel n="04">Pricing</SectionLabel>
        <div className="grid gap-8 md:grid-cols-12 mb-14">
          <h2 className="h-ed text-4xl md:text-6xl md:col-span-6">Pay per list. <em className="text-brand-300">Not per seat.</em></h2>
          <p className="md:col-span-5 md:col-start-8 self-end text-zinc-400 leading-relaxed">Plain contact data is cheap. Knowing why to call and what to say is the hard part. That’s what you’re buying.</p>
        </div>
        <Pricing />
      </section>

      {/* 05 Insights */}
      <section className="container-x section">
        <SectionLabel n="05">Insights</SectionLabel>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <h2 className="h-ed text-4xl md:text-6xl max-w-3xl">Lessons from the best <em className="text-brand-300">sales books</em>, applied.</h2>
          <Link to="/insights" className="kicker !text-white border-b border-white/40 pb-1 hover:border-white">All insights →</Link>
        </div>
        <div className="grid md:grid-cols-12 gap-x-10">
          {insights.slice(0, 3).map((a, i) => (
            <Link key={a.slug} to={`/insights/${a.slug}`} className={`group border-t border-white/15 py-8 flex flex-col ${i === 0 ? 'md:col-span-6 md:row-span-2' : 'md:col-span-6'}`}>
              <p className="kicker !text-brand-300">{a.tag}</p>
              <h3 className={`mt-3 font-display font-normal group-hover:text-brand-300 transition ${i === 0 ? 'text-3xl md:text-5xl leading-tight' : 'text-2xl'}`}>{a.title}</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed flex-grow">{a.dek}</p>
              <p className="mt-6 text-xs text-zinc-500">From <em>{a.book}</em> · {a.author}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 06 FAQ */}
      <section className="container-x section">
        <SectionLabel n="06">FAQ</SectionLabel>
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 className="h-ed text-4xl md:text-6xl lg:col-span-4">Questions, <em className="text-brand-300">answered.</em></h2>
          <div className="lg:col-span-7 lg:col-start-6"><FAQ /></div>
        </div>
      </section>

      <CTA />
    </>
  );
}
