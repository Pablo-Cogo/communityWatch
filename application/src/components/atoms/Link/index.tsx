import * as S from "./styles";
import { LinkProps } from "./types";

export const StyledLink = ({
  href,
  children,
  className,
  ...props
}: LinkProps) => {
  return (
    <S.LinkContainer to={href} className={className} {...props}>
      {children}
    </S.LinkContainer>
  );
};
