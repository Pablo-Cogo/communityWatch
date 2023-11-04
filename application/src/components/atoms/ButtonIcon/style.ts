import styled from "styled-components";

export const ButtonIcon = styled.a`
  background-color: transparent;
  border-radius: 50%;
  padding: 5px;
  display: flex;
  align-items: center;
  transition: 0.1s;
  color: var(--color-buton-icon-link) !important;
  cursor: pointer;

  &:hover,
  &:focus {
    color: var(--color-buton-icon-link-selected) !important;
  }
`;
