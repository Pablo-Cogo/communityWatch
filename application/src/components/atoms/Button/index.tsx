import React from "react";
import { ButtonProps } from "./types";
import { ContainerButton, ContainerLink } from "./styles";

export const Button = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { variant = "solid", typing = null, className, href, ...rest } = props;

  return href ? (
    <ContainerLink
      to={href}
      variant={variant}
      typing={typing}
      ref={ref}
      className={className}
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
