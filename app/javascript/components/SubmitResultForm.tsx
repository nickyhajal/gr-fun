import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { loadEvents } from "../util/loaders/loadEvents";
import { Select } from "./ui/Select";
import { PopButton } from "./ui/PopButton";
import { Input } from "./ui/Input";
import { ProofEventFeed } from "./ProofEventFeed";
import { ProductProofEvent, Option } from "../types";
import { get } from "../util/loaders/get";

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

export function SubmitResultForm({ product }: Props) {
  const [events, setEvents] = useState<ProductProofEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ProductProofEvent | null>(
    null
  );
  const [userValue, setUserValue] = useState<string>("");
  const [eventOptions, setEventOptions] = useState<Option[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [testimonialsOn, setTestimonialsOn] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { banner, title } = product;
  useEffect(() => {
    async function init() {
      const res = await loadEvents({ productId: product.id });
      const testSettings = await get(
        `testimonial_settings?product_id=${product.id}`
      );
      if (testSettings?.show_testimonials) {
        setTestimonialsOn(true);
      }
      if (res.length) {
        setEvents((curr) => res);
        setEventOptions((curr) =>
          res.map((event) => ({ label: event.label, value: event.id }))
        );
        setSelectedEventId(res[0].id);
      }
    }
    init();
  }, []);
  useEffect(() => {
    setSelectedEvent(
      (curr) =>
        events.find(({ id }) => (!id ? null : +id === +selectedEventId)) || null
    );
  }, [selectedEventId]);
  useEffect(() => {
    setError("");
  }, [userValue]);
  async function submit(e: SubmitEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (selectedEvent?.valueLabel && !userValue) {
      return setError("Make sure to enter a value here");
    }
    try {
      const res = await fetch("/api/v1/proof_event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          product_id: selectedEvent?.product_id,
          product_proof_event_id: selectedEvent?.id,
          value: userValue,
        }),
      });
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
            <>
              <div className="md:p-8 p-6 md:m-6 text-center md:text-left lg:mb-32 bg-[#20a094] text-white rounded shadow-[0.5rem_0.5rem_0_#0e4e48]">
                <div className="text-xl leading-snug md:text-2xl font-semibold mb-3 md:mb-0">
                  Thanks for sharing your result!
                </div>
                <div className="text-lg leading-snug">
                  Congratulations on your success 🎉
                </div>
              </div>
              {testimonialsOn && (
                <div className="w-full">
                  <PopButton
                    className="mx-auto block text-center w-96 bg-white relative  -top-16  text-sm hover:bg-pink hover:text-black"
                    label="Leave a testimonial"
                    href="/share-testimonial/1"
                  >
                    Want to leave a testimonial for us?
                  </PopButton>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="md:w-9/12 w-full">
                <h2 className="md:text-3xl text-xl truncate mb-0">
                  Share a Result
                </h2>
                <p className="md:text-xl text-lg leading-relaxed -mt-3">
                  Have you had success with Small Bets? Share it below! You'll
                  remind others they can do it too.
                </p>
              </div>
              <div className="w-full mx-auto border-b border-black/30 my-6"></div>

              <form
                className="md:w-7/12 w-full flex flex-col gap-4"
                onSubmit={(e) => submit(e)}
              >
                <fieldset>
                  <label
                    htmlFor="eventInp"
                    className="text-lg font-medium pb-0.5"
                  >
                    What did you accomplish?
                  </label>
                  <Select
                    id="eventInp"
                    options={eventOptions}
                    value={selectedEventId}
                    label="Available Results"
                    onChange={(e) => setSelectedEventId(e.target.value)}
                  />
                </fieldset>
                {selectedEvent?.valueLabel && (
                  <fieldset className="flex flex-col gap-0">
                    <label
                      htmlFor="valueInp"
                      className="text-lg font-medium pb-0.5"
                    >
                      {selectedEvent.valueLabel}
                    </label>
                    <Input
                      id="valueInp"
                      value={userValue}
                      label={selectedEvent.valueLabel}
                      onChange={(e) => setUserValue(e.target.value)}
                    />
                    {error && (
                      <div className="text-red-800/80 font-medium py-2 px-4 mt-3 bg-red-50 rounded-md">
                        {error}
                      </div>
                    )}
                  </fieldset>
                )}
                <PopButton
                  className="bg-accent text-white"
                  label="Share Result"
                >
                  Share Result
                </PopButton>
              </form>
            </>
          )}
        </section>
      </section>

      <section>
        <section className=" p-4">
          <div className="text-base font-semibold">Recent Results</div>
          <ProofEventFeed product={product} />
        </section>
      </section>
    </article>
  );
}
