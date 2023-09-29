import styled from "styled-components";

export const Widget = styled.div`
  box-sizing: border-box;
  display: block;
  -ms-content-zooming: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: none;
  -webkit-touch-callout: none;
  padding: 0;
  outline: 0;
  /* -webkit-print-color-adjust: exact; */
  color: #333;
  font-weight: 400;
  font-size: 14px;
  font-family: "Helvetica Neue", "Segoe UI", helvetica, verdana, sans-serif;
  line-height: 1.35715;

  & * {
    box-sizing: border-box;
  }
`;

export const GridContainer = styled.div`
  color: #333;
  background-color: #fff;
  line-height: inherit;

  position: relative;
  cursor: default;
  white-space: normal;

  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;

  flex-direction: column;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
`;

export const HeaderPainel = styled.div`
  border-bottom: 0;
  text-align: left;

  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
`;

export const Toolbar = styled(Widget)`
  margin-bottom: 10px;
  width: 100%;
  background-color: #fff;
  color: #333;
  padding: 0;
  overflow: visible;

  &.popup-title {
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    white-space: normal;
    position: relative;
    min-height: 28px;
    background: 0 0;
    color: #333;

    padding: 6px 20px;
    padding-top: 7px;
    padding-bottom: 9px;
    background-color: transparent;

    border-bottom: none;
    font-size: 16px;

    cursor: move;
    -ms-touch-action: pinch-zoom;
    touch-action: pinch-zoom;
  }
`;

export const ToolbarItemContainer = styled.div`
  height: 36px;
  overflow: visible;

  position: relative;
  width: 100%;
`;

export const ToolbarAfter = styled.div`
  padding-left: 15px;
  top: 0;
  display: table;
  height: 100%;
  right: 0;
  position: absolute;
`;

export const ToolbarBefore = styled.div`
  padding-right: 15px;
  overflow-x: hidden;
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
  left: 0;
  width: 100%;
`;

export const ToolbarItem = styled.div`
  display: table-cell;
  vertical-align: middle;
  box-sizing: content-box;
  padding: 0 0 0 5px;
  outline: 0;
  position: relative;

  &:first-child {
    padding: 0;
  }
`;

export const ToolbarLabel = styled(ToolbarItem)`
  font-size: 16px;
  max-width: calc(100% - 5px);
  white-space: nowrap;
  -webkit-user-drag: none;

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ButtonToolbarContent = styled.button`
  box-sizing: border-box;
  -ms-content-zooming: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: none;
  -webkit-touch-callout: none;
  padding: 8px;
  outline: 0;
  /* -webkit-print-color-adjust: exact; */
  color: #333;
  font-weight: 400;
  font-size: 14px;
  font-family: "Helvetica Neue", "Segoe UI", helvetica, verdana, sans-serif;
  line-height: 1.35715;

  border: 1px solid #ddd;
  border-radius: 4px;
  display: inline-flex;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  max-width: 100%;
  user-select: none;
  height: 100%;

  & svg {
    width: 18px;
    height: 18px;
    font-size: 18px;
    margin-right: 0;
    margin-left: 0;
    color: #333;
  }
  & svg ~ span {
    padding-left: 4px;
  }

  & span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-color: #ddd;
  }

  &.focused {
    background-color: rgba(0, 0, 0, 0.08);
  }

  &:disabled {
    opacity: 0.6;
    user-select: none;
    pointer-events: none;
  }

  &.button-mode-text {
    background-color: transparent;
    border-color: transparent;
    color: #333;
  }
  &.button-mode-text:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  &.button-mode-text.focused {
    background-color: rgba(0, 0, 0, 0.08);
  }

  &.button-close {
    display: block;
    position: relative;
    left: 10px;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
  }
`;

export const ListButtonsInToolbar = styled.div`
  width: auto;
  height: auto;
  z-index: 10;
  position: absolute;
  right: 0;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  border: 1px solid #ddd;
  margin-top: 1px;
  display: none;

  &.active {
    display: block;
  }
