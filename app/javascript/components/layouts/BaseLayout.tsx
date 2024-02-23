import React from "react";
import { SearchHeader } from "../SearchHeader";
import { DemoHeader } from "../DemoHeader";

export function BaseLayout({ children }) {
  return (
    <div className="lg:pt-16 pb-12">
      <DemoHeader />
      <SearchHeader />
      <section className="py-16 px-4 pb-32 lg:pb-0">
        <div className="">{children}</div>
      </section>
    </div>
  );
}
