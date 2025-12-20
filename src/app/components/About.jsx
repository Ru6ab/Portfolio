"use client";
import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaRegFilePdf } from "react-icons/fa6";
import { HiMiniPaperClip } from "react-icons/hi2";

export default function About({ data }) {
 
  const {
    description = "No description provided.",
    email = "Not available",
    dob = null,
    cv = "",
  } = data || {};

  
  const dobFormatted = dob
    ? new Date(dob).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

 
  const cvFilename = cv ? cv.split("/").pop() : "";

  return (
    <div className="pt-16 pl-8 md:pl-16 md:pr-0" id="About">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">About</h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

 
      <p className="max-w-[740px] text-neutral-800 text-[16px] leading-relaxed tracking-wide mt-12">
        {description}
      </p>

     
      <div className="flex flex-col gap-2 mt-8">
        <div className="flex flex-row items-center gap-1">
          <FaAngleRight className="mt-1 text-blue-500" />
          <span className="font-semibold text-black">Birthday:</span>
          <span className="text-neutral-800"> &nbsp; {dobFormatted}</span>
        </div>

        <div className="flex flex-row items-center gap-1">
          <FaAngleRight className="mt-1 text-blue-500" />
          <span className="font-semibold text-black">Email:</span>
          <span className="text-neutral-800"> &nbsp; {email}</span>
        </div>

        <div className="flex flex-row items-center gap-1">
          <FaAngleRight className="mt-1 text-blue-500" />
          <span className="font-semibold text-black">CV: &nbsp;</span>
          {cv ? (
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 hover:underline"
            >
              <HiMiniPaperClip className="text-[20px]" />
              <span>{cvFilename || "View CV"}</span>
            </a>
          ) : (
            <span className="text-neutral-800">Not uploaded</span>
          )}
        </div>
      </div>
    </div>
  );
}
