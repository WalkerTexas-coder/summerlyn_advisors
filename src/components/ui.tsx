import { ReactNode, useState } from 'react';
import type { PhotoCredit } from '../data/photoCredits';
import { Link } from 'react-router-dom';
import { faqs as defaultFaqs, Offer, offers, rushAddon, sampleRow, STRIPE_LINKS } from '../data/callListOffer';

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="container-x pt-20 pb-12 md:pt-28 animate-fadeUp">
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] max-w-4xl">{title}</h1>
      {children && <div className="lead mt-6 max-w-2xl">{children}</div>}
    </section>
  );
}

export function SectionHead({ eyebrow, title, body, center }: { eyebrow: string; title: ReactNode; body?: string; center?: boolean }) {
  return (
    <div className={`mb-14 ${center ? 'text-center mx-auto' : ''} max-w-3xl`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="h-section">{title}</h2>
      {body && <p className="lead mt-5">{body}</p>}
    </div>
  );
}

const Check = () => (
  <svg className="mt-1 h-4 w-4 flex-none text-cyan-300" viewBox="0 0 20 20" fill="currentColor"><path d="M7.6 13.2 4.4 10l-1.1 1.1 4.3 4.3 9-9-1.1-1.1z" /></svg>
);

function PriceCard({ o }: { o: Offer }) {
  return (
    <div className={`relative flex flex-col rounded-3xl p-8 ${o.featured ? 'bg-gradient-to-b from-brand-500/25 to-ink-900 border border-brand-400/50 shadow-[0_0_80px_-20px_rgba(139,92,246,.6)] md:-translate-y-3' : 'card'}`}>
      {o.featured && <span className="absolute -top-3 left-8 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink-950">Most popular</span>}
      <h3 className="text-lg font-semibold">{o.name}</h3>
      <p className="text-sm text-zinc-400 mt-1">{o.tagline}</p>
      <p className="mt-6 flex items-baseline gap-2"><span className="text-5xl font-semibold text-white">${o.price}</span><span className="text-zinc-500 text-sm">{o.cadence}</span></p>
      <ul className="mt-6 space-y-3 text-sm flex-grow">
        {o.features.map((f) => <li key={f} className="flex gap-3"><Check />{f}</li>)}
      </ul>
      <a href={o.href} className={`${o.featured ? 'btn-primary' : 'btn-ghost'} mt-8 w-full`}>{o.cta} →</a>
    </div>
  );
}

export function Pricing() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3 items-stretch">{offers.map((o) => <PriceCard key={o.id} o={o} />)}</div>
      <div className="card mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-white font-semibold">{rushAddon.name} add-on · <span className="text-cyan-300">${rushAddon.price}</span></p>
          <p className="text-sm text-zinc-400">{rushAddon.tagline} Purchase alongside any plan.</p>
        </div>
        <a href={STRIPE_LINKS.rush} className="btn-ghost">Add rush delivery →</a>
      </div>
      <p className="mt-6 text-center text-xs text-zinc-500">Secure checkout by Stripe. One-time payments, no subscription. Pilot is credited toward a Sprint within 14 days.</p>
    </div>
  );
}

export function SampleRow() {
  const r = sampleRow;
  const Field = ({ k, v }: { k: string; v: string }) => (
    <div><p className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1">{k}</p><p className="text-sm text-zinc-200">{v}</p></div>
  );
  return (
    <div className="relative rounded-3xl border border-white/10 bg-ink-900/80 p-6 md:p-8 shadow-2xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent" />
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">EXAMPLE ROW · fictional data</span>
        <span className="text-xs text-zinc-500">Priority #1 · Fit score 88 · Confidence: high</span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 pb-6 border-b border-white/10">
        <Field k="Company" v={`${r.company}`} />
        <Field k="Contact" v={`${r.contact}, ${r.title}`} />
        <Field k="Phone" v={`${r.phone}`} />
        <Field k="Best time" v={r.bestTime} />
      </div>
      <div className="grid gap-6 md:grid-cols-2 pt-6">
        <div className="space-y-5">
          <div><p className="eyebrow !text-cyan-300 mb-2">Why call now · {r.triggerDate}</p><p className="text-white">{r.reason}</p></div>
          <div><p className="eyebrow mb-2">Opener</p><p className="text-zinc-300 font-serif text-xl leading-snug">{r.opener}</p></div>
        </div>
        <div className="space-y-5 text-sm">
          <div><p className="eyebrow mb-2">Likely objection</p><p>{r.objection}</p><p className="mt-2 text-zinc-400">↳ {r.response}</p></div>
          <div><p className="eyebrow mb-2">Voicemail (20s)</p><p className="text-zinc-400">{r.voicemail}</p></div>
          <p className="text-xs text-zinc-600">{r.location} · {r.phoneNote}. 555-01xx numbers are reserved for fictional use.</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ({ items = defaultFaqs }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((f, i) => (
        <div key={f.q}>
          <button className="flex w-full items-center justify-between gap-6 py-5 text-left text-white" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            <span className="font-medium">{f.q}</span>
            <span className={`text-2xl text-zinc-500 transition ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          {open === i && <p className="pb-6 -mt-1 text-zinc-400 max-w-3xl">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

export function CTA() {
  return (
    <section className="container-x section">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-500/30 via-ink-900 to-cyan-400/10 px-6 py-16 md:p-20 text-center">
        <h2 className="h-section max-w-3xl mx-auto">Stop digging through the CRM. <span className="serif-accent">Start calling.</span></h2>
        <p className="lead mt-5 max-w-xl mx-auto">50 researched contacts, a reason to call each one, and the words to say. In 3 business days.</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a href={STRIPE_LINKS.sprint} className="btn-primary">Get my 50 calls · $399</a>
          <a href={STRIPE_LINKS.pilot} className="btn-ghost">Try 15 for $99</a>
        </div>
        <p className="mt-6 text-sm text-zinc-500">Questions first? <Link to="/contact" className="underline hover:text-white">Talk to us</Link>.</p>
      </div>
    </section>
  );
}

export function Photo({ photo, className = '', imgClassName = '', priority = false, overlay = 'bottom' }: { photo: PhotoCredit; className?: string; imgClassName?: string; priority?: boolean; overlay?: 'bottom' | 'left' | 'full' }) {
  const overlays = {
    bottom: 'bg-gradient-to-t from-ink-950 via-ink-950/40 to-brand-500/10',
    left: 'bg-gradient-to-r from-ink-950/80 via-ink-950/30 to-transparent',
    full: 'bg-gradient-to-br from-brand-500/25 via-ink-950/50 to-cyan-900/30',
  };
  return (
    <figure className={`relative overflow-hidden rounded-3xl border border-white/10 ${className}`}>
      <img src={photo.file} alt={photo.alt} loading={priority ? 'eager' : 'lazy'} decoding="async" className={`h-full w-full object-cover saturate-[.8] ${imgClassName}`} />
      <div aria-hidden className={`pointer-events-none absolute inset-0 ${overlays[overlay]}`} />
      <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-color bg-brand-500/15" />
    </figure>
  );
}
