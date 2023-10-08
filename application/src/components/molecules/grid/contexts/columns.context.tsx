import { createContext, useContext, useState, ReactNode } from "react";
import { Column } from "../types";

interface ColumnFilterContextType<T> {
  filteredColumns: Column<T>[];
  filterColumns: (columnKey: keyof T) => Column<T>[];
  orderColumns: (columnKey: keyof T) => [Column<T>[], SortProps<T>];
  columnSort: SortProps<T>;
}

const ColumnFilterContext = createContext<
  ColumnFilterContextType<any> | undefined
>(undefined);

interface ColumnFilterProviderProps<T> {
  children: ReactNode;
  columns?: Column<T>[];
}

export interface SortProps<T> {
  column?: keyof T;
  asc?: boolean;
}

const ColumnFilterProvider = <T extends Record<string, any>>({
  children,
  columns,
}: ColumnFilterProviderProps<T>) => {
  const [filteredColumns, setFilteredColumns] = useState<
    Column<T>[] | undefined
  >(columns?.filter((col) => !col.columnNotShow && !col.showOnlySelector));

  const [columnSort, setColumnSort] = useState<SortProps<T>>({
    column: columns?.filter((col) => col.orderBy !== undefined)[0]?.column,
    asc: columns?.filter((col) => col.orderBy !== undefined)[0]?.orderBy,
  });

  const validateColumnExists = (columnKey: keyof T): boolean => {
    return filteredColumns?.some((col) => col.column === columnKey) ?? false;
  };

  const maintainOrderBy = (columns: Column<T>[]): Column<T>[] => {
    const updatedColumns: Column<T>[] = [];
    for (let i = 0; i < columns.length; i++) {
      if (columnSort?.column === columns[i].column) {
        updatedColumns.push({
          ...columns[i],
          orderBy: columnSort?.asc,
        });
      } else {
        updatedColumns.push({
          ...columns[i],
          orderBy: undefined,
        });
      }
    }
    return updatedColumns;
  };

  const restoreColumn = (colAdd: keyof T | null): Column<T>[] => {
    if (!filteredColumns || colAdd === null || !columns) {
      return filteredColumns ?? [];
    }
    let updatedColumns = columns.filter(
      (col) =>
        col.column === colAdd ||
        filteredColumns.some((x) => x.column === col.column)
    );
    updatedColumns = maintainOrderBy(updatedColumns);
    setFilteredColumns(updatedColumns);
    return updatedColumns;
  };

  const removeColumn = (colRemove: keyof T | null): Column<T>[] => {
    if (!filteredColumns || colRemove === null) return filteredColumns ?? [];
    const updatedColumns = filteredColumns.filter(
      (col) => col.column !== colRemove
    );
    setFilteredColumns(updatedColumns);
    return updatedColumns;
  };

  const filterColumns = (columnKey: keyof T): Column<T>[] => {
    if (!filteredColumns || !columns) return filteredColumns ?? [];
    const columnExists = validateColumnExists(columnKey);
    if (columnExists) {
      return removeColumn(columnKey);
    }
    return restoreColumn(columnKey);
  };

  const orderColumns = (columnKey: keyof T): [Column<T>[], SortProps<T>] => {
    let columSort: SortProps<T> = {
      column: undefined,
      asc: undefined,
    };
    var cols = filteredColumns?.map((elem) => {
      if (columnKey === elem.column) {
        columSort = {
          column: elem.column,
          asc: !columnSort?.asc,
        };
        return {
          ...elem,
          orderBy: !elem.orderBy,
        };
      } else {
        return {
          ...elem,
          orderBy: undefined,
        };
      }
    });
    setFilteredColumns(cols);
    setColumnSort(columSort);
    return [cols ?? [], columSort];
  };

  const contextValue: ColumnFilterContextType<T> = {
    filteredColumns: filteredColumns || [],
    filterColumns,
    orderColumns,
    columnSort,
  };

  return (
    <ColumnFilterContext.Provider value={contextValue}>
      {children}
    </ColumnFilterContext.Provider>
  );
};

const useColumnFilterContext = <T extends Record<string, any>>() => {
  const context = useContext(ColumnFilterContext) as
    | ColumnFilterContextType<T>
    | undefined;
  if (context === undefined) {
    throw new Error(
      "useColumnFilterContext must be used within a ColumnFilterProvider"
    );
  }
  return context;
};

export { ColumnFilterProvider, useColumnFilterContext };
