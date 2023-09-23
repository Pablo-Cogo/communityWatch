import { styled } from "styled-components";

export const Header = styled.header`
  width: 100%;
  position: fixed;
  z-index: 4;
`;

export const Container = styled.div`
  height: 100%;
  padding-right: 16px;
  padding-left: 16px;
  min-width: 170px;

  @media (min-width: 1280px) {
    padding-right: 0;
    padding-left: 0;
    margin-left: auto;
    margin-right: auto;
    width: 1200px;
  }

  @media (min-width: 1000px) {
    padding-right: 40px;
    padding-left: 40px;
    max-width: 1280px;
  }

  @media (min-width: 750px) {
    padding-right: 30px;
    padding-left: 30px;
  }

  @media (min-width: 550px) {
    padding-right: 25px;
    padding-left: 25px;
  }
`;

export const Nav = styled.nav`
  margin-bottom: 3rem;
  font-size: 0.6875rem;
  font-weight: 600;
  display: grid;
  grid-template:
    "logo ctas ctas"
    "menu menu menu"/2fr 1fr 1fr;

  @media (min-width: 768px) {
    margin-bottom: calc(0.625rem * -1);
    font-size: 0.8125rem;
    padding: 1.625rem 0;
    grid-template: "logo menu ctas"/3fr 4fr 3fr;
  }

  @media (min-width: 1280px) {
    grid-template: "logo menu ctas"/2.5fr 4fr 2fr;
  }
`;

export const Menu = styled.div`
  grid-area: menu;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-box-pack: justify;
  justify-content: space-between;
  border-top: solid 1px rgb(var(--color-primary));
  border-bottom: solid 1px rgb(var(--color-primary));
  padding: 0.75rem 0;

  @media (min-width: 768px) {
    border: none;
    padding: 0;
    gap: 20%;
    -webkit-box-pack: end;
    justify-content: end;
  }

  @media (max-width: 550px) {
    & > a {
      font-size: 11px;
    }
  }
`;
