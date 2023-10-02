import { ConfigGridProps, GridButtonProps } from "../../types";

export interface BodyGridProps<T> {
  gridId: string;
  configButtonsGrid?: GridButtonProps[];
  configGrid?: ConfigGridProps;
  rows?: T[];
}
