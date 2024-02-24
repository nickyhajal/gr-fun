import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { loadEvents } from "../util/loaders/loadEvents";
import { get } from "../util/loaders/get";
import { Select } from "./ui/Select";
import { PopButton } from "./ui/PopButton";
import { Input } from "./ui/Input";
import { ProofEventFeed } from "./ProofEventFeed";
import {
  ProductProofEvent,
  Option,
  Testimonial,
  TestimonialSettings,
} from "../types";
import { Textarea } from "./ui/Textarea";
import { post } from "../util/loaders/post";
import { TestimonialBlock } from "./TestimonialBlock";

interface Props {
  product: Product;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  banner: string;
  description: string;
  creator: { firstName: string; lastName: string };
  rating: number;
  numRatings: number;
  numSales: number;
  showProofEvents: boolean;
  ratingDistributions: number[];
  offer: { percent: number; title: string };
}

export function SubmitTestimonialForm({ product }: Props) {
  const [testimonial, setTestimonial] = useState<Testimonial>({
    user_id: 1,
    user_name: "",
    user_title: "",
    body: "",
    product_id: 1,
  });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [settings, setSettings] = useState<TestimonialSettings | null>({
    title: "",
    body: "",
    show_testimonials: true,
    product_id: 1,
  });
  useEffect(() => {
    async function init() {
      const resTestimonials = await get(
        `testimonials?product_id=${product.id}`
      );
      const resSettings = await get(
        `testimonial_settings?product_id=${product.id}`
      );
      setTestimonials(resTestimonials);
      setSettings(resSettings);
    }
    init();
  }, []);
  useEffect(() => {
    setError("");
  }, [testimonial]);
  const { banner, title } = product;
  async function submit(e: SubmitEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (!testimonial?.user_name.length) {
      return setError("Make sure to enter your name");
    }
    if (testimonial?.body.length < 10) {
      return setError("Make sure to enter a testimonial");
    }
    try {
      const res = await post("testimonial/create", { ...testimonial });
      setStatus("success");
    } catch (e) {
      setError(e.message);
      setTimeout(() => setError(""), 3000);
      console.error(e);
    }
  }
  return (
    <article className="max-w-6xl mx-auto border border-black grid lg:grid-cols-[2fr_1fr] grid-cols-1">
      {banner && (
        <img
          src={banner}
          alt={`${title} banner`}
          className="w-full lg:col-span-2 border-b border-black"
        />
      )}

      <section className="lg:border-r border-black">
        <header className="p-6 border-b border-black">
          <h1 className="md:text-3xl text-xl truncate max-w-[44rem]">
            {title}
          </h1>
        </header>
        <section className="markdown px-6 py-8">
          {status === "success" ? (
            <div className="md:p-8 p-6 md:m-6 text-center md:text-left lg:mb-32 bg-[#20a094] text-white rounded shadow-[0.5rem_0.5rem_0_#0e4e48]">
              <div className="text-xl leading-snug md:text-2xl font-semibold mb-3 md:mb-0">
                Submitted successfully 🎉
              </div>
              <div className="text-lg leading-snug">
                Thank you for your testimonial!
              </div>
            </div>
          ) : (
            <>
              <div className="md:w-9/12 w-full">
                <h2 className="md:text-3xl text-xl truncate mb-0">
                  {settings?.title.replaceAll("%product%", product.title)}
                </h2>
                <p className="md:text-xl text-lg leading-relaxed -mt-3">
                  {settings?.body.replaceAll("%product%", product.title)}
                </p>
              </div>
              <div className="w-full mx-auto border-b border-black/30 my-6"></div>
              <form
                className="md:w-7/12 w-full flex flex-col gap-4"
                onSubmit={(e) => submit(e)}
              >
                <fieldset>
                  <div className="flex justify-between">
                    <label
                      htmlFor="bodyInp"
                      className="text-lg font-medium pb-0.5"
                    >
                      Your Testimonial
                    </label>
                    <div className="text-sm relative top-2 text-black/40">
                      {testimonial.body.length}/400
                    </div>
                  </div>
                  <Textarea
                    id="bodyInp"
                    className="block w-full"
                    value={testimonial.body}
                    onChange={(e) => {
                      if (e.target.value.length > 400) return;
                      setTestimonial((curr) => ({
                        ...curr,
                        body: e.target.value,
                      }));
                    }}
                  />
                </fieldset>
                <fieldset className="flex flex-col gap-0">
                  <label
                    htmlFor="nameInp"
                    className="text-lg font-medium pb-0.5"
                  >
                    Your name as it will appear publicly
                  </label>
                  <Input
                    id="nameInp"
                    value={testimonial.user_name}
                    onChange={(e) =>
                      setTestimonial((curr) => ({
                        ...curr,
                        user_name: e.target.value,
                      }))
                    }
                  />
                </fieldset>
                <fieldset className="flex flex-col gap-0">
                  <label
                    htmlFor="titleInp"
                    className="text-lg font-medium pb-0.5"
                  >
                    Your title, will appear after your name (Optional)
                  </label>
                  <Input
                    id="titleInp"
                    value={testimonial.user_title}
                    onChange={(e) =>
                      setTestimonial((curr) => ({
                        ...curr,
                        user_title: e.target.value,
                      }))
                    }
                  />
                </fieldset>
                {error && (
                  <div className="text-red-800/80 font-medium py-2 px-4 mt-3 bg-red-50 rounded-md">
                    {error}
                  </div>
                )}
                <PopButton
                  className="bg-accent text-white"
                  label="Send Testimonial"
                >
                  Send Testimonial
                </PopButton>
              </form>
            </>
          )}
        </section>
      </section>

      <section>
        <section className=" p-4">
          <div className="text-base font-semibold mb-5 mt-6">
            Recent Testimonials
          </div>
          <div className="flex flex-col gap-2">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialBlock key={t.id} testimonial={t} />
            ))}
          </div>
        </section>
      </section>
    </article>
  );
}
