import { createContext, useContext, useState, ReactNode } from "react";

const pageSizeOptions = [10, 20, 50, 100, "Todos"] as const;
export type PageSizeOption = (typeof pageSizeOptions)[number];

interface PaginateContextType {
  limitsPerPage: typeof pageSizeOptions;
  atualPageSize: PageSizeOption;
  changeAtualPageSize: (size: PageSizeOption) => void;
  atualPage: number;
  changeAtualPage: (page: number) => void;
  listPages: number[];
  filterListPages: (totalPages: number, page?: number) => void;
}

const PaginateContext = createContext<PaginateContextType | undefined>(
  undefined
);

interface PaginateProviderProps {
  children: ReactNode;
}

const PaginateProvider = ({ children }: PaginateProviderProps) => {
  const [limitsPerPage] = useState(pageSizeOptions);
  const [atualPageSize, setAtualPageSize] = useState<PageSizeOption>(
    pageSizeOptions[0]
  );
  const [atualPage, setAtualPage] = useState<number>(1);
  const [listPages, setListPages] = useState<number[]>([]);

  const changeAtualPageSize = (size: PageSizeOption) => {
    setAtualPageSize(size);
  };

  const changeAtualPage = (page: number) => {
    setAtualPage(page);
  };

  const filterListPages = (totalPages: number, page: number = atualPage) => {
    var pages = [];
    setListPages([]);
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    if (pages.indexOf(page) !== -1) {
      if (totalPages > 4) {
        if (pages.indexOf(page) <= 1) {
          for (let i = 1; i <= 3; i++) {
            setListPages((prev) => [...prev, i]);
          }
          setListPages((prev) => [...prev, totalPages]);
        } else if (pages.indexOf(page) >= totalPages - 2) {
          setListPages((prev) => [...prev, 1]);
          for (let i = totalPages - 2; i <= totalPages; i++) {
            setListPages((prev) => [...prev, i]);
          }
        } else {
          setListPages((prev) => [...prev, 1]);
          for (let i = page - 1; i < page + 2; i++) {
            setListPages((prev) => [...prev, i]);
          }
          setListPages((prev) => [...prev, totalPages]);
        }
      } else {
        for (let i = 1; i <= totalPages; i++) {
          setListPages((prev) => [...prev, i]);
        }
      }
    }
  };

  const contextValue: PaginateContextType = {
    limitsPerPage,
    atualPageSize,
    changeAtualPageSize,
    atualPage,
    changeAtualPage,
    listPages,
    filterListPages,
  };

  return (
    <PaginateContext.Provider value={contextValue}>
      {children}
    </PaginateContext.Provider>
  );
};

const usePaginateContext = () => {
  const context = useContext(PaginateContext) as
    | PaginateContextType
    | undefined;
  if (context === undefined) {
    throw new Error(
      "usePaginateContext must be used within a PaginateProvider"
    );
  }
  return context;
};

export { PaginateProvider, usePaginateContext };
