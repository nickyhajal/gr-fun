import React, { useEffect, useState } from "react";
import { PopButton } from "./ui/PopButton";
import { Switch } from "./ui/Switch";
import { post } from "../util/loaders/post";

interface Settings {
  hide_names: boolean;
  show_on_checkout: boolean;
}

export function TestimonialSettings({ productId }: { productId: number }) {
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);
  useEffect(() => {
    async function load() {
      try {
        // const res = await fetch(
        //   `/api/v1/proof_event_settings?product_id=${productId}`
        // );
        // const json = await res.json();
        // if (json) {
        //   setSettings(json);
        // }
        setReady(true);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);
  async function save(newSettings: Partial<Settings>) {
    try {
      const res = post("proof_event_settings/upsert", {
        product_id: productId,
        ...settings,
        ...newSettings,
      });
      if (res) {
        setSettings(res);
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
          <section className="grid lg:grid-cols-[1fr-1fr] border-b border-black/20 grid-cols-[1fr_auto] sm:gap-16 gap-5 sm:pt-10 pt-4 sm:min-h-32 min-h-24 w-full">
            <div className="sm:w-9/12">
              <h4 className="sm:text-xl text-base">
                Show Dynamic Social Proof on Checkout
              </h4>
            </div>
            <div>
              <Switch
                label="Show on Checkout"
                toggled={settings.show_on_checkout}
                handleToggle={(val) => save({ show_on_checkout: val })}
              />
            </div>
          </section>
          <section className="grid lg:grid-cols-[1fr-1fr]  grid-cols-[1fr_auto] sm:gap-16 gap-5 sm:pt-10 pt-5 sm:min-h-32 min-h-24 w-full">
            <div className="sm:w-9/12">
              <h4 className="sm:text-xl text-base">Hide Customer Names</h4>
              <p className="sm:text-[0.97rem] text-sm pt-3">
                We'll refer to your customers as "Someone" instead of their
                first name and last initial.
              </p>
            </div>
            <div>
              <Switch
                label="Hide Names"
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
          src="https://assets.gumroad.com/assets/placeholders/published_posts-093e1b2bf89a242d91f41110a981eeeae49d7cf49cc0b07b18eb7577630084ba.png"
          alt="Testimonials"
        />
        <div className="flex flex-col items-center gap-2 pt-6">
          <h3 className="text-2xl text-center">Testimonials</h3>
          <p className="text-sm md:w-6/12 w-full text-center mx-auto mb-2">
            Use testimonials to build confidence in your product with potential
            customers.
          </p>
          <PopButton
            onClick={() => save({ show_on_checkout: true, hide_names: true })}
            label="Start Collecting Testimonials"
          >
            Start Collecting
          </PopButton>
        </div>
      </div>
    ))
  );
}
