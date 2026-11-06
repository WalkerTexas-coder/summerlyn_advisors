import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageHeader } from '../components/ui';

export default function ArtCheckoutResult({ result }: { result: 'success' | 'canceled' }) {
  const success = result === 'success';
  return (
    <>
      <SEO
        title={success ? 'Checkout return' : 'Checkout canceled'}
        description={success
          ? 'Returning from Stripe does not ship a print or provide a file. Summerlyn Art records an order only after a verified paid event.'
          : 'Summerlyn Art checkout is canceled or closed. This page does not charge a card.'}
        url={success ? '/art/checkout/success' : '/art/checkout/canceled'}
        brand="Summerlyn Art"
      />
      <PageHeader
        eyebrow="Summerlyn Art"
        title={success ? <>Payment is confirmed on the server, <span className="serif-accent">not on this page.</span></> : <>Checkout is closed <span className="serif-accent">from here.</span></>}
      >
        {success
          ? 'If a payment was completed, Summerlyn records the print for shipment only after Stripe sends a signed event and the payment status is paid. This page does not confirm shipment and does not provide a file. Checkout for this collection is not open, so a visit here is not an order.'
          : 'No charge is made from this page. Summerlyn Art checkout stays closed until artwork, prices, shipping, and fulfillment are approved.'}
      </PageHeader>
      <section className="container-x pb-24">
        <Link
          to="/art"
          className="btn-ghost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
        >
          Back to Summerlyn Art
        </Link>
      </section>
    </>
  );
}
