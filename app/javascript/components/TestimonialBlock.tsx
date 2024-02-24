import React, { useState } from "react";
import { Testimonial } from "../types";
interface Props {
  testimonial: Testimonial;
}
export function TestimonialBlock({ testimonial }: Props) {
  return (
    <div className=" p-6 rounded-md flex flex-col justify-between border border-black shadow-[0.1rem_0.1rem_0_#000]">
      <div className="text-base mb-2 font-medium">{testimonial.body}</div>
      <div className="flex justify-between items-center">
        <div className="text-[0.8rem] flex gap-2 items-center mt-4">
          <img
            src={`https://i.pravatar.cc/64?u=${testimonial.id}`}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col leading-tight">
            <span className="truncate w-full font-semibold">
              {testimonial.user_name}
            </span>
            <span className="truncate w-32">{testimonial.user_title}</span>
          </div>
        </div>
      </div>
    </div>
  );
  // {[testimonial.user_name, testimonial.user_title]
  //   .filter((val) => val)
  //   .join(", ")}
}
