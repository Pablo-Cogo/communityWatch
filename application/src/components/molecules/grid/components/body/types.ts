import { ConfigGridProps, GridButtonProps } from "../../types";

export interface BodyGridProps<T extends Record<any, any>> {
  gridId: string;
  configGrid: ConfigGridProps<T>;
  configButtonsGrid?: GridButtonProps[];
  rows?: T[];
}
