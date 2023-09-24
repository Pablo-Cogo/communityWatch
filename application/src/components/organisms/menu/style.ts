import styled from "styled-components";

export const SidebarContainer = styled.div<{
  open: boolean;
}>`
  grid-area: sidebar;
  width: ${(props) => (props.open ? "260px" : "55px")};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 24px 0px;
  /* background-color: #f9f9f9; */
  border-right: 1px solid #e2e2e2;
  transition: width 0.3s ease;
`;

export const ListMenu = styled.ul`
  width: 100%;
  padding: 6px;
`;

export const ItemMenu = styled.li<{
  open: boolean;
}>`
  height: 35px;
  display: flex;
  align-items: center;
  color: #5c5f62;
  border-radius: 5px;
  margin: 0 ${(props) => (props.open ? "10px" : "0")};
  margin-bottom: 5px;
  justify-content: ${(props) => (props.open ? "initial" : "center")};
  padding: 0 8px;
  cursor: pointer;

  &:hover {
    background: #ededed;
    color: #000;
  }
`;

export const Icon = styled.div``;
export const Text = styled.span<{
  open: boolean;
}>`
  padding-left: 6px;
  display: ${(props) => (props.open ? "flex" : "none")};
`;
