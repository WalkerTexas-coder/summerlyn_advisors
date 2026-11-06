/**
 * Records the first outcome for a Stripe event id.
 * Production sales need a durable implementation. The memory store is for tests.
 */
export interface ShipmentRecord {
  eventId: string;
  sessionId: string;
  workId: string;
  sizeId: string;
  quantity: number;
  currency: 'usd';
  amountSubtotal: number;
}

export type FulfillmentOutcome = 'shipped_record' | 'not_shipped' | 'ignored';

export interface FulfillmentClaim {
  eventId: string;
  outcome: FulfillmentOutcome;
  shipment?: ShipmentRecord;
}

export interface IdempotencyStore {
  record(claim: FulfillmentClaim): Promise<{ duplicate: boolean }>;
}

export function memoryIdempotencyStore(): IdempotencyStore & {
  claims: Map<string, FulfillmentClaim>;
  shipments: ShipmentRecord[];
} {
  const claims = new Map<string, FulfillmentClaim>();
  const shipments: ShipmentRecord[] = [];
  return {
    claims,
    shipments,
    async record(claim) {
      if (claims.has(claim.eventId)) return { duplicate: true };
      const stored: FulfillmentClaim = claim.shipment
        ? { eventId: claim.eventId, outcome: claim.outcome, shipment: { ...claim.shipment } }
        : { eventId: claim.eventId, outcome: claim.outcome };
      claims.set(claim.eventId, stored);
      if (stored.shipment) shipments.push(stored.shipment);
      return { duplicate: false };
    },
  };
}
