import { EnumProps } from "../../components/molecules/grid/types";
export interface Occurrence {
  Id: string;
  occurrenceDescription: string;
  occurrenceCobradeCode: string;
  occurrenceStatus: EnumProps;
  occurrenceInitialDate: string;
  occurrenceFinalDate: string;
}

export enum Status {
  aberto = 0,
  processando = 1,
  fechado = 2,
}
