import { forwardRef, useState } from "react";
import * as S from "./styles";
import { InputProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type = "text", className, label, val, id, ...rest } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const alterPasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <S.ContainerInput className={className}>
      <S.Label htmlFor={id} val={val}>
        <span>{label}</span>
        {type === "password" ? (
          <>
            <S.Input
              ref={ref}
              id={id}
              name={id}
              type={passwordVisible ? "text" : "password"}
              {...rest}
            />
            <FontAwesomeIcon
              className="eye pr-2"
              icon={passwordVisible ? faEye : faEyeSlash}
              onClick={() => alterPasswordVisibility()}
            />
          </>
        ) : (
          <S.Input id={id} name={id} type={type} {...rest} />
        )}
      </S.Label>
    </S.ContainerInput>
  );
});