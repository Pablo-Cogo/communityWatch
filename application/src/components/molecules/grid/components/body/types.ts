import { ConfigGridProps, GridButtonProps } from "../../types";

export interface BodyGridProps<T> {
  gridId: string;
  configGrid: ConfigGridProps;
  configButtonsGrid?: GridButtonProps[];
  rows?: T[];
}
