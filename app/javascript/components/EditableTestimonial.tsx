import React, { useState } from "react";
import { Testimonial } from "../types";
import { PopButton } from "./ui/PopButton";
import { set } from "date-fns";
import { post } from "../util/loaders/post";
import toast from "react-hot-toast";
interface Props {
  testimonial: Testimonial;
}
export function EditableTestimonial({ testimonial }: Props) {
  const [copied, setCopied] = useState(false);
  const [published, setPublished] = useState(testimonial.published);
  function copyEmbedCode() {
    navigator.clipboard.writeText(
      `<iframe src="https://gr.matterloop.com/embed/testimonial/${testimonial.id}" width="100%" height="100%" frameborder="0"></iframe>`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  async function handlePublishedChange(e) {
    setPublished(e.target.value === "true");
    await post("testimonial/upsert", {
      id: testimonial.id,
      published: e.target.value === "true",
    });
    toast.success("Testimonial updated!");
  }
  return (
    <div className="bg-white p-3 rounded-md shadow-[0.1rem_0.1rem_0_#00000020]">
      <div className="text-sm mb-2 font-medium">{testimonial.body}</div>
      <div className="flex justify-between items-center">
        <div className="text-[0.77rem] flex gap-2 items-center">
          <img
            src={`https://i.pravatar.cc/64?u=${testimonial.id}`}
            className="w-5 h-5 rounded-full"
          />
          <div className="flex flex-col leading-tight">
            <span className="truncate w-28">{testimonial.user_name}</span>
          </div>
          {/* {[testimonial.user_name, testimonial.user_title]
            .filter((val) => val)
            .join(", ")} */}
        </div>
        <div className="flex gap-2">
          <PopButton
            label="Copy Embed Code"
            onClick={copyEmbedCode}
            className="text-xs pt-0.5 pb-0 pl-1 pr-1 w-[3.5rem] h-6 hover:-translate-x-[0.05rem] hover:-translate-y-[0.05rem] hover:shadow-[0.05rem_0.05rem_0_#000] bg-white hover:text-black hover:bg-pink"
          >
            {copied ? "Copied!" : "Embed"}
          </PopButton>
          <select
            onChange={handlePublishedChange}
            className="pl-2 text-xs w-[5.4rem] h-6 p-0 pt-[1px]"
            value={published ? "true" : "false"}
          >
            <option value="true">Live</option>
            <option value="false">Hidden</option>
          </select>
        </div>
      </div>
    </div>
  );
}
