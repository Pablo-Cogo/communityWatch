import { styled } from "styled-components";

export const Header = styled.header`
  width: 100%;
  display: flex;
  box-shadow: 0px 0px 8px 0 #58575f;
  max-height: 100px;
`;

export const LogoContainer = styled.div`
  height: 100px;
  padding: 10px;
  background: #fff;
  box-shadow: -3px -3px 8px 0 #58575f;
  z-index: 2;
`;

export const MenuContainer = styled.div`
  width: 100%;
`;

export const Menu = styled.div`
  width: 100%;
  height: 56%;
  background: #58575f;
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const BreadCrumb = styled.div`
  width: 100%;
  height: 44%;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const User = styled.div`
  border-radius: 50px;
  padding: 7px;
  background: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
