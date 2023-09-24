import React from "react";
import { Logo, LogoContainer } from "./style";
import Logo5 from "../../../assets/logo/logov5";
import Logo1 from "../../../assets/logo/logov2";
import { LogoProps } from "./types";

const LogoSidebar = ({ open = false }: LogoProps) => {
  return (
    <LogoContainer>
      <Logo open={open}>
        {open ? (
          <Logo5 className="h-full" />
        ) : (
          <Logo1 className="h-full max-w-full w-[39px]" />
        )}
      </Logo>
    </LogoContainer>
  );
};

export default LogoSidebar;
