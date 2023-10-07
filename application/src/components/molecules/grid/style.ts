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
