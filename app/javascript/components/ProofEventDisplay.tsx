import React, { useState, useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { createConsumer } from "@rails/actioncable";
import random from "lodash.random";
import shuffle from "lodash.shuffle";
import { intlFormatDistance } from "date-fns";
import { relativeTime } from "../util/relativeTime";
interface Props {
  productId: number;
  productTitle: string;
}

const MIN_NEXT_TIME = 7500;
const MAX_NEXT_TIME = 12000;
const MIN_VISIBLE_TIME = 3000;
// const MIN_VISIBLE_TIME = 1500;
// const MAX_VISIBLE_TIME = 1500;
const actionConsumer = createConsumer();

function fill(str, fills) {
  let filledStr = str;
  Object.entries(fills).forEach(([key, value]) => {
    filledStr = filledStr.replaceAll(`%${key}%`, value);
  });
  return filledStr;
}

interface Event {
  id: number;
  username: string;
  body: string;
  event_at: string;
  location: string;
  image: string;
}

export function ProofEventDisplay({ productId, productTitle }: Props) {
  const [queue, setQueue] = useState<Array<Event>>([]);
  const [used, setUsed] = useState<Array<Event>>([]);
  const [active, setActive] = useState<Event | null>(null);
  const [lastNew, setLastNew] = useState(0);
  const [status, setStatus] = useState({ status: "not-loaded" });
  const showTimout = useRef(0);
  useEffect(() => {
    let subscription;
    async function initializeEvents() {
      // Receive most recent historical events and show those
      const res = await fetch(`/api/v1/proof_events?product_id=${productId}`);
      const json = await res.json();
      console.log("initialize events", json);
      setQueue(() => [...json]);

      // Begin watching for new events
      subscription = startWatchingForEvents();
    }
    initializeEvents();
    return () => {
      // Clean up the subscription when the component is unmounted
      if (subscription) subscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (queue.length) {
      setTimeout(() => showNext(), 10);
    }
  }, [queue]);
  function startWatchingForEvents() {
    return actionConsumer.subscriptions.create(
      {
        channel: "ProofEventsChannel",
        product_id: productId,
      },
      {
        initialized() {},
        received(data) {
          console.log("received", data, queue);
          setQueue([data, ...queue]);
        },
      }
    );
  }
  async function showNext() {
    const now = +new Date();
    if (now - lastNew > MIN_VISIBLE_TIME) {
      clearTimeout(showTimout.current);

      if (queue.length) {
        const [next, ...rest] = queue;

        // If the event has an image, preload it and then show it
        if (next.image) {
          const img = new Image();
          img.src = next.image;
          img.onload = () => {
            handleSetNext({ next, now, newQueue: rest });
          };

          // Otherwise show it immediately
        } else {
          handleSetNext({ next, now, newQueue: rest });
        }

        // If there are no more events, shuffle the used events and show them again
      } else {
        setQueue(shuffle([...used]));
        setUsed([]);
      }
    }
  }
  function handleSetNext({
    next,
    now,
    newQueue,
  }: {
    next: Event;
    now: number;
    newQueue: Event[];
  }) {
    setActive(next);
    setLastNew(now);
    setQueue([...newQueue]);
    setUsed([...used, next]);
    showTimout.current = setTimeout(() => {
      setQueue((currVal) => [...currVal]);
    }, random(MIN_NEXT_TIME, MAX_NEXT_TIME));
  }
  return (
    <div className="border-t border-black py-6 px-4 overflow-hidden h-[5.15rem]">
      <TransitionGroup className="stack-grid">
        {active && (
          <CSSTransition
            key={active.id}
            timeout={1000}
            classNames={used.length > 1 ? "slide" : "slide-out"}
            unmountOnExit
          >
            <ProofEventCheckoutRow event={active} productTitle={productTitle} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
}

function ProofEventCheckoutRow({
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
        {fill(event.body, {
          user: event.username || "Someone",
          product: "",
        })}{" "}
        <span className="text-black/80 text-xs">
          {relativeTime(event.event_at)}, {event.location}
        </span>
      </div>
    </div>
  );
}
