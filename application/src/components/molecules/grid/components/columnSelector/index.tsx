import React, { useEffect } from "react";
import {
  ColumnsSelector,
  ColumnsSelectorBody,
  ResizableBottom,
  ResizableCornerBottomLeft,
  ResizableCornerBottomRight,
  ResizableCornerTopLeft,
  ResizableCornerTopRight,
  ResizableLeft,
  ResizableRight,
  ResizableTop,
} from "./style";
import {
  ButtonToolbarContent,
  Toolbar,
  ToolbarAfter,
  ToolbarBefore,
  ToolbarItem,
  ToolbarItemContainer,
  ToolbarLabel,
} from "../header/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ColumnsSelectorProps } from "./types";
import { draggable } from "./actions/draggableColumnSelector";
import { resizableColumnSelector } from "./actions/resizableColumnSelector";
import { useColumnSelectorContext } from "../../contexts/column-selector.context";
import {
  Checkbox,
  CheckboxLabel,
  ContainerCheckbox,
} from "../../../../atoms/Checkbox/style";

const ColumnSelectorRender = ({ gridId }: ColumnsSelectorProps) => {
  const {
    changeSelectorColumns,
    filterColumnSelector,
    stateColumnSelector,
    columnsSelector,
  } = useColumnSelectorContext();

  useEffect(() => {
    filterColumnSelector();
    draggable(gridId + "_colums-selector", ".popup-title");
    resizableColumnSelector(`${gridId}_colums-selector`, `${gridId}_resizable`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridId]);
  return (
    <ColumnsSelector
      tabIndex={0}
      role="dialog"
      aria-label="Seletor de colunas"
      id={gridId + "_colums-selector"}
      className={stateColumnSelector ? "show" : ""}
    >
      <Toolbar
        className="popup-title"
        id={gridId + "_header-colums-selector"}
        role="toolbar"
      >
        <ToolbarItemContainer>
          <ToolbarBefore>
            <ToolbarLabel>
              <div>Seletor de Colunas</div>
            </ToolbarLabel>
          </ToolbarBefore>
          <ToolbarAfter>
            <ToolbarItem>
              <ButtonToolbarContent
                className="button-mode-text button-close"
                tabIndex={0}
                title="Fechar"
                aria-label="Fechar"
                onClick={changeSelectorColumns}
              >
                <FontAwesomeIcon icon={faClose} />
              </ButtonToolbarContent>
            </ToolbarItem>
          </ToolbarAfter>
        </ToolbarItemContainer>
      </Toolbar>
      <ColumnsSelectorBody>
        {columnsSelector
          ? columnsSelector.map((col) => {
              return (
                <ContainerCheckbox
                  key={gridId + "_column_item_" + col.column}
                  style={{ marginBottom: "10px" }}
                >
                  <Checkbox
                    role="checkbox"
                    type="checkbox"
                    name={col.column}
                    id={gridId + "_column_chooser_item_" + col.column}
                    tabIndex={0}
                    className="border-box"
                    checked={col.show}
                    // onChange={(e) => filterColumns(e)}
                    style={{
                      transform: "scale(1.5)",
                      background: "transparent",
                      marginRight: "5px",
                    }}
                  />
                  <CheckboxLabel
                    htmlFor={gridId + "_column_chooser_item_" + col.column}
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col.name}
                  </CheckboxLabel>
                </ContainerCheckbox>
              );
            })
          : null}
      </ColumnsSelectorBody>

      <ResizableTop className={`${gridId}_resizable top`} />
      <ResizableBottom className={`${gridId}_resizable bottom`} />
      <ResizableLeft className={`${gridId}_resizable left`} />
      <ResizableRight className={`${gridId}_resizable right`} />

      <ResizableCornerTopLeft className={`${gridId}_resizable top-left`} />
      <ResizableCornerTopRight className={`${gridId}_resizable top-right`} />
      <ResizableCornerBottomLeft
        className={`${gridId}_resizable bottom-left`}
      />
      <ResizableCornerBottomRight
        className={`${gridId}_resizable bottom-right`}
      />
    </ColumnsSelector>
  );
};

export default ColumnSelectorRender;
