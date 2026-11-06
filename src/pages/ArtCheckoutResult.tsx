import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function ArtCheckoutResult({ result }: { result: 'success' | 'canceled' }) {
  const success = result === 'success';
  return (
    <>
      <SEO
        title={success ? 'Thank you' : 'Purchase canceled'}
        description={success ? 'Thank you for your purchase from Summerlyn Art.' : 'The Summerlyn Art purchase was not completed.'}
        url={success ? '/art/checkout/success' : '/art/checkout/canceled'}
        brand="Summerlyn Art"
      />
      <section className="mx-auto min-h-[60vh] max-w-3xl px-6 pt-16 md:px-12 md:pt-24">
        <h1 className="font-display text-5xl font-light text-[#1b3024] md:text-7xl">{success ? 'Thank you.' : 'The purchase was not completed.'}</h1>
        <Link
          to="/art"
          className="mt-10 inline-flex rounded-full border border-[#1b3024]/20 px-6 py-3 text-sm font-semibold text-[#1b3024] hover:bg-[#1b3024]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d5420]"
        >
          Return
        </Link>
      </section>
    </>
  );
}
