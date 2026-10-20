export type Consent = { necessary: true; analytics: boolean; decidedAt: string };
const KEY = 'summerlyn_cookie_consent_v1';
export const CONSENT_EVENT = 'summerlyn:consent-changed';
export const OPEN_EVENT = 'summerlyn:open-cookie-settings';

export function getConsent(): Consent | null {
  try { const v = localStorage.getItem(KEY); return v ? (JSON.parse(v) as Consent) : null; } catch { return null; }
}
export function setConsent(analytics: boolean) {
  const c: Consent = { necessary: true, analytics, decidedAt: new Date().toISOString() };
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  if (analytics) loadAnalytics();
}

let loaded = false;
/** Loads non-essential analytics ONLY after opt-in. No analytics provider is configured yet (VITE_ANALYTICS_SRC). */
export function loadAnalytics() {
  if (loaded || !getConsent()?.analytics) return;
  const src = import.meta.env.VITE_ANALYTICS_SRC as string | undefined;
  if (!src) return;
  const s = document.createElement('script');
  s.src = src; s.async = true; s.defer = true;
  document.head.appendChild(s);
  loaded = true;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
