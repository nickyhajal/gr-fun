import React from "react";
import { Link } from "react-router-dom";
import { BaseLayout } from "./layouts/BaseLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { PopButton } from "./ui/PopButton";
import { ProofSettings } from "./ProofSettings";

const tabs = [
  {
    label: "Product",
    href: "#",
    selected: false,
  },
  {
    label: "Content",
    href: "#",
    selected: false,
  },
  {
    label: "Share",
    href: "#",
    selected: false,
  },
  {
    label: "Customer Success",
    href: "#",
    selected: true,
  },
];

export default () => (
  <AdminLayout>
    <header className="py-8 px-16 border-b border-black grid grid-cols-[1fr_auto] items-center gap-4">
      <h1 className="text-4xl my-4">Small Bets - Lifetime Membership</h1>
      <div className="">
        <button className="bg-black text-white rounded px-4 py-3">
          Save and Continue
        </button>
      </div>
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <a
            role="tab"
            key={tab.label}
            href={tab.href}
            className={`px-3 pt-2.5 pb-2 border hover:border-black rounded-full ${
              tab.selected ? "bg-white border-black" : "border-transparent"
            }`}
            aria-selected={tab.selected}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </header>
    <main className="py-16 px-16 mt-4">
      <ProofSettings productId="1" />
    </main>
  </AdminLayout>
);
