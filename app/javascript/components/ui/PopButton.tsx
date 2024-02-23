import React from "react";
import { tw } from "../../util/tw";

interface Props {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  label: string;
}

export function PopButton({ children, ...props }: Props) {
  const { label, ...rest } = props;
  let className = tw(
    `bg-pink text-black text-[0.97rem] rounded border border-black pt-3 pb-2.5 px-4 ${props.className} transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_0_#000] ${props.className}`
  );
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
