export interface FulfillmentClaim {
  eventId: string;
  sessionId: string | null;
  grant: boolean;
}

export interface FulfillmentStore {
  record(claim: FulfillmentClaim): Promise<{ duplicate: boolean }>;
  hasSession(sessionId: string): Promise<boolean>;
}

export function memoryFulfillmentStore(): FulfillmentStore & {
  events: Map<string, FulfillmentClaim>;
  sessions: Set<string>;
} {
  const events = new Map<string, FulfillmentClaim>();
  const sessions = new Set<string>();
  return {
    events,
    sessions,
    async record(claim) {
      if (events.has(claim.eventId)) return { duplicate: true };
      events.set(claim.eventId, { ...claim });
      if (claim.grant && claim.sessionId) sessions.add(claim.sessionId);
      return { duplicate: false };
    },
    async hasSession(sessionId) {
      return sessions.has(sessionId);
    },
  };
}
