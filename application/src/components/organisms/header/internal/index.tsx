import React from "react";
import {
  BreadCrumb,
  Header,
  LogoContainer,
  Menu,
  MenuContainer,
} from "./style";
import Logo from "../../../../assets/logo";
import { Format } from "../../../../helpers/format";
import CtasRender from "../../../molecules/ctas";

const InternalHeader = () => {
  return (
    <Header>
      <LogoContainer>
        <Logo className="h-full" />
      </LogoContainer>
      <MenuContainer>
        <Menu>
          <CtasRender />
        </Menu>
        <BreadCrumb>{Format.date.complete(new Date())}</BreadCrumb>
      </MenuContainer>
    </Header>
  );
};

export default InternalHeader;
