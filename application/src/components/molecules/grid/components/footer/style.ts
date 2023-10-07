import styled from "styled-components";
import { Widget } from "../../style";

export const DataGridFotter = styled(Widget)`
  margin-top: -1px;
  border-top: 1px solid #ddd;
  flex: 0 0 auto;
  overflow: hidden;
  width: 100%;
  line-height: normal;
  user-select: none;
  padding-top: 9px;
  padding-bottom: 9px;

  &.responsive {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ButtonPages = styled.button`
  padding: 7px 9px 8px 10px;
  display: inline-block;
  cursor: pointer;
  margin-left: 4px;
  margin-right: 1px;
  outline: 0;
  border-radius: 3px;
  border: 1px solid transparent;

  &:focus {
    border-color: rgb(136, 171, 202);
    box-shadow: 0 0 2px rgb(136, 171, 202) inset;
  }

  &:hover {
    border-color: #d4d4d4;
    box-shadow: 0 0 2px #d4d4d4 inset;
  }

  &.active {
    cursor: inherit;
    text-shadow: none;
    color: #333;
    border-color: transparent;
    background-color: #d4d4d4;
  }
`;

export const DataGridPagesSizes = styled.div`
  float: left;

  & > ${ButtonPages}:first-child {
    margin-left: 1px;
  }
`;

export const DataGridPages = styled.div`
  float: right;
  display: flex;
  align-items: center;

  ${DataGridFotter}.responsive & {
    margin-top: 10px;
    padding: 10px 15px;
    border-radius: 4px;
    flex-direction: column;
    border: 1px solid #ddd;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

export const InfoPages = styled.div`
  display: inline-block;
  margin-right: 9px;
  opacity: 0.6;
  ${DataGridFotter}.responsive & {
    margin-bottom: 5px;
  }
`;

export const GroupButtonsPage = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export const ContainerButtonsPage = styled.div`
  display: block;
`;
