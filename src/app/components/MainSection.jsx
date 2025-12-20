import React from "react";
import Image from "next/image";
import SkillTag from "./SkillTag";

export default function MainSection({ data }) {
  
  if (!data) return <p className="text-white">Loading...</p>;

  const { name = "", badges = [], img = "/assets/hero-bg.jpg" } = data;

  return (
    <div className="relative h-screen" id="Home">
      {/* Background Image */}
      <Image
        src={img}
        fill
        alt="hero"
        className="object-cover"
        priority
      />

      <div className="relative z-10 flex flex-col justify-center h-full pl-4 lg:pl-[166px] text-white">
        
        {/* Name */}
        <h1 className="font-bold text-[30px] md:text-[40px] lg:text-[60px] pl-8 md:pl-40 lg:pl-0">
          {name}
        </h1>

        {/* SkillTag badges */}
        <div className="mb-12 md:mb-6 lg:mb-12 pl-8 md:pl-40 lg:pl-0">
          <SkillTag skills={badges} speed={150} pause={1500} />
        </div>

        {/* Example Professional Interests */}
        <h2 className="mt-12 font-bold text-[21px] pl-4 md:pl-40 lg:pl-0 mb-2">
          Professional Interests
        </h2>

        {/* Desktop badges */}
        <div className="hidden md:flex flex-wrap gap-2 pl-4 md:pl-40 lg:pl-0">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="text-[14px] text-white px-3 py-1 bg-blue-500 rounded-[4px]"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="block md:hidden space-y-2 pl-4 pr-6">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="inline-block text-[14px] text-white px-3 py-1 bg-blue-500 rounded-[4px] mr-1"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
