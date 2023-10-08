import { ReactNode } from "react";
import { ColumnSelectorProvider } from "./column-selector.context";
import { Column } from "../types"; // Certifique-se de importar o tipo correto aqui
import { ColumnFilterProvider } from "./columns.context";
import { RowsProvider } from "./rows.context";
import { PaginateProvider } from "./paginate.context";

interface GridProviderProps<T> {
  children: ReactNode;
  columns?: Column<T>[];
  rows?: T[];
}

const GridProvider = <T extends Record<string, any>>({
  children,
  columns,
  rows,
}: GridProviderProps<T>) => {
  return (
    <ColumnFilterProvider columns={columns}>
      <PaginateProvider>
        <RowsProvider rows={rows}>
          <ColumnSelectorProvider columns={columns}>
            {children}
          </ColumnSelectorProvider>
        </RowsProvider>
      </PaginateProvider>
    </ColumnFilterProvider>
  );
};

export default GridProvider;
