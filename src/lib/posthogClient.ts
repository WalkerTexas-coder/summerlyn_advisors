import posthog from 'posthog-js/dist/module.no-external';
import { postHogInitOptions, scrubPostHogEvent } from './posthogPrivacy';

let initialized = false;
let ready = false;
let session = 0;

function clearAnalyticsPersistence() {
  try {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('ph_') || key.startsWith('__ph')) localStorage.removeItem(key);
    }
  } catch { /* storage unavailable */ }
  try {
    const cookies = document.cookie ? document.cookie.split(';') : [];
    for (const cookie of cookies) {
      const name = cookie.split('=')[0]?.trim();
      if (name?.startsWith('ph_')) document.cookie = `${name}=; Max-Age=0; path=/`;
    }
  } catch { /* document unavailable */ }
}

export function startPostHog(token: string, host: string): Promise<void> {
  const mine = ++session;
  if (initialized) {
    posthog.opt_in_capturing();
    ready = true;
    return Promise.resolve();
  }
  initialized = true;
  return new Promise((resolve) => {
    posthog.init(token, {
      ...postHogInitOptions(host),
      loaded: () => {
        if (mine !== session) return resolve();
        posthog.opt_in_capturing();
        ready = true;
        resolve();
      },
      before_send: (event) => {
        if (!event || !ready) return null;
        const clean = scrubPostHogEvent({ event: event.event, properties: event.properties as Record<string, unknown> | undefined });
        if (!clean) return null;
        event.properties = clean.properties;
        return event;
      },
    });
  });
}

export function stopPostHog() {
  session += 1;
  ready = false;
  if (initialized) {
    posthog.opt_out_capturing();
    posthog.reset();
  }
  clearAnalyticsPersistence();
}

export function captureAllowlisted(event: string, properties: Record<string, unknown>) {
  if (!ready || posthog.has_opted_out_capturing()) return;
  const clean = scrubPostHogEvent({ event, properties });
  if (!clean) return;
  posthog.capture(clean.event, clean.properties);
}
