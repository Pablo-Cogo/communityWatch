import React, { createContext, useContext, useState, ReactNode } from "react";
import { Column } from "../types";

interface ColumnFilterContextType<T> {
  filteredColumns: Column<T>[];
  filterColumns: (columnKey: keyof T) => void;
  filteredRows: T[];
}

const ColumnFilterContext = createContext<
  ColumnFilterContextType<any> | undefined
>(undefined);

interface ColumnFilterProviderProps<T> {
  children: ReactNode;
  columns?: Column<T>[];
  rows?: T[];
}

interface ColumnsAndLinesProps<T> {
  columns?: Column<T>[];
  rows?: T[];
}

const ColumnFilterProvider = <T extends Record<string, any>>({
  children,
  columns,
  rows,
}: ColumnFilterProviderProps<T>) => {
  const [filteredColumns, setFilteredColumns] = useState<
    Column<T>[] | undefined
  >(columns?.filter((col) => !col.columnNotShow && !col.showOnlySelector));

  const [filteredRows, setFilteredRows] = useState<T[] | undefined>(
    rows?.map((row) => {
      const filteredRow: T = { ...row };
      columns?.forEach((col) => {
        if (col.columnNotShow || col.showOnlySelector) {
          delete filteredRow[col.column];
        }
      });
      return filteredRow;
    })
  );

  console.log(filteredColumns);
  console.log(filteredRows);

  function filterLinesByColumn(
    columnNotShow: keyof T | null,
    allColumns: Column<T>[],
    allRows: T[],
    linesShow: any
  ) {
    for (let i = 0; i < allRows.length; i++) {
      for (let j = 0; j < allColumns.length; j++) {
        if (allColumns[j].column !== columnNotShow) {
          if (linesShow[i]) {
            linesShow[i][allColumns[j].column] =
              allRows[i][allColumns[j].column];
          } else {
            linesShow[i] = {
              [allColumns[j].column]: allRows[i][allColumns[j].column],
            };
          }
        }
      }
    }
  }

  const filterColumnsAndLines = (
    colRemove: keyof T | null,
    allColumns: Column<T>[],
    allRows: T[],
    both: ColumnsAndLinesProps<T>
  ) => {
    let rowsNoRemove: T[] = [];
    let cols: Column<T>[] = [];

    if (both?.columns && both?.rows && both?.columns?.length > 0) {
      cols = both.columns;
      filterLinesByColumn(colRemove, both.columns, both.rows, rowsNoRemove);
      cols = cols.filter((x) => x.column !== colRemove);

      both.columns = cols;
      both.rows = rowsNoRemove;
    } else {
      cols = allColumns;
      filterLinesByColumn(colRemove, allColumns, allRows, rowsNoRemove);
      cols = cols.filter((x) => x.column !== colRemove);

      both.columns = cols;
      both.rows = rowsNoRemove;
    }
  };

  const restoreColumnByFilter = (colAdd: keyof T | null) => {
    if (!filteredRows || !filteredColumns || !columns || !rows) return;
    let keysRows: any[] = [];
    let keysLines: any[] = [];
    let cols = columns;
    let lines = rows;
    let rowsGrid: T[] = [];
    let colsGrid = [];

    let columnsGrid = filteredColumns.map((elem) => {
      return elem;
    });

    for (let i = 0; i < filteredRows.length; i++) {
      keysRows = Object.keys(filteredRows[i]);
    }

    for (let j = 0; j < lines.length; j++) {
      keysLines = Object.keys(lines[j]);
    }

    console.log(keysLines);

    let filterLines = keysLines.filter(
      (keyLines) => !keysRows.some((x) => x === keyLines) && keyLines !== colAdd
    );

    console.log(filterLines);

    let filterColumns = cols.filter(
      (col) =>
        !columnsGrid.some((x) => x.column === col.column) &&
        col.column !== colAdd
    );

    cols = cols.filter(
      (col) => !filterColumns.some((x) => x.column === col.column)
    );

    for (let i = 0; i < cols.length; i++) {
      //   if (columnSort?.column === cols[i].column) {
      //     colsGrid.push({
      //         ...cols[i],
      //         orderBy: !!columnSort?.asc,
      //       });
      //   } else {
      colsGrid.push({
        ...cols[i],
        orderBy: undefined,
      });
    }

    if (filterLines.length > 0) {
      for (let j = 0; j < keysLines.length; j++) {
        for (let i = 0; i < filterLines.length; i++) {
          if (keysLines[j] === filterLines[i]) {
            for (let k = 0; k < lines.length; k++) {
              filterLinesByColumn(keysLines[j], cols, lines, rowsGrid);
            }
          }
        }
      }
    } else {
      filterLinesByColumn(null, cols, lines, rowsGrid);
    }

    console.log(rowsGrid);
    console.log(colsGrid);

    setFilteredColumns(colsGrid);
    setFilteredRows(rowsGrid);
  };

  const filterColumns = (columnKey: keyof T) => {
    if (!filteredColumns || !filteredRows || !columns || !rows) return;

    const columnsAndLines: ColumnsAndLinesProps<T> = {};

    const columnExists = filteredColumns?.some(
      (col) => col.column === columnKey
    );

    if (columnExists) {
      filterColumnsAndLines(
        columnKey,
        filteredColumns,
        filteredRows,
        columnsAndLines
      );
      console.log("aq", columnsAndLines.columns);

      setFilteredColumns(columnsAndLines.columns);
      setFilteredRows(columnsAndLines.rows);
    } else {
      restoreColumnByFilter(columnKey);
      //   filterColumnsAndLines(null, columns, rows, columnsAndLines);
    }

    // for (let i = 0; i < columns.length; i++) {
    //   if (columns[i].showOnlySelector || columns[i].columnNotShow) {
    //   } else {
    //     filterColumnsAndLines(null, columns, rows, columnsAndLines);
    //   }
    // }

    //   const updatedColumns = filteredColumns?.filter(
    //     (col) => col.column !== columnKey
    //   );
    //   setFilteredColumns(updatedColumns);

    //   if (filteredRows) {
    //     const updatedRows = filteredRows.map((row) => {
    //       const newRow = { ...row };
    //       delete newRow[columnKey];
    //       return newRow;
    //     });
    //     setFilteredRows(updatedRows);
    //   }
    // } else {
    //   const originalIndex = columns?.findIndex(
    //     (col) => col.column === columnKey
    //   );

    //   if (originalIndex !== undefined && originalIndex !== -1) {
    //     if (!columns) return;
    //     const newColumn = columns[originalIndex];
    //     setFilteredColumns((prevColumns) => {
    //       const newColumns = [...(prevColumns || [])];
    //       newColumns.splice(originalIndex, 0, newColumn);
    //       return newColumns;
    //     });

    // const originalIndexRow = rows?.map((row) => {
    //   const keys = Object.keys(row);
    //   return keys.findIndex((key) => key === columnKey);
    // });

    // columns?.findIndex((col) => col.column === columnKey);

    // if (filteredRows) {
    //   const updatedRows = filteredRows.map((row) => {
    //     const newRow = { ...row };
    //     const a = rows?.find((r) => true)?.[columnKey];
    //     console.log(a);
    //     if (a) {
    //       newRow[columnKey] = a; // Use o valor original da linha se estiver disponível
    //     }
    //     return newRow;
    //   });
    //   setFilteredRows(updatedRows);
    // }
    //   }
    // }
  };

  const contextValue: ColumnFilterContextType<T> = {
    filteredColumns: filteredColumns || [],
    filterColumns,
    filteredRows: filteredRows || [],
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
