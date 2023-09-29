import { useState } from "react";
import {
  ActionButton,
  BorderTd,
  ButtonPages,
  ButtonToolbarContent,
  ColumnsSelector,
  ColumnsSelectorBody,
  ContainerButtonsPage,
  DataGrid,
  DataGridBody,
  DataGridContent,
  DataGridContentBody,
  DataGridFotter,
  DataGridPages,
  DataGridPagesSizes,
  DatagridHeader,
  GroupButtonsPage,
  HeaderPainel,
  InfoPages,
  Item,
  ItemToolbar,
  ListButtonsInToolbar,
  ListItems,
  ResizableBottom,
  ResizableCornerBottomLeft,
  ResizableCornerBottomRight,
  ResizableCornerTopLeft,
  ResizableCornerTopRight,
  ResizableLeft,
  ResizableRight,
  ResizableTop,
  TableGrid,
  TextGridContent,
  Toolbar,
  ToolbarAfter,
  ToolbarBefore,
  ToolbarItem,
  ToolbarItemContainer,
  ToolbarLabel,
  Widget,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownLong,
  faArrowUpLong,
  faClockRotateLeft,
  faClose,
  faEllipsisVertical,
  faFileArrowDown,
  faFileExcel,
  faFilePdf,
  faSortDown,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { GridProps } from "./types";

function Grid<T extends Record<string, any>>({
  gridId,
  gridButtonProps,
  configGrid,
  columns,
  rows,
}: GridProps<T>) {
  const [configButtonsGrid] = useState(gridButtonProps);
  console.log(rows?.length);

  function activeButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.currentTarget.classList.add("focused");
  }

  function desactiveButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.currentTarget.classList.remove("focused");
  }

  return (
    <Widget>
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
                    onMouseDown={(e) => activeButton(e)}
                    onMouseUp={(e) => desactiveButton(e)}
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
                        onMouseDown={(e) => activeButton(e)}
                        onMouseUp={(e) => desactiveButton(e)}
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
                    onMouseDown={(e) => activeButton(e)}
                    onMouseUp={(e) => desactiveButton(e)}
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
                      onMouseDown={(e) => activeButton(e)}
                      onMouseUp={(e) => desactiveButton(e)}
                      // onClick={() => exportPDF(idsSelected)}
                      title="Exportar PDF"
                      role="option"
                    >
                      <FontAwesomeIcon icon={faFilePdf} />
                      Exportar PDF
                    </ItemToolbar>
                    <ItemToolbar
                      onMouseDown={(e) => activeButton(e)}
                      onMouseUp={(e) => desactiveButton(e)}
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
                    onMouseDown={(e) => activeButton(e)}
                    onMouseUp={(e) => desactiveButton(e)}
                    tabIndex={0}
                    title="Selecionar colunas"
                    aria-label="Selecionar colunas"
                    // onClick={() => showSelectorColumns()}
                  >
                    <FontAwesomeIcon icon={faTableColumns} />
                  </ButtonToolbarContent>
                </ToolbarItem>
              ) : null}
            </ToolbarAfter>
          </ToolbarItemContainer>
        </Toolbar>
      </HeaderPainel>
      <DataGrid id={gridId}>
        <DatagridHeader role="presentation">
          <DataGridContent role="presentation">
            <TableGrid role="presentation">
              <colgroup>
                {configGrid?.buttonCommandSelect !== false ? (
                  <col style={{ width: "70px" }} />
                ) : null}
                {columns
                  ? columns.map((elem, index) => {
                      return (
                        <col
                          key={"col_" + index}
                          data-column={index}
                          style={
                            elem.width
                              ? { width: elem.width }
                              : { width: "auto" }
                          }
                        />
                      );
                    })
                  : null}
                {configGrid?.colCommands !== false &&
                configButtonsGrid?.some((elem) => !elem.inToolbar) ? (
                  <col
                    style={{
                      width:
                        configButtonsGrid?.filter((elem) => !elem.inToolbar)
                          ?.length === 3
                          ? "80px"
                          : configButtonsGrid?.filter((elem) => !elem.inToolbar)
                              ?.length < 3
                          ? configButtonsGrid?.filter((elem) => !elem.inToolbar)
                              ?.length *
                              40 +
                            "px"
                          : configButtonsGrid?.filter((elem) => !elem.inToolbar)
                              ?.length *
                              30 +
                            "px",
                    }}
                  />
                ) : null}
              </colgroup>
              <tbody role="presentation">
                <tr>
                  {configGrid?.buttonCommandSelect !== false ? (
                    <td className="command-select fix">
                      {/* <Checkbox
                        aria-label="Select all"
                        role="checkbox"
                        type="checkbox"
                        name="checkbox"
                        tabIndex="0"
                        className="border-box"
                        data-checked={
                          idsSelected?.length > 0 &&
                          rowsClone?.length !== idsSelected?.length
                            ? "mixed"
                            : null
                        }
                        onChange={(e) => checkAllRows(e)}
                        checked={rowsClone?.length === idsSelected?.length}
                        style={{
                          margin: "auto",
                          background: "transparent",
                        }}
                      /> */}
                    </td>
                  ) : null}
                  {columns
                    ? columns.map((elem, index) => {
                        return (
                          <td
                            key={"row_" + index}
                            data-column={index}
                            className={
                              elem.column.toString() +
                              " " +
                              (elem.fix ? "fix" : "")
                            }
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                overflow: "hidden",
                              }}
                            >
                              <TextGridContent
                                style={{ width: "100%" }}
                                className="content_td"
                                id={elem.column.toString()}
                                // onClick={(e) => orderRowsView(e)}
                              >
                                {elem.name}
                              </TextGridContent>
                              <div>
                                {elem.orderBy ===
                                undefined ? null : elem.orderBy ? (
                                  <FontAwesomeIcon icon={faArrowUpLong} />
                                ) : (
                                  <FontAwesomeIcon icon={faArrowDownLong} />
                                )}
                              </div>
                            </div>
                            {!elem.fix && index !== columns.length - 1 ? (
                              <BorderTd
                                className="border_td"
                                id={gridId + "Border_" + elem.column.toString()}
                              />
                            ) : null}
                          </td>
                        );
                      })
                    : null}
                  {configGrid?.colCommands !== false &&
                  configButtonsGrid?.some((elem) => !elem.inToolbar) ? (
                    <td className="command-edit fix"></td>
                  ) : null}
                </tr>
              </tbody>
            </TableGrid>
          </DataGridContent>
          <DataGridBody role="presentation">
            {/* {loading && (
              <div style={{ padding: "20px" }}>
                <Load />
              </div>
            )} */}
            {/* <Suspense> */}
            {rows && rows?.length > 0 ? (
              <DataGridContentBody role="presentation">
                {/* {loading && setLoading(false)} */}
                <TableGrid role="presentation">
                  <colgroup>
                    {configGrid?.buttonCommandSelect !== false ? (
                      <col style={{ width: "70px" }} />
                    ) : null}
                    {columns
                      ? columns.map((elem, index) => {
                          return (
                            <col
                              key={"col_" + index}
                              data-column={index}
                              style={
                                elem.width
                                  ? { width: elem.width }
                                  : { width: "auto" }
                              }
                            />
                          );
                        })
                      : null}
                    {configGrid?.colCommands !== false &&
                    configButtonsGrid?.some((elem) => !elem.inToolbar) ? (
                      <col
                        style={{
                          width:
                            configButtonsGrid?.filter((elem) => !elem.inToolbar)
                              ?.length === 3
                              ? "80px"
                              : configButtonsGrid?.filter(
                                  (elem) => !elem.inToolbar
                                )?.length < 3
                              ? configButtonsGrid?.filter(
                                  (elem) => !elem.inToolbar
                                )?.length *
                                  40 +
                                "px"
                              : configButtonsGrid?.filter(
                                  (elem) => !elem.inToolbar
                                )?.length *
                                  30 +
                                "px",
                        }}
                      />
                    ) : null}
                  </colgroup>
                  <tbody role="presentation">
                    {rows.map((elem, index) => {
                      return (
                        <tr
                          key={gridId + "_row_" + index}
                          id={gridId + "_row_" + index}
                          // className={
                          //   idsSelected &&
                          //   idsSelected.indexOf(
                          //     rowsClone[index][configGrid?.colPrimary]
                          //   ) !== -1
                          //     ? "selected"
                          //     : null
                          // }
                        >
                          {configGrid?.buttonCommandSelect !== false ? (
                            <td
                              className="command-select fix"
                              // onClick={() =>
                              //   changeCheckboxByRow(
                              //     rowsClone[index][configGrid?.colPrimary]
                              //   )
                              // }
                            >
                              {/* <Checkbox
                                  aria-label="Select all"
                                  role="checkbox"
                                  type="checkbox"
                                  name={"checkbox_" + index}
                                  tabIndex="0"
                                  className="border-box"
                                  onChange={(e) =>
                                    changeCheckboxRow(
                                      e,
                                      rowsClone[index][configGrid?.colPrimary]
                                    )
                                  }
                                  checked={
                                    idsSelected
                                      ? idsSelected.indexOf(
                                          rowsClone[index][
                                            configGrid?.colPrimary
                                          ]
                                        ) !== -1
                                      : false
                                  }
                                  style={{
                                    margin: "auto",
                                    background: "transparent",
                                  }}
                                /> */}
                            </td>
                          ) : null}
                          {Object.values(rows[index]).map((elem2, index2) => {
                            return (
                              <td
                                key={"col_" + index2}
                                title={elem2}
                                data-column={index2}
                                className={elem.fix ? "fix" : ""}
                                // onClick={() =>
                                //   changeCheckboxByRow(
                                //     rowsClone[index][configGrid?.colPrimary]
                                //   )
                                // }
                              >
                                <TextGridContent>{elem2}</TextGridContent>
                              </td>
                            );
                          })}
                          {configGrid?.colCommands !== false &&
                          configButtonsGrid?.some((elem) => !elem.inToolbar) ? (
                            <td className="command-edit fix">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-evenly",
                                }}
                              >
                                {configButtonsGrid?.map((button, index3) => {
                                  if (
                                    !button.inToolbar &&
                                    button.icon &&
                                    !button.inMoreActions
                                  ) {
                                    return (
                                      <ActionButton
                                        key={"button_" + (index3 + 1)}
                                        id={"button_" + (index3 + 1)}
                                        // className={
                                        //   "elem_" +
                                        //   rowsClone[index][
                                        //     configGrid?.colPrimary
                                        //   ]
                                        // }
                                        // onClick={() =>
                                        //   button.action
                                        //     ? button.action(
                                        //         rowsClone[index][
                                        //           configGrid?.colPrimary
                                        //         ]
                                        //       )
                                        //     : alert(
                                        //         `este botão está sem ação`
                                        //       )
                                        // }
                                        title={button.title ?? null}
                                        aria-label={button.title ?? null}
                                      >
                                        <FontAwesomeIcon icon={button.icon} />
                                      </ActionButton>
                                    );
                                  } else {
                                    return null;
                                  }
                                })}
                                {configButtonsGrid?.some(
                                  (elem) =>
                                    elem.inMoreActions && !elem.inToolbar
                                ) ? (
                                  <button
                                    style={{ position: "relative" }}
                                    id={"buttonAction_" + index}
                                    // onClick={() => showItems(index)}
                                    // onBlur={() => hideItems(index)}
                                  >
                                    <ListItems
                                      className="list_items"
                                      id={"listItems_" + index}
                                    >
                                      {configButtonsGrid?.map(
                                        (button, index2) => {
                                          if (
                                            !button.inToolbar &&
                                            button.inMoreActions &&
                                            button.text
                                          ) {
                                            return (
                                              <Item
                                                key={"moreAction_" + index2}
                                                // onClick={() =>
                                                //   button.action
                                                //     ? button.action(
                                                //         rowsClone[index][
                                                //           configGrid
                                                //             ?.colPrimary
                                                //         ]
                                                //       )
                                                //     : alert(
                                                //         `este botão está sem ação`
                                                //       )
                                                // }
                                              >
                                                {button.text}
                                              </Item>
                                            );
                                          } else {
                                            return null;
                                          }
                                        }
                                      )}
                                    </ListItems>
                                    <FontAwesomeIcon
                                      icon={faEllipsisVertical}
                                    />
                                  </button>
                                ) : null}
                              </div>
                            </td>
                          ) : null}
                        </tr>
                      );
                    })}
                  </tbody>
                </TableGrid>
              </DataGridContentBody>
            ) : rows?.length === 0 ? (
              <DataGridContentBody role="presentation">
                {/* {loading && setLoading(false)} */}
                <TableGrid as="div" role="presentation">
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    Nenhum registro encontrado.
                  </span>
                </TableGrid>
              </DataGridContentBody>
            ) : null}
            {/* </Suspense> */}
            <ColumnsSelector
              tabIndex={0}
              role="dialog"
              aria-label="Seletor de colunas"
              id={gridId + "_colums-selector"}
            >
              <Toolbar className="popup-title" role="toolbar">
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
                        // onClick={() => hideSelectorColumns()}
                      >
                        <FontAwesomeIcon icon={faClose} />
                      </ButtonToolbarContent>
                    </ToolbarItem>
                  </ToolbarAfter>
                </ToolbarItemContainer>
              </Toolbar>
              <ColumnsSelectorBody>
                {/* {columnsSelector
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
                            tabIndex="0"
                            className="border-box"
                            checked={col.show}
                            onChange={(e) => filterColumns(e)}
                            style={{
                              transform: "scale(1.5)",
                              background: "transparent",
                              marginRight: "5px",
                            }}
                          />
                          <CheckboxLabel
                            htmlFor={
                              gridId + "_column_chooser_item_" + col.column
                            }
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
                  : null} */}
              </ColumnsSelectorBody>

              <ResizableTop className="resizable-top" />
              <ResizableBottom className="resizable-bottom" />
              <ResizableLeft className="resizable-left" />
              <ResizableRight className="resizable-right" />

              <ResizableCornerTopLeft className="resizable-top-left" />
              <ResizableCornerTopRight className="resizable-top-right" />
              <ResizableCornerBottomLeft className="resizable-bottom-left" />
              <ResizableCornerBottomRight className="resizable-bottom-right" />
            </ColumnsSelector>
          </DataGridBody>
        </DatagridHeader>
      </DataGrid>
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
  );
}

export default Grid;
