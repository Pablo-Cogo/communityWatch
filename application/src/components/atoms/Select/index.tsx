import { forwardRef, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { SelectProps } from "./types";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const { className, label, val, id, required, options, ...rest } = props;
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
      if (!ref && !val) {
        if (selectRef.current) {
          selectRef.current.value = "";
        }
      }
    }, [ref, val]);

    return (
      <div className="relative w-full">
        <S.ContainerInput className={className}>
          <S.Label htmlFor={id} val={val}>
            <span>{label}</span>
            <S.Select
              ref={ref ?? selectRef}
              id={id}
              name={id}
              onBlur={handleBlur}
              onFocus={clearError}
              {...rest}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </S.Select>
          </S.Label>
        </S.ContainerInput>
        {error && <S.Error>{error}</S.Error>}
      </div>
    );
  }
);
