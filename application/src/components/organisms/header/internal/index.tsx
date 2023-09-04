import React from "react";
import {
  BreadCrumb,
  Header,
  LogoContainer,
  Menu,
  MenuContainer,
  User,
} from "./style";
import Logo from "../../../../assets/logo";
import { Format } from "../../../../helpers/format";

const InternalHeader = () => {
  return (
    <Header>
      <LogoContainer>
        <Logo className="h-full" />
      </LogoContainer>
      <MenuContainer>
        <Menu>
          <p>Todos os recursos</p>
          <User>EM</User>
        </Menu>
        <BreadCrumb>{Format.date.complete(new Date())}</BreadCrumb>
      </MenuContainer>
    </Header>
  );
};

export default InternalHeader;
