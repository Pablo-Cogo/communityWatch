import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts/auth.context";
import Loading from "../../components/organisms/loading";

function AuthCallback() {
  const location = useLocation();
  const { googleLogin } = useAuth();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    googleLogin(code);
  }, [googleLogin, location.search]);

  return <Loading />;
}

export default AuthCallback;
