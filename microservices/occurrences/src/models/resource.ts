import { Occurrence } from '@src/entities/occurrence';

export interface ResourceModel {
  resourceName: string;
  resourcePrice: number;
  resourceQuantity: number;
  resourceReserved?: number;
  occurrences?: Occurrence[];
}
