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

//#region grid-header

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
