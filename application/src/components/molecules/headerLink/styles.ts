import { styled } from "styled-components";
import { LinkContainer } from "../../atoms/Link/styles";

export const HeaderLink = styled(LinkContainer)`
  text-transform: uppercase;
  position: relative;
  font-size: var(--system-13-font-size);
  font-weight: 600;
  color: #fff;

  &:hover {
    text-decoration: none;
    color: rgb(var(--header-link));
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 1px;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background-color: rgb(var(--header-link));
  }
  &:hover::before {
    width: 22px;
  }
`;
