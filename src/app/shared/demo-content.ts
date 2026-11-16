export const DEMO_RECORD_KINDS = [
  'Beneficiary',
  'Scheme',
  'Training course',
  'Learning activity',
  'School',
  'Event',
  'Publication',
  'Success story',
] as const;

export type RecordKind = (typeof DEMO_RECORD_KINDS)[number];

export interface DemoRecord {
  id: number;
  title: string;
  kind: RecordKind;
  programme: string;
  category: string;
  description: string;
  featuredImage: string;
  publicationDate: string;
  displayOrder: number;
  benefits: string;
  eligibility: string;
  requiredDocuments: string;
  applicationProcess: string;
  officialLink: string;
  sourceReference: string;
  lastUpdated: string;
  status: string;
  updated: string;
}

export const DEMO_CONTENT_STORAGE_KEY = 'farf-connect-demo-content-v2';

export function isDemoRecord(value: unknown): value is DemoRecord {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record['id'] === 'number' &&
    typeof record['title'] === 'string' &&
    typeof record['kind'] === 'string' &&
    DEMO_RECORD_KINDS.some((kind) => kind === record['kind']) &&
    typeof record['programme'] === 'string' &&
    typeof record['category'] === 'string' &&
    typeof record['description'] === 'string' &&
    typeof record['featuredImage'] === 'string' &&
    typeof record['publicationDate'] === 'string' &&
    typeof record['displayOrder'] === 'number' &&
    typeof record['benefits'] === 'string' &&
    typeof record['eligibility'] === 'string' &&
    typeof record['requiredDocuments'] === 'string' &&
    typeof record['applicationProcess'] === 'string' &&
    typeof record['officialLink'] === 'string' &&
    typeof record['sourceReference'] === 'string' &&
    typeof record['lastUpdated'] === 'string' &&
    typeof record['status'] === 'string' &&
    typeof record['updated'] === 'string'
  );
}
