import styled from "styled-components";

export const BackgroundPopup = styled.div<{ state: boolean }>`
  top: 0;
  position: absolute;
  background: var(--bg-back-popup);
  height: ${({ state }) => (state ? "100%" : "0")};
  width: 100%;
  display: flex;
  justify-content: center;
  right: 0;
  z-index: 1;
  pointer-events: all;
`;

export const PopupContainer = styled.div<{ state: boolean }>`
  background: var(--bg-popup);
  box-sizing: border-box;
  width: -webkit-fill-available;
  min-width: 30%;
  position: absolute;
  opacity: ${({ state }) => (state ? "1" : "0")};
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 7px;
  z-index: ${({ state }) => (state ? "2" : "-1")};
  padding: 10px 25px;
  transition: opacity 0.3s;
`;

export const HeaderPopup = styled.div`
  font-size: 16px;
  font-weight: 500;
  padding: 10px;
  border-bottom: 1px solid #e2e2e2;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BodyPopup = styled.div`
  padding: 10px;
`;

export const ContainerButtons = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;

  & > button {
    margin-right: 8px;
    width: 50%;
  }
  & > button:last-child {
    margin-right: 0;
  }
`;

export const FotterPopup = styled.div`
  display: flex;
  padding-top: 15px;
  padding-bottom: 5px;
  justify-content: flex-end;
  border-top: 1px solid #e2e2e2;
`;
