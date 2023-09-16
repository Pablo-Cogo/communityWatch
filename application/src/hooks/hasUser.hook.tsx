import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/user.context";

const useHasUserLogged = () => {
  const { userLogged, hasUser: checkHasUser } = useUserContext();
  const [hasUser, setHasUser] = useState<boolean | null>(null);
  useEffect(() => {
    if (userLogged) setHasUser(true);
    else {
      checkHasUser()
        .then((value) => {
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
