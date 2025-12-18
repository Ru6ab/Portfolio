
// import axios from "axios";
// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";


// const badgeColors = [
//   "bg-blue-400",
//   "bg-green-400",
//   "bg-orange-500",
//   "bg-pink-600",
//   "bg-purple-600",
//   "bg-orange-500",
// ];

// const initialBadges = [
//   "Artificial Intelligence",
//   "Machine Learning",
//   "Data Science",
//   "Datasets",
//   "Compititions/Benchmarks",
//   "Software Engineering",
// ];

// export default function BadgeSection({name}) {
//   const [badges, setBadges] = useState(initialBadges);
//   const [badgeText, setBadgeText] = useState([...initialBadges]);

//   const handleChange = (index, value) => {
//     const updated = [...badgeText];
//     updated[index] = value;
//     setBadgeText(updated);
//   };

//   const removeBadge = (index) => {
//     setBadges((prev) => prev.filter((_, i) => i !== index));
//     setBadgeText((prev) => prev.filter((_, i) => i !== index));
//   };

//   const postBadgeData = async (e) => {
//     e.preventDefault();
//      const payload = {
//       name,
//       badges: badgeText,
//     };
//     console.log(badgeText)
//     const res = await axios.post("/api/userportfolio",payload);
//     console.log(res);
//   };

//   return (
//     <>
//     <div className="hidden md:flex flex-col md:self-start md:pl-40 lg:pl-0 gap-1">
//       <form onSubmit={postBadgeData}>
//         {Array.from({ length: Math.ceil(badges.length / 3) }).map((_, rowIndex) => (
//           <div key={rowIndex} className="flex flex-row mb-[2px]">
//             {badges
//               .slice(rowIndex * 3, rowIndex * 3 + 3)
//               .map((text, i) => {
//                 const actualIndex = rowIndex * 3 + i;
//                 const colorClass = badgeColors[actualIndex % badgeColors.length];

//                 return (
//                   <div key={i} className="relative inline-block">
//                     <input
//                       type="text"
//                       placeholder={text}
//                       value={badgeText[actualIndex]}
//                       onChange={(e) =>
//                         handleChange(actualIndex, e.target.value)
//                       }
//                       style={{ minWidth: `${text.length + 1}ch` }}
//                       className={`text-white inline-block text-[14px] font-normal px-3 py-1 rounded-[4px] ${colorClass} placeholder-white`}
//                     />

//                     <button
//                       type="button"
//                       onClick={() => removeBadge(actualIndex)}
//                       className="text-gray-700 text-[8px] rounded absolute top-0 left-[198px]"
//                     >
//                       <FaTimes />
//                     </button>
//                   </div>
//                 );
//               })}
//           </div>
//         ))}

//         <button type="submit" className="mt-2 text-white bg-blue-600 px-3 py-1 rounded">
//           submit
//         </button>
//       </form>
//     </div>

//     {/* MOBILE VERSION — visible only below md */}
// {/* MOBILE VERSION — visible only below md */}
// <div className="block md:hidden space-y-2 pl-4 pr-6">
//   <form onSubmit={postBadgeData} className="space-y-2">

//     {(() => {
//       const rows = [];
//       let index = 0;
//       let pattern = [2, 1]; // 2–1–2–1 repeating

//       while (index < badges.length) {
//         const count = pattern[index % 2]; // alternate 2 → 1 → 2 → 1...
//         const rowItems = badges.slice(index, index + count);

//         rows.push(
//           <div key={index} className="flex flex-row gap-2 flex-wrap">
//             {rowItems.map((item, i) => {
//               const actualIndex = index + i;
//               const badgeColor =
//                 badgeColors[actualIndex % badgeColors.length];

//               return (
//                 <div key={i} className="relative inline-block">
//                   <input
//                     type="text"
//                     placeholder={item}
//                     value={badgeText[actualIndex]}
//                     onChange={(e) =>
//                       handleChange(actualIndex, e.target.value)
//                     }
//                     className={`text-white text-[14px] font-normal px-3 py-1 rounded-[4px] ${badgeColor} placeholder-white`}
//                     style={{ minWidth: `${item.length + 1}ch` }}
//                   />

//                   <button
//                     type="button"
//                     onClick={() => removeBadge(actualIndex)}
//                     className="absolute -top-1 -right-1 bg-white rounded-full p-[2px] text-[10px] text-gray-700"
//                   >
//                     <FaTimes />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         );

//         index += count;
//       }

//       return rows;
//     })()}

//     <button
//       type="submit"
//       className="mt-2 text-white bg-blue-600 px-3 py-1 rounded"
//     >
//       submit
//     </button>
//   </form>
// </div>

// </>
//   );
// }
 

"use client";
import axios from "axios";
import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

export default function Badges({ nameProp, bgImg }) {
  const [badges, setBadges] = useState([]);

  const handleBadgeChange = (index, value) => {
    const updated = [...badges];
    updated[index] = value;
    setBadges(updated);
  };

  const addBadge = () => {
    setBadges((prev) => [...prev, ""]);
  };

  const removeBadge = (index) => {
    setBadges((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: nameProp,
      img: bgImg,
      badges,
    };

    await axios.post("/api/userportfolio", payload);
    alert("Submitted!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col gap-3 bg-white/10 p-5 rounded-lg backdrop-blur-md w-[350px]"
    >
      <h2 className="text-lg font-bold">Badges</h2>

      {badges.map((badge, index) => (
        <div key={index} className="relative">
          <input
            value={badge}
            onChange={(e) => handleBadgeChange(index, e.target.value)}
            className="w-full border px-3 py-2 rounded text-black"
            placeholder={`Badge ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => removeBadge(index)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
          >
            <FaTimes size={12} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addBadge}
        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded"
      >
        <FaPlus /> Add Badge
      </button>

      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-2 rounded mt-2"
      >
        Submit
      </button>
    </form>
  );
}
