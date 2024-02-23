import React, { useEffect, useState } from "react";
import { AdminLayout } from "./layouts/AdminLayout";
import { PopButton } from "./ui/PopButton";
import { Switch } from "./ui/Switch";
import ProductProofActionEditor from "./ProductProofActionEditor";
import { ProductProofEvent, Settings } from "../types";
import toast from "react-hot-toast";

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
    label: "Proof",
    href: "#",
    selected: true,
  },
  {
    label: "Testimonials",
    href: "#",
    selected: false,
  },
];

export default () => {
  const productId = "1";
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState<Settings | null>({
    show_on_checkout: false,
    hide_names: false,
    key: "",
  });
  const [events, setEvents] = useState<ProductProofEvent[]>([]);
  const [edited, setEdited] = useState<Partial<Settings> | null>({
    show_on_checkout: false,
    hide_names: false,
  });
  useEffect(() => {
    loadSettings();
  }, []);
  useEffect(() => {
    loadEvents();
  }, []);
  async function loadEvents() {
    const res = await fetch(
      `/api/v1/product_proof_events?product_id=${productId}`
    );
    const json = await res.json();
    setEvents(json);
  }
  async function loadSettings() {
    try {
      const res = await fetch(
        `/api/v1/proof_event_settings?product_id=${productId}&secure=true`
      );
      const json = await res.json();
      if (json) {
        setSettings((curr) => ({ ...curr, ...json }));
        setEdited((curr) => ({ ...curr, ...json }));
      }
      setReady(true);
    } catch (e) {
      console.error(e);
    }
  }
  function addEvent() {
    setEvents((curr) => [
      ...curr,
      {
        product_id: 1,
        label: "",
        valueLabel: "",
        message: "",
      },
    ]);
  }
  function setEventValue(inx: number, key: string, value: string) {
    setEvents((curr) => {
      const newEvents = [...curr];
      newEvents[inx][key] = value;
      return newEvents;
    });
  }
  async function generateKey() {
    try {
      const res = await fetch("/api/v1/proof_event_settings/generate_key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
        }),
      });
      const json = await res.json();
      if (json) {
        setSettings((curr) => ({ ...curr, ...json }));
        setEdited((curr) => ({ ...curr, ...json }));
      }
      toast.success("API Key generated!");
    } catch (e) {
      console.error(e);
    }
  }
  async function save(newSettings: Partial<Settings> = {}) {
    try {
      const res = await fetch("/api/v1/proof_event_settings/upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          ...edited,
          ...newSettings,
        }),
      });
      const json = await res.json();
      if (json) {
        setSettings((curr) => ({ ...curr, ...json }));
        setEdited((curr) => ({ ...curr, ...json }));
      }
      if (events.length) {
        const eventRes = await fetch("/api/v1/product_proof_events/upsert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            product_id: productId,
            events,
          }),
        });
      }
      toast.success("Changes saved!");
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <AdminLayout>
      <header className="sticky z-40 top-16 bg-canvas lg:py-8 lg:px-16 px-0 py-4 border-b border-black grid grid-cols-[1fr_auto] items-center gap-0 lg:gap-4">
        <h1 className="text-4xl my-4 lg:block hidden">
          Small Bets - Lifetime Membership
        </h1>
        <div className="lg:col-[2] col-[1/-1] px-2 mb-4 lg:px-0 lg:mb-0">
          <PopButton
            onClick={() => save()}
            className="bg-black text-white hover:bg-pink hover:text-black rounded opacity-1 px-4 py-3 lg:w-fit w-full"
          >
            Save and continue
          </PopButton>
        </div>
        <div className="flex pt-3 pb-3 -mb-3 lg:pt-0 md:gap-6 gap-2 px-2 lg:px-0 md:justify-start justify-between overflow-x-auto">
          {tabs.map((tab) => (
            <a
              role="tab"
              key={tab.label}
              href={tab.href}
              className={`px-3 pt-2.5 text-nowrap whitespace-nowrap text-sm md:text-base pb-2 border hover:border-black rounded-full ${
                tab.selected ? "bg-white border-black" : "border-transparent"
              }`}
              aria-selected={tab.selected}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </header>
      <main className="lg:px-16 lg:pb-16 lg:pt-0 lg:mt-4 p-6 overflow-y-auto">
        <div className="flex flex-col lg:gap-8 gap-4">
          {ready &&
            (settings?.show_on_checkout ? (
              <div className="">
                <div className="flex flex-col items-start gap-2">
                  <SettingBlock last={false}>
                    <div className="">
                      <h4 className="sm:text-xl text-base">
                        Show Dynamic Social Proof on Checkout
                      </h4>
                      <p className="sm:text-[0.97rem] text-sm pt-3">
                        We'll show a real-time feed of purchase activity and
                        customer results on your sales page.
                      </p>
                    </div>
                    <div>
                      <Switch
                        label="Show on Checkout"
                        toggled={!!edited?.show_on_checkout}
                        handleToggle={(val) =>
                          edited &&
                          setEdited({ ...edited, show_on_checkout: val })
                        }
                      />
                    </div>
                  </SettingBlock>
                  <SettingBlock last={false}>
                    <div className="">
                      <h4 className="sm:text-xl text-base">
                        Hide Customer Names
                      </h4>
                      <p className="sm:text-[0.97rem] text-sm pt-3">
                        We'll refer to your customers as "Someone" instead of
                        their first name and last initial.
                      </p>
                    </div>
                    <div>
                      <Switch
                        label="Hide Names"
                        toggled={!!edited?.hide_names}
                        handleToggle={(val) =>
                          edited && setEdited({ ...edited, hide_names: val })
                        }
                      />
                    </div>
                  </SettingBlock>
                  <SettingBlock last={false}>
                    <div className="">
                      <h4 className="sm:text-xl text-base">Custom Results</h4>
                      <p className="sm:text-[0.97rem] text-sm pt-3">
                        Share your customers' results by creating custom events
                        they can report
                      </p>
                      {events?.length > 0 && (
                        <div className="flex flex-col gap-0.5 pt-4">
                          <div className="text-sm font-medium">
                            Submission URL
                          </div>
                          <input
                            type="text"
                            readOnly
                            className="w-full py-2 px-4 text-sm border rounded-full"
                            value={`https://gr.matterloop.com/share-results/1`}
                          />
                        </div>
                      )}
                    </div>
                    <div className="">
                      <ProductProofActionEditor
                        addEvent={addEvent}
                        setValue={setEventValue}
                        events={events}
                      />
                    </div>
                  </SettingBlock>
                  <SettingBlock last={false}>
                    <div className="">
                      <h4 className="sm:text-xl text-base">
                        Send Custom Results
                      </h4>
                      <p className="sm:text-[0.97rem] text-sm pt-3 pb-4">
                        Use your API key to automate sending customer results
                        via Zapier, Slack, Discord or our API.
                      </p>
                      <a
                        href="https://app.gumroad.com/api"
                        target="_blank"
                        className="underline"
                      >
                        Learn more
                      </a>
                    </div>
                    <div className="">
                      <div
                        className={`bg-white rounded-md lg:w-7/12 w-full border ${
                          settings?.key
                            ? "border-black/40 border-solid"
                            : "border-black border-dashed"
                        }`}
                      >
                        <div className="p-4 text-center">
                          {settings?.key && (
                            <input
                              type="text"
                              value={settings?.key || ""}
                              readOnly
                              className="p-3 w-full mb-3 bg-white border border-black rounded-md"
                            />
                          )}
                          <PopButton
                            className="w-full"
                            onClick={() => generateKey()}
                          >
                            {settings?.key
                              ? "Reset API Key"
                              : "Generate API Key"}
                          </PopButton>
                        </div>
                      </div>
                    </div>
                  </SettingBlock>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-black lg:mt-12 mt-0 rounded-md bg-white p-8">
                <img
                  src="https://assets.gumroad.com/packs/static/c21da069c635745d0f80.png"
                  alt="Dynamic Social Proof"
                />
                <div className="flex flex-col items-center gap-2 pt-6">
                  <h3 className="text-2xl text-center">Dynamic Social Proof</h3>
                  <p className="text-sm md:w-6/12 w-full text-center mx-auto mb-2">
                    Show potential customers who else is purchasing your product
                    and getting results, right on your checkout page.
                  </p>
                  <PopButton
                    onClick={() => {
                      save({
                        show_on_checkout: true,
                      });
                    }}
                    label="Turn on Dynamic Social Proof"
                  >
                    Turn On
                  </PopButton>
                </div>
              </div>
            ))}
        </div>
      </main>
    </AdminLayout>
  );
};

export function SettingBlock({ children, last }) {
  return (
    <section
      className={`grid lg:grid-cols-[25%_1fr] md:grid-cols-[50%_1fr] md:grid-rows-1 grid-rows-[auto_auto] grid-cols-1 ${
        last ? "" : "border-b border-black/20"
      }  lg:gap-16 pt-12  gap-5 pb-10 w-full`}
    >
      {children}
    </section>
  );
}
