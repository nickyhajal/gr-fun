import React, { useEffect, useState } from "react";
import { Product, Testimonial } from "../types";
import { get } from "../util/loaders/get";
import { TestimonialBlock } from "./TestimonialBlock";

export function TestimonialsWidget({ product }: { product: Product }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useEffect(() => {
    async function init() {
      const settings = await get(
        `testimonial_settings?product_id=${product.id}`
      );
      if (settings.show_testimonials) {
        const submissions = await get(`testimonials?product_id=${product.id}`);
        setTestimonials(submissions);
      }
    }
    init();
  }, []);
  return (
    testimonials.length > 0 && (
      <div>
        <div className="text-lg font-medium mb-3">What Others Are Saying</div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialBlock testimonial={t} />
          ))}
        </div>
      </div>
    )
  );
}
