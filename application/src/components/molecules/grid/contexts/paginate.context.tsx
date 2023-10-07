import { createContext, useContext, useState, ReactNode } from "react";

const pageSizeOptions = [10, 20, 50, 100, "Todos"] as const;
type PageSizeOption = (typeof pageSizeOptions)[number];

interface PaginateContextType {
  limitsPerPage: typeof pageSizeOptions;
  atualPageSize: PageSizeOption;
  changeAtualPageSize: (size: PageSizeOption) => void;
  atualPage: number;
}

const PaginateContext = createContext<PaginateContextType | undefined>(
  undefined
);

interface PaginateProviderProps {
  children: ReactNode;
}

const PaginateProvider = ({ children }: PaginateProviderProps) => {
  const [limitsPerPage] = useState(pageSizeOptions);
  const [atualPageSize, setAtualPage] = useState<PageSizeOption>(10);
  const [atualPage] = useState(1);

  const changeAtualPageSize = (size: PageSizeOption) => {
    setAtualPage(size);
  };

  const contextValue: PaginateContextType = {
    limitsPerPage,
    atualPageSize,
    changeAtualPageSize,
    atualPage,
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
