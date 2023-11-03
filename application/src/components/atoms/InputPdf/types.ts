import { InputHTMLAttributes } from "react";

export type InputFileProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  pdfUrl?: string;
  setValues: React.Dispatch<React.SetStateAction<any>>;
};
