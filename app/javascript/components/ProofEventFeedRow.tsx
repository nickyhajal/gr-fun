import React from "react";
import type { Event, Product } from "../types";
import { relativeTime } from "../util/relativeTime";
import { Coin } from "../svg/Coin";
import Markdown from "react-markdown";
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

export function ProofEventFeedRow({
  event,
  product,
}: {
  event: Event;
  product: Product;
}) {
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  return (
    <div className="bg-canvas p-3 rounded grid grid-cols-[2rem_1fr] items-center gap-3 text-sm font-medium leading-snug">
      {event.kind === "stat" ? (
        <Coin className="w-8 h-8 skew-x-3" />
      ) : (
        event.image && (
          <img
            src={`${event.image}${event.id}`}
            alt={`${event.username} avatar`}
            className="w-8 h-8 rounded-full"
          />
        )
      )}

      <div className="proofevent-content flex-grow w-full leading-tight">
        <Markdown className="inline">
          {fill(getMessage(event), {
            user: event.username || "Someone",
            product: "",
            value: event.value,
            stat: `**${product?.stats?.[
              `${event.event}Sales`
            ]?.toLocaleString()}**`,
          })}
        </Markdown>
        {event.event_at && (
          <>
            {" "}
            <span className="text-black/80 text-xs">
              {relativeTime(event.event_at).trim()}, {event.location}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
