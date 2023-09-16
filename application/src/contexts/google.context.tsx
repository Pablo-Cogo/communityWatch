import React, { createContext, useContext } from "react";
import UserService from "../services/user.service";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "./user.context";

interface GoogleContextProps {
  getUrlGoogleLogin: (redirect: string) => void;
  googleLogin: (code: string | null) => void;
}

const GoogleContext = createContext<GoogleContextProps | undefined>(undefined);

const GoogleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setUserLogged } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const getUrlGoogleLogin = async (redirect: string) => {
    const url = await UserService.getUrlGoogleLogin(redirect);
    window.location.href = url;
  };

  const googleLogin = async (code: string | null) => {
    if (code) {
      const response = await UserService.googleLogin(code);
      if (response) {
        setUserLogged(response);
        const from = location.state?.from || "/adm";
        navigate(from);
      } else {
        navigate("/login");
      }
    }
  };

  return (
    <GoogleContext.Provider value={{ getUrlGoogleLogin, googleLogin }}>
      {children}
    </GoogleContext.Provider>
  );
};

const useGoogleContext = () => {
  const context = useContext(GoogleContext);
  if (context === undefined) {
    throw new Error(
      "useGoogleContext deve ser usado dentro de um GoogleProvider"
    );
  }
  return context;
};

export { GoogleProvider, useGoogleContext };
