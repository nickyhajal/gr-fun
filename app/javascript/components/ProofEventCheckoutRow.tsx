import React from "react";
import type { Event } from "../types";
import { relativeTime } from "../util/relativeTime";
function getMessage(event: Event) {
  if (event.event === "purchase") {
    return "%user% purchased this product";
  }
  return event.body;
}
function fill(str, fills) {
  let filledStr = str;
  Object.entries(fills).forEach(([key, value]) => {
    filledStr = filledStr.replaceAll(`%${key}%`, value);
  });
  return filledStr;
}

export function ProofEventCheckoutRow({
  event,
  productTitle,
}: {
  event: any;
  productTitle: string;
}) {
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  return (
    <div className="grid grid-cols-[2rem_1fr] items-center gap-3 text-sm font-medium leading-snug">
      {event.image && (
        <img
          src={`${event.image}?${event.username}`}
          alt={`${event.username} avatar`}
          className="w-8 h-8 rounded-full"
        />
      )}
      <div className="flex-grow w-full leading-tight">
        {fill(getMessage(event), {
          user: event.username || "Someone",
          product: "",
        })}{" "}
        <span className="text-black/80 text-xs">
          {relativeTime(event.event_at).trim()}, {event.location}
        </span>
      </div>
    </div>
  );
}
