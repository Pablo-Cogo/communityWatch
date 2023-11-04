import { Occurrence } from "./occurrence";

export interface Resource {
  resourceName: string;
  resourcePrice: number;
  resourceQuantity: number;
  resourceReserved?: number;
  occurrences?: Occurrence[];
}
