/**
 * Server-controlled identity of the Practical AI Implementation Bundle.
 * The browser cannot choose the price, product, amount, currency, or tax code.
 * Do not create another Stripe product, price, or payment link for this offer.
 *
 * Live account acct_1USelCFsaAkpNRZX (Summerlyn Advisors LLC):
 * - Product prod_Va8BcFbHmL8qoU, tax code txcd_10302000, not shippable
 * - Price price_1UYxurFsaAkpNRZXO4el745q, one-time USD 75000, tax exclusive
 *
 * Checkout stays closed. This price is a files-only digital-books price.
 * It must not be charged for a consultation, discovery call, or custom plan.
 * Those were proposed and are not confirmed: duration, capacity, turnaround,
 * revisions, refunds, and assisted-service tax classification are undecided.
 * Do not retarget this product or tax code at that mixed offer.
 *
 * Opening checkout requires a reviewed change to both flags below, after the
 * sold scope is confirmed to match this files-only price, a private copy of
 * the zip is stored, and a paid-session download of that exact file is verified.
 */

export const CHECKOUT_RELEASED = false;

/** False until the confirmed offer is this files-only library, not an assisted service. */
export const OFFER_SCOPE_MATCHES_PRICE = false;

export const BUNDLE_ACCOUNT_ID = 'acct_1USelCFsaAkpNRZX';

export const BUNDLE_PRODUCT_ID = 'prod_Va8BcFbHmL8qoU';

export const BUNDLE_PRICE_ID = 'price_1UYxurFsaAkpNRZXO4el745q';

export const BUNDLE_UNIT_AMOUNT_CENTS = 75_000;

export const BUNDLE_TAX_CODE = 'txcd_10302000';

export const BUNDLE_SKU = 'ai-implementation-bundle';

export const BUNDLE_EDITION = '2026-11';

export const BUNDLE_FILENAME = 'Summerlyn-Advisors-Implementation-Bundle.zip';

/** sha256 of the November 2026 zip. The bytes themselves are not in this repo. */
export const BUNDLE_SHA256 = '84bc80785adad21de677234562419af1629201f3ece196f8871d5a2955208f1a';

export const DOWNLOAD_TOKEN_TTL_MS = 10 * 60 * 1000;

export interface BundleProduct {
  accountId: string;
  productId: string;
  priceId: string;
  unitAmountCents: number;
  currency: 'usd';
  taxCode: string;
  taxBehavior: 'exclusive';
  sku: string;
  edition: string;
  filename: string;
  sha256: string;
}

export const bundleProduct: BundleProduct = {
  accountId: BUNDLE_ACCOUNT_ID,
  productId: BUNDLE_PRODUCT_ID,
  priceId: BUNDLE_PRICE_ID,
  unitAmountCents: BUNDLE_UNIT_AMOUNT_CENTS,
  currency: 'usd',
  taxCode: BUNDLE_TAX_CODE,
  taxBehavior: 'exclusive',
  sku: BUNDLE_SKU,
  edition: BUNDLE_EDITION,
  filename: BUNDLE_FILENAME,
  sha256: BUNDLE_SHA256,
};
