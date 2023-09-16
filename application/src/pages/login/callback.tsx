import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../components/organisms/loading";
import { useGoogleContext } from "../../contexts/google.context";

function AuthCallback() {
  const location = useLocation();
  const { googleLogin } = useGoogleContext();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    googleLogin(code);
  }, [googleLogin, location.search]);

  return <Loading />;
}

export default AuthCallback;
