import { useLocation } from "react-router-dom";
import * as S from "./styles";
import { LinkProps } from "./types";

export const StyledLink = ({
  href,
  children,
  className,
  ...props
}: LinkProps) => {
  const location = useLocation();
  return (
    <S.LinkContainer
      to={href}
      className={className}
      state={{ from: location }}
      {...props}
    >
      {children}
    </S.LinkContainer>
  );
};
