import { ReactNode, useState } from 'react';
import type { PhotoCredit } from '../data/photoCredits';
import { Link } from 'react-router-dom';
import { faqs as defaultFaqs, sampleRow, activeDailyTiers, daily5Steps, dailyCommonFeatures, DailyTier, SIGNUP_PATH } from '../data/callListOffer';

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

export function DailyTiers() {
  const tiers = activeDailyTiers();
  return (
    <div id="daily" className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 via-ink-900/80 to-brand-500/10 p-6 md:p-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
      <div id="daily-5" className="text-center max-w-2xl mx-auto">
        <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">DAILY CALLS SUBSCRIPTION</span>
        <h3 className="mt-4 text-3xl font-semibold text-white">Your calls, on your calendar, every weekday.</h3>
        <p className="mt-3 text-zinc-400">Each weekday morning one email lands in your inbox with that day’s calendar invites. Accept them and your call blocks are booked: who to call, their number, why they were picked, why now, and a playbook for the call.</p>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        {tiers.map((d) => <DailyTierCard key={d.id} d={d} />)}
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr] items-center">
        <ul className="space-y-2 text-sm text-zinc-300">{dailyCommonFeatures.map((f) => <li key={f} className="flex gap-2"><span className="text-cyan-300">✓</span>{f}</li>)}</ul>
        <div className="rounded-2xl border border-white/10 bg-ink-950/70 p-5 shadow-2xl">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">Today’s email · Daily 5 · Tuesday</p>
          {['8:30', '8:45', '9:00', '9:15', '9:30'].map((t, i) => (
            <div key={t} className="mb-2 flex gap-3 rounded-xl border-l-2 border-cyan-300 bg-white/5 px-3 py-2">
              <span className="w-12 shrink-0 text-xs text-zinc-500">{t}</span>
              <div className="min-w-0">
                <p className="text-sm text-white truncate">{i === 0 ? 'Call Dana Whitaker · Brightpath Clinics' : `Call #${i + 1} · high-target prospect`}</p>
                <p className="text-xs text-zinc-500 truncate">{i === 0 ? '+1 (512) 555-0147 · Opening 2 new sites' : 'Phone · why selected · why now · playbook'}</p>
              </div>
            </div>
          ))}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">{daily5Steps.map((s) => <div key={s.n}><p className="text-xs text-cyan-300">{s.n}</p><p className="text-sm text-white">{s.title}</p><p className="text-xs text-zinc-500">{s.body}</p></div>)}</div>
          <p className="mt-3 text-[11px] text-zinc-600">Example invites, fictional data.</p>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-zinc-500">Billed monthly via Stripe. Cancel anytime; no contract.</p>
    </div>
  );
}

export function DailyTierCard({ d }: { d: DailyTier }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 ${d.featured ? 'border-cyan-300 bg-cyan-400/10 shadow-xl shadow-cyan-500/10' : 'border-white/10 bg-ink-900/70'}`}>
      {d.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-300 px-3 py-0.5 text-xs font-semibold text-ink-950">Most popular</span>}
      <p className="text-white font-semibold">{d.name}</p>
      <p className="mt-1 text-xs text-zinc-400 min-h-[2rem]">{d.tagline}</p>
      <p className="mt-4 text-white"><span className="text-4xl font-semibold">${d.price!.toLocaleString()}</span><span className="text-zinc-400"> / {d.cadence}</span></p>
      <ul className="mt-4 space-y-1 text-sm text-zinc-300 flex-1">{d.features.map((f) => <li key={f} className="flex gap-2"><span className="text-cyan-300">✓</span>{f}</li>)}</ul>
      <Link to={`${SIGNUP_PATH}?tier=${d.id}`} className={`${d.featured ? 'btn-primary' : 'btn-ghost'} mt-6 justify-center`}>Sign up · {d.name} →</Link>
    </div>
  );
}

export function Pricing() {
  return <DailyTiers />;
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
        <p className="lead mt-5 max-w-xl mx-auto">Researched prospects, a reason to call each one, and the words to say. On your calendar every weekday morning.</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={SIGNUP_PATH} className="btn-primary">Sign up · from $199/mo</Link>
          <Link to="/call-list#pricing" className="btn-ghost">Compare plans</Link>
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
