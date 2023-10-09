import { useColumnFilterContext } from "../contexts/columns.context";
import {
  PageSizeOption,
  usePaginateContext,
} from "../contexts/paginate.context";
import { useRowsContext } from "../contexts/rows.context";

const useFilterPaginate = <T extends Record<string, any>>() => {
  const { atualPage, atualPageSize, changeAtualPageSize, changeAtualPage } =
    usePaginateContext();
  const { filteredColumns, columnSort } = useColumnFilterContext<T>();
  const { filterRows, totalPages } = useRowsContext<T>();

  const changePageSize = (pageSize: PageSizeOption) => {
    changeAtualPageSize(pageSize);
    filterRows(filteredColumns, columnSort, atualPage, pageSize);
  };
  const changePage = (page: number) => {
    changeAtualPage(page);
    filterRows(filteredColumns, columnSort, page, atualPageSize);
  };

  const backPage = () => {
    if (atualPage - 1 > 0) {
      changeAtualPage(atualPage - 1);
      filterRows(filteredColumns, columnSort, atualPage - 1, atualPageSize);
    }
  };

  const nextPage = () => {
    if (atualPage < totalPages) {
      changeAtualPage(atualPage + 1);
      filterRows(filteredColumns, columnSort, atualPage + 1, atualPageSize);
    }
  };

  return {
    changePageSize,
    changePage,
    backPage,
    nextPage,
  };
};

export default useFilterPaginate;
