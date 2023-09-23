import { styled } from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  overflow: hidden;

  @media (min-width: 960px) {
    flex-direction: row;
    align-items: stretch;
    height: 100%;
    overflow: hidden;
  }
`;

export const AuthSidebar = styled.section`
  position: relative;
  color: #000;
  display: none;

  @media (min-width: 960px) {
    display: flex;
    flex-grow: 0;
    width: 450px;
    background: #fff;
  }

  @media (min-width: 1100px) {
    width: 400px;
  }
`;

export const Content = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  @media (min-width: 960px) {
    flex: 1;
    flex-direction: column;
    overflow: auto;
  }
`;

export const Main = styled.main`
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;

  @media (min-width: 960px) {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  @media (min-width: 1200px) {
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
`;

export const AuthContent = styled.div`
  width: 100%;
  max-width: 416px;
  box-sizing: content-box;
  margin: auto;

  @media (min-width: 960px) {
    margin: 0;
    padding: 30px 60px 0;
  }

  @media (min-width: 1200px) {
    margin-left: 100px;
  }
`;
