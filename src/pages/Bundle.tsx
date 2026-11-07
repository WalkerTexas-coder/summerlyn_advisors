import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FAQ, PageHeader, SectionHead } from '../components/ui';
import { bundleFaqs, bundlePriceLabel, practices, receives } from '../data/bundleOffer';

export default function Bundle() {
  return (
    <>
      <SEO
        title="Practical AI Implementation Bundle"
        description="Educational AI implementation bundle from Summerlyn Advisors. $750 one-time, November 2026 edition. Planning guides, templates, and offline references. Checkout is not open on this page."
        url="/bundle"
        brand="Summerlyn Advisors"
      />
      <PageHeader
        eyebrow="Summerlyn Advisors — Practical AI Implementation Bundle"
        title={<>Practical AI implementation, <span className="serif-accent">without handing over the whole operation.</span></>}
      >
        <p>{bundlePriceLabel} · One-time purchase · November 2026 edition</p>
        <p className="mt-4">Start with the outcome. Map the work. Put a bounded AI component where it helps—and keep people in charge of the consequential decisions.</p>
        <p className="mt-4">This educational bundle is for professionals who want to move beyond prompts and build a clear, reviewable implementation plan using their existing tools. It covers personal agent loops, enterprise workflows, CRM and analytics, senior/dementia-support operations, privacy-constrained experiments and provider evaluation.</p>
      </PageHeader>

      <section className="container-x pb-4">
        <div className="card flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow mb-2">One-time price</p>
            <p className="text-4xl font-semibold text-white">{bundlePriceLabel}</p>
            <p className="mt-2 text-sm text-zinc-400">Applicable taxes, if any, are determined at checkout. Checkout is not open. No payment is collected from this page.</p>
          </div>
          <div className="md:text-right">
            <button type="button" className="btn-primary opacity-50 cursor-not-allowed" disabled aria-disabled="true">
              Get the implementation bundle — $750
            </button>
            <p className="mt-3 text-sm text-zinc-500">The purchase button is turned off until private delivery is verified.</p>
          </div>
        </div>
      </section>

      <section className="container-x section">
        <SectionHead eyebrow="What you receive" title="Guides, templates, and offline references" body="A November 2026 educational library for planning a bounded implementation. Not a turnkey platform." />
        <ul className="grid gap-4 md:grid-cols-2">
          {receives.map((item) => (
            <li key={item} className="card text-sm text-zinc-300">{item}</li>
          ))}
        </ul>
      </section>

      <section className="container-x section !pt-0">
        <SectionHead eyebrow="What you will work through" title="A reviewable plan, with people still in charge" />
        <ol className="grid gap-4">
          {practices.map((item, index) => (
            <li key={item} className="flex gap-4">
              <span className="font-serif text-2xl text-brand-300">{String(index + 1).padStart(2, '0')}</span>
              <p className="pt-1 text-zinc-300">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-x section !pt-0 grid gap-8 lg:grid-cols-2">
        <div className="card">
          <p className="eyebrow mb-3">Especially relevant if you…</p>
          <p>Operate a small professional business, own an internal workflow, coordinate sensitive services, or need a concrete brief to review with a developer, privacy lead or qualified professional. You do not need to start by replacing your software stack.</p>
        </div>
        <div className="card">
          <p className="eyebrow mb-3">Not a turnkey platform or a compliance shortcut</p>
          <p>The bundle is educational material, editable planning templates and offline teaching references—not deployed software, autonomous outreach, medical advice, a HIPAA certification or a consulting engagement. Examples are synthetic. Sensitive and clinical workflows require appropriate professional oversight and authorization. A BAA alone does not make an implementation compliant.</p>
        </div>
      </section>

      <section className="container-x section !pt-0">
        <SectionHead eyebrow="Purchase summary" title="What the $750 covers" />
        <div className="card space-y-4 text-sm md:text-base">
          <p><strong className="text-white">{bundlePriceLabel}, one time.</strong> Applicable taxes, if any, are determined at checkout. When checkout is open, Stripe Tax calculates them from the billing address. Summerlyn Advisors has an active Texas sales-tax registration. Tax is collected only in jurisdictions with an active registration. Other jurisdictions are not claimed as registered here.</p>
          <p>This page is the educational library only. A consultation, discovery call, booking, or custom plan is not included and is not offered here.</p>
          <p>Internal-use license for one business and its staff; no resale or public redistribution. Reasonable internal copies and adaptations of the templates for that business are included. Third-party software, API usage, implementation, professional review, monitoring, consulting, ongoing support and future updates are not included.</p>
          <p>All sales are final. This is a digital download, and no refund is promised. Nothing on this page limits a right or remedy that applicable law does not allow to be excluded.</p>
          <p>No earnings, productivity, legal, clinical or security outcomes are guaranteed.</p>
          <p>Prices and vendor policies in the research are dated November 6, 2026 (Central Time), not live quotes. Recheck official sources before procurement or deployment. Some provider contract and pricing questions are deliberately marked unresolved rather than guessed.</p>
          <p>The purchase terms also appear in the <Link to="/terms#bundle-terms" className="underline hover:text-white">Terms of Service</Link>.</p>
        </div>
      </section>

      <section className="container-x section !pt-0 grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="h-section">Before you buy</h2>
        </div>
        <FAQ items={bundleFaqs} />
      </section>
    </>
  );
}
