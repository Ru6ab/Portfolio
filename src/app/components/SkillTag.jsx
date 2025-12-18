
"use client";

import { useState, useEffect } from "react";

export default function SkillTag({ skills, speed = 150, pause = 1000 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [skillIndex, setSkillIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [direction, setDirection] = useState("typing"); // "typing" or "deleting"

  useEffect(() => {
    const currentSkill = skills[skillIndex];

    let timeout;

    if (direction === "typing") {
      if (charIndex < currentSkill.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentSkill.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, speed);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => setDirection("deleting"), pause);
      }
    } else if (direction === "deleting") {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentSkill.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, speed);
      } else {
        // Move to next skill
        setDirection("typing");
        setSkillIndex((skillIndex + 1) % skills.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, direction, skillIndex, skills, speed, pause]);

  return (
    <span className="relative  font-normal text-[30px]">
      {/* Constant part */}
      <span className=" text-[20px] md:text-[28px] lg:text-[25px] ">I'm </span>

      {/* Typed text with per-letter underline, preserve spaces */}
      <span className="inline-block" style={{ whiteSpace: "pre" }}>
        {displayedText.split("").map((char, idx) => (
          <span key={idx} className="relative inline-block  text-[23px] md:text-[29px] lg:text-[25px]">
            {char === " " ? "\u00A0" : char}
            <span className="absolute bottom-0 left-0 h-[3px] w-full bg-blue-500"></span>
          </span>
        ))}
      </span>

      {/* Blinking cursor */}
      <span className="border-r-2 border-white animate-pulse ml-1"></span>
    </span>
  );
}
