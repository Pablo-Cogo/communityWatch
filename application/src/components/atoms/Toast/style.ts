import styled, { keyframes } from "styled-components";
import { ToastStatus } from "./types";

const changeTimeBar = keyframes`
    0% {
        width: 100%
    }
    100% {
        width: 0;
    }
`;

export const ToastContainer = styled.div<{
  message: string | null;
}>`
  box-sizing: border-box;
  position: absolute;
  top: 50px;
  right: ${(props) => (!!props.message ? "0" : "-120%")};
  border-radius: 5px 0 0 5px;
  min-height: 70px;
  margin-top: 20px;
  margin-bottom: 12px;
  width: 300px;
  overflow-x: hidden;
  max-width: 400px;
  display: none;
  align-items: center;
  justify-content: start;
  font-size: 18px;
  transition: right ${(props) => (!!props.message ? ".5s" : "1.5s")};
  z-index: 5;
  background: var(--bg-toast);
  box-shadow: 0 0 4px;

  & > svg {
    margin-right: 10px;
    font-size: 35px;
  }
`;

export const IconContainer = styled.div<{
  state: ToastStatus;
}>`
  display: flex;
  align-items: center;
  padding: 0 5px;
  padding-left: 9px;

  & > svg {
    font-size: 30px;
    color: ${(props) => {
      switch (props.state) {
        case ToastStatus.SUCCESS:
          return "var(--color-success)";
        case ToastStatus.ERROR:
          return "var(--color-error)";
        case ToastStatus.WARNING:
          return "var(--color-warning)";
        case ToastStatus.INFO:
          return "var(--color-info)";
      }
    }};
  }
`;

export const TitleContainer = styled.div<{
  state: ToastStatus;
}>`
  padding: 5px;
  padding-right: 41px;
  display: flex;
  flex-direction: column;

  p {
    font-size: 16px;
    padding-bottom: 2px;
    font-weight: bold;
    text-align: start;
    color: ${(props) => {
      switch (props.state) {
        case ToastStatus.SUCCESS:
          return "var(--color-success)";
        case ToastStatus.ERROR:
          return "var(--color-error)";
        case ToastStatus.WARNING:
          return "var(--color-warning)";
        case ToastStatus.INFO:
          return "var(--color-info)";
      }
    }};
  }
  span {
    font-size: 14px;
    text-align: justify;
    padding-bottom: 6px;
    color: var(--color-subtitle-toast);
  }
`;

export const CloseContainer = styled.button<{
  state: ToastStatus;
}>`
  position: absolute;
  right: 5px;
  top: 0;
  bottom: 4px;
  cursor: pointer;
  box-shadow: 0 0 1px;
  z-index: 1;
  background: ${(props) => {
    switch (props.state) {
      case ToastStatus.SUCCESS:
        return "var(--color-success)";
      case ToastStatus.ERROR:
        return "var(--color-error)";
      case ToastStatus.WARNING:
        return "var(--color-warning)";
      case ToastStatus.INFO:
        return "var(--color-info)";
    }
  }};

  svg {
    color: var(--bg-toast);
    font-size: 20px;
    font-weight: bold;
    margin-top: 4px;
  }
`;

export const TimeBar = styled.div<{
  state: ToastStatus;
  ms: number;
}>`
  position: absolute;
  height: 4px;
  background: ${(props) => {
    switch (props.state) {
      case ToastStatus.SUCCESS:
        return "var(--color-success)";
      case ToastStatus.ERROR:
        return "var(--color-error)";
      case ToastStatus.WARNING:
        return "var(--color-warning)";
      case ToastStatus.INFO:
        return "var(--color-info)";
    }
  }};
  width: 100%;
  bottom: 0px;
  right: 0;
  transform: translate(180deg);

  &.pulse {
    animation: ${changeTimeBar};
    animation-duration: ${(props) => {
      return `${props.ms}ms`;
    }};
  }
`;
