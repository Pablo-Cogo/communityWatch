import { LinkContainer } from "./styles";
import { LinkProps } from "./types";

export const StyledLink = ({
  href,
  children,
  className,
  ...props
}: LinkProps) => {
  return (
    <LinkContainer to={href} className={className} {...props}>
      {children}
    </LinkContainer>
  );
};
