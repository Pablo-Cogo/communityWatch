import { useState } from "react";
import {
  // ActionButton,
  // BorderTd,
  // ButtonPages,
  // ContainerButtonsPage,
  DataGridFotter,
  DataGridPages,
  DataGridPagesSizes,
  GroupButtonsPage,
  InfoPages,
  Widget,
} from "./style";
import { GridProps } from "./types";
import HeaderGrid from "./components/header";
import GridProvider from "./contexts/grid.context";
import BodyGrid from "./components/body";

function Grid<T extends Record<string, any>>({
  gridId,
  gridButtonProps,
  configGrid,
  columns,
  rows,
}: GridProps<T>) {
  const [configButtonsGrid] = useState(gridButtonProps);

  return (
    <GridProvider columns={columns} rows={rows}>
      <Widget>
        <HeaderGrid
          gridId={gridId}
          configButtonsGrid={configButtonsGrid}
          configGrid={configGrid}
        />
        <BodyGrid
          gridId={gridId}
          configGrid={configGrid}
          configButtonsGrid={configButtonsGrid}
          rows={rows}
        />
        <DataGridFotter
          id={`${gridId}_navigationFotter`}
          role="navigation"
          aria-label="Paginação"
        >
          <DataGridPagesSizes>
            {/* {listLimitRows.map((item) => {
            return (
              <ButtonPages
                key={item}
                tabIndex="0"
                className={pageSize === item ? "active" : ""}
                onClick={() => changeLimitRow(item)}
                aria-label={`Itens por página: ${item}`}
              >
                {item}
              </ButtonPages>
            );
          })} */}
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
      </Widget>
    </GridProvider>
  );
}

export default Grid;
