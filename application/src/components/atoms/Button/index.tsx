import React from "react";
import { ButtonProps } from "./types";
import { ContainerButton, ContainerLink } from "./styles";
import { useLocation } from "react-router-dom";

export const Button = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { variant = "solid", typing = null, className, href, ...rest } = props;
  const location = useLocation();
  return href ? (
    <ContainerLink
      to={href}
      variant={variant}
      typing={typing}
      ref={ref}
      className={className}
      state={{ from: location }}
      {...rest}
    />
  ) : (
    <ContainerButton
      variant={variant}
      typing={typing}
      ref={ref}
      className={className}
      {...rest}
    />
  );
});
