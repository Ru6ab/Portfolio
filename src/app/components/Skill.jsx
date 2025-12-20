import React from "react";

// Static fallback skills for design/demo
const staticSkills = [
  "HTML", "CSS", "JavaScript", "React",
  "Node.js", "Express", "MongoDB",
  "Python", "Machine Learning", "TensorFlow",
  "Git", "GitHub", "Docker"
];

// Utility to split array into chunks
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default function Skill({ data, useStatic = false }) {
  // Case 1: fetched data exists
  if (data && data.length > 0) {
    return <SkillsDisplay skills={data} />;
  }

  // Case 2: static design fallback
  if (useStatic) {
    return <SkillsDisplay skills={staticSkills} />;
  }

  // Case 3: section not created yet
  return (
    <div className="pt-16 pl-8 md:pl-16 md:pr-0" id="Skills">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Skills</h1>
      <div className="border-b-2 border-blue-500 w-[55px] mb-10" />
      <p className="text-gray-500 italic">Section not created yet.</p>
    </div>
  );
}

// Component to display skills in rows
function SkillsDisplay({ skills }) {
  const rows = chunkArray(skills, 4); // 4 per row, adjust as needed

  return (
    <div className="pt-16 pl-8 md:pl-16 md:pr-0" id="Skills">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Skills</h1>
      <div className="border-b-2 border-blue-500 w-[55px] mb-10" />

      {/* First 2 rows */}
      {rows.slice(0, 2).map((row, i) => (
        <SkillRow key={i} row={row} />
      ))}

      {/* Gap */}
      <div className="h-6" />

      {/* Next 3 rows */}
      {rows.slice(2, 5).map((row, i) => (
        <SkillRow key={i} row={row} />
      ))}
    </div>
  );
}

function SkillRow({ row }) {
  return (
    <div className="flex flex-wrap gap-3 mb-3">
      {row.map((skill, i) => (
        <div
          key={i}
          className="bg-gray-200 text-black px-3 py-1 rounded-[4px] text-sm"
        >
          {skill}
        </div>
      ))}
    </div>
  );
}

