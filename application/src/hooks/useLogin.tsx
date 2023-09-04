import React from "react";
import { LoginProps } from "../types/user";
import UserService from "../services/user.service";
import { useLocation, useNavigate } from "react-router-dom";

const useLogin = () => {
  const [user, setUser] = React.useState<LoginProps | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await UserService.login({
      userEmail: user?.userEmail ?? "",
      userPassword: user?.userPassword ?? "",
    });
    const from = location.state?.from || "/adm";
    navigate(from);
  };

  return {
    user,
    setUser,
    handleSubmit,
  };
};

export default useLogin;
