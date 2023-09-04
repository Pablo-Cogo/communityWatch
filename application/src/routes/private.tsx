import { Navigate, useLocation } from "react-router-dom";
import UserService from "../services/user.service";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [hasUser, setHasUser] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    UserService.isLogged()
      .then((value) => {
        setHasUser(value);
      })
      .catch(() => {
        setHasUser(false);
      });
  }, []);

  if (hasUser === null) {
    return null;
  }

  if (!hasUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
};

export default PrivateRoute;
