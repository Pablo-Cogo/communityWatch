import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  val: string | ReadonlyArray<string> | number;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  className?: string | undefined;
};
