import {
  ButtonPages,
  ContainerButtonsPage,
  DataGridFotter,
  DataGridPages,
  DataGridPagesSizes,
  GroupButtonsPage,
  InfoPages,
} from "./style";
import { FooterGridProps } from "./types";
import { usePaginateContext } from "../../contexts/paginate.context";
import useFilterPaginate from "../../hooks/paginate.hook";
import { useRowsContext } from "../../contexts/rows.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

const FooterGrid = ({ gridId }: FooterGridProps) => {
  const { limitsPerPage, atualPageSize, atualPage, listPages } =
    usePaginateContext();
  const { backPage, changePageSize, changePage, nextPage } =
    useFilterPaginate();
  const { rowsWithAllRows, totalPages } = useRowsContext();
  const divObservadaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const divObservada = divObservadaRef.current;
    if (!divObservada) return;
    const observer = new ResizeObserver(() => {
      setTimeout(() => {
        divObservada.classList.remove("responsive");
        if (divObservada.offsetHeight > 60) {
          divObservada.classList.add("responsive");
        }
      });
    });
    observer.observe(divObservada);

    return () => {
      observer.unobserve(divObservada);
      observer.disconnect();
    };
  }, [divObservadaRef]);

  return (
    <DataGridFotter
      ref={divObservadaRef}
      id={`${gridId}_navigationFotter`}
      role="navigation"
      aria-label="Paginação"
    >
      <DataGridPagesSizes>
        {limitsPerPage.map((item) => {
          return (
            <ButtonPages
              key={item}
              tabIndex={0}
              className={atualPageSize === item ? "active" : ""}
              onClick={() => changePageSize(item)}
              aria-label={`Itens por página: ${item}`}
            >
              {item}
            </ButtonPages>
          );
        })}
      </DataGridPagesSizes>
      <DataGridPages>
        <InfoPages>
          Página {atualPage} de {totalPages} ({rowsWithAllRows?.length} itens)
        </InfoPages>
        <GroupButtonsPage>
          {atualPage > 1 ? (
            <ButtonPages onClick={() => backPage()}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </ButtonPages>
          ) : null}
          {listPages &&
            listPages.map((item, index) => {
              return (
                <ContainerButtonsPage key={item}>
                  <ButtonPages
                    type="button"
                    onClick={() => changePage(item)}
                    tabIndex={0}
                    className={atualPage === item ? "active" : ""}
                    style={index === 0 ? { marginLeft: "1px" } : {}}
                    aria-label={`Página ${item}`}
                  >
                    {item}
                  </ButtonPages>
                  {listPages[index + 1] && listPages[index + 1] !== item + 1 ? (
                    <ButtonPages>. . .</ButtonPages>
                  ) : null}
                </ContainerButtonsPage>
              );
            })}
          {atualPage < totalPages ? (
            <ButtonPages onClick={() => nextPage()}>
              <FontAwesomeIcon icon={faChevronRight} />
            </ButtonPages>
          ) : null}
        </GroupButtonsPage>
      </DataGridPages>
    </DataGridFotter>
  );
};

export default FooterGrid;
