import { createContext, useContext, ReactNode, useState } from "react";

interface RowsContextType {
  selectRow: (id: string) => void;
  checkAllRows: (
    e: React.ChangeEvent<HTMLInputElement>,
    colPrimary: string
  ) => void;
  removeSelectRow: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  idsSelected: string[];
}

const RowsContext = createContext<RowsContextType | undefined>(undefined);

interface RowsProviderProps<T> {
  children: ReactNode;
  rows?: T[];
}

const RowsProvider = <T extends Record<string, any>>({
  children,
  rows,
}: RowsProviderProps<T>) => {
  const [idsSelected, setIdsSelected] = useState<string[]>([]);
  console.log(idsSelected);

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

  const contextValue: RowsContextType = {
    selectRow,
    checkAllRows,
    removeSelectRow,
    idsSelected,
  };

  return (
    <RowsContext.Provider value={contextValue}>{children}</RowsContext.Provider>
  );
};

const useRowsContext = () => {
  const context = useContext(RowsContext) as RowsContextType | undefined;
  if (context === undefined) {
    throw new Error("useRowsContext must be used within a RowsProvider");
  }
  return context;
};

export { RowsProvider, useRowsContext };
