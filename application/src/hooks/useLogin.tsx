import React from "react";
import { LoginProps } from "../types/user";
import UserService from "../services/user.service";

const useLogin = () => {
  const [user, setUser] = React.useState<LoginProps | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await UserService.login({
      userEmail: user?.userEmail ?? "",
      userPassword: user?.userPassword ?? "",
    });
  };

  return {
    user,
    setUser,
    handleSubmit,
  };
};

export default useLogin;
