import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { SortProps, useColumnFilterContext } from "./columns.context";
import { Column } from "../types";
import { PageSizeOption, usePaginateContext } from "./paginate.context";
import useIsEnumProps from "../hooks/isEnumProps.hook";

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
    colPrimary: keyof T
  ) => void;
  removeSelectRow: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  idsSelected: (keyof T)[];
  rowsGrid: T[] | undefined;
  rowsWithAllRows: T[];
  rowsWithAllColumns: T[];
  totalPages: number;
}

const RowsContext = createContext<RowsContextType<any> | undefined>(undefined);

interface RowsProviderProps<T> {
  children: ReactNode;
  rows?: T[];
  colPrimary: keyof T;
}

const RowsProvider = <T extends Record<any, any>>({
  children,
  rows,
  colPrimary,
}: RowsProviderProps<T>) => {
  const { columnSort, filteredColumns } = useColumnFilterContext();
  const { atualPage, atualPageSize, filterListPages } = usePaginateContext();
  const { isEnumProps, convertEnumToValue, convertEnumToKey } =
    useIsEnumProps<T>();

  const [idsSelected, setIdsSelected] = useState<(keyof T)[]>([]);
  const [rowsWithAllColumns, setRowsWithAllColumns] = useState<T[]>([]); //linhas sem o filtro das colunas - com orderby e paginate
  const [rowsWithAllRows, setRowsWithAllRows] = useState<T[]>([]); //linhas sem paginação - com orderby
  const [rowsGrid, setRowsGrid] = useState<T[]>([]); //linhas finais da grid - com orderby, paginate e filteredColumns
  const [totalPages, setTotalPages] = useState<number>(0);

  const removeEnumProps = (rows: T[]) => {
    const rowsClone: T[] = rows.map((item) => {
      const newItem: T = {} as T;
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          newItem[key as keyof T] = convertEnumToValue(item[key]);
        }
      }
      return newItem;
    });

    return rowsClone;
  };

  const orderRowsDefault = (colSort?: keyof T, asc?: boolean) => {
    if (!rows) return rows ?? [];
    var linesClone = [...rows];
    linesClone = linesClone.sort((a, b) => {
      if (colSort && asc !== undefined) {
        const valueA = isEnumProps(a[colSort])
          ? (Object.keys(a[colSort])[0] as T[keyof T])
          : a[colSort];
        const valueB = isEnumProps(b[colSort])
          ? (Object.keys(b[colSort])[0] as T[keyof T])
          : b[colSort];

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

      rows.splice(0, (atualPage - 1) * atualPageSize);
      return rows?.slice(0, atualPageSize);
    } else {
      setTotalPages(1);
      filterListPages(1, atualPage);
      return rows;
    }
  };

  const removeColumn = (rows: T[], columns: Column<T>[]) => {
    if (!columns) return rows ?? [];

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

    return updatedRowsGrid ?? [];
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

    const filteredIds = idsSelected.filter((id) =>
      rowsOrdered.some((el) => el[colPrimary] === id)
    );
    setIdsSelected(filteredIds);

    setRowsWithAllRows(rowsOrdered);
    const pagedRows = paginateRows(rowsOrdered, page, pageSize);
    setRowsWithAllColumns(pagedRows);
    const rowsWithoutColumns = removeColumn(pagedRows, columns);
    return removeEnumProps(rowsWithoutColumns);
  };

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
    colPrimary: keyof T
  ) => {
    if (rows && rows?.length > 0) {
      if (e.target.checked) {
        let ids = [];
        for (let i = 0; i < rows.length; i++) {
          const id = convertEnumToKey(rows[i][colPrimary]);
          if (ids.indexOf(id) === -1) {
            ids.push(id);
          }
        }
        setIdsSelected(ids);
      } else {
        setIdsSelected([]);
      }
    } else {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const rowsD = filterRowsDefault();
    setRowsGrid(rowsD);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const contextValue: RowsContextType<T> = {
    filterRows,
    selectRow,
    checkAllRows,
    removeSelectRow,
    idsSelected,
    rowsGrid,
    rowsWithAllRows,
    rowsWithAllColumns,
    totalPages,
  };

  return (
    <RowsContext.Provider value={contextValue}>{children}</RowsContext.Provider>
  );
};

const useRowsContext = <T extends Record<any, any>>() => {
  const context = useContext(RowsContext) as RowsContextType<T> | undefined;
  if (context === undefined) {
    throw new Error("useRowsContext must be used within a RowsProvider");
  }
  return context;
};

export { RowsProvider, useRowsContext };
