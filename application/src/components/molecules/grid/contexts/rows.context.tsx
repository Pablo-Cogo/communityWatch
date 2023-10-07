import { createContext, useContext, ReactNode, useState } from "react";
import { usePaginateContext } from "./paginate.context";

interface RowsContextType<T> {
  changeRows: (colSort?: keyof T, asc?: boolean) => T[] | undefined;
  selectRow: (id: string) => void;
  checkAllRows: (
    e: React.ChangeEvent<HTMLInputElement>,
    colPrimary: string
  ) => void;
  removeSelectRow: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  idsSelected: string[];
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
  const [idsSelected, setIdsSelected] = useState<string[]>([]);

  const { atualPage, atualPageSize } = usePaginateContext();

  const changeRows = (colSort?: keyof T, asc?: boolean) => {
    if (colSort && asc !== undefined) {
      const rowsOrdered = orderRows(colSort, asc);
      // setRowsWithAllColumns(rowsOrdered);
      return rowsOrdered;
    }
    return rows;
  };

  const orderRows = (colSort: keyof T, asc: boolean) => {
    var linesClone = JSON.parse(JSON.stringify(rows)) as T[];
    linesClone = linesClone.sort((a, b) => {
      if (colSort) {
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
    changeRows,
    selectRow,
    checkAllRows,
    removeSelectRow,
    idsSelected,
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
