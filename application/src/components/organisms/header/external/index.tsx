import { Container, Header, Menu, Nav } from "./style";
import Logo4 from "../../../../assets/logo/logov4";
import { HeaderLink } from "../../../molecules/headerLink";
import { StyledLink } from "../../../atoms/Link";
import CtasRender from "../../../molecules/ctas";

const ExternalHeader = ({ ...props }) => {
  return (
    <Header {...props}>
      <Container>
        <Nav>
          <StyledLink href="/" style={{ gridArea: "logo" }}>
            <Logo4 className="origin-left max-[768px]:py-3 max-[550px]:py-6 max-w-full" />
          </StyledLink>
          <CtasRender />
          <Menu>
            <HeaderLink href="/">Home</HeaderLink>
            <HeaderLink href="/map">Mapa interativo</HeaderLink>
            <HeaderLink href="/adm/chat">Fale conosco</HeaderLink>
          </Menu>
        </Nav>
      </Container>
    </Header>
  );
};

export default ExternalHeader;
