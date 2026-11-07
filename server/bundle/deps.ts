import Stripe from 'stripe';
import { CHECKOUT_RELEASED, OFFER_SCOPE_MATCHES_PRICE, bundleProduct, type BundleProduct } from './product.js';
import { readBundleConfig, type BundleRuntimeConfig } from './config.js';
import type { FulfillmentStore } from './fulfillment.js';
import type { IntakeStore } from './intakeStore.js';
import { createBlobFulfillmentStore, createBlobIntakeStore, createPrivateFileStore, type BundleFileStore } from './storage.js';
import type { CheckoutPrice, CheckoutProduct, PaidSession } from './verify.js';

export interface BundleStripe {
  accounts: { retrieve(id: string | null): Promise<{ id: string }> };
  prices: { retrieve(id: string): Promise<CheckoutPrice> };
  products: { retrieve(id: string): Promise<CheckoutProduct> };
  checkout: {
    sessions: {
      create(
        params: Stripe.Checkout.SessionCreateParams,
        options?: Stripe.RequestOptions,
      ): Promise<{ id: string; url: string | null }>;
      retrieve(id: string, params?: { expand?: string[] }): Promise<PaidSession>;
    };
  };
}

export interface BundleDeps {
  product: BundleProduct;
  /** Hard closed unless this revision explicitly releases checkout. */
  checkoutReleased: boolean;
  /** False until storage, webhook setup, and an end-to-end check are verified. */
  offerScopeMatchesPrice: boolean;
  config: BundleRuntimeConfig;
  /** Null until private durable storage is configured. Checkout stays closed. */
  fulfillment: FulfillmentStore | null;
  /** Null until the same private store can keep intake. No email or calendar send. */
  intake: IntakeStore | null;
  fileStore: BundleFileStore;
  stripeFactory: (secretKey: string) => BundleStripe;
  verifyWebhook: (payload: string, header: string, secret: string) => Stripe.Event;
  now: () => number;
}

export function createBundleDeps(env: NodeJS.ProcessEnv = process.env): BundleDeps {
  const config = readBundleConfig(env);
  return {
    product: bundleProduct,
    checkoutReleased: CHECKOUT_RELEASED,
    offerScopeMatchesPrice: OFFER_SCOPE_MATCHES_PRICE,
    config,
    fulfillment: createBlobFulfillmentStore(config),
    intake: createBlobIntakeStore(config),
    fileStore: createPrivateFileStore(config, bundleProduct.sha256),
    stripeFactory: (secretKey) => {
      const stripe = new Stripe(secretKey, { apiVersion: '2026-09-30.endive' });
      return {
        accounts: { retrieve: (id) => stripe.accounts.retrieve(id) },
        prices: { retrieve: (id) => stripe.prices.retrieve(id) },
        products: { retrieve: (id) => stripe.products.retrieve(id).then((product) => ({
          id: product.id,
          tax_code: typeof product.tax_code === 'string' ? product.tax_code : null,
          shippable: product.shippable ?? null,
        })) },
        checkout: {
          sessions: {
            create: (params, options) => stripe.checkout.sessions.create(params, options),
            retrieve: (id, params) => stripe.checkout.sessions.retrieve(id, params) as Promise<PaidSession>,
          },
        },
      };
    },
    verifyWebhook: (payload, header, secret) => Stripe.webhooks.constructEvent(payload, header, secret),
    now: () => Date.now(),
  };
}
