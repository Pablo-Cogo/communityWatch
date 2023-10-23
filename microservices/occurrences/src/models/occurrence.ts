import { OccurrenceStatus } from '@src/entities/occurrence';
import { Resource } from '@src/entities/resource';

export interface OccurrenceModel {
  userId: string;
  occurrenceDescription: string;
  occurrenceCobradeCode: string;
  occurrenceStatus: OccurrenceStatus;
  occurrenceInitialDate: Date;
  occurrenceFinalDate?: Date;
  occurrenceLinkPdf?: string;
  resources?: Resource[];
}
