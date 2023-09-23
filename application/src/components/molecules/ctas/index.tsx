import {
  ButtonItemUser,
  Ctas,
  ItemListUser,
  ListActionsUser,
  UserImage,
  UserLoggedContainer,
  UserModal,
  UserModelContainer,
  UserNoImage,
} from "./style";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../atoms/Button";
import { useUserContext } from "../../../contexts/user.context";
import useHasUserLogged from "../../../hooks/hasUser.hook";
import { HeaderLink } from "../headerLink";

const CtasRender = () => {
  const { userLogged } = useUserContext();
  const { hasUser } = useHasUserLogged();
  const [imageLoaded, setImageLoaded] = useState(true);
  const [openUser, setOpenUser] = useState(false);
  const { logout } = useUserContext();

  const elementoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (
        elementoRef.current &&
        !elementoRef.current.contains(event.target as Node)
      ) {
        setOpenUser(false);
      }
    }

    document.addEventListener("click", handleClickFora);

    return () => {
      document.removeEventListener("click", handleClickFora);
    };
  }, []);

  if (hasUser === null) {
    return <></>;
  }

  if (!userLogged || !hasUser) {
    return (
      <Ctas>
        <HeaderLink href="/login">Entrar</HeaderLink>
        <Button className="!hidden" id="responsive-button" href="/login">
          Entrar
        </Button>
        <Button className="uppercase" href="/signup">
          Cadastrar-se
        </Button>
      </Ctas>
    );
  } else {
    return (
      <Ctas>
        <UserLoggedContainer
          ref={elementoRef}
          onClick={() => setOpenUser(!openUser)}
        >
          {userLogged.userImage ? (
            <>
              {imageLoaded ? (
                <UserImage
                  src={userLogged.userImage}
                  alt="err"
                  onError={() => setImageLoaded(false)}
                />
              ) : (
                <UserNoImage>{userLogged.userName[0]}</UserNoImage>
              )}
            </>
          ) : (
            <UserNoImage>{userLogged.userName[0]}</UserNoImage>
          )}
          {openUser && (
            <UserModelContainer>
              <UserModal>
                <ListActionsUser>
                  <ItemListUser>
                    <ButtonItemUser>Meu Perfil</ButtonItemUser>
                  </ItemListUser>
                  <ItemListUser>
                    <ButtonItemUser onClick={() => logout()}>
                      Terminar sessão
                    </ButtonItemUser>
                  </ItemListUser>
                </ListActionsUser>
              </UserModal>
            </UserModelContainer>
          )}
        </UserLoggedContainer>
      </Ctas>
    );
  }
};

export default CtasRender;