`;

export const ItemToolbar = styled.button`
  white-space: nowrap;
  padding: 7px 9px;
  column-gap: 8px;
  display: flex;
  align-items: baseline;
  width: 100%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-color: #ddd;
  }

  &.focused {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

export const DataGrid = styled.div`
  width: 100%;
  color: #333;
  line-height: inherit;
  cursor: default;
  white-space: normal;
  line-height: normal;
  position: relative;

  -webkit-text-size-adjust: none;
  color: #333;
  font-weight: 400;
  font-size: 14px;
  font-family: "Helvetica Neue", "Segoe UI", helvetica, verdana, sans-serif;
  line-height: 1.35715;
`;

//#region grid-header

export const TextGridContent = styled.div`
  max-width: 100%;
  white-space: nowrap;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DatagridHeader = styled.div`
  box-sizing: border-box;

  color: #959595;
  font-weight: 400;
  -ms-touch-action: pinch-zoom;
  touch-action: pinch-zoom;
  border: 1px solid #ddd;
  white-space: nowrap;

  outline: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;

  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;

  & tbody td {
    padding: 0 7px;
  }
  & tbody td svg {
    cursor: pointer;
  }

  & ${TextGridContent} {
    cursor: pointer;
    padding: 7px;
    padding-left: 0;
  }
`;

export const DataGridContent = styled.div`
  position: relative;
  margin-bottom: -1px;
  overflow: hidden;
  width: 100%;
`;

export const TableGrid = styled.table`
  border-bottom-width: 1px;
  max-width: none;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0;
  table-layout: fixed;
  width: 100%;
  background-color: transparent;

  & > tbody td {
    border-bottom: 1px solid #ddd; //verificar
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
    white-space: nowrap;
    /* overflow: hidden; */
    outline: 0;
    vertical-align: top;
    padding: 7px;
    position: relative;
    /* cursor: pointer; */
  }

  & > tbody td:first-child {
    border-left: 0;
  }
  & > tbody td:last-child {
    border-right: 0;
  }

  .command-select {
    padding: 0;
    width: 70px;
    min-width: 70px;
    max-width: 70px;
    vertical-align: middle;
    cursor: default;
  }

  .command-edit {
    cursor: default;
    vertical-align: middle;
  }

  .command-edit svg {
    padding: 2px 6px 1px 6px;
    cursor: pointer;
  }
`;

export const DataGridBody = styled.div`
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: auto;
  flex: auto;
  height: auto;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  color: #333;
  line-height: inherit;
  cursor: default;
  -webkit-text-size-adjust: none;
  font-weight: 400;
  font-size: 14px;
  font-family: "Helvetica Neue", "Segoe UI", helvetica, verdana, sans-serif;

  & * {
    box-sizing: border-box;
  }

  & tr:not(.selected):hover > td {
    background: rgba(0, 0, 0, 0.04);
  }

  & tr.selected {
    background: #e6e6e6;
  }

  & td {
    cursor: default;
  }
`;

export const DataGridContentBody = styled.div`
  min-height: 100%;
  overflow-anchor: none;
  position: relative;
  box-sizing: border-box;
`;

export const DataGridFotter = styled(Widget)`
  margin-top: -1px;
  border-top: 1px solid #ddd;
  flex: 0 0 auto;
  overflow: hidden;
  width: 100%;
  line-height: normal;
  user-select: none;
  padding-top: 9px;
  padding-bottom: 9px;

  &.responsive {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ButtonPages = styled.button`
  padding: 7px 9px 8px 10px;
  display: inline-block;
  cursor: pointer;
  margin-left: 4px;
  margin-right: 1px;
  outline: 0;
  border-radius: 3px;
  border: 1px solid transparent;

  &:focus {
    border-color: rgb(136, 171, 202);
    box-shadow: 0 0 2px rgb(136, 171, 202) inset;
  }

  &:hover {
    border-color: #d4d4d4;
    box-shadow: 0 0 2px #d4d4d4 inset;
  }

  &.active {
    cursor: inherit;
    text-shadow: none;
    color: #333;
    border-color: transparent;
    background-color: #d4d4d4;
  }
`;

export const DataGridPagesSizes = styled.div`
  float: left;

  & > ${ButtonPages}:first-child {
    margin-left: 1px;
  }
`;

export const DataGridPages = styled.div`
  float: right;
  display: flex;
  align-items: center;

  ${DataGridFotter}.responsive & {
    margin-top: 10px;
    padding: 10px 15px;
    border-radius: 4px;
    flex-direction: column;
    border: 1px solid #ddd;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

export const InfoPages = styled.div`
  display: inline-block;
  margin-right: 9px;
  opacity: 0.6;
  ${DataGridFotter}.responsive & {
    margin-bottom: 5px;
  }
`;

export const GroupButtonsPage = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export const ContainerButtonsPage = styled.div`
  display: block;
`;

export const ActionButton = styled.button`
  &:hover {
    opacity: 0.8;
  }
`;

export const ColumnsSelector = styled.div`
  width: 0;
  height: 0;
  z-index: 3;
  top: 0;
  right: 0;
  transform: scale(0);
  opacity: 0;

  background-color: #fff;
  border-radius: 6px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border: 1px solid #ddd;

  position: absolute;
  pointer-events: auto;
  z-index: 1000;
  outline: 0;
  overflow: hidden;

  color: #333;
  font-weight: 400;
  font-size: 14px;
  font-family: "Helvetica Neue", "Segoe UI", helvetica, verdana, sans-serif;
  line-height: 1.35715;
  transition: transform 0.3s ease, opacity 0.2s ease, width 0s ease 0.1s,
    height 0s ease 0.1s;

  &.show {
    transform: scale(1);
    width: 250px;
    height: 260px;
    opacity: 1;
    transition: transform 0.3s ease 0.1s, opacity 0.2s ease;
  }
`;

export const ColumnsSelectorBody = styled(Widget)`
  padding: 0 20px 20px;
  -webkit-user-drag: none;
  height: calc(100% - 62px);
  width: 100%;
`;

export const ResizableBase = styled.div`
  position: absolute;
  z-index: 50;
  user-select: none;
`;

export const ResizableTop = styled(ResizableBase)`
  cursor: s-resize;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
`;

export const ResizableBottom = styled(ResizableBase)`
  cursor: s-resize;
  bottom: 0;

  left: 0;
  width: 100%;
  height: 3px;
`;

export const ResizableLeft = styled(ResizableBase)`
  cursor: e-resize;
  left: 0;

  top: 0;
  height: 100%;
  width: 3px;
`;

export const ResizableRight = styled(ResizableBase)`
  cursor: e-resize;
  right: 0;

  top: 0;
  height: 100%;
  width: 3px;
`;

export const ResizableCorner = styled(ResizableBase)`
  width: 6px;
  height: 6px;
`;

export const ResizableCornerBottom = styled(ResizableCorner)`
  bottom: 0;
`;

export const ResizableCornerTop = styled(ResizableCorner)`
  top: 0;
`;

export const ResizableCornerBottomRight = styled(ResizableCornerBottom)`
  right: 0;
  border-bottom-left-radius: 100%;
  cursor: se-resize;
`;

export const ResizableCornerBottomLeft = styled(ResizableCornerBottom)`
  left: 0;
  border-bottom-right-radius: 100%;
  cursor: ne-resize;
`;

export const ResizableCornerTopRight = styled(ResizableCornerTop)`
  right: 0;
  border-bottom-left-radius: 100%;
  cursor: ne-resize;
`;

export const ResizableCornerTopLeft = styled(ResizableCornerTop)`
  left: 0;
  border-bottom-right-radius: 100%;
  cursor: se-resize;
`;

export const BorderColumn = styled.div`
  position: absolute;
  top: 0;
  width: 3px;
  height: 100%;
  user-select: none;
  background: rgb(195 212 227);
  z-index: 2;

  &:not(.has_column) {
    cursor: default !important;
    background: transparent !important;
  }

  &:hover {
    cursor: col-resize;
  }
`;

export const BorderTd = styled(BorderColumn)`
  right: -2.25px;
  z-index: 1;
`;

export const ListItems = styled.ul`
  position: absolute;
  background: #fff;
  right: 0px;
  top: 5px;
  padding: 0;
  z-index: 1;
  border-radius: 3px;
  display: none;
  border-top-right-radius: 0;
  border: 1px solid #666;

  &.show ~ svg {
    padding: 1px 5.25px;
    padding-bottom: 1px;
    border: 1px solid #666;
    border-bottom: 0;
    border-radius: 1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    background: #fff;
  }

  &::after {
    content: "";
    position: absolute;
    right: -1px;
    top: -3.5px;
    width: 13.5px;
    height: 4px;
    background: #fff;
    clear: both;
    border-left: 1px solid #666;
    border-right: 1px solid #666;
  }
  &::before {
    content: "";
    position: absolute;
    right: 0px;
    top: 0px;
    width: calc(100% - 10px);
    height: 1px;
    background: #fff;
    clear: both;
    z-index: 4;
  }

  &.show {
    display: block;
  }
`;

export const Item = styled.li`
  padding: 5px;
  border-bottom: 1px solid #666;
  cursor: pointer;

  &:first-child::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: calc(100% - 10px);
    height: 1px;
    background: #fff;
    clear: both;
    z-index: 5;
  }

  &:hover::after {
    background: rgba(0, 0, 0, 0.04);
  }

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;
