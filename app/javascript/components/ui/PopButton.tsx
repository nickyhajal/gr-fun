import React from "react";
export function PopButton({ children, ...props }) {
  const { label, ...rest } = props;
  let className = `bg-pink text-black rounded border border-black py-2.5 px-4 ${props.className} transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_0_#000]`;
  if (props.href)
    return (
      <a {...rest} className={className} aria-label={label}>
        {children}
      </a>
    );
  return (
    <button {...rest} className={className} aria-label={label}>
      {children}
    </button>
  );
}
