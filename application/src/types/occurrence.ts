import { Resource } from "./resource";

export enum OccurrenceStatus {
  Aberto = 0,
  Processando = 1,
  Fechado = 2,
}

export interface Occurrence {
  id?: string;
  userId: string;
  occurrenceDescription: string;
  occurrenceCobradeCode: string;
  occurrenceStatus: OccurrenceStatus;
  occurrenceInitialDate: Date;
  occurrenceFinalDate?: Date;
  occurrenceLinkPdf?: string;
  resources?: Resource[];
}

export interface OccurrenceFilter {
  id: string;
  occurrenceDescription: string;
  occurrenceCobradeCode: string;
  occurrenceStatus: OccurrenceStatus;
  occurrenceInitialDate: string;
  occurrenceFinalDate: string;
}
