import { ChevronLeft } from "@mui/icons-material";
import { BackProps } from "./types";
import { ButtonBack } from "./style";
import { useLocation } from "react-router-dom";

const Back = ({ href, children, className, ...props }: BackProps) => {
  const location = useLocation();
  return (
    <ButtonBack
      to={href ?? location.state?.from?.pathname}
      title="voltar"
      {...props}
    >
      <ChevronLeft />
    </ButtonBack>
  );
};

export default Back;
