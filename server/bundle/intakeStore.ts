export interface IntakeRecord {
  sessionId: string;
  goal: string;
  workflow: string;
  tools: string;
  constraints: string;
  preferredWindows: string;
  timeZone: string;
  noSensitiveData: true;
  bookingStatus: 'requested';
  appointmentConfirmed: false;
  planStatus: 'awaiting_austin_review';
}

export interface IntakeStore {
  save(record: IntakeRecord): Promise<{ duplicate: boolean }>;
}

export function memoryIntakeStore(): IntakeStore & { records: Map<string, IntakeRecord> } {
  const records = new Map<string, IntakeRecord>();
  return {
    records,
    async save(record) {
      if (records.has(record.sessionId)) return { duplicate: true };
      records.set(record.sessionId, { ...record, bookingStatus: 'requested', appointmentConfirmed: false });
      return { duplicate: false };
    },
  };
}
