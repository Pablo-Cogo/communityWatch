import React from "react";
import {
  ButtonToolbarContent,
  HeaderPainel,
  ItemToolbar,
  ListButtonsInToolbar,
  Toolbar,
  ToolbarAfter,
  ToolbarItem,
  ToolbarItemContainer,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faFileArrowDown,
  faFileExcel,
  faFilePdf,
  faSortDown,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { HeaderGridProps } from "./types";
import { activeButton, desactiveButton } from "../../utils";
import { useColumnSelectorContext } from "../../contexts/column-selector.context";

const HeaderGrid = ({
  gridId,
  configButtonsGrid,
  configGrid,
}: HeaderGridProps) => {
  const { changeSelectorColumns } = useColumnSelectorContext();
  return (
    <HeaderPainel>
      <Toolbar
        aria-label="barra de ferramentas da grid de dados"
        role="toolbar"
      >
        <ToolbarItemContainer>
          <ToolbarAfter>
            {configGrid?.buttonRestore !== false ? (
              <ToolbarItem>
                <ButtonToolbarContent
                  title="Restaurar"
                  aria-label="Restaurar"
                  onMouseDown={activeButton}
                  onMouseUp={desactiveButton}
                >
                  <FontAwesomeIcon icon={faClockRotateLeft} />
                </ButtonToolbarContent>
              </ToolbarItem>
            ) : null}
            {configButtonsGrid?.map((button, index) => {
              if (button.inToolbar && (button.text || button.icon)) {
                return (
                  <ToolbarItem
                    key={gridId + "_button_" + (index + 1)}
                    id={gridId + "_button_" + (index + 1)}
                  >
                    <ButtonToolbarContent
                      // onClick={() =>
                      //   button.action
                      //     ? button.action(idsSelected)
                      //     : alert(`este botão está sem ação`)
                      // }
                      title={button.title && !button.text ? button.title : ""}
                      aria-label={
                        button.title && !button.text ? button.title : ""
                      }
                      tabIndex={0}
                      onMouseDown={activeButton}
                      onMouseUp={desactiveButton}
                    >
                      {button.icon ? (
                        <FontAwesomeIcon icon={button.icon} />
                      ) : null}
                      {button.text ? <span>{button.text}</span> : null}
                    </ButtonToolbarContent>
                  </ToolbarItem>
                );
              } else {
                return null;
              }
            })}
            {configGrid?.buttonsDownload !== false ? (
              <ToolbarItem>
                <ButtonToolbarContent
                  onMouseDown={activeButton}
                  onMouseUp={desactiveButton}
                  // onClick={changeListDownload}
                  tabIndex={0}
                  title="Exportar"
                  aria-label="Download"
                >
                  <FontAwesomeIcon icon={faFileArrowDown} />
                  <FontAwesomeIcon
                    style={{
                      marginTop: "-25%",
                      marginRight: "-3px",
                      fontSize: "10px",
                    }}
                    icon={faSortDown}
                  />
                </ButtonToolbarContent>
                <ListButtonsInToolbar
                  id={`${gridId}_listButtonsDownload`}
                  role="listbox"
                >
                  <ItemToolbar
                    onMouseDown={activeButton}
                    onMouseUp={desactiveButton}
                    // onClick={() => exportPDF(idsSelected)}
                    title="Exportar PDF"
                    role="option"
                  >
                    <FontAwesomeIcon icon={faFilePdf} />
                    Exportar PDF
                  </ItemToolbar>
                  <ItemToolbar
                    onMouseDown={activeButton}
                    onMouseUp={desactiveButton}
                    // onClick={() => exportXLSX(idsSelected)}
                    title="Exportar Planilha"
                    role="option"
                  >
                    <FontAwesomeIcon icon={faFileExcel} />
                    Exportar Planilha
                  </ItemToolbar>
                </ListButtonsInToolbar>
              </ToolbarItem>
            ) : null}
            {configGrid?.buttonColumnSelector !== false ? (
              <ToolbarItem>
                <ButtonToolbarContent
                  onMouseDown={activeButton}
                  onMouseUp={desactiveButton}
                  tabIndex={0}
                  title="Selecionar colunas"
                  aria-label="Selecionar colunas"
                  onClick={changeSelectorColumns}
                >
                  <FontAwesomeIcon icon={faTableColumns} />
                </ButtonToolbarContent>
              </ToolbarItem>
            ) : null}
          </ToolbarAfter>
        </ToolbarItemContainer>
      </Toolbar>
    </HeaderPainel>
  );
};

export default HeaderGrid;
