import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "solid" | "outline";
    typing?: "primary" | "secondary" | null;
    className?: string;
    href?: string;
  };
