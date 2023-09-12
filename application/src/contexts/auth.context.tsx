import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import { LoginProps, UserProps } from "../types/user";
import React, { useState, createContext, useContext } from "react";

interface AuthContextProps {
  user: LoginProps | null;
  userLogged: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<LoginProps | null>>;
  login: (e: React.FormEvent<HTMLFormElement>) => void;
  getUrlGoogleLogin: () => void;
  googleLogin: (code: string | null) => void;
  hasUser: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginProps | null>(null);
  const [userLogged, setUserLogged] = useState<UserProps | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await UserService.login({
      userEmail: user?.userEmail ?? "",
      userPassword: user?.userPassword ?? "",
    });
    setUser(null);
    if (response) setUserLogged(response);
    const from = location.state?.from || "/adm";
    navigate(from);
  };

  const getUrlGoogleLogin = async () => {
    const url = await UserService.getUrlGoogleLogin();
    window.location.href = url;
  };

  const googleLogin = async (code: string | null) => {
    setUser(null);
    if (code) {
      const response = await UserService.googleLogin(code);
      console.log(response);
      if (response) {
        setUserLogged(response);
        const from = location.state?.from || "/adm";
        navigate(from);
      } else {
        navigate("/login");
      }
    }
  };

  const hasUser = async () => {
    const response = await UserService.isLogged();
    if (typeof response !== "boolean") {
      setUserLogged(response);
    }
    return !!response;
  };

  const logout = () => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userLogged,
        setUser,
        login,
        getUrlGoogleLogin,
        googleLogin,
        hasUser,
        logout,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth, AuthContext };
