import { ChangeEvent, Dispatch, SetStateAction } from "react";

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
  resetForm: <T = any[]>(
    setValues: Dispatch<SetStateAction<T | never[]>>,
    idFirstElement: string,
    defaultValues?: T | never[],
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

  resetForm: (setValues, idFirstElement, defaultValues, checkPopup = true) => {
    if (setValues) {
      if (defaultValues) {
        setValues(defaultValues);
      } else {
        setValues([]);
      }
    }

    if (document.getElementById(idFirstElement)) {
      if (checkPopup) {
        if (!checkPopupOpen()) {
          setTimeout(() => {
            document.getElementById(idFirstElement)?.focus();
          }, 200);
        }
      } else {
        setTimeout(() => {
          document.getElementById(idFirstElement)?.focus();
        }, 200);
      }
    }
  },
};

const checkPopupOpen = () => {
  let open = false;

  document.querySelectorAll("*[id*=back]").forEach((elem) => {
    if (window.getComputedStyle(elem).height !== "0px") {
      open = true;
    }
  });

  return open;
};
