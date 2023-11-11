import { ChangeEvent, Dispatch, SetStateAction } from "react";
import ServiceLocator from "../../services/service.locator";

interface ChangeUtils {
  default: <T = any[]>(
    id: string,
    value: T,
    setValues: Dispatch<SetStateAction<T>>
  ) => void;
  noMask: <T = any[]>(
    value: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    setValues: Dispatch<SetStateAction<T>>
  ) => void;
  valuesUpper: <T = any[]>(
    value: ChangeEvent<HTMLInputElement>,
    setValues: Dispatch<SetStateAction<T>>,
    mask: (value: string) => string
  ) => void;
  valuesMask: <T = any[]>(
    value: ChangeEvent<HTMLInputElement>,
    setValues: Dispatch<SetStateAction<T>>,
    mask: (value: string) => string
  ) => void;
  valuesMaskered: <T = any[], R = any[]>(
    value: ChangeEvent<HTMLInputElement>,
    setValuesMask: Dispatch<SetStateAction<T>>,
    setValues: Dispatch<SetStateAction<R>>,
    mask: (value: string) => string,
    resetMask: (value: string) => string
  ) => void;
  resetForm: <T extends Record<string, any>>(
    setValues: Dispatch<SetStateAction<T | null>>,
    idFirstElement: keyof T,
    defaultValues: T | null,
    checkPopup?: boolean
  ) => void;
}

export const change: ChangeUtils = {
  default: (id, value, setValues) => {
    setValues((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  },

  noMask: (value, setValues) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value.trimStart(),
    }));
  },

  valuesUpper: (value, setValues, mask) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: mask(
        value.target.value.trimStart() !== undefined
          ? value.target.value.trimStart().toUpperCase()
          : ""
      ),
    }));
  },

  valuesMask: (value, setValues, mask) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: mask(
        value.target.value.trimStart()[0] !== undefined
          ? value.target.value.trimStart()[0].toUpperCase() +
              value.target.value.substring(1)
          : ""
      ),
    }));
  },

  valuesMaskered: (value, setValuesMask, setValues, mask, resetMask) => {
    setValuesMask((prevValue) => ({
      ...prevValue,
      [value.target.name]: mask(value.target.value.trimStart()),
    }));

    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: resetMask(mask(value.target.value.trimStart())),
    }));
  },

  resetForm: (setValues, idFirstElement, defaultValues) => {
    const focus = ServiceLocator.getAutoFocusService();
    const element = document.getElementById(idFirstElement.toString());
    if (setValues) {
      setValues(defaultValues);
    }

    if (element) {
      if (focus.getFocus()) {
        setTimeout(() => {
          element.focus();
        }, 200);
      }
    }
  },
};
