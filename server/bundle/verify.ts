import { createHash } from 'node:crypto';
import type { BundleProduct, PricedComponent } from './product.js';

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

export function componentPriceMatches(price: CheckoutPrice, component: PricedComponent, filesOnlyPriceId: string): boolean {
  return price.id === component.priceId
    && price.id !== filesOnlyPriceId
    && price.unit_amount === component.unitAmountCents
    && price.currency === 'usd'
    && price.type === 'one_time'
    && price.active === true
    && price.tax_behavior === 'exclusive'
    && price.livemode === true
    && productIdOf(price.product) === component.productId;
}

export function documentsProductMatches(remote: CheckoutProduct, component: PricedComponent): boolean {
  return remote.id === component.productId && remote.tax_code === component.taxCode && remote.shippable === false;
}

export function consultingProductMatches(remote: CheckoutProduct, component: PricedComponent): boolean {
  return remote.id === component.productId && remote.tax_code === component.taxCode;
}

function lineMatches(item: PaidSessionLine, component: PricedComponent): boolean {
  if (item.quantity !== 1 || !item.price) return false;
  return item.price.id === component.priceId
    && item.price.unit_amount === component.unitAmountCents
    && item.price.currency === 'usd'
    && productIdOf(item.price.product) === component.productId;
}

/**
 * A live paid session with exactly the $250 documents line and the $500
 * consultation line. The old $750 price and any partial payment do not match.
 */
export function sessionMatchesBundle(session: PaidSession, product: BundleProduct): boolean {
  if (session.livemode !== true) return false;
  if (session.payment_status !== 'paid') return false;
  if (session.mode !== 'payment') return false;
  if (session.currency !== product.currency) return false;
  if (session.amount_subtotal !== product.totalCents) return false;
  if (session.metadata?.bundle_sku !== product.sku) return false;
  const items = session.line_items?.data ?? [];
  if (items.length !== 2) return false;
  if (items.some((item) => item.price?.id === product.filesOnlyPriceId)) return false;
  const documents = items.filter((item) => lineMatches(item, product.documents));
  const consulting = items.filter((item) => lineMatches(item, product.consulting));
  return documents.length === 1 && consulting.length === 1;
}

export const SESSION_ID = /^cs_(test|live)_[A-Za-z0-9]+$/;

export const EVENT_ID = /^evt_[A-Za-z0-9]+$/;
