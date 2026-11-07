/**
 * Server-controlled identity of the assisted package.
 * The browser cannot choose prices, products, amounts, currency, or tax codes.
 * Do not create another product, price, or payment link from this app.
 *
 * Approved allocation, before tax, tax exclusive:
 * - Documents $250: price_1UYyJJFsaAkpNRZXJi8hGEnm on prod_Va8BcFbHmL8qoU, txcd_10302000
 * - Consultation $500: price_1UYyJNFsaAkpNRZX9vY0CDYY on prod_Va8a8DqISyO6Le, txcd_20060048
 * - Total subtotal USD 75000. Quantity 1 of each line.
 *
 * The older files-only price price_1UYxurFsaAkpNRZXO4el745q stays on the
 * account and must not be charged for this package. A payment for that price,
 * or for only one of the two lines, does not grant the assisted package.
 *
 * Line-item tax codes are not a finding that the consultation is tax-free in
 * Texas. Checkout stays closed until private storage, the webhook secret, and
 * an end-to-end paid delivery have been verified.
 */

export const CHECKOUT_RELEASED = false;

/** False until storage, webhook setup, and an end-to-end check are verified. */
export const OFFER_SCOPE_MATCHES_PRICE = false;

export const BUNDLE_ACCOUNT_ID = 'acct_1USelCFsaAkpNRZX';

export const FILES_ONLY_PRICE_ID = 'price_1UYxurFsaAkpNRZXO4el745q';

export const DOCUMENTS_PRICE_ID = 'price_1UYyJJFsaAkpNRZXJi8hGEnm';

export const DOCUMENTS_PRODUCT_ID = 'prod_Va8BcFbHmL8qoU';

export const DOCUMENTS_AMOUNT_CENTS = 25_000;

export const DOCUMENTS_TAX_CODE = 'txcd_10302000';

export const CONSULTING_PRICE_ID = 'price_1UYyJNFsaAkpNRZX9vY0CDYY';

export const CONSULTING_PRODUCT_ID = 'prod_Va8a8DqISyO6Le';

export const CONSULTING_AMOUNT_CENTS = 50_000;

export const CONSULTING_TAX_CODE = 'txcd_20060048';

export const BUNDLE_TOTAL_CENTS = 75_000;

export const BUNDLE_SKU = 'ai-implementation-bundle';

export const BUNDLE_EDITION = '2026-11';

export const BUNDLE_FILENAME = 'Summerlyn-Advisors-Implementation-Bundle.zip';

/** sha256 of the November 2026 zip. The bytes themselves are not in this repo. */
export const BUNDLE_SHA256 = '84bc80785adad21de677234562419af1629201f3ece196f8871d5a2955208f1a';

export const DOWNLOAD_TOKEN_TTL_MS = 10 * 60 * 1000;

export interface PricedComponent {
  priceId: string;
  productId: string;
  unitAmountCents: number;
  taxCode: string;
}

export interface BundleProduct {
  accountId: string;
  filesOnlyPriceId: string;
  totalCents: number;
  currency: 'usd';
  taxBehavior: 'exclusive';
  documents: PricedComponent;
  consulting: PricedComponent;
  sku: string;
  edition: string;
  filename: string;
  sha256: string;
}

export const bundleProduct: BundleProduct = {
  accountId: BUNDLE_ACCOUNT_ID,
  filesOnlyPriceId: FILES_ONLY_PRICE_ID,
  totalCents: BUNDLE_TOTAL_CENTS,
  currency: 'usd',
  taxBehavior: 'exclusive',
  documents: {
    priceId: DOCUMENTS_PRICE_ID,
    productId: DOCUMENTS_PRODUCT_ID,
    unitAmountCents: DOCUMENTS_AMOUNT_CENTS,
    taxCode: DOCUMENTS_TAX_CODE,
  },
  consulting: {
    priceId: CONSULTING_PRICE_ID,
    productId: CONSULTING_PRODUCT_ID,
    unitAmountCents: CONSULTING_AMOUNT_CENTS,
    taxCode: CONSULTING_TAX_CODE,
  },
  sku: BUNDLE_SKU,
  edition: BUNDLE_EDITION,
  filename: BUNDLE_FILENAME,
  sha256: BUNDLE_SHA256,
};
