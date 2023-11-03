import styled from "styled-components";
import { RowProps } from "./types";

export const Row = styled.div<RowProps>`
  display: grid;
  column-gap: ${({ colgap }) => (colgap === undefined ? "30px" : colgap)};
  row-gap: ${({ rowgap }) => (rowgap === undefined ? "20px" : rowgap)};
  grid-template-columns: ${({ gtc }) =>
    gtc === undefined
      ? "1fr"
      : typeof gtc === "number"
      ? "repeat(" + gtc + ", 1fr)"
      : gtc};

  @media (max-width: 589px) {
    grid-template-columns: 1fr !important;
  }
`;
