import { createContext, useContext, useState } from "react";
import { Column } from "../types";
import { ColumnsSelectorType } from "../components/columnSelector/types";

interface ColumnSelectorContextType<T> {
  stateColumnSelector: boolean;
  columnsSelector?: ColumnsSelectorType<T>[];
  changeSelectorColumns: () => void;
  filterColumnSelector: () => void;
}

// Use createContext com o tipo genérico
const ColumnSelectorContext = createContext<
  ColumnSelectorContextType<any> | undefined
>(undefined);

interface ColumnSelectorProviderProps<T> {
  children: React.ReactNode;
  columns?: Column<T>[];
}

const ColumnSelectorProvider: React.FC<ColumnSelectorProviderProps<any>> = ({
  children,
  columns,
}) => {
  const [stateColumnSelector, setStateColumnSelector] =
    useState<boolean>(false);
  const [columnsSelector, setColumnsSelector] = useState<
    ColumnsSelectorType<any>[]
  >([]);

  const changeSelectorColumns = () => {
    setStateColumnSelector(!stateColumnSelector);
  };

  const filterColumnSelector = () => {
    if (columns) {
      const colsSelector: ColumnsSelectorType<any>[] = [];
      for (let i = 0; i < columns.length; i++) {
        if (!columns[i].columnNotShow) {
          colsSelector.push({
            name: columns[i].name,
            column: columns[i].column,
            show: !columns[i].showOnlySelector,
          });
        }
      }
      setColumnsSelector(colsSelector);
    }
  };

  const contextValue: ColumnSelectorContextType<any> = {
    stateColumnSelector,
    columnsSelector,
    changeSelectorColumns,
    filterColumnSelector,
  };

  return (
    <ColumnSelectorContext.Provider value={contextValue}>
      {children}
    </ColumnSelectorContext.Provider>
  );
};

const useColumnSelectorContext = <T extends Record<string, any>>() => {
  const context = useContext(
    ColumnSelectorContext
  ) as ColumnSelectorContextType<T>;
  if (context === undefined) {
    throw new Error(
      "useColumnSelectorContext deve ser usado dentro de um ColumnSelectorProvider"
    );
  }
  return context;
};

export { ColumnSelectorProvider, useColumnSelectorContext };
