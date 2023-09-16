import React from "react";

export type BackProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string;
  href?: string;
};
