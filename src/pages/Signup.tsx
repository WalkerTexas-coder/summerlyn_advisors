import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageHeader } from '../components/ui';
import { activeDailyTiers, dailyCommonFeatures } from '../data/callListOffer';

export default function Signup() {
  const [params, setParams] = useSearchParams();
  const tiers = activeDailyTiers();
  const selectedId = params.get('tier') || tiers.find((t) => t.featured)?.id || tiers[0].id;
  const selected = tiers.find((t) => t.id === selectedId) || tiers[0];
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <SEO title="Sign up: choose your daily call plan" description="Pick 2, 5, 10, or 20 researched B2B calls every weekday, delivered as calendar invites. Billed monthly, cancel anytime." url="/signup" />
      <PageHeader eyebrow="Sign up · Step 1 of 3" title={<>Choose your <span className="serif-accent">daily call volume.</span></>}>
        Pick a plan, check out securely with Stripe, then complete a short onboarding brief. Your first daily email arrives within 2 business days.
      </PageHeader>
      <section className="container-x pb-20 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="sr-only">Plan</legend>
          {tiers.map((t) => {
            const on = t.id === selected.id;
            return (
              <label key={t.id} className={`relative cursor-pointer rounded-2xl border p-6 transition ${on ? 'border-cyan-300 bg-cyan-400/10 shadow-xl shadow-cyan-500/10' : 'border-white/10 bg-ink-900/70 hover:border-white/30'}`}>
                <input type="radio" name="tier" value={t.id} checked={on} onChange={() => setParams({ tier: t.id }, { replace: true })} className="sr-only" />
                {t.featured && <span className="absolute -top-3 right-5 rounded-full bg-cyan-300 px-3 py-0.5 text-xs font-semibold text-ink-950">Most popular</span>}
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold">{t.name}</p>
                  <span className={`h-5 w-5 rounded-full border-2 ${on ? 'border-cyan-300 bg-cyan-300 shadow-[inset_0_0_0_3px_#0b0b12]' : 'border-zinc-600'}`} />
                </div>
                <p className="mt-1 text-xs text-zinc-400">{t.tagline}</p>
                <p className="mt-4 text-white"><span className="text-3xl font-semibold">${t.price!.toLocaleString()}</span><span className="text-zinc-400"> / month</span></p>
                <p className="mt-2 text-sm text-zinc-300">{t.callsPerDay} calls every weekday · ~{t.callsPerDay * 21}/month</p>
              </label>
            );
          })}
        </fieldset>
        <aside className="card h-fit lg:sticky lg:top-24">
          <p className="eyebrow mb-3">Your plan</p>
          <p className="text-2xl font-semibold text-white">{selected.name} · ${selected.price!.toLocaleString()}/mo</p>
          <ul className="mt-5 space-y-2 text-sm text-zinc-300">{dailyCommonFeatures.map((f) => <li key={f} className="flex gap-2"><span className="text-cyan-300">✓</span>{f}</li>)}</ul>
          <label className="mt-6 flex items-start gap-3 text-sm text-zinc-300">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 h-4 w-4 accent-cyan-400" />
            <span>I agree to the <Link to="/terms" target="_blank" className="underline hover:text-white">Terms of Service</Link> and <Link to="/privacy" target="_blank" className="underline hover:text-white">Privacy Policy</Link>, including automatic monthly billing, cancel anytime, and no refunds for partial months.</span>
          </label>
          <a
            href={agreed ? selected.href : undefined}
            aria-disabled={!agreed}
            onClick={(e) => { if (!agreed) e.preventDefault(); }}
            className={`btn-primary mt-6 w-full justify-center ${agreed ? '' : 'opacity-50 cursor-not-allowed'}`}
          >Continue to secure checkout →</a>
          <p className="mt-3 text-xs text-zinc-500">Step 2: Stripe checkout. Step 3: onboarding brief about your leads and ideal customer. Prices exclude applicable sales tax.</p>
        </aside>
      </section>
    </>
  );
}
