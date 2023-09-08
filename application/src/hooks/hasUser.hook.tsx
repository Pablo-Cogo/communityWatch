import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth.context";

const useHasUserLogged = () => {
  const { userLogged, hasUser: checkHasUser } = useAuth();
  const [hasUser, setHasUser] = useState<boolean | null>(null);
  console.log(hasUser);
  useEffect(() => {
    if (userLogged) setHasUser(true);
    else {
      checkHasUser()
        .then((value) => {
          console.log(value);
          setHasUser(value);
        })
        .catch(() => {
          setHasUser(false);
        });
    }
  }, [checkHasUser, userLogged]);

  return {
    hasUser,
  };
};

export default useHasUserLogged;
