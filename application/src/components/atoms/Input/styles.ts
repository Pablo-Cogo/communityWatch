import styled, { css } from "styled-components";

export const ContainerInput = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  border-radius: 3px;
  align-items: center;
  flex-direction: row;
  color: rgb(var(--primary-text));
  font-size: var(--system-14-font-size);
  border: 1px solid rgb(var(--stroke));
  background-color: rgb(var(--secondary-background));

  & .eye {
    height: 1em;
    cursor: pointer;
    color: rgb(var(--secondary-button));
    background: transparent;
  }

  & .eye:hover {
    opacity: 0.5;
  }
`;

export const Label = styled.label<{ val: string | number | readonly string[] }>`
  border: 0;
  display: flex;
  flex: 1 0 0px;
  font: inherit;
  font-size: 100%;
  height: 36px;
  margin: 0;
  min-width: 0;
  padding: 0;
  position: relative;
  vertical-align: baseline;
  align-items: center;

  & > span {
    border: 0;
    color: rgb(var(--secondary-text));
    font: inherit;
    font-size: var(--system-12-font-size);
    height: 36px;
    left: 8px;
    line-height: 36px;
    margin: 0;
    overflow: hidden;
    padding: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    text-overflow: ellipsis;
    transform-origin: left;
    transition: transform ease-out 0.1s;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: baseline;
    white-space: nowrap;
  }

  ${({ val }) =>
    val &&
    css`
      & > span {
        transform: scale(calc(10 / 12)) translateY(-10px);
      }
      & > input {
        font-size: var(--system-12-font-size);
        padding: 14px 8px 2px 8px !important;
      }
    `}
`;

export const Input = styled.input`
  border: 0;
  margin: 0;
  outline: none;
  overflow: hidden;
  padding: 9px 8px 7px 8px;
  text-overflow: ellipsis;

  ::-webkit-input-placeholder {
    color: transparent;
  }

  :-moz-placeholder {
    color: transparent;
  }

  ::-moz-placeholder {
    color: transparent;
  }

  :-ms-input-placeholder {
    color: transparent;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    opacity: 0 - 1;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
