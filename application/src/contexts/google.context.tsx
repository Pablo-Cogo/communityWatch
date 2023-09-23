import React, { createContext, useContext, useState } from "react";
import UserService from "../services/user.service";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "./user.context";
import { ResponseAuthProps, UserProps } from "../types/user";

interface GoogleContextProps {
  getUrlGoogleLogin: (redirect: string) => void;
  googleLogin: (code: string | null) => void;
  getUserGoogle: () => Promise<UserProps | null>;
}

const GoogleContext = createContext<GoogleContextProps | undefined>(undefined);

const GoogleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userGoogle, setUserGoogle] = useState<UserProps | null>(null);
  const { setUserLogged } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const getUrlGoogleLogin = async (redirect: string) => {
    sessionStorage.setItem("location", location.pathname);
    const url = await UserService.getUrlGoogleLogin(redirect);
    window.location.href = url;
  };

  const googleLogin = async (code: string | null) => {
    if (code) {
      const response = await UserService.googleLogin(code);
      if (response) {
        const { userEmail, userImage, userName } = response;
        if (response.isLogged) {
          setUserLogged({
            userEmail,
            userImage,
            userName,
          });
          const from = location.state?.from || "/adm";
          navigate(from);
        } else {
          setUserGoogle({
            userEmail,
            userImage,
            userName,
          });
          navigate("/signup/new");
        }
      } else {
        navigate("/login");
      }
    }
  };

  const getUserGoogle = async (): Promise<UserProps | null> => {
    if (userGoogle) {
      return userGoogle;
    } else {
      const token = sessionStorage.getItem("google-user");
      const response = await UserService.decodeJsonToken<ResponseAuthProps>(
        token
      );
      if (response) {
        const { userEmail, userImage, userName } = response;
        setUserGoogle({
          userEmail,
          userImage,
          userName,
        });
        return { userEmail, userImage, userName };
      }
      return null;
    }
  };

  return (
    <GoogleContext.Provider
      value={{ getUrlGoogleLogin, googleLogin, getUserGoogle }}
    >
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
