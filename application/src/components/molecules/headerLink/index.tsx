import { LinkProps } from "../../atoms/Link/types";
import * as S from "./styles";

export const HeaderLink = ({
  href,
  children,
  className,
  ...props
}: LinkProps) => {
  return (
    <S.HeaderLink to={href} className={className} {...props}>
      {children}
    </S.HeaderLink>
  );
};
