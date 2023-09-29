import React from "react";
import { MainContainer } from "./style";

const Main = ({ children }: { children: React.ReactNode }) => {
  return <MainContainer>{children}</MainContainer>;
};

export default Main;
