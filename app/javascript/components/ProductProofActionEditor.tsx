import React, { useEffect, useState } from "react";
import { PopButton } from "./ui/PopButton";
import { Input } from "./ui/Input";
import { ProductProofEvent } from "../types";

export default ({
  setValue,
  events,
  addEvent,
}: {
  events: ProductProofEvent[];
  setValue: (inx: number, key: string, value: string) => void;
  addEvent: () => void;
}) => {
  return (
    <div
      className={`bg-white rounded-md lg:w-7/12 w-full border ${
        events.length
          ? "border-black/30 border-solid"
          : "border-black border-dashed"
      }`}
    >
      <div className="p-4 text-center">
        {events.length === 0 ? (
          <div className="text-lg pb-3">Add Your First Event</div>
        ) : (
          events.map((event, inx) => (
            <ProductProofEventForm
              key={event.id || inx}
              events={events}
              inx={inx}
              setValue={setValue}
            />
          ))
        )}
        <PopButton className="w-full" onClick={() => addEvent()}>
          Add Event
        </PopButton>
      </div>
    </div>
  );
};

function ProductProofEventForm({
  events,
  inx,
  setValue,
}: {
  events: ProductProofEvent[];
  inx: number;
  setValue: (inx: number, key: string, value: string) => void;
}) {
  return (
    <form className="flex flex-col gap-3 pb-6 mb-6 border-b border-black/30">
      <section className="flex flex-col items-start">
        <label htmlFor="label" className="pb-0.5">
          Result Name
        </label>
        <Input
          type="text"
          id="label"
          placeholder="eg: Lost Weight, Made a Sale, Learned a Song"
          value={events[inx].label}
          className="w-full"
          onChange={(e) => setValue(inx, "label", e.target.value)}
        />
      </section>
      <section className="flex flex-col items-start">
        <label htmlFor="message" className="pb-0.5">
          Message
        </label>
        <Input
          type="text"
          id="message"
          placeholder="%user% lost %value% pounds!"
          value={events[inx].message}
          className="w-full"
          onChange={(e) => setValue(inx, "message", e.target.value)}
        />
        <p className="text-sm text-left pt-1 text-black/70">
          This is the message that will appear in the feed.
        </p>
      </section>
      <section className="flex flex-col items-start">
        <label htmlFor="valueLabel" className="pb-0.5">
          Value Label (Optional)
        </label>
        <Input
          type="text"
          id="valueLabel"
          value={events[inx].valueLabel}
          className="w-full"
          placeholder="How many pounds did you lose?"
          onChange={(e) => setValue(inx, "valueLabel", e.target.value)}
        />
        <p className="text-sm text-left pt-1 text-black/70">
          Add this if you want your customer to submit a value.
        </p>
      </section>
    </form>
  );
}
