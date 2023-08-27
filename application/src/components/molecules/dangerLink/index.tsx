import { LinkProps } from "../../atoms/Link/types";
import * as S from "./styles";

export const DangerLink = ({
  href,
  children,
  className,
  ...props
}: LinkProps) => {
  return (
    <S.DangerLink to={href} className={className} {...props}>
      {children}
    </S.DangerLink>
  );
};
