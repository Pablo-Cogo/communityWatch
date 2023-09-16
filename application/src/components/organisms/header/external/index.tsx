import {
  Container,
  Ctas,
  Header,
  Menu,
  Nav,
  UserImage,
  UserLoggedContainer,
  UserNoImage,
} from "./style";
import Logo4 from "../../../../assets/logo/logov4";
import { Button } from "../../../atoms/Button";
import { HeaderLink } from "../../../molecules/headerLink";
import { StyledLink } from "../../../atoms/Link";
import useHasUserLogged from "../../../../hooks/hasUser.hook";
import { useState } from "react";
import { useUserContext } from "../../../../contexts/user.context";

const CtasRender = () => {
  const { userLogged } = useUserContext();
  const { hasUser } = useHasUserLogged();
  const [imageLoaded, setImageLoaded] = useState(true);
  console.log(hasUser);

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
        <Button className="uppercase">Cadastrar-se</Button>
      </Ctas>
    );
  } else {
    return (
      <Ctas>
        <UserLoggedContainer>
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
        </UserLoggedContainer>
      </Ctas>
    );
  }
};

const ExternalHeader = () => {
  return (
    <Header>
      <Container>
        <Nav>
          <StyledLink href="/" style={{ gridArea: "logo" }}>
            <Logo4 className="origin-left max-[768px]:py-3 max-[550px]:py-6 max-w-full" />
          </StyledLink>
          <CtasRender />
          <Menu>
            <HeaderLink href="/login">Home</HeaderLink>
            <HeaderLink href="/login">Mapa interativo</HeaderLink>
            <HeaderLink href="/login">Fale conosco</HeaderLink>
          </Menu>
        </Nav>
      </Container>
    </Header>
  );
};

export default ExternalHeader;
