import { styled } from "styled-components";

export const ContainerHome = styled.section`
  height: 100%;
  display: grid;
  grid-template-areas: "header" "main";
  grid-template-rows: 0.26fr 1fr;
  background: black;

  @media (min-width: 648px) {
    grid-template-rows: 0.15fr 1fr;
  }
`;

export const MainHome = styled.main`
  grid-area: main;
`;
