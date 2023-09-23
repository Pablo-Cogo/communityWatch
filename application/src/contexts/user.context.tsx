import React, { useState, createContext, useContext } from "react";
import UserService from "../services/user.service";
import { LoginProps, SignUpMailProps, UserProps } from "../types/user";
import { useLocation, useNavigate } from "react-router-dom";

interface UserContextProps {
  userLogged: UserProps | null;
  setUserLogged: React.Dispatch<React.SetStateAction<UserProps | null>>;
  login: (
    e: React.FormEvent<HTMLFormElement>,
    user: LoginProps | null,
    setUser: React.Dispatch<React.SetStateAction<LoginProps | null>>
  ) => void;
  hasUser: () => Promise<boolean>;
  logout: () => void;
  encodeMailSignUp: (user: SignUpMailProps) => void;
  getMailSignUp: () => Promise<SignUpMailProps | null>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userLogged, setUserLogged] = useState<UserProps | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (
    e: React.FormEvent<HTMLFormElement>,
    user: LoginProps | null,
    setUser: React.Dispatch<React.SetStateAction<LoginProps | null>>
  ) => {
    e.preventDefault();
    const response = await UserService.login({
      userEmail: user?.userEmail ?? "",
      userPassword: user?.userPassword ?? "",
    });
    if (response) {
      setUser(null);
      setUserLogged(response);
      const from = location.state?.from || "/adm";
      navigate(from);
    }
  };

  const encodeMailSignUp = async (user: SignUpMailProps) => {
    await UserService.encodeMailSignUp(user);
    navigate("/signup/address");
  };

  const getMailSignUp = async () => {
    return await UserService.decodeMailSignUp();
  };

  const hasUser = async () => {
    const response = await UserService.isLogged();
    if (typeof response !== "boolean") {
      setUserLogged(response);
    }
    return !!response;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserLogged(null);
    const from = "/";
    navigate(from);
  };

  return (
    <UserContext.Provider
      value={{
        userLogged,
        setUserLogged,
        login,
        hasUser,
        logout,
        encodeMailSignUp,
        getMailSignUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext deve ser usado dentro de um UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
