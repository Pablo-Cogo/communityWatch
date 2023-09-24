import styled from "styled-components";

export const LogoContainer = styled.div`
  grid-area: logo;
  background-color: #fff;
  border-right: 1px solid #e2e2e2;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 6px;
  height: 55px;
  width: 100%;
`;

export const Logo = styled.div<{
  open: boolean;
}>`
  width: 100%;
  height: 100%;
  border-radius: 9px;
  display: flex;
  align-items: center;
  padding: 0 ${(props) => (props.open ? "15px" : "0")};
  justify-content: ${(props) => (props.open ? "initial" : "center")};
`;
