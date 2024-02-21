import random from "lodash.random";
import React from "react";

const customEvents = [
  {
    name: "first-customer",
    body: "%user% got their first customer",
  },
  {
    name: "launched",
    body: "%user% launched a small bet",
  },
  {
    name: "mrr",
    body: "%user% got to 2k MRR",
  },
];

export function DemoHeader() {
  async function triggerPurchase() {
    const res = await fetch("/api/v1/proof_events/create_demo", {
      method: "POST",
      body: JSON.stringify({ product: "Demo Product" }),
    }).then((response) => response.json());
  }
  async function triggerEvent() {
    const res = await fetch("/api/v1/proof_event/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        product_id: 1,
        ...customEvents[random(0, customEvents.length - 1)],
      }),
    }).then((response) => response.json());
  }

  return (
    <header className="w-full gap-6 px-4 items-center flex lg:justify-start justify-between bg-sky-600 font-semibold text-white border-b-2 border-sky-700 pt-4 pb-3">
      <div className="text-sm">Demo Controls</div>
      <div className="flex gap-2">
        <button
          className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-sm font-normal px-3 py-1.5"
          onClick={triggerPurchase}
        >
          Trigger Purchase
        </button>
        <button
          className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-sm font-normal px-3 py-1.5"
          onClick={triggerEvent}
        >
          Trigger Customer Result
        </button>
      </div>
    </header>
  );
}
