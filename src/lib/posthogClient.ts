import posthog from 'posthog-js';
import { postHogInitOptions, scrubPostHogEvent } from './posthogPrivacy';

let started = false;

export function startPostHog(token: string, host: string) {
  if (!started) {
    posthog.init(token, {
      ...postHogInitOptions(host),
      before_send: (event) => {
        if (!event) return null;
        const clean = scrubPostHogEvent({ event: event.event, properties: event.properties as Record<string, unknown> | undefined });
        if (!clean) return null;
        event.properties = clean.properties;
        return event;
      },
    });
    started = true;
  }
  posthog.opt_in_capturing();
}

export function stopPostHog() {
  if (!started) return;
  posthog.opt_out_capturing();
}

export function captureAllowlisted(event: string, properties: Record<string, unknown>) {
  if (!started || posthog.has_opted_out_capturing()) return;
  const clean = scrubPostHogEvent({ event, properties });
  if (!clean) return;
  posthog.capture(clean.event, clean.properties);
}
