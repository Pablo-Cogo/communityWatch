import styled from "styled-components";
import { Widget } from "../../style";

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
