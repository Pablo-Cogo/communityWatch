import React, { useEffect } from "react";
import { PopupProps } from "./types";
import {
  BackgroundPopup,
  BodyPopup,
  ContainerButtons,
  FotterPopup,
  HeaderPopup,
  PopupContainer,
} from "./style";
import ServiceLocator from "../../../services/service.locator";
import { Close } from "@mui/icons-material";
import { ButtonIcon } from "../../atoms/ButtonIcon/style";
import { Button } from "../../atoms/Button";

const Popup = ({
  title,
  children,
  isOpen,
  close,
  titleButtonCancel = "Cancelar",
  titleButtonConfirm = "Confirmar",
  ...props
}: PopupProps) => {
  const autofocus = ServiceLocator.getAutoFocusService();
  useEffect(() => {
    autofocus.setFocus(!isOpen);
  }, [autofocus, isOpen]);
  return (
    <>
      <BackgroundPopup state={isOpen} onClick={close} />
      {isOpen && (
        <PopupContainer state={isOpen} {...props}>
          <HeaderPopup>
            {title}
            <ButtonIcon
              as={"button"}
              title="Fechar"
              aria-label="Fechar"
              onClick={close}
            >
              <Close />
            </ButtonIcon>
          </HeaderPopup>
          <BodyPopup>{children}</BodyPopup>
          <FotterPopup>
            <ContainerButtons>
              {titleButtonCancel ? (
                <Button
                  variant="outline"
                  typing="primary"
                  type="button"
                  onClick={() => close()}
                >
                  {titleButtonCancel}
                </Button>
              ) : null}
              {titleButtonConfirm ? (
                <Button variant="solid" typing="primary" type="submit">
                  {titleButtonConfirm}
                </Button>
              ) : null}
            </ContainerButtons>
          </FotterPopup>
        </PopupContainer>
      )}
    </>
  );
};

export default Popup;
