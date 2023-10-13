import { EnumProps } from "../types";

const useIsEnumProps = <T extends Record<string, any>>() => {
  function isEnumProps(obj: any): obj is EnumProps {
    return (
      typeof obj === "object" &&
      obj !== null &&
      Object.keys(obj).every(
        (key) =>
          typeof obj[key] === "string" ||
          typeof obj[key] === "number" ||
          typeof obj[key] === "object"
      )
    );
  }

  function convertEnumToValue(obj: object | string | number): T[keyof T] {
    return Object.values(obj)[0];
  }

  function convertEnumToKey(obj: object | string | number): T[keyof T] {
    return Object.keys(obj)[0] as T[keyof T];
  }

  return {
    isEnumProps,
    convertEnumToValue,
    convertEnumToKey,
  };
};

export default useIsEnumProps;
