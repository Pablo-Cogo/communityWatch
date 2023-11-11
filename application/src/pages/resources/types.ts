export interface Resource {
  id: string;
  resourceName: string;
  resourcePrice: string;
  resourceQuantity: string;
  resourceReserved: string;
}

export interface ResourceForm {
  resourceName: string;
  resourcePrice: string;
  resourceQuantity: string;
}

export interface ResourceFormMask {
  resourcePrice: string;
  resourceQuantity: string;
}

export interface LinkedGridProps {
  changeGrid: boolean;
  change: () => void;
}
