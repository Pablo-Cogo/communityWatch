import styled from "styled-components";
import { Widget } from "../../style";

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
