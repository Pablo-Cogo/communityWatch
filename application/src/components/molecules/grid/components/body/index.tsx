import React from "react";
import {
  DataGrid,
  DataGridBody,
  DataGridContent,
  DataGridContentBody,
  DatagridHeader,
  Item,
  ListItems,
  TableGrid,
  TextGridContent,
} from "./style";
import { BodyGridProps } from "./types";
import { Checkbox } from "../../../../atoms/Checkbox/style";
import { useColumnFilterContext } from "../../contexts/columns.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownLong,
  faArrowUpLong,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { ActionButton, BorderTd } from "../../style";
import ColumnSelectorRender from "../columnSelector";
import { useRowsContext } from "../../contexts/rows.context";
import useFilterRowsAndColumns from "../../hooks/filterRowsAndColumns.hook";
import useIsEnumProps from "../../hooks/isEnumProps.hook";

function BodyGrid<T extends Record<string, any>>({
  gridId,
  configGrid,
  configButtonsGrid,
  rows,
}: BodyGridProps<T>) {
  const { convertEnumToKey, convertReactElementToString } = useIsEnumProps<T>();
  const { filteredColumns } = useColumnFilterContext();
  const { orderRowsAndColumns } = useFilterRowsAndColumns();
  const {
    selectRow,
    removeSelectRow,
    checkAllRows,
    idsSelected,
    rowsGrid,
    rowsWithAllColumns,
  } = useRowsContext();

  return (
    <DataGrid id={gridId}>
      <DatagridHeader role="presentation">
        <DataGridContent role="presentation">
          <TableGrid role="presentation">
            <colgroup>
              {configGrid?.buttonCommandSelect !== false ? (
                <col style={{ width: "70px" }} />
              ) : null}
              {filteredColumns
                ? filteredColumns.map((elem, index) => {
                    return (
                      <col
                        key={"col_" + index}
                        data-column={index}
                        style={
                          elem.width ? { width: elem.width } : { width: "auto" }
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
                    <Checkbox
                      aria-label="Select all"
                      role="checkbox"
                      type="checkbox"
                      name="checkbox"
                      tabIndex={0}
                      className="border-box"
                      data-checked={
                        idsSelected?.length > 0 &&
                        !rows?.every((element) =>
                          idsSelected.includes(
                            convertEnumToKey(element[configGrid.colPrimary])
                          )
                        )
                          ? "mixed"
                          : null
                      }
                      onChange={(e) => checkAllRows(e, configGrid.colPrimary)}
                      checked={rows?.every((element) =>
                        idsSelected.includes(
                          convertEnumToKey(element[configGrid.colPrimary])
                        )
                      )}
                      style={{
                        margin: "auto",
                        background: "transparent",
                      }}
                    />
                  </td>
                ) : null}
                {filteredColumns
                  ? filteredColumns.map((elem, index) => {
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
                              onClick={(e) => orderRowsAndColumns(elem.column)}
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
                          {!elem.fix && index !== filteredColumns.length - 1 ? (
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
      </DatagridHeader>
      <DataGridBody role="presentation">
        {/* {loading && (
              <div style={{ padding: "20px" }}>
                <Load />
              </div>
            )} */}
        {/* <Suspense> */}
        {rowsGrid && rowsGrid?.length > 0 ? (
          <DataGridContentBody role="presentation">
            {/* {loading && setLoading(false)} */}
            <TableGrid role="presentation">
              <colgroup>
                {configGrid?.buttonCommandSelect !== false ? (
                  <col style={{ width: "70px" }} />
                ) : null}
                {filteredColumns
                  ? filteredColumns.map((elem, index) => {
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
                {rowsWithAllColumns.map((elem, index) => {
                  return (
                    <tr
                      key={gridId + "_row_" + index}
                      id={gridId + "_row_" + index}
                      className={
                        idsSelected &&
                        idsSelected.indexOf(
                          convertEnumToKey(
                            rowsWithAllColumns[index][configGrid.colPrimary]
                          )
                        ) !== -1
                          ? "selected"
                          : ""
                      }
                    >
                      {configGrid?.buttonCommandSelect !== false ? (
                        <td
                          className="command-select fix"
                          onClick={() =>
                            rowsWithAllColumns &&
                            selectRow(
                              convertEnumToKey(
                                rowsWithAllColumns[index][configGrid.colPrimary]
                              )
                            )
                          }
                        >
                          <Checkbox
                            aria-label="Select row"
                            role="checkbox"
                            type="checkbox"
                            name={"checkbox_" + index}
                            tabIndex={0}
                            className="border-box"
                            onChange={(e) =>
                              rowsWithAllColumns &&
                              removeSelectRow(
                                e,
                                convertEnumToKey(
                                  rowsWithAllColumns[index][
                                    configGrid.colPrimary
                                  ]
                                )
                              )
                            }
                            checked={
                              idsSelected
                                ? idsSelected.indexOf(
                                    rowsWithAllColumns &&
                                      convertEnumToKey(
                                        rowsWithAllColumns[index][
                                          configGrid.colPrimary
                                        ]
                                      )
                                  ) !== -1
                                : false
                            }
                            style={{
                              margin: "auto",
                              background: "transparent",
                            }}
                          />
                        </td>
                      ) : null}
                      {Object.values(rowsGrid[index]).map((elem2, index2) => {
                        return (
                          <td
                            key={"col_" + index2}
                            title={convertReactElementToString(elem2)}
                            data-column={index2}
                            className={elem.fix ? "fix" : ""}
                            onClick={() =>
                              rowsWithAllColumns &&
                              selectRow(
                                convertEnumToKey(
                                  rowsWithAllColumns[index][
                                    configGrid.colPrimary
                                  ]
                                )
                              )
                            }
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
                                    className={
                                      "elem_" +
                                      convertEnumToKey(
                                        rowsWithAllColumns[index][
                                          configGrid.colPrimary
                                        ]
                                      )
                                    }
                                    onClick={() =>
                                      button.action
                                        ? button.action(
                                            convertEnumToKey(
                                              rowsWithAllColumns[index][
                                                configGrid.colPrimary
                                              ]
                                            )
                                          )
                                        : alert(`este botão está sem ação`)
                                    }
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
                              (elem) => elem.inMoreActions && !elem.inToolbar
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
                                  {configButtonsGrid?.map((button, index2) => {
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
                                  })}
                                </ListItems>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
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
        ) : rowsGrid?.length === 0 ? (
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
      </DataGridBody>
      <ColumnSelectorRender gridId={gridId} />
    </DataGrid>
  );
}

export default BodyGrid;
