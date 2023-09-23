import { forwardRef, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { InputProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { type = "text", className, label, val, id, required, ...rest } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const alterPasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  useEffect(() => {
    if (!ref && !val) {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [ref, val]);

  const handleBlur = () => {
    if (!val && required) {
      setError(`Campo: ${label} obrigatório.`);
    } else {
      setError(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="relative w-full">
      <S.ContainerInput className={className}>
        <S.Label htmlFor={id} val={val}>
          <span>{label}</span>
          {type === "password" ? (
            <>
              <S.Input
                ref={ref ?? inputRef}
                id={id}
                name={id}
                onBlur={handleBlur}
                onFocus={clearError}
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
            <S.Input
              id={id}
              name={id}
              type={type}
              onBlur={handleBlur}
              onFocus={clearError}
              {...rest}
            />
          )}
        </S.Label>
      </S.ContainerInput>
      {error && <S.Error>{error}</S.Error>}
    </div>
  );
});
