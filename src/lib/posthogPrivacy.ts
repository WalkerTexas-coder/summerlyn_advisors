/** Privacy rules for anonymous PostHog events. This module does not contact PostHog. */

const INGEST_HOSTS = new Set(['https://us.i.posthog.com', 'https://eu.i.posthog.com']);

const PUBLIC_PATHS = new Set([
  '/',
  '/call-list',
  '/insights',
  '/advisory',
  '/about',
  '/contact',
  '/bundle',
  '/terms',
  '/privacy',
  '/art',
]);

const DENIED_PREFIXES = ['/bundle/thank-you', '/call-list/success', '/art/checkout', '/signup', '/api'];

export const CTA_NAMES = ['signup', 'contact', 'bundle_terms'] as const;

export type CtaName = (typeof CTA_NAMES)[number];

export type PublicEvent =
  | { event: 'public_page_view'; properties: { path: string; $geoip_disable: true } }
  | { event: 'cta_click'; properties: { name: CtaName; $geoip_disable: true } };

const SENSITIVE_VALUE = /session_id|sessionid|phc_|phx_|bearer |hmac|authorization|sk_live_|sk_test_|rk_live_|rk_test_|@|password|secret|token|blob_|cs_(test|live)_|price_|prod_/i;

export function posthogSettings(input: { token?: string; host?: string }): { token: string; host: string } | null {
  const token = input.token?.trim() ?? '';
  const host = (input.host?.trim() ?? '').replace(/\/+$/, '');
  if (!token.startsWith('phc_') || token.includes('phx_') || token.length < 12 || token.length > 200) return null;
  if (!INGEST_HOSTS.has(host)) return null;
  return { token, host };
}

/** Pathname only. Queries, fragments, and private routes are dropped. */
export function allowlistedPath(value: string): string | null {
  if (!value || value.includes('?') || value.includes('#') || value.includes('://') || value.includes('\\') || value.includes('@')) return null;
  let path = value;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  if (DENIED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) return null;
  if (PUBLIC_PATHS.has(path)) return path;
  if (/^\/insights\/[a-z0-9-]{1,80}$/.test(path)) return path;
  return null;
}

export function sanitizeCapture(event: string, properties: Record<string, unknown> | undefined): PublicEvent | null {
  if (event === 'public_page_view') {
    const path = typeof properties?.path === 'string' ? allowlistedPath(properties.path) : null;
    if (!path || SENSITIVE_VALUE.test(path)) return null;
    return { event, properties: { path, $geoip_disable: true } };
  }
  if (event === 'cta_click') {
    const name = properties?.name;
    if (name !== 'signup' && name !== 'contact' && name !== 'bundle_terms') return null;
    return { event, properties: { name, $geoip_disable: true } };
  }
  return null;
}

export function browserOptOutSignal(input: { globalPrivacyControl?: boolean; doNotTrack?: string | null }): boolean {
  const dnt = input.doNotTrack?.toLowerCase();
  return input.globalPrivacyControl === true || dnt === '1' || dnt === 'yes';
}

/** Consent is explicit, never inferred from geography. A browser privacy signal blocks capture. */
export function captureAllowed(input: { analyticsConsent: boolean; configured: boolean; globalPrivacyControl?: boolean; doNotTrack?: string | null }): boolean {
  if (!input.configured || input.analyticsConsent !== true) return false;
  return !browserOptOutSignal(input);
}

export function scrubPostHogEvent(event: { event?: string; properties?: Record<string, unknown> } | null): PublicEvent | null {
  if (!event?.event) return null;
  const clean = sanitizeCapture(event.event, event.properties);
  if (!clean) return null;
  return clean;
}

/** Explicit SDK switches. Remote project settings must not turn these back on. */
export function postHogInitOptions(host: string) {
  return {
    api_host: host,
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    capture_dead_clicks: false,
    capture_exceptions: false,
    capture_heatmaps: false,
    capture_performance: false,
    disable_session_recording: true,
    enable_recording_console_log: false,
    disable_surveys: true,
    person_profiles: 'never' as const,
    rageclick: false,
    mask_all_text: true,
    mask_all_element_attributes: true,
    opt_out_capturing_by_default: true,
    opt_out_persistence_by_default: true,
    respect_dnt: true,
    advanced_disable_flags: true,
    property_denylist: ['email', 'name', 'session_id', 'token', 'authorization', '$current_url', '$referrer', '$referring_domain'],
    logs: { captureConsoleLogs: false },
  };
}
