/**
 * Public shape of the Summerlyn Art catalog.
 *
 * Sellable records, Stripe Price IDs, and fulfillment settings live in
 * `server/art/catalog.ts`. This module is safe to import from the browser:
 * it has no prices, no payment links, and no artwork.
 */

export interface PublicArtImage {
  src: string;
  alt: string;
}

export interface PublicPrintSize {
  id: string;
  label: string;
  widthInches: number;
  heightInches: number;
  purchasable: boolean;
  unitAmountCents?: number;
  currency?: 'usd';
}

export interface PublicArtWork {
  id: string;
  title: string;
  artist: string;
  description: string;
  medium: 'watercolor-illustration';
  format: 'physical-print';
  image: PublicArtImage | null;
  reproductionTerms: string | null;
  sizes: PublicPrintSize[];
}

export interface ArtCatalogResponse {
  salesOpen: boolean;
  works: PublicArtWork[];
}

export const SALES_REQUIREMENTS: { title: string; body: string }[] = [
  {
    title: 'Approved artwork',
    body: 'Each listing needs the real piece: a title, a description, and a photograph of that work. A stock image is not a listing.',
  },
  {
    title: 'Approved print sizes',
    body: 'Physical print dimensions have to be chosen and stored for that piece. No sizes are on file.',
  },
  {
    title: 'A Stripe Price on the Summerlyn account',
    body: 'Each size needs a Price on the existing Summerlyn Advisors LLC Stripe account. The browser cannot set the amount.',
  },
  {
    title: 'Approved shipping and fulfillment',
    body: 'Destinations, Stripe shipping rates, and the written fulfillment terms have to be approved before checkout can collect an address. This page does not state a shipping policy.',
  },
  {
    title: 'A verified paid event',
    body: 'A print is recorded for shipment only after Stripe signs an event and the payment status is paid. Returning from Checkout does not ship anything, and this store does not deliver files.',
  },
  {
    title: 'A durable record of each paid order',
    body: 'The same paid event has to be stored once so a print is not shipped twice. That record is not connected yet, so checkout stays closed.',
  },
];
