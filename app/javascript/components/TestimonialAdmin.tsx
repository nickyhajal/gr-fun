import React, { useEffect, useState } from "react";
import { AdminLayout } from "./layouts/AdminLayout";
import { PopButton } from "./ui/PopButton";
import { Switch } from "./ui/Switch";
import ProductProofActionEditor from "./ProductProofActionEditor";
import {
  ProductProofEvent,
  Settings,
  Testimonial,
  TestimonialSettings,
} from "../types";
import toast from "react-hot-toast";
import { post } from "../util/loaders/post";
import { get } from "../util/loaders/get";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { EditableTestimonial } from "./EditableTestimonial";

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
    href: "/admin",
    selected: false,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    selected: true,
  },
];

export default () => {
  const productId = "1";
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState<TestimonialSettings | null>({
    show_testimonials: false,
    title: "",
    body: "",
    product_id: 1,
  });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [edited, setEdited] = useState<Partial<TestimonialSettings> | null>({
    show_testimonials: false,
    title: "",
    body: "",
    product_id: 1,
  });
  useEffect(() => {
    loadSettings();
  }, []);
  useEffect(() => {
    loadTestimonials();
  }, []);
  async function loadTestimonials() {
    const json = await get(`testimonials?product_id=${productId}&all=true`);
    setTestimonials(json);
  }
  async function loadSettings() {
    try {
      const json = await get(
        `testimonial_settings?product_id=${productId}&secure=true`
      );
      if (json) {
        setSettings((curr) => ({ ...curr, ...json }));
        setEdited((curr) => ({ ...curr, ...json }));
      }
      setReady(true);
    } catch (e) {
      console.error(e);
    }
  }
  async function save(newSettings: Partial<TestimonialSettings> = {}) {
    try {
      const json = await post("testimonial_settings/upsert", {
        product_id: productId,
        ...edited,
        ...newSettings,
      });
      if (json) {
        setSettings((curr) => ({ ...curr, ...json }));
        setEdited((curr) => ({ ...curr, ...json }));
      }
      toast.success("Changes saved!");
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <AdminLayout>
      <header className="sticky z-40  top-0 bg-canvas lg:py-8 lg:px-16 px-0 py-4 border-b border-black grid grid-cols-[1fr_auto] items-center gap-0 lg:gap-4">
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
            (settings?.show_testimonials ? (
              <div className="">
                <div className="flex flex-col items-start gap-2  ">
                  <SettingBlock last={false}>
                    <div className="">
                      <h4 className="sm:text-xl text-base">
                        Show Testimonials on Checkout Page
                      </h4>
                      <p className="sm:text-[0.97rem] text-sm pt-3">
                        Collect and show testimonials on your checkout page so
                        potential customers can hear from a variety of
                        perspectives.
                      </p>
                    </div>
                    <div>
                      <Switch
                        label="Show Testimonials"
                        toggled={!!edited?.show_testimonials}
                        handleToggle={(val) =>
                          edited &&
                          setEdited({ ...edited, show_testimonials: val })
                        }
                      />
                    </div>
                  </SettingBlock>
                  <SettingBlock last={false}>
                    <div className="">
                      <h4 className="sm:text-xl text-base">
                        Testimonial Submission Page
                      </h4>
                      <p className="sm:text-[0.97rem] text-sm pt-3">
                        Specify a few details about how you want to ask
                        customers for testimonials.
                      </p>
                      <div className="flex flex-col gap-0.5 pt-8">
                        <div className="text-sm font-medium">
                          Testimonial Submission URL
                        </div>
                        <input
                          type="text"
                          readOnly
                          onMouseOver={(e) => e.target.select()}
                          onMouseOut={(e) =>
                            (e.target.selectionStart = e.target.selectionEnd)
                          }
                          className="w-full py-2 px-4 text-sm border rounded-full focus:ring-0 focus:border-black"
                          value={`https://gr.matterloop.com/share-testimonial/1`}
                        />
                      </div>
                    </div>
                    <fieldset>
                      <div className="flex flex-col gap-0.5 pb-4">
                        <label
                          htmlFor="titleInp"
                          className="text-lg font-medium pb-0.5"
                        >
                          Main Title
                        </label>
                        <Input
                          id="titleInp"
                          value={edited?.title}
                          onChange={(e) =>
                            edited &&
                            setEdited({ ...edited, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label
                          htmlFor="bodyInp"
                          className="text-lg font-medium pb-0.5"
                        >
                          Explainer Copy
                        </label>
                        <Textarea
                          id="bodyInp"
                          value={edited?.body}
                          onChange={(e) =>
                            edited &&
                            setEdited({ ...edited, body: e.target.value })
                          }
                        />
                      </div>
                    </fieldset>
                  </SettingBlock>
                  <SettingBlock last={true}>
                    <div className="">
                      <h4 className="sm:text-xl text-base">
                        Manage Testimonials
                      </h4>
                    </div>
                    <div>
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                        {testimonials.map((testimonial) => (
                          <EditableTestimonial
                            key={testimonial.id}
                            testimonial={testimonial}
                          />
                        ))}
                      </div>
                    </div>
                  </SettingBlock>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-black lg:mt-12 mt-0 rounded-md bg-white p-8">
                <img
                  src="https://assets.gumroad.com/assets/placeholders/published_posts-093e1b2bf89a242d91f41110a981eeeae49d7cf49cc0b07b18eb7577630084ba.png"
                  alt="Testimonials"
                />
                <div className="flex flex-col items-center gap-2 pt-6">
                  <h3 className="text-2xl text-center">Testimonials</h3>
                  <p className="text-sm md:w-6/12 w-full text-center mx-auto mb-2">
                    Use testimonials to help potential customers build
                    confidence in your product.
                  </p>
                  <PopButton
                    onClick={() => {
                      save({
                        show_testimonials: true,
                      });
                    }}
                    label="Start Collection Testimonials"
                  >
                    Start Collecting Testimonials
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
      }  lg:gap-16 lg:pt-12 pt-6  gap-5 pb-10 w-full`}
    >
      {children}
    </section>
  );
}
