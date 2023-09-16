import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Back = styled.button`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px solid rgb(var(--gray-300));
  position: absolute;
  top: 20px;
  left: 10px;

  @media (min-width: 550px) {
    top: 30px;
    left: 10px;
  }

  @media (min-width: 960px) {
    top: 40px;
    left: 40px;
  }

  @media (min-width: 1100px) {
    top: 40px;
    left: 60px;
  }

  &:hover {
    border-color: rgb(var(--gray-400));
  }

  &:active {
    background-color: rgb(var(--gray-100));
    color: rgba(var(--gray-700), 0.8);
  }
`;

export const ButtonBack = styled(Back).attrs({ as: Link })``;
