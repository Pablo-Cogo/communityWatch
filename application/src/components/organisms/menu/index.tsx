import React, { useState } from "react";
import { Icon, ItemMenu, ListMenu, SidebarContainer, Text } from "./style";
import LogoSidebar from "../../atoms/Logo";
import { Book, Box, Home2, Map, Message } from "iconsax-react";
import { Link } from "react-router-dom";

const SidebarMenu = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <>
      <LogoSidebar open={openMenu} />
      <SidebarContainer
        onMouseEnter={() => setOpenMenu(true)}
        onMouseLeave={() => setOpenMenu(false)}
        open={openMenu}
      >
        <ListMenu>
          <ItemMenu as={Link} to={"/adm"} open={openMenu}>
            <Icon>
              <Home2 />
            </Icon>
            <Text open={openMenu}>Home</Text>
          </ItemMenu>
          <ItemMenu as={Link} to={"/adm/chat"} open={openMenu}>
            <Icon>
              <Message />
            </Icon>
            <Text open={openMenu}>Contatos</Text>
          </ItemMenu>
          <ItemMenu as={Link} to={"/adm/occurrences"} open={openMenu}>
            <Icon>
              <Book />
            </Icon>
            <Text open={openMenu}>Ocorrências</Text>
          </ItemMenu>
          <ItemMenu as={Link} to={"/adm/resources"} open={openMenu}>
            <Icon>
              <Box />
            </Icon>
            <Text open={openMenu}>Recursos</Text>
          </ItemMenu>
          <ItemMenu as={Link} to={"/map"} open={openMenu}>
            <Icon>
              <Map />
            </Icon>
            <Text open={openMenu}>Mapa</Text>
          </ItemMenu>
        </ListMenu>
      </SidebarContainer>
    </>
  );
};

export default SidebarMenu;
