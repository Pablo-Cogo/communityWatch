import { Container, Ctas, Header, Menu, Nav } from "./style";
import Logo4 from "../../../../assets/logo/logov4";
import { Button } from "../../../atoms/Button";
import { HeaderLink } from "../../../molecules/headerLink";
import { StyledLink } from "../../../atoms/Link";

const ExternalHeader = () => {
  return (
    <Header>
      <Container>
        <Nav>
          <StyledLink href="/" style={{ gridArea: "logo" }}>
            <Logo4 className="origin-left max-[768px]:py-3 max-[550px]:py-6 max-w-full" />
          </StyledLink>
          <Ctas>
            <HeaderLink href="/login">Entrar</HeaderLink>
            <Button className="!hidden" id="responsive-button" href="/login">
              Entrar
            </Button>
            <Button className="uppercase">Cadastrar-se</Button>
          </Ctas>
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
