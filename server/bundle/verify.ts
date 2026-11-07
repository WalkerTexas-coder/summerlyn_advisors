import { createHash } from 'node:crypto';
import type { BundleProduct } from './product.js';

export function sha256Hex(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex');
}

export interface CheckoutPrice {
  id: string;
  unit_amount: number | null;
  currency: string;
  type: string;
  active: boolean;
  tax_behavior: string | null;
  livemode: boolean;
  product: string | { id: string };
}

export interface CheckoutProduct {
  id: string;
  tax_code: string | null;
  shippable: boolean | null;
}

export interface PaidSessionLine {
  quantity: number | null;
  price: null | {
    id: string;
    unit_amount: number | null;
    currency: string | null;
    product: string | { id: string };
  };
}

export interface PaidSession {
  id: string;
  object?: string;
  payment_status?: string;
  mode?: string | null;
  currency?: string | null;
  amount_subtotal?: number | null;
  livemode?: boolean;
  metadata?: Record<string, string> | null;
  line_items?: { data: PaidSessionLine[] } | null;
}

export function productIdOf(product: string | { id: string }): string {
  return typeof product === 'string' ? product : product.id;
}

export function priceMatchesBundle(price: CheckoutPrice, product: BundleProduct): boolean {
  return price.id === product.priceId
    && price.unit_amount === product.unitAmountCents
    && price.currency === product.currency
    && price.type === 'one_time'
    && price.active === true
    && price.tax_behavior === product.taxBehavior
    && price.livemode === true
    && productIdOf(price.product) === product.productId;
}

export function productMatchesBundle(remote: CheckoutProduct, product: BundleProduct): boolean {
  return remote.id === product.productId
    && remote.tax_code === product.taxCode
    && remote.shippable === false;
}

/** A paid Checkout Session for this exact live price, and no other purchase. */
export function sessionMatchesBundle(session: PaidSession, product: BundleProduct): boolean {
  if (session.livemode !== true) return false;
  if (session.payment_status !== 'paid') return false;
  if (session.mode !== 'payment') return false;
  if (session.currency !== product.currency) return false;
  if (session.amount_subtotal !== product.unitAmountCents) return false;
  if (session.metadata?.bundle_sku !== product.sku) return false;
  const items = session.line_items?.data ?? [];
  if (items.length !== 1) return false;
  const item = items[0];
  if (item.quantity !== 1 || !item.price) return false;
  if (item.price.id !== product.priceId) return false;
  if (item.price.unit_amount !== product.unitAmountCents) return false;
  if (item.price.currency !== product.currency) return false;
  if (productIdOf(item.price.product) !== product.productId) return false;
  return true;
}

export const SESSION_ID = /^cs_(test|live)_[A-Za-z0-9]+$/;

export const EVENT_ID = /^evt_[A-Za-z0-9]+$/;
