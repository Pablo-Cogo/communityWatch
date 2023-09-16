import React from "react";
import { GoogleProvider } from "./google.context";
import { UserProvider } from "./user.context";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <GoogleProvider>{children}</GoogleProvider>
    </UserProvider>
  );
};

export default AppProvider;
