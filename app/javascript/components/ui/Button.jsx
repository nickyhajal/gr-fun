import React from "react";
export function Button({ children, ...props }) {
  if (props.href) return <a {...props}>{children}</a>;
  return <button {...props}>{children}</button>;
}
