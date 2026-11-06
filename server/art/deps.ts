import Stripe from 'stripe';
import { artCatalog, artCommerce, type ArtCommerceConfig, type ArtWork } from './catalog.js';
import { readArtConfig, type ArtRuntimeConfig } from './config.js';
import type { IdempotencyStore } from './idempotency.js';

export interface ArtStripe {
  accounts: { retrieve(id: string | null): Promise<{ id: string }> };
  checkout: {
    sessions: {
      create(
        params: Stripe.Checkout.SessionCreateParams,
        options?: Stripe.RequestOptions,
      ): Promise<{ id: string; url: string | null }>;
    };
  };
}

export interface ArtDeps {
  catalog: readonly ArtWork[];
  commerce: ArtCommerceConfig;
  config: ArtRuntimeConfig;
  /** Null until a durable store is wired. Checkout stays closed while this is null. */
  idempotency: IdempotencyStore | null;
  stripeFactory: (secretKey: string) => ArtStripe;
  verifyWebhook: (payload: string, header: string, secret: string) => Stripe.Event;
}

export function createArtDeps(env: NodeJS.ProcessEnv = process.env): ArtDeps {
  return {
    catalog: artCatalog,
    commerce: artCommerce,
    config: readArtConfig(env),
    idempotency: null,
    stripeFactory: (secretKey) => {
      const stripe = new Stripe(secretKey, { apiVersion: '2026-09-30.endive' });
      return {
        accounts: { retrieve: (id) => stripe.accounts.retrieve(id) },
        checkout: { sessions: { create: (params, options) => stripe.checkout.sessions.create(params, options) } },
      };
    },
    verifyWebhook: (payload, header, secret) => Stripe.webhooks.constructEvent(payload, header, secret),
  };
}
