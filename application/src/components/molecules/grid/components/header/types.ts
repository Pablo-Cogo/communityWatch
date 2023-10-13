import { ConfigGridProps, GridButtonProps } from "../../types";

export interface HeaderGridProps {
  gridId: string;
  configButtonsGrid?: GridButtonProps[];
  configGrid?: ConfigGridProps<any>;
}
