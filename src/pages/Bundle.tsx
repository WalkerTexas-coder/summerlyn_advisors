import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FAQ, PageHeader, SectionHead } from '../components/ui';
import { bundleFaqs, bundlePriceLabel, practices, receives, serviceIncluded } from '../data/bundleOffer';

export default function Bundle() {
  return (
    <>
      <SEO
        title="Implementation bundle and consultation"
        description="Summerlyn Advisors educational implementation library plus one 45-minute discovery call with Austin and one reviewed tailored plan. $750 before tax. Checkout is not open."
        url="/bundle"
        brand="Summerlyn Advisors"
      />
      <PageHeader
        eyebrow="Summerlyn Advisors — Implementation bundle and consultation"
        title={<>Practical AI implementation, <span className="serif-accent">with a plan Austin reviews.</span></>}
      >
        <p>{bundlePriceLabel} before tax · $250 educational documents · $500 consultation · November 2026 edition</p>
        <p className="mt-4">Start with the outcome. Map the work. Put a bounded AI component where it helps—and keep people in charge of the consequential decisions.</p>
        <p className="mt-4">The purchase is the educational library plus one discovery call with Austin and one tailored written plan that he reviews. It is planning help, not a build.</p>
      </PageHeader>

      <section className="container-x pb-4">
        <div className="card flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow mb-2">One-time total, before tax</p>
            <p className="text-4xl font-semibold text-white">{bundlePriceLabel}</p>
            <p className="mt-2 text-sm text-zinc-400">$250 for the documents and $500 for the consultation. Applicable tax is calculated at checkout. Checkout is not open. No payment is collected from this page.</p>
          </div>
          <div className="md:text-right">
            <button type="button" className="btn-primary opacity-50 cursor-not-allowed" disabled aria-disabled="true">
              Get the bundle and consultation — $750
            </button>
            <p className="mt-3 text-sm text-zinc-500">The purchase button is turned off until private delivery and checkout setup are verified.</p>
          </div>
        </div>
      </section>

      <section className="container-x section">
        <SectionHead eyebrow="Educational library" title="Guides, templates, and offline references" body="General November 2026 educational material with synthetic examples. These files are not a personalized audit." />
        <ul className="grid gap-4 md:grid-cols-2">
          {receives.map((item) => (
            <li key={item} className="card text-sm text-zinc-300">{item}</li>
          ))}
        </ul>
      </section>

      <section className="container-x section !pt-0">
        <SectionHead eyebrow="Included service" title="Austin's call and a plan he reviews" body="The service is separate from the educational files. Nothing on this page confirms a time or sends an invitation." />
        <ul className="grid gap-4">
          {serviceIncluded.map((item) => (
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
          <p>Operate a small professional business, own an internal workflow, coordinate sensitive services, or need a concrete brief to review with a developer, privacy lead, or qualified professional. You do not need to start by replacing your software stack. Describe the work in plain language. Do not send credentials, secrets, or protected medical information.</p>
        </div>
        <div className="card">
          <p className="eyebrow mb-3">Planning, not a build or regulated advice</p>
          <p>The documents are educational material, editable templates, and offline teaching references. The included service is Austin's discovery call and his review of one tailored plan. It is not hands-on implementation, deployed software, autonomous outreach, medical advice, or a HIPAA certification. Examples in the files are synthetic. A BAA alone does not make an implementation compliant.</p>
        </div>
      </section>

      <section className="container-x section !pt-0">
        <SectionHead eyebrow="Purchase summary" title="What the $750 covers" />
        <div className="card space-y-4 text-sm md:text-base">
          <p><strong className="text-white">{bundlePriceLabel} before tax.</strong> $250 is the educational documents. $500 is the consultation. When checkout is open, Stripe Tax calculates tax on those lines from the billing address. Separating the lines does not mean the consultation is tax-free. Summerlyn Advisors has an active Texas sales-tax registration. Tax is collected only where a registration is active. Other jurisdictions are not claimed as registered here.</p>
          <p>The educational files are licensed for internal use by one business and its staff. Reasonable staff copies and adaptations of the templates are included. Resale and public redistribution are not. License notices inside the files describe those files, including where they say consulting is not part of the file. This purchase separately includes Austin's 45-minute evening or weekend discovery call, one tailored plan that he reviews before delivery, and one revision. The files are not changed into personalized advice.</p>
          <p>The five business days for the plan start when the discovery call has been held, not when you pay or request a time. Business days are Monday through Friday, Central Time. The call is not recorded. Requesting a time does not confirm an appointment, and this page does not show open time.</p>
          <p>For this assisted package, all sales are final except where the law requires otherwise.</p>
          <p>Hands-on implementation, third-party software, API usage, monitoring, ongoing support, and future updates are not included. No earnings, productivity, legal, clinical, or security outcomes are guaranteed.</p>
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
