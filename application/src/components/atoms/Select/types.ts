import { SelectHTMLAttributes } from "react";

export type Option = {
  value: string;
  label: string;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  val: string | ReadonlyArray<string> | number;
  required?: boolean;
  options: Option[];
  className?: string;
};
