import { createContext, useContext, useState } from "react";
import { Column } from "../types";
import { ColumnsSelectorType } from "../components/columnSelector/types";
import useFilterRowsAndColumns from "../hooks/filterRowsAndColumns.hook";

interface ColumnSelectorContextType<T> {
  stateColumnSelector: boolean;
  columnsSelector?: ColumnsSelectorType<T>[];
  changeSelectorColumns: () => void;
  filterColumnSelector: () => void;
  changeColumnsBySelector: (columnKey: keyof T) => void;
}

const ColumnSelectorContext = createContext<
  ColumnSelectorContextType<any> | undefined
>(undefined);

interface ColumnSelectorProviderProps<T> {
  children: React.ReactNode;
  columns?: Column<T>[];
}

const ColumnSelectorProvider = <T extends Record<string, any>>({
  children,
  columns,
}: ColumnSelectorProviderProps<T>) => {
  const { filterRowsAndColumns } = useFilterRowsAndColumns<T>();
  const [stateColumnSelector, setStateColumnSelector] =
    useState<boolean>(false);
  const [columnsSelector, setColumnsSelector] = useState<
    ColumnsSelectorType<T>[]
  >([]);

  const changeSelectorColumns = () => {
    setStateColumnSelector(!stateColumnSelector);
  };

  const filterColumnSelector = () => {
    if (columns) {
      const colsSelector: ColumnsSelectorType<T>[] = [];
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

  const changeColumnsBySelector = (columnKey: keyof T) => {
    const updatedColumns = columnsSelector.map((col) => {
      if (col.column === columnKey) {
        return {
          ...col,
          show: !col.show,
        };
      }
      return col;
    });
    if (updatedColumns.filter((col) => col.show).length === 0) return;
    filterRowsAndColumns(columnKey.toString());
    setColumnsSelector(updatedColumns);
  };

  const contextValue: ColumnSelectorContextType<T> = {
    stateColumnSelector,
    columnsSelector,
    changeSelectorColumns,
    filterColumnSelector,
    changeColumnsBySelector,
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
