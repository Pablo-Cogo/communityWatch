import { createContext, ReactNode, useContext, useState } from "react";
import { SortProps, useColumnFilterContext } from "./columns.context";
import { Column } from "../types";
import { PageSizeOption, usePaginateContext } from "./paginate.context";

interface RowsContextType<T> {
  filterRows: (
    columns: Column<T>[],
    colSort?: SortProps<T>,
    atualPage?: number,
    atualPageSize?: PageSizeOption
  ) => void;
  selectRow: (id: string) => void;
  checkAllRows: (
    e: React.ChangeEvent<HTMLInputElement>,
    colPrimary: string
  ) => void;
  removeSelectRow: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  idsSelected: string[];
  rowsGrid: T[] | undefined;
  rowsWithAllRows: T[];
  totalPages: number;
}

const RowsContext = createContext<RowsContextType<any> | undefined>(undefined);

interface RowsProviderProps<T> {
  children: ReactNode;
  rows?: T[];
}

const RowsProvider = <T extends Record<string, any>>({
  children,
  rows,
}: RowsProviderProps<T>) => {
  const { columnSort, filteredColumns } = useColumnFilterContext();
  const { atualPage, atualPageSize, filterListPages } = usePaginateContext();

  const [idsSelected, setIdsSelected] = useState<string[]>([]);
  const [rowsWithAllColumns, setRowsWithAllColumns] = useState<T[]>([]); //linhas sem o filtro das colunas - com orderby e paginate
  const [rowsWithAllRows, setRowsWithAllRows] = useState<T[]>([]); //linhas sem paginação - com orderby
  const [totalPages, setTotalPages] = useState<number>(0);

  const orderRowsDefault = (colSort?: keyof T, asc?: boolean) => {
    var linesClone = JSON.parse(JSON.stringify(rows)) as T[];
    linesClone = linesClone.sort((a, b) => {
      if (colSort && asc !== undefined) {
        const valueA = a[colSort];
        const valueB = b[colSort];

        const splitString = (str: string) => {
          return str.match(/(\d+|\D+)/g) || [];
        };

        const partsA = splitString(valueA);
        const partsB = splitString(valueB);

        for (let i = 0; i < Math.min(partsA.length, partsB.length); i++) {
          const partA = partsA[i];
          const partB = partsB[i];

          if (!isNaN(Number(partA)) && !isNaN(Number(partB))) {
            const numA = Number(partA);
            const numB = Number(partB);
            if (numA !== numB) {
              return asc ? numA - numB : numB - numA;
            }
          } else {
            if (partA !== partB) {
              return asc
                ? partA.localeCompare(partB)
                : partB.localeCompare(partA);
            }
          }
        }
        return asc
          ? valueA.length - valueB.length
          : valueB.length - valueA.length;
      }
      return 0;
    });
    return linesClone;
  };

  const paginateRows = (
    rows: T[],
    atualPage: number,
    atualPageSize: PageSizeOption
  ) => {
    if (atualPageSize !== "Todos") {
      const total = Math.ceil(rows.length / atualPageSize);
      setTotalPages(total);
      filterListPages(total, atualPage);
      var linesClone = JSON.parse(JSON.stringify(rows)) as T[];

      linesClone.splice(0, (atualPage - 1) * atualPageSize);
      return linesClone?.slice(0, atualPageSize);
    } else {
      setTotalPages(1);
      filterListPages(1, atualPage);
      return rows;
    }
  };

  const removeColumn = (rows: T[], columns: Column<T>[]) => {
    if (!columns) return;

    const columnsRemaining = columns.map((col) => col.column);

    const updatedRowsGrid = rows.map((row) => {
      const newRow: Partial<T> = {};
      for (const colKey of columnsRemaining) {
        if (row.hasOwnProperty(colKey)) {
          newRow[colKey as keyof T] = row[colKey];
        }
      }
      return newRow as T;
    });

    return updatedRowsGrid;
  };

  const filterRowsDefault = (
    columns: Column<T>[] = filteredColumns,
    colSort: SortProps<T> = columnSort,
    page: number = atualPage,
    pageSize: PageSizeOption = atualPageSize
  ) => {
    const rowsOrdered =
      colSort.column && colSort.asc !== undefined
        ? orderRowsDefault(colSort.column, colSort.asc)
        : rows ?? [];
    setRowsWithAllRows(rowsOrdered);
    const pagedRows = paginateRows(rowsOrdered, page, pageSize);
    setRowsWithAllColumns(pagedRows);
    const rowsWithoutColumns = removeColumn(pagedRows, columns);
    return rowsWithoutColumns ?? [];
  };

  const [rowsGrid, setRowsGrid] = useState<T[]>(() => filterRowsDefault()); //linhas finais da grid - com orderby, paginate e filteredColumns

  const filterRows = (
    columns: Column<T>[],
    colSort: SortProps<T> = columnSort,
    page: number = atualPage,
    pageSize: PageSizeOption = atualPageSize
  ) => {
    const rowsFiltered = filterRowsDefault(columns, colSort, page, pageSize);
    setRowsGrid(rowsFiltered);
  };

  const selectRow = (id: string) => {
    if (idsSelected) {
      if (idsSelected.indexOf(id) === -1) {
        setIdsSelected((prev) => [...prev, id]);
      }
    } else {
      setIdsSelected([id]);
    }
  };

  const removeSelectRow = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (!e.target.checked) {
      if (idsSelected) {
        setIdsSelected((prev) => prev.filter((elem) => elem !== id));
      } else {
        setIdsSelected([]);
      }
    }
  };

  const checkAllRows = (
    e: React.ChangeEvent<HTMLInputElement>,
    colPrimary: string
  ) => {
    if (rows && rows?.length > 0) {
      if (e.target.checked) {
        let ids = [];
        for (let i = 0; i < rows.length; i++) {
          ids.push(rows[i][colPrimary]);
        }
        setIdsSelected(ids);
      } else {
        setIdsSelected([]);
      }
    } else {
      e.preventDefault();
    }
  };

  const contextValue: RowsContextType<T> = {
    filterRows,
    selectRow,
    checkAllRows,
    removeSelectRow,
    idsSelected,
    rowsGrid,
    rowsWithAllRows,
    totalPages,
  };

  return (
    <RowsContext.Provider value={contextValue}>{children}</RowsContext.Provider>
  );
};

const useRowsContext = <T extends Record<string, any>>() => {
  const context = useContext(RowsContext) as RowsContextType<T> | undefined;
  if (context === undefined) {
    throw new Error("useRowsContext must be used within a RowsProvider");
  }
  return context;
};

export { RowsProvider, useRowsContext };
