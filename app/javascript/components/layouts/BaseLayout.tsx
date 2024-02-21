import React from "react";
import { SearchHeader } from "../SearchHeader";
import { DemoHeader } from "../DemoHeader";

export function BaseLayout({ children }) {
  return (
    <div className="">
      <DemoHeader />
      <SearchHeader />
      <section className="py-16">
        <div className="">{children}</div>
      </section>
    </div>
  );
}
