import { allowlistedPath, posthogSettings, type CtaName } from './posthogPrivacy';

let booted = false;

function settings() {
  return posthogSettings({
    token: import.meta.env.VITE_POSTHOG_PROJECT_TOKEN,
    host: import.meta.env.VITE_POSTHOG_HOST,
  });
}

/** No PostHog network call unless a project ingest token, region host, and consent are all present. */
export function syncPostHog(analyticsConsent: boolean) {
  const configured = settings();
  if (!configured) return;
  if (!analyticsConsent) {
    if (!booted) return;
    void import('./posthogClient').then((client) => client.stopPostHog());
    return;
  }
  booted = true;
  void import('./posthogClient').then((client) => client.startPostHog(configured.token, configured.host));
}

export function trackPageView(pathname: string) {
  const configured = settings();
  const path = allowlistedPath(pathname);
  if (!configured || !path || !booted) return;
  void import('./posthogClient').then((client) => client.captureAllowlisted('public_page_view', { path }));
}

export function trackCta(name: CtaName) {
  const configured = settings();
  if (!configured || !booted) return;
  void import('./posthogClient').then((client) => client.captureAllowlisted('cta_click', { name }));
}
