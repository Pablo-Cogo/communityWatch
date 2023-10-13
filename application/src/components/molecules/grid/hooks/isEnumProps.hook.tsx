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
    if (isEnumProps(obj)) {
      return Object.values(obj)[0] as T[keyof T];
    }
    return obj as T[keyof T];
  }

  function convertEnumToKey(obj: object | string | number): T[keyof T] {
    if (isEnumProps(obj)) {
      return Object.values(obj)[0] as T[keyof T];
    }
    return obj as T[keyof T];
  }

  function convertReactElementToString(obj: any): string {
    if (
      obj &&
      typeof obj === "object" &&
      obj.$$typeof === Symbol.for("react.element")
    ) {
      const children = obj.props.children;

      if (typeof children === "string") {
        return children;
      } else if (Array.isArray(children)) {
        const textContent = children
          .filter((child) => typeof child === "string")
          .join(" ");
        return textContent;
      }
    }
    return obj;
  }

  return {
    isEnumProps,
    convertEnumToValue,
    convertEnumToKey,
    convertReactElementToString,
  };
};

export default useIsEnumProps;
