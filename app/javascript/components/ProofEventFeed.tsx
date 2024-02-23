import React, { useState, useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { createConsumer } from "@rails/actioncable";
import random from "lodash.random";
import shuffle from "lodash.shuffle";
import type { Event, Product } from "../types";
import { ProofEventCheckoutRow } from "./ProofEventCheckoutRow";
import { ProofEventFeedRow } from "./ProofEventFeedRow";
interface Props {
  product: Product;
}

const actionConsumer = createConsumer();

export function ProofEventFeed({ product }: Props) {
  const [queue, setQueue] = useState<Array<Event>>([]);
  useEffect(() => {
    let subscription;
    async function initializeEvents() {
      try {
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
  function startWatchingForEvents() {
    return actionConsumer.subscriptions.create(
      {
        channel: "ProofEventsChannel",
        product_id: product.id,
      },
      {
        initialized() {},
        received(data) {
          setQueue((curr) => [data, ...curr]);
        },
      }
    );
  }

  return (
    <div
      id="proofEventDisplay"
      className=" py-3 px-0 overflow-hidden flex flex-col gap-2"
    >
      {queue
        .filter((event) => event.kind === "custom")
        .slice(0, 10)
        .map((event, i) => (
          <ProofEventFeedRow
            key={event.id || i}
            event={event}
            product={product}
          />
        ))}
    </div>
  );
}
