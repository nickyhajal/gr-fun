import React from "react";
import { Logo } from "./Logo";

export function DemoHeader() {
  async function triggerPurchase() {
    const res = await fetch("/api/v1/proof_events/create_demo", {
      method: "POST",
      body: JSON.stringify({ product: "Demo Product" }),
    }).then((response) => response.json());
  }

  return (
    <header className="w-full gap-6 px-8 flex items-center bg-sky-600 font-semibold text-white border-b-2 border-sky-700 pt-4 pb-3">
      <div>Demo Controls</div>
      <button
        className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-sm font-normal px-3 py-1.5"
        onClick={triggerPurchase}
      >
        Trigger Purchase
      </button>
    </header>
  );
}
