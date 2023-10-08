import { useColumnFilterContext } from "../contexts/columns.context";
import { useRowsContext } from "../contexts/rows.context";

const useFilterRowsAndColumns = <T extends Record<string, any>>() => {
  const { filterColumns, orderColumns } = useColumnFilterContext<T>();
  const { filterRows } = useRowsContext<T>();

  const filterRowsAndColumns = (columnKey: keyof T) => {
    const columns = filterColumns(columnKey);
    filterRows(columns);
  };

  const orderRowsAndColumns = (columnKey: keyof T) => {
    const [columns, columnSort] = orderColumns(columnKey);
    filterRows(columns, columnSort);
  };

  return {
    filterRowsAndColumns,
    orderRowsAndColumns,
  };
};

export default useFilterRowsAndColumns;
