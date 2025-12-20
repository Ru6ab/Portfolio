'use client'
import React from "react";

// Default static/fallback leadership entry
const defaultLeadership = {
  school: "Université Paris-Saclay, Paris, France",
  degree: "Team Lead - AI Research Project",
  year: "2024",
};

export default function Leadership({ data = [], useStatic = false }) {

  // ===== CASE 1: design/demo mode =====
  if (useStatic) {
    return (
      <div className="pt-16 pl-8 md:pl-16 mb-10" id="Leadership">
        <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Leadership</h1>
        <div className="border-b-2 border-blue-500 w-[55px]" />

        <div className="mt-10 space-y-10">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-black text-[20px]">{defaultLeadership.degree}</h1>
            <span className="inline-flex bg-sky-100 py-1 px-3 w-fit font-semibold text-[15px] rounded-[3px]">
              {defaultLeadership.year}
            </span>
            <span className="italic">{defaultLeadership.school}</span>
          </div>
        </div>
      </div>
    );
  }

  const hasFetchedData = Array.isArray(data) && data.length > 0;

  // ===== CASE 3: fetched but empty =====
  if (data && data.length === 0) {
    return (
      <div className="pt-16 pl-8 md:pl-16 mb-10" id="Leadership">
        <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Leadership</h1>
        <div className="border-b-2 border-blue-500 w-[55px]" />
        <p className="mt-10 text-gray-500 italic">Section not created yet</p>
      </div>
    );
  }

  // ===== CASE 2: fetched data exists =====
  const leadershipList = hasFetchedData ? data : [defaultLeadership];

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10" id="Leadership">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Leadership</h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <div className="mt-10 space-y-10">
        {leadershipList.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">

            <h1 className="font-semibold text-black text-[20px]">{item.degree}</h1>

            <span className="inline-flex bg-sky-100 py-1 px-3 w-fit font-semibold text-[15px] rounded-[3px]">
              {item.year}
            </span>

            <span className="italic">{item.school}</span>

          </div>
        ))}
      </div>
    </div>
  );
}
