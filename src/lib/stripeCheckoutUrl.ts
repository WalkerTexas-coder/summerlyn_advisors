/** True only for Stripe-hosted Checkout. Success and cancel pages are on our site and are not files. */
export function isStripeHostedCheckoutUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'checkout.stripe.com';
  } catch {
    return false;
  }
}
