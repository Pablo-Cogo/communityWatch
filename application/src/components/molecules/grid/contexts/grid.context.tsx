import React, { ReactNode } from "react";
import { ColumnSelectorProvider } from "./column-selector.context";
import { Column } from "../types"; // Certifique-se de importar o tipo correto aqui

interface GridProviderProps<T> {
  children: ReactNode;
  columns?: Column<T>[];
}

const GridProvider = <T extends Record<string, any>>({
  children,
  columns,
}: GridProviderProps<T>) => {
  return (
    <ColumnSelectorProvider columns={columns}>
      {children}
    </ColumnSelectorProvider>
  );
};

export default GridProvider;
