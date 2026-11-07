import { allowlistedPath, browserOptOutSignal, captureAllowed, posthogSettings, type CtaName } from './posthogPrivacy';

let ready: Promise<void> | null = null;
let epoch = 0;

function settings() {
  return posthogSettings({
    token: import.meta.env.VITE_POSTHOG_PROJECT_TOKEN,
    host: import.meta.env.VITE_POSTHOG_HOST,
  });
}

function readSignal(): { globalPrivacyControl?: boolean; doNotTrack?: string | null } {
  if (typeof navigator === 'undefined') return {};
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean; doNotTrack?: string | null };
  const win = window as Window & { doNotTrack?: string | null };
  return { globalPrivacyControl: nav.globalPrivacyControl, doNotTrack: nav.doNotTrack ?? win.doNotTrack ?? null };
}

export function analyticsBlockedByBrowser(): boolean {
  return browserOptOutSignal(readSignal());
}

/** Starts anonymous capture only after an explicit accept, a public ingest token, and no browser opt-out signal. */
export function syncPostHog(analyticsConsent: boolean) {
  const configured = settings();
  const signal = readSignal();
  const allowed = captureAllowed({
    analyticsConsent,
    configured: configured !== null,
    globalPrivacyControl: signal.globalPrivacyControl,
    doNotTrack: signal.doNotTrack,
  });
  const mine = ++epoch;
  if (!allowed || !configured) {
    const pending = ready;
    ready = null;
    if (pending) void pending.then(() => import('./posthogClient')).then((client) => { if (mine === epoch) client.stopPostHog(); });
    return;
  }
  ready = import('./posthogClient').then(async (client) => {
    await client.startPostHog(configured.token, configured.host);
    if (mine !== epoch) client.stopPostHog();
  });
}

function send(event: string, properties: Record<string, unknown>) {
  const pending = ready;
  if (!pending) return;
  void pending.then(() => {
    if (pending !== ready) return;
    return import('./posthogClient').then((client) => client.captureAllowlisted(event, properties));
  });
}

export function trackPageView(pathname: string) {
  const path = allowlistedPath(pathname);
  if (!path) return;
  send('public_page_view', { path });
}

export function trackCta(name: CtaName) {
  send('cta_click', { name });
}
