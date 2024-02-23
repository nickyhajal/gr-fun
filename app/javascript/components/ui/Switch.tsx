import React, { useEffect, useState } from "react";

interface Props {
  handleToggle: (toggle: boolean) => void;
  toggled: boolean;
  label: string;
}

export function Switch({ handleToggle, toggled, label, ...props }: Props) {
  const toggleClass =
    " transform translate-x-[calc(100%+6px)] md:translate-x-[calc(100%-2px)]";
  return (
    <div
      {...props}
      aria-checked={toggled}
      aria-label={label}
      role="switch"
      className={`md:w-12 md:h-7 w-12 h-6 flex items-center ${
        toggled ? "bg-pink" : "bg-white"
      } border border-black ray-400 rounded-full p-1 cursor-pointer`}
      onClick={() => {
        handleToggle(!toggled);
      }}
    >
      <div
        className={
          "bg-black md:w-5 md:h-5 h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out" +
          (toggled ? toggleClass : toggled)
        }
      ></div>
    </div>
  );
}
