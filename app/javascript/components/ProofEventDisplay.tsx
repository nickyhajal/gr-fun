import React, { useState, useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { createConsumer } from "@rails/actioncable";
import random from "lodash.random";
import shuffle from "lodash.shuffle";
import type { Event, Product } from "../types";
import { ProofEventCheckoutRow } from "./ProofEventCheckoutRow";
interface Props {
  product: Product;
}

const MIN_NEXT_TIME = 6000;
const MAX_NEXT_TIME = 12000;
const MIN_VISIBLE_TIME = 3000;
// const MIN_VISIBLE_TIME = 1500;
// const MAX_VISIBLE_TIME = 1500;
const actionConsumer = createConsumer();

const statEvents = [
  { body: "%stat% sales today", kind: "stat", event: "daily" },
  { body: "%stat% sales this week", kind: "stat", event: "weekly" },
  { body: "%stat% sales this month", kind: "stat", event: "monthly" },
  { body: "%stat% total sales", kind: "stat", event: "total" },
];

export function ProofEventDisplay({ product }: Props) {
  const [queue, setQueue] = useState<Array<Event>>([]);
  const [used, setUsed] = useState<Array<Event>>([]);
  const [active, setActive] = useState<Event | null>(null);
  const [lastNew, setLastNew] = useState(0);
  const showTimout = useRef(0);
  useEffect(() => {
    let subscription;
    async function initializeEvents() {
      try {
        // Receive most recent historical events and show them
        const res = await fetch(
          `/api/v1/proof_events?product_id=${product.id}`
        );
        const json = await res.json();

        // Begin watching for new events
        subscription = startWatchingForEvents();
        setQueue(() => [...json]);
      } catch (e) {
        console.log("Error fetching events");
      }
    }
    initializeEvents();
    return () => {
      // Clean up the subscription when the component is unmounted
      if (subscription) subscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (queue.length) {
      setTimeout(() => showNextEvent(), 10);
    }
  }, [queue]);
  function startWatchingForEvents() {
    return actionConsumer.subscriptions.create(
      {
        channel: "ProofEventsChannel",
        product_id: product.id,
      },
      {
        initialized() {},
        received(data) {
          setQueue([data, ...queue]);
        },
      }
    );
  }

  // Starts the process of showing the next event
  async function showNextEvent() {
    const now = +new Date();
    console.log("show next");

    // If enough time has passed since the last event, show the next one
    // otherwise, wait for the next timeout
    if (now - lastNew > MIN_VISIBLE_TIME) {
      clearTimeout(showTimout.current);
      if (queue.length % 3 === 0 && active?.kind !== "stat") {
        handleSetNext({
          next: { ...statEvents[random(0, statEvents.length - 1)] },
          now,
          newQueue: queue,
        });
      } else if (queue.length) {
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
    } else {
      showTimout.current = setTimeout(() => {
        setQueue((currVal) => [...currVal]);
      }, random(MIN_NEXT_TIME, MAX_NEXT_TIME));
    }
  }

  // Update state to show the next event
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
    if (next.kind !== "stat") {
      setQueue([...newQueue]);
      setUsed([...used, next]);
    }
    console.log("hey");
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
            <ProofEventCheckoutRow event={active} product={product} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
}
