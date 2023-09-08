import { Navigate, useLocation } from "react-router-dom";
import useHasUserLogged from "../hooks/hasUser.hook";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { hasUser } = useHasUserLogged();
  console.log(hasUser);

  if (hasUser === null) {
    return null;
  }

  if (!hasUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
};

export default PrivateRoute;
