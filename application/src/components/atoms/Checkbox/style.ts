import styled from "styled-components";
import { keyframes } from "styled-components";

const toggleOnCheckbox = keyframes`
    0% {
        opacity: 0;
        transform: translate(-50%, -85%) scale(0) rotate(45deg);
    }

    70% {
        opacity: 1;
        transform: translate(-50%, -85%) scale(0.9) rotate(45deg);
    }
    
    100% {
        transform: translate(-50%, -85%) scale(0.8) rotate(45deg);
    }
`;

export const ContainerCheckbox = styled.div`
  display: flex;
  align-items: center;
`;

export const Checkbox = styled.input`
  position: relative;
  appearance: none;
  box-sizing: content-box;
  overflow: hidden;
  display: block;
  box-sizing: content-box;
  background: var(--bg-checkbox);
  width: var(--checkbox-size);
  min-width: var(--checkbox-size);
  height: var(--checkbox-size);
  min-height: var(--checkbox-size);
  border: 2px solid var(--checkbox-border);
  border-radius: calc(var(--checkbox-size) / 4);
  transition: 0.2s border-color ease;
  cursor: pointer;

  &.border-box[data-checked="mixed"]::after {
    content: "";
    position: relative;
    display: block;
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
    background-color: var(--checkbox-checked);
    border-radius: 0;
  }

  &:hover {
    background: var(--checkbox-hover);
  }

  &:checked {
    border-color: var(--checkbox-checked);
    transition: 0.5s border-color ease;
  }

  &:not([data-checked="mixed"])::after {
    content: "";
    display: block;
    position: absolute;
    box-sizing: content-box;
    top: 50%;
    left: 50%;
    width: calc(var(--checkbox-size) * 0.6);
    height: var(--checkbox-size);
    border-radius: 0;
    transform-origin: 50% 50%;
    background-color: transparent;
    box-shadow: calc(var(--checkbox-size) / 4) calc(var(--checkbox-size) / 4)
      0px 0px var(--checkbox-checked);
    transform: translate(-50%, -85%) scale(0) rotate(45deg);
  }
  &.border-box::after {
    box-sizing: border-box;
    top: 44%;
    width: calc(var(--checkbox-size) * 0.45);
    height: calc(var(--checkbox-size) - calc(var(--checkbox-size) * 0.24));
  }

  &:checked::after {
    animation: ${toggleOnCheckbox} 0.2s ease forwards;
  }

  &:disabled {
    opacity: var(--opacity-input-disabled);
    background-color: var(--bg-input-outline-disabled);
    user-select: none;
    pointer-events: none;
  }

  &:disabled + label {
    pointer-events: none;
  }
`;

export const CheckboxFilled = styled(Checkbox)`
  transition: 0.2s border-color ease, 0.2s background-color ease;

  &:checked:not(:disabled) {
    background-color: var(--checkbox-checked);
  }

  &:not(:disabled)::after {
    box-shadow: calc(var(--checkbox-size) / 4) calc(var(--checkbox-size) / 4)
      0px 0px var(--color-checkbox-filled-checked);
  }
`;

export const CheckboxLabel = styled.label`
  font-size: var(--label-size);
  font-family: var(--font-family-inputs);
  color: var(--color-label-toggle);
  padding-left: 5px;
  cursor: pointer;
`;
