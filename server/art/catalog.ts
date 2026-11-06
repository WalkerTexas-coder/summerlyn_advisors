/**
 * Summerlyn Art catalog. Shoppers never see this file.
 *
 * Stripe resources already exist on Summerlyn Advisors LLC account
 * `acct_1USelCFsaAkpNRZX`. Do not create another product, price, or payment link.
 *
 * - Product `prod_Va23AyM3PiSkaL`, name "Summerlyn Art Print"
 * - One-time price `price_1UYrzlFsaAkpNRZX1QomJg6F`, USD 2500 cents
 * - Product metadata `catalog_status=pending`
 * - No payment link. No charges have been made.
 *
 * Checkout always uses that Price id. The browser cannot send an amount.
 * A live key is accepted only for this price, and only after the gates below
 * are all true. Until then the sale stays unavailable.
 *
 * Still required before checkout can open:
 * 1. The authentic scan from Austin, stored outside any public download path,
 *    referenced by `image` (a site path of that scan, with alt text).
 * 2. `approvedForSale: true` on this work, set in the same change as the scan.
 * 3. Approved shipping countries, Stripe shipping rate ids, and fulfillment
 *    terms in `artCommerce`. None of those are known. Do not invent dimensions,
 *    postage, destinations, or a timeline.
 * 4. Server environment, never committed: restricted `STRIPE_SECRET_KEY`,
 *    `STRIPE_WEBHOOK_SECRET`, and `ART_CHECKOUT_ENABLED=true`.
 * 5. Webhook `/api/art/webhook` for `checkout.session.completed`,
 *    `checkout.session.async_payment_succeeded`, and
 *    `checkout.session.async_payment_failed`. Fulfill only when the signature
 *    verifies and `payment_status` is `paid`.
 * 6. A durable idempotency store in `createArtDeps`. The memory store is for
 *    tests and must not open the sale.
 *
 * `reproductionTerms` stays null until Austin supplies them. Dimensions stay
 * null until a size is approved.
 */

export const EXPECTED_STRIPE_ACCOUNT_ID = 'acct_1USelCFsaAkpNRZX';

export const ART_PRODUCT_ID = 'prod_Va23AyM3PiSkaL';

export const ART_PRICE_ID = 'price_1UYrzlFsaAkpNRZX1QomJg6F';

export const ART_PRICE_CENTS = 2500;

export const MAX_PRINT_QUANTITY = 10;

/** Stable ids used by the browser. The server looks up the Price from this id. */
export const CATALOG_ID = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;

export interface ArtImage {
  /** Site path of a photograph of the approved work. Not a stand-in. */
  src: string;
  alt: string;
}

export interface ArtPrintSize {
  id: string;
  label: string;
  /** Null until a size is approved. Do not invent one. */
  widthInches: number | null;
  heightInches: number | null;
  /** Price on the Summerlyn account. Server-only. */
  stripePriceId: string;
  /** Product that owns the Price. Server-only. */
  stripeProductId: string | null;
  /** Smallest currency unit. Must match the Stripe Price. Server-only. */
  unitAmountCents: number;
  currency: 'usd';
}

export function isAuthorizedArtPrice(size: Pick<ArtPrintSize, 'stripePriceId' | 'stripeProductId' | 'unitAmountCents' | 'currency'>): boolean {
  return size.stripePriceId === ART_PRICE_ID
    && size.stripeProductId === ART_PRODUCT_ID
    && size.unitAmountCents === ART_PRICE_CENTS
    && size.currency === 'usd';
}

export interface ArtWork {
  id: string;
  title: string;
  artist: string;
  description: string;
  medium: 'watercolor-illustration';
  format: 'physical-print';
  image: ArtImage | null;
  sizes: ArtPrintSize[];
  /** True only after Austin approves this work, its sizes, and its prices. */
  approvedForSale: boolean;
  /** Approved text if any right beyond the physical print is granted. */
  reproductionTerms: string | null;
}

export interface ArtCommerceConfig {
  /** Approved fulfillment words. Null until Austin supplies them. */
  fulfillmentTerms: string | null;
  /** ISO country codes Checkout may ship to. Empty until approved. */
  shippingCountries: string[];
  /** Stripe Shipping Rate ids. Empty until approved. */
  stripeShippingRateIds: string[];
}

export const artCatalog: ArtWork[] = [
  {
    id: 'summerlyn-art-print',
    title: 'Summerlyn Art Print',
    artist: 'Austin Walker',
    description: '',
    medium: 'watercolor-illustration',
    format: 'physical-print',
    image: null,
    sizes: [{
      id: 'print',
      label: '',
      widthInches: null,
      heightInches: null,
      stripePriceId: ART_PRICE_ID,
      stripeProductId: ART_PRODUCT_ID,
      unitAmountCents: ART_PRICE_CENTS,
      currency: 'usd',
    }],
    approvedForSale: false,
    reproductionTerms: null,
  },
];

export const artCommerce: ArtCommerceConfig = {
  fulfillmentTerms: null,
  shippingCountries: [],
  stripeShippingRateIds: [],
};
