import React from "react";
import { SearchHeader } from "../SearchHeader";

export function BaseLayout({ children }) {
  return (
    <div className="">
      <SearchHeader />
      <section className="py-16">
        <div className="">{children}</div>
      </section>
    </div>
  );
}
