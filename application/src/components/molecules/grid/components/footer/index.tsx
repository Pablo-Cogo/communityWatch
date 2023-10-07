import {
  ButtonPages,
  DataGridFotter,
  DataGridPages,
  DataGridPagesSizes,
  GroupButtonsPage,
  InfoPages,
} from "./style";
import { FooterGridProps } from "./types";
import { usePaginateContext } from "../../contexts/paginate.context";

const FooterGrid = ({ gridId }: FooterGridProps) => {
  const { limitsPerPage, atualPageSize } = usePaginateContext();
  return (
    <DataGridFotter
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
              // onClick={() => changeLimitRow(item)}
              aria-label={`Itens por página: ${item}`}
            >
              {item}
            </ButtonPages>
          );
        })}
      </DataGridPagesSizes>
      <DataGridPages>
        <InfoPages>
          {/* Página {atualPage} de {totalPage} ({rowsData?.length} itens) */}
        </InfoPages>
        <GroupButtonsPage>
          {/* {atualPage > 1 ? (
              <ButtonPages onClick={backPage}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </ButtonPages>
            ) : null} */}
          {/* {listPages &&
              listPages.map((item, index) => {
                return (
                  <ContainerButtonsPage key={item}>
                    <ButtonPages
                      type="button"
                      onClick={() => changePage(item)}
                      tabIndex="0"
                      className={atualPage === item ? "active" : ""}
                      style={index === 0 ? { marginLeft: "1px" } : {}}
                      aria-label={`Página ${item}`}
                    >
                      {item}
                    </ButtonPages>
                    {listPages[index + 1] &&
                    listPages[index + 1] !== item + 1 ? (
                      <ButtonPages>. . .</ButtonPages>
                    ) : null}
                  </ContainerButtonsPage>
                );
              })} */}
          {/* {atualPage < totalPage ? (
              <ButtonPages onClick={nextPage}>
                <FontAwesomeIcon icon={faChevronRight} />
              </ButtonPages>
            ) : null} */}
        </GroupButtonsPage>
      </DataGridPages>
    </DataGridFotter>
  );
};

export default FooterGrid;
