import React from "react";
import Markdown from "react-markdown";
import { ProofEventDisplay } from "../ProofEventDisplay";
import { TestimonialsWidget } from "../TestimonialsWidget";

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

export function Checkout({ product }: Props) {
  const {
    id,
    banner,
    title,
    price,
    creator,
    numRatings,
    rating,
    numSales,
    offer,
    description,
    ratingDistributions,
    showProofEvents,
  } = product;
  let creatorName = `${creator.firstName} ${creator.lastName}`;
  const ratings = ratingDistributions.reverse();
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
          <h1 className="text-4xl">{title}</h1>
        </header>
        <section className="grid grid-cols-[auto_1fr] gap-[0.0625rem] md:grid-cols-[auto_auto_1fr]  border-b border-black">
          <div className="flex items-center px-6 py-4 outline outline-[0.0625rem] outline-offset-0">
            <div className="inline-grid  relative">
              <div className="price">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumSignificantDigits: 1,
                }).format(price / 100)}
              </div>
            </div>
          </div>
          <div className="flex items-center px-6 py-4 gap-2 outline outline-[0.0625rem] outline-offset-0">
            <img
              src={creator.photo}
              alt={creatorName}
              className="w-6 h-6 rounded-full"
            />
            <div className="underline">{creatorName}</div>
          </div>
          <div className="flex items-center px-6 py-4 gap-1 w-full md:col-span-1 col-span-2 outline outline-[0.0625rem] outline-offset-0">
            <div className="flex gap-1">
              <div className="icon icon-solid-star"></div>
              <div className="icon icon-solid-star"></div>
              <div className="icon icon-solid-star"></div>
              <div className="icon icon-solid-star"></div>
              <div className="icon icon-solid-star"></div>
            </div>
            <div>{numRatings.toLocaleString()} ratings</div>
          </div>
        </section>
        <section className="markdown px-6 py-8">
          {description && <Markdown>{description}</Markdown>}
        </section>
        <section className="markdown px-6 py-8">
          <TestimonialsWidget product={product} />
        </section>
      </section>

      <section>
        <section className="border-b border-black p-4">
          <button className="bg-accent py-3 text-center text-white w-full border border-black rounded-[4px]">
            Add to Cart
          </button>
          {/* <div className="w-full p-3 border mt-4 rounded-[4px] flex gap-2 bg-blue-100/70 border-blue-700/40 text-sm">
            <div
              style={{ color: "rgb(var(--info))" }}
              className="icon icon-info-circle-fill"
            ></div>
            <div>
              <strong>{numSales.toLocaleString()}</strong> sales
            </div>
          </div> */}
          <a
            href="/"
            className="underline text-sm block bg-transparent py-3 my-1 text-center w-full "
          >
            30-day money back guarantee
          </a>
          <div className="p-4 text-sm border border-black rounded-[4px]">
            Pay once, member forever. No recurring fees.
          </div>
        </section>
        {showProofEvents && <ProofEventDisplay product={product} />}
        <section className="p-4 pt-6 pb-8">
          <header className="flex justify-between items-center h-6 mb-4">
            <h4 className="text-2xl">Ratings</h4>
            <div className="flex items-center px-6 py-4 gap-1">
              <div className="icon icon-solid-star mb-0.5"></div>
              <div>{rating}</div>
              <div className="">({numRatings.toLocaleString()} ratings)</div>
            </div>
          </header>
          <div className="flex flex-col gap-3">
            {ratings?.map((percent, i) => (
              <div
                className="grid grid-cols-[auto_1fr_auto] gap-3 text-sm"
                key={`stars-${i}`}
              >
                <div>{5 - i} stars</div>
                <div className="w-full h-5 border border-black rounded overflow-hidden">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <div className="w-8 ">{percent}%</div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </article>
  );
}
