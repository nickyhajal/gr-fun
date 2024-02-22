import React, { useEffect, useState } from "react";
import { PopButton } from "./ui/PopButton";
import { Switch } from "./ui/Switch";

interface Settings {
  hide_names: boolean;
  show_on_checkout: boolean;
}

export function ProofSettings({ productId }: { productId: number }) {
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/v1/proof_event_settings?product_id=${productId}`
        );
        const json = await res.json();
        if (json) {
          setSettings(json);
        }
        setReady(true);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);
  async function save(newSettings: Partial<Settings>) {
    try {
      const res = await fetch("/api/v1/proof_event_settings/upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          ...settings,
          ...newSettings,
        }),
      });
      const json = await res.json();
      if (json) {
        setSettings(json);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    ready &&
    (settings?.show_on_checkout ? (
      <div className="border border-black rounded-md bg-white p-8">
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-2xl">Dynamic Social Proof</h3>
          <section className="grid grid-cols-[1fr_1fr] gap-16 pt-10  min-h-32 w-full border-b border-black/20">
            <div className="w-9/12">
              <h4 className="text-xl">Show Dynamic Social Proof on Checkout</h4>
            </div>
            <div>
              <Switch
                toggled={settings.show_on_checkout}
                handleToggle={(val) => save({ show_on_checkout: val })}
              />
            </div>
          </section>
          <section className="grid grid-cols-[1fr_1fr] gap-16 pt-10  min-h-32 w-full">
            <div className="w-9/12">
              <h4 className="text-xl">Hide Customer Names</h4>
              <p className="text-sm">
                We'll refer to your customers as "Someone" instead of their
                first name and last initial.
              </p>
            </div>
            <div>
              <Switch
                toggled={settings.hide_names}
                handleToggle={(val) => save({ hide_names: val })}
              />
            </div>
          </section>
        </div>
      </div>
    ) : (
      <div className="border border-dashed border-black rounded-md bg-white p-8">
        <img
          src="https://assets.gumroad.com/packs/static/c21da069c635745d0f80.png"
          alt="Dynamic Social Proof"
        />
        <div className="flex flex-col items-center gap-2 pt-6">
          <h3 className="text-2xl">Dynamic Social Proof</h3>
          <p className="text-sm w-6/12 text-center mx-auto mb-2">
            Show potential customers who else is purchasing your product and
            getting results, right on your checkout page.
          </p>
          <PopButton
            onClick={() => save({ show_on_checkout: true, hide_names: true })}
            label="Turn on Dynamic Social Proof"
          >
            Turn On
          </PopButton>
        </div>
      </div>
    ))
  );
}
