import { Link } from "react-router-dom";
import styled from "styled-components";

const StyleLink = styled.a`
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

export const LinkContainer = styled(StyleLink).attrs({ as: Link })``;
