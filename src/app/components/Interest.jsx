// import React from "react";

// export default function Interest({ data }) {
//   // fallback static data
//   const staticInterests = [
//     "Open Source",
//     "AI Research",
//     "System Design",
//     "UI/UX",
//     "Web Performance",
//     "Cloud Computing",
//     "Cyber Security",
//     "DevOps",
//     "Tech Blogging",
//     "Startups",
//     "Teaching",
//     "Problem Solving"
//   ];

//   const interests = data?.length ? data : staticInterests;

//   // split array into rows
//   const chunkArray = (arr, size) => {
//     const result = [];
//     for (let i = 0; i < arr.length; i += size) {
//       result.push(arr.slice(i, i + size));
//     }
//     return result;
//   };

//   // each row has 4 items
//   const rows = chunkArray(interests, 4);

//   return (
//     <div className="pt-16 pl-8 md:pl-16 md:pr-0" id="Interest">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Interests</h1>
//       <div className="border-b-2 border-blue-500 w-[55px] mb-10" />

//       {/* ===== FIRST 2 ROWS ===== */}
//       {rows.slice(0, 2).map((row, i) => (
//         <InterestRow key={i} row={row} />
//       ))}

//       {/* GAP */}
//       <div className="h-6" />

//       {/* ===== NEXT 3 ROWS ===== */}
//       {rows.slice(2, 5).map((row, i) => (
//         <InterestRow key={i} row={row} />
//       ))}
//     </div>
//   );
// }

// function InterestRow({ row }) {
//   return (
//     <div className="flex flex-wrap gap-3 mb-3">
//       {row.map((interest, i) => (
//         <div
//           key={i}
//           className="bg-gray-200 text-black px-3 py-1 rounded-[4px] text-sm"
//         >
//           {interest}
//         </div>
//       ))}
//     </div>
//   );
// }

import React from "react";

// Static fallback interests for design/demo
const staticInterests = [
  "Open Source",
  "AI Research",
  "System Design",
  "UI/UX",
  "Web Performance",
  "Cloud Computing",
  "Cyber Security",
  "DevOps",
  "Tech Blogging",
  "Startups",
  "Teaching",
  "Problem Solving"
];

// Utility to split array into rows
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default function Interest({ data, useStatic = false }) {
  // Case 1: Fetched data exists
  if (data && data.length > 0) {
    return <InterestDisplay interests={data} />;
  }

  // Case 2: Static fallback for design
  if (useStatic) {
    return <InterestDisplay interests={staticInterests} />;
  }

  // Case 3: Section not created yet
  return (
    <div className="pt-16 pl-8 md:pl-16 md:pr-0" id="Interest">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Interests</h1>
      <div className="border-b-2 border-blue-500 w-[55px] mb-10" />
      <p className="text-gray-500 italic">Section not created yet.</p>
    </div>
  );
}

// Component to display interests in rows
function InterestDisplay({ interests }) {
  const rows = chunkArray(interests, 4); // 4 items per row

  return (
    <div className="pt-16 pl-8 md:pl-16 md:pr-0" id="Interest">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Interests</h1>
      <div className="border-b-2 border-blue-500 w-[55px] mb-10" />

      {/* First 2 rows */}
      {rows.slice(0, 2).map((row, i) => (
        <InterestRow key={i} row={row} />
      ))}

      {/* Gap */}
      <div className="h-6" />

      {/* Next 3 rows */}
      {rows.slice(2, 5).map((row, i) => (
        <InterestRow key={i} row={row} />
      ))}
    </div>
  );
}

function InterestRow({ row }) {
  return (
    <div className="flex flex-wrap gap-3 mb-3">
      {row.map((interest, i) => (
        <div
          key={i}
          className="bg-gray-200 text-black px-3 py-1 rounded-[4px] text-sm"
        >
          {interest}
        </div>
      ))}
    </div>
  );
}
