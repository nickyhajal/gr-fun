import React from "react";
import { Logo } from "./Logo";

export function SearchHeader() {
  return (
    <header className="py-8 w-full border-b border-black">
      <div className="flex items-center gap-4 max-w-6xl  mx-auto">
        <Logo />
        <div className="w-full py-3 px-4 rounded-[4px] border border-black flex gap-2 items-center">
          <input
            type="text"
            className="w-full p-0 border-0 bg-transparent text-base"
            placeholder="Search products"
          />
        </div>
      </div>
    </header>
  );
}
