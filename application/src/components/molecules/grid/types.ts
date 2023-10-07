import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface GridProps<T extends Record<string, any>> {
  gridId: string;
  gridButtonProps?: GridButtonProps[];
  configGrid?: ConfigGridProps;
  columns?: Column<T>[];
  rows?: T[];
}

export interface GridButtonProps {
  title: string;
  text?: string;
  inToolbar?: boolean;
  icon?: IconDefinition;
  inMoreActions?: boolean;
  action: (id: string | string[]) => void;
}

export interface ConfigGridProps {
  colPrimary: string;
  buttonRestore: boolean | true;
  buttonColumnSelector: boolean | true;
  buttonCommandSelect: boolean | true;
  buttonsDownload: boolean | true;
  colCommands: boolean | true;
}

export interface Column<T> {
  name: string;
  column: keyof T;
  width?: string;
  columnNotShow?: boolean;
  showOnlySelector?: boolean;
  orderBy?: boolean;
  fix?: boolean | false;
}
