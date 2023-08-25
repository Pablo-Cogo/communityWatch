import { Link } from "react-router-dom";
import styled from "styled-components";

const StyleLink = styled.a`
  display: flex;
  align-items: center;
  color: rgb(var(--link));
  font-size: var(--system-14-font-size);

  &:hover {
    text-decoration: underline;
  }
`;

export const LinkContainer = styled(StyleLink).attrs({ as: Link })``;
