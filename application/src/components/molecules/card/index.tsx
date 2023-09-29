import { CardProps } from "./typess";
import { BodyCard, CardContainer, HeaderCard } from "./style";

const Card = ({ title, children }: CardProps) => {
  return (
    <CardContainer>
      <HeaderCard>{title}</HeaderCard>
      <BodyCard>{children}</BodyCard>
    </CardContainer>
  );
};

export default Card;
