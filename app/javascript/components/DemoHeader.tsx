import random from "lodash.random";
import React, { useEffect, useState } from "react";
import Shepherd from "shepherd.js";

const customEvents = [
  {
    event: "first-customer",
    body: "%user% got their first customer",
  },
  {
    event: "launched",
    body: "%user% launched a small bet",
  },
  {
    event: "mrr",
    body: "%user% got to 2k MRR",
  },
];

export function DemoHeader({ context }: { context: string }) {
  const [welcomed, setWelcomed] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState("ready");
  const [resultStatus, setResultStatus] = useState("ready");
  useEffect(() => {
    const welcomed = window.localStorage.getItem("welcomed");
    if (welcomed) {
      setWelcomed(true);
    }
  }, []);
  async function triggerPurchase() {
    try {
      if (purchaseStatus !== "ready") return;
      const res = await fetch("/api/v1/proof_events/create_demo", {
        method: "POST",
        body: JSON.stringify({ product: "Demo Product" }),
      }).then((response) => response.json());
      document
        .getElementById("proofEventDisplay")
        .scrollIntoView({ behavior: "smooth" });
      setPurchaseStatus("success");
      setTimeout(() => {
        setPurchaseStatus("ready");
      }, 1000);
      welcome();
    } catch (e) {
      console.error(e);
    }
  }
  async function triggerEvent() {
    try {
      if (resultStatus !== "ready") return;
      const res = await fetch("/api/v1/proof_event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          product_id: 1,
          key: "gr_NAi4lc8F6uuzkIeseVSZNw",
          ...customEvents[random(0, customEvents.length - 1)],
        }),
      }).then((response) => response.json());
      setResultStatus("success");
      setTimeout(() => {
        setResultStatus("ready");
      }, 1000);
      document
        .getElementById("proofEventDisplay")
        .scrollIntoView({ behavior: "smooth" });
      welcome();
    } catch (e) {
      console.error(e);
    }
  }

  function welcome() {
    if (!welcomed) {
      setWelcomed(true);
      window.localStorage.setItem("welcomed", true);
      const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
          classes:
            "shadow-lg font-medium text-black p-2 -mt-4 border border-black",
          scrollTo: { behavior: "smooth", block: "center" },
        },
      });
      tour.addStep({
        id: "proofEventDisplay",
        text: "When you trigger a customer purchase or result, it will appear here",
        attachTo: {
          element: "#proofEventDisplay",
          on: "top",
        },
        modalOverlayOpeningPadding: 3,
        classes: "example-step-extra-class",
        buttons: [
          {
            text: "Got it!",
            classes:
              "bg-accent hover:!bg-accent/90 text-sm text-white pt-2.5 font-normal !outline outline-1 !outline-black",
            action: tour.complete,
          },
        ],
      });
      // tour.start();
    }
  }

  return (
    <>
      <header className="w-full z-20 flex-col md:flex-row lg:top-0 lg:bottom-auto bottom-0 left-0 fixed gap-2 md:gap-6 px-4 items-center flex lg:justify-start justify-between bg-sky-600 font-semibold text-white border-b-2 border-sky-700 pt-2.5 md:pt-4 pb-3">
        <div className="text-sm">Demo Controls</div>
        <div className="flex gap-2">
          {context === "admin" ? (
            <a
              href="/"
              className="relative bg-white/10 hover:bg-white/20 border border-white/20 rounded-md md:text-sm text-xs  font-normal px-3 py-1.5"
            >
              Back to Checkout
            </a>
          ) : (
            <>
              <button
                className="relative bg-white/10 leading-snug hover:bg-white/20 border border-white/20 rounded-md md:text-sm py-1 text-xs font-normal px-3 md:py-1.5"
                onClick={triggerPurchase}
              >
                {purchaseStatus === "success" && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 m-auto icon icon-solid-check-circle opacity-80"></div>
                )}
                <span
                  className={`${
                    purchaseStatus === "success" ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Add Purchase
                </span>
              </button>
              <button
                className="relative bg-white/10 leading-snug hover:bg-white/20 border border-white/20 rounded-md md:text-sm py-1 text-xs font-normal px-3 md:py-1.5"
                onClick={triggerEvent}
              >
                {resultStatus === "success" && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 m-auto icon icon-solid-check-circle opacity-80"></div>
                )}
                <span
                  className={`${
                    resultStatus === "success" ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Add Customer Result
                </span>
              </button>
              <a
                href="/admin"
                className="relative text-center bg-white/10 leading-snug hover:bg-white/20 border border-white/20 rounded-md md:text-sm py-1 text-xs font-normal px-3 md:py-1.5"
              >
                Go to Admin
              </a>
            </>
          )}
        </div>
      </header>
    </>
  );
}
