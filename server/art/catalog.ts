/**
 * Summerlyn Art catalog — the only place listings are added.
 *
 * Selling Art Bot confirmed there is no approved catalog: no artwork, scans,
 * sizes, prices, licenses, fulfillment terms, or Stripe art products. Austin
 * Walker paints watercolor illustrations and intends to sell physical prints.
 * That is context for this storefront, not a listing. Leave `artCatalog` empty
 * until a real work is approved. Do not add sample pieces, stock images, or
 * guessed prices.
 *
 * This collection is physical prints on the existing Summerlyn Advisors LLC
 * Stripe account `acct_1USelCFsaAkpNRZX`. It is not a new merchant, a
 * marketplace, or a digital download shop. Do not put print files in `public/`
 * or on the Checkout success URL.
 *
 * Before any size can be purchased, all of the following have to be true:
 *
 * 1. The work is in `artCatalog` with the approved title, artist, description,
 *    and a photograph of that work (a site path such as `/art/works/piece.jpg`).
 *    `approvedForSale` stays false until Austin approves that exact entry.
 * 2. Each physical size has dimensions, a Stripe Price id created in the
 *    account above, and `unitAmountCents` that matches that Price. The browser
 *    sends only `workId`, `sizeId`, and quantity. It cannot send an amount.
 * 3. `artCommerce.shippingCountries`, `stripeShippingRateIds`, and
 *    `fulfillmentTerms` are the approved destinations, Stripe Shipping Rates,
 *    and the words customers will see. Empty means checkout stays closed.
 *    Do not invent a shipping policy here.
 * 4. If a sale grants any right beyond the physical print, put the approved
 *    text in `reproductionTerms`. Null states no extra right.
 * 5. Server environment (Vercel sensitive variables, never this repo):
 *    `STRIPE_SECRET_KEY` (restricted key, `rk_…`), `STRIPE_WEBHOOK_SECRET`
 *    (`whsec_…`), and `ART_CHECKOUT_ENABLED=true`. Set `ART_SITE_ORIGIN` only
 *    when Checkout should return to a host other than production or localhost.
 * 6. A Stripe webhook on `/api/art/webhook` for `checkout.session.completed`,
 *    `checkout.session.async_payment_succeeded`, and
 *    `checkout.session.async_payment_failed`. Fulfillment runs in that handler
 *    after signature verification, and only when `payment_status` is `paid`.
 * 7. A durable idempotency store wired in `createArtDeps`. The memory store
 *    in tests does not survive a serverless instance and must not be used to
 *    open sales. Without it, a paid event cannot be recorded once.
 * 8. Live keys are refused while `ALLOW_LIVE_CHARGES` is false in
 *    `server/art/config.ts`. Turning that on is a separate reviewed launch.
 *    This code does not create Stripe products, prices, or payment links.
 *
 * Checkout also stays closed when the secret key, webhook secret, shipping
 * setup, or Price id is missing. The public page reads `GET /api/art/catalog`,
 * which strips Price ids and shipping rate ids.
 */

export const EXPECTED_STRIPE_ACCOUNT_ID = 'acct_1USelCFsaAkpNRZX';

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
  widthInches: number;
  heightInches: number;
  /** Price on the Summerlyn account. Server-only. */
  stripePriceId: string;
  /** Smallest currency unit. Must match the Stripe Price. Server-only. */
  unitAmountCents: number;
  currency: 'usd';
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

export const artCatalog: ArtWork[] = [];

export const artCommerce: ArtCommerceConfig = {
  fulfillmentTerms: null,
  shippingCountries: [],
  stripeShippingRateIds: [],
};
