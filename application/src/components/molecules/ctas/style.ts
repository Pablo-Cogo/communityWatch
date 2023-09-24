import styled from "styled-components";

export const Ctas = styled.div`
  grid-area: ctas;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: end;
  justify-content: end;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  gap: 16px;

  @media (max-width: 550px) {
    & > button,
    & > a {
      display: none;
    }
    #responsive-button {
      font-size: 11px;
      line-height: 10px;
      display: flex !important;
    }
  }
`;

export const UserLoggedContainer = styled.div`
  position: relative;
`;

export const UserNoImage = styled.div`
  background: #ffb972;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: auto;
  color: white;
  font-size: 20px;

  @media (max-width: 550px) {
    width: 30px;
    height: 30px;
  }
`;

export const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  @media (max-width: 550px) {
    width: 30px;
    height: 30px;
  }
`;

export const UserModelContainer = styled.div`
  z-index: 9999;
  position: absolute;
  inset: 0px 0px auto auto;
  margin: 0px;
  right: 0;
  top: 100%;
`;

export const UserModal = styled.div`
  min-width: 196px;
  position: relative;
  padding-top: 8px;
`;

export const ListActionsUser = styled.ul`
  -webkit-app-region: no-drag;
  background-color: #ededed;
  border-radius: 4px;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.3), 0 6px 8px rgba(0, 0, 0, 0.2);
  max-height: calc(100vh - 24px);
  max-width: 350px;
  min-width: 160px;
  overflow-y: auto;
  padding: 4px;

  & li:last-child {
    border-top: 2px solid hsla(0, 0%, 0%, 0.1);
  }

  & li:first-child {
    border-top: 0;
  }
`;

export const ItemListUser = styled.li``;
export const ButtonItemUser = styled.button`
  background: transparent;
  border: 0;
  border-radius: 2px;
  color: hsla(0, 0%, 0%, 0.9);
  cursor: default;
  text-decoration: none;
  -webkit-padding-end: 8px;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: 8px;
  height: 40px;
  justify-content: space-between;
  padding: 12px;
  padding-inline-end: 8px;
  position: relative;
  text-align: start;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;

  &:hover,
  &:focus {
    background-color: hsla(0, 0%, 0%, 0.1);
    color: #000;
    text-decoration: none;
  }
`;
