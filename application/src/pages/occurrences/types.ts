import { EnumProps } from "../../components/molecules/grid/types";
export interface Occurrence {
  id: string;
  code: string;
  occurrenceDescription: string;
  occurrenceCobradeCode: string;
  occurrenceStatus: EnumProps;
  occurrenceInitialDate: string;
  occurrenceFinalDate: string;
}

export interface OccurrenceForm {
  occurrenceUserCPF: string;
  occurrencePdfUrl: string | undefined;
  occurrenceCobradeCode: string;
  occurrenceDescription: string;
}

export interface OccurrenceFormMask {
  occurrenceUserCPF: string;
}
