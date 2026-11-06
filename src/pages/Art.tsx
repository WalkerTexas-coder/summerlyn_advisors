import { FormEvent, useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { SHOP_PRINT, type PublicArtWork } from '../data/artCatalog';
import { fetchArtCatalog, startArtCheckout } from '../lib/artCatalogClient';

function formatUsd(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function Purchase({ work }: { work: PublicArtWork }) {
  const size = work.sizes.find((item) => item.purchasable);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  if (!size) return null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !size) return;
    setPending(true);
    setError('');
    const result = await startArtCheckout({ workId: work.id, sizeId: size.id, quantity: 1 });
    if (!result.ok) {
      setPending(false);
      setError('Purchase cannot be started right now.');
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8">
      <button
        type="submit"
        className="rounded-full bg-[#1b3024] px-7 py-3 text-sm font-semibold text-[#f4efe4] hover:bg-[#2c4a36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d5420] disabled:opacity-60"
        disabled={pending}
      >
        {pending ? 'Opening Stripe…' : 'Purchase'}
      </button>
      {error ? <p role="alert" className="mt-3 text-sm text-[#6d5420]">{error}</p> : null}
    </form>
  );
}

export default function Art() {
  const [work, setWork] = useState<PublicArtWork | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchArtCatalog(controller.signal).then(
      (catalog) => {
        if (!controller.signal.aborted) setWork(catalog.works[0] ?? null);
      },
      () => undefined,
    );
    return () => controller.abort();
  }, []);

  const title = work?.title || SHOP_PRINT.title;
  const cents = work?.sizes[0]?.unitAmountCents ?? SHOP_PRINT.unitAmountCents;
  const image = work?.image ?? null;

  return (
    <>
      <SEO
        title={title}
        description={`${title}. ${formatUsd(cents)}.`}
        url="/art"
        brand="Summerlyn Art"
      />
      <section className="mx-auto flex min-h-[72vh] max-w-5xl flex-col justify-between px-6 pb-8 pt-10 md:px-12 md:pt-16">
        <div className="max-w-xl">
          <h1 className="font-display text-5xl font-light leading-[1.05] text-[#1b3024] md:text-7xl">{title}</h1>
          <p className="mt-6 font-display text-4xl font-light text-[#6d5420] md:text-5xl">{formatUsd(cents)}</p>
          {work ? <Purchase work={work} /> : null}
        </div>
        {image ? (
          <figure className="mt-12 max-w-md">
            <img src={image.src} alt={image.alt} className="w-full border border-[#1b3024]/15 bg-[#fbf6ec] object-contain shadow-[0_24px_60px_-36px_rgba(27,48,36,0.7)]" />
          </figure>
        ) : null}
      </section>
    </>
  );
}
