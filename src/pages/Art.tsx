import { FormEvent, useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageHeader } from '../components/ui';
import { SALES_REQUIREMENTS, type PublicArtWork } from '../data/artCatalog';
import { fetchArtCatalog, startArtCheckout } from '../lib/artCatalogClient';

function formatUsd(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function ArtBuyForm({ work }: { work: PublicArtWork }) {
  const purchasable = work.sizes.filter((size) => size.purchasable);
  const [sizeId, setSizeId] = useState(purchasable[0]?.id ?? '');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const group = useId();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !sizeId) return;
    setPending(true);
    setError('');
    const result = await startArtCheckout({ workId: work.id, sizeId, quantity: 1 });
    if (!result.ok) {
      setPending(false);
      setError('Checkout is unavailable.');
    }
  }

  if (purchasable.length === 0) return <p className="mt-6 text-sm text-zinc-400">Not for sale.</p>;

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <fieldset>
        <legend className="text-sm font-medium text-white">Print size</legend>
        <div className="mt-3 space-y-2">
          {purchasable.map((size) => (
            <label key={size.id} className="flex items-center gap-3 text-sm text-zinc-300">
              <input
                type="radio"
                name={group}
                value={size.id}
                checked={sizeId === size.id}
                onChange={() => setSizeId(size.id)}
                className="accent-brand-300"
              />
              <span>
                {size.label} · {size.widthInches} × {size.heightInches} in
                {size.unitAmountCents !== undefined ? ` · ${formatUsd(size.unitAmountCents)}` : ''}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <button
        type="submit"
        className="btn-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
        disabled={pending}
      >
        {pending ? 'Opening Stripe…' : 'Continue to Stripe'}
      </button>
      <p className="text-xs text-zinc-500">Stripe hosts the payment page. The charge uses the price stored for this size.</p>
      {error ? <p role="alert" className="text-sm text-amber-200">{error}</p> : null}
    </form>
  );
}

function ArtWorkCard({ work, salesOpen }: { work: PublicArtWork; salesOpen: boolean }) {
  return (
    <article className="grid gap-8 border-t border-white/15 py-12 md:grid-cols-12">
      <div className="md:col-span-5">
        {work.image ? (
          <img src={work.image.src} alt={work.image.alt} className="aspect-[4/5] w-full border border-white/15 object-cover" />
        ) : (
          <div className="flex aspect-[4/5] items-end border border-white/15 p-6 text-sm text-zinc-400">Photograph not on file.</div>
        )}
      </div>
      <div className="md:col-span-7">
        <p className="kicker">Physical print · Watercolor illustration</p>
        <h2 className="mt-3 font-display text-4xl font-light text-white">{work.title}</h2>
        <p className="mt-2 text-zinc-400">{work.artist}</p>
        <p className="mt-5 text-lg leading-relaxed text-zinc-300">{work.description}</p>
        {work.reproductionTerms ? <p className="mt-4 text-sm text-zinc-400">{work.reproductionTerms}</p> : null}
        <ul className="mt-6 space-y-2 text-sm text-zinc-300">
          {work.sizes.map((size) => (
            <li key={size.id}>
              {size.label} · {size.widthInches} × {size.heightInches} in
              {size.purchasable && size.unitAmountCents !== undefined ? ` · ${formatUsd(size.unitAmountCents)}` : ' · Price not available'}
            </li>
          ))}
        </ul>
        {salesOpen ? <ArtBuyForm work={work} /> : <p className="mt-6 text-sm text-zinc-400">Not for sale.</p>}
      </div>
    </article>
  );
}

export default function Art() {
  const [works, setWorks] = useState<PublicArtWork[]>([]);
  const [salesOpen, setSalesOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchArtCatalog(controller.signal).then(
      (catalog) => {
        if (controller.signal.aborted) return;
        setWorks(catalog.works);
        setSalesOpen(catalog.salesOpen);
      },
      (error: unknown) => {
        if (controller.signal.aborted) return;
        if (error instanceof Error && error.name === 'AbortError') return;
        setNotice('The collection list could not be loaded. Nothing on this page is for sale.');
      },
    );
    return () => controller.abort();
  }, []);

  return (
    <>
      <SEO
        title="Watercolor illustrations"
        description="Summerlyn Art is Austin Walker's upcoming collection of watercolor illustrations, intended as physical prints. No works are listed and nothing is for sale yet."
        url="/art"
        brand="Summerlyn Art"
      />
      <PageHeader
        eyebrow="Summerlyn Art"
        title={<>Watercolor illustrations, <span className="serif-accent">when they are ready.</span></>}
      >
        Austin Walker paints watercolor illustrations and plans to sell physical prints from this page. That plan is not a catalog. No artwork, size, price, license, or fulfillment term has been approved, and nothing here can be purchased.
      </PageHeader>

      <section className="container-x pb-4" aria-labelledby="collection-heading">
        <div className="mb-8 flex items-baseline gap-4 rule pt-5">
          <span className="sec-num">№ 01</span>
          <h2 id="collection-heading" className="kicker">The collection</h2>
        </div>
        {notice ? <p role="status" className="mb-8 text-sm text-zinc-400">{notice}</p> : null}
        {works.length > 0 ? (
          <div>
            {works.map((work) => <ArtWorkCard key={work.id} work={work} salesOpen={salesOpen} />)}
          </div>
        ) : (
          <div className="grid items-stretch gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex min-h-[420px] flex-col justify-between border border-white/15 bg-[radial-gradient(circle_at_top,rgba(196,181,253,0.16),transparent_58%)] p-8">
                <p className="kicker">Upcoming collection</p>
                <div>
                  <p role="status" className="font-display text-4xl font-light leading-tight text-white md:text-5xl">No prints listed</p>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">This frame stays empty until an approved watercolor and a photograph of that work are added to the catalog.</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-6 md:col-start-7 self-end">
              <p className="font-display text-3xl font-light leading-snug text-white md:text-4xl">Physical prints are the intention. They are not a product yet.</p>
              <p className="mt-5 text-zinc-400 leading-relaxed">Summerlyn Art is part of Summerlyn Advisors LLC. When a print is sold, payment will use that company’s existing Stripe account. This page is not a separate shop, and it will not hand out files.</p>
            </div>
          </div>
        )}
      </section>

      <section className="container-x section" aria-labelledby="requirements-heading">
        <div className="mb-10 flex items-baseline gap-4 rule pt-5">
          <span className="sec-num">№ 02</span>
          <h2 id="requirements-heading" className="kicker">Before a print can be sold</h2>
        </div>
        <ol className="border-t border-white/10">
          {SALES_REQUIREMENTS.map((item, index) => (
            <li key={item.title} className="grid gap-3 border-b border-white/10 py-6 md:grid-cols-12">
              <span className="sec-num md:col-span-2">{String(index + 1).padStart(2, '0')}</span>
              <div className="md:col-span-10">
                <h3 className="text-lg text-white">{item.title}</h3>
                <p className="mt-2 max-w-3xl text-zinc-400 leading-relaxed">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-x pb-24">
        <div className="card md:p-12">
          <p className="kicker">Purchases</p>
          <h2 className="mt-3 font-display text-4xl font-light text-white">Purchases are closed.</h2>
          <p className="mt-4 max-w-2xl text-zinc-400 leading-relaxed">When a print is approved, its listing will open checkout and send the buyer to Stripe. The success page will not be a download. Shipping terms will be published with the collection, after they are approved.</p>
          <Link
            to="/contact"
            className="btn-ghost mt-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
          >
            Questions
          </Link>
        </div>
      </section>
    </>
  );
}
