import React from "react";

export function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`border border-black rounded-md ring: px-4 py-3 focus:ring-pink focus-visible:outline-none focus-visible:ring-pink focus-visible:ring-[2px] focus-visible:border-black focus:ring-[2px] focus:border-black ${props.className}`}
    />
  );
}
