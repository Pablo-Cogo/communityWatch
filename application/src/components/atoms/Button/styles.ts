import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const ContainerButton = styled.button<{
  variant: "solid" | "outline";
  typing: "primary" | "secondary" | null;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline-width: 2px;
  outline-offset: 2px;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  ${({ variant, typing }) =>
    variant === "solid" &&
    !typing &&
    css`
      color: rgb(var(--primary-background));
      font-weight: 600;
      background-color: rgb(var(--primary-button));

      &:hover {
        opacity: 0.9;
      }

      &:active {
        opacity: 0.75;
      }
    `}

  ${({ variant, typing }) =>
    variant === "solid" &&
    typing === "primary" &&
    css`
      color: rgb(var(--primary-background));
      font-weight: 600;
      background-color: rgb(var(--primary-button));

      &:hover {
        background-color: rgb(var(--primary-button-hover));
      }

      &:active {
        background-color: rgb(var(--primary-button-active));
      }
    `}

  ${({ variant, typing }) =>
    variant === "solid" &&
    typing === "secondary" &&
    css`
      color: rgb(var(--secondary-background));
      font-weight: 600;
      background-color: rgb(var(--secondary-button));

      &:hover {
        background-color: rgb(var(--secondary-button-hover));
      }

      &:active {
        background-color: rgb(var(--secondary-button-active));
      }
    `}
  
  ${({ variant, typing }) =>
    variant === "outline" &&
    !typing &&
    css`
      border: 1px solid rgb(var(--gray-300));
      color: rgb(var(--gray-700));
      background-color: rgb(var(--primary-background));

      &:hover {
        opacity: 0.9;
      }

      &:active {
        opacity: 0.75;
      }
    `}

  ${({ variant, typing }) =>
    variant === "outline" &&
    typing === "primary" &&
    css`
      border: 1px solid rgb(var(--gray-300));
      color: rgb(var(--gray-700));
      background-color: rgb(var(--primary-background));

      &:hover {
        border-color: rgb(var(--gray-400));
      }

      &:active {
        background-color: rgb(var(--gray-100));
        color: rgba(var(--gray-700), 0.8);
      }
    `}
`;

export const ContainerLink = styled(ContainerButton).attrs({ as: Link })``;
