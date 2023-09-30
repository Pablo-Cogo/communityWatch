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
