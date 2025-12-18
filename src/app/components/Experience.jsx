// import React from "react";

// const defaultExperience = {
//   designation: "MASTER ARTIFICIAL INTELLIGENCE",
//   duration: "Sep 2020 - Dec 2025",
//   organization: "Université Paris-Saclay, Paris, France",
//   topics: ["Meta-Learning", "Computer Vision"],
// };

// export default function Experience({ data = [] }) {
//   const experienceList = data.length ? data : [defaultExperience];

//   return (
//     <div className="pt-16 pl-8 md:pl-16 mb-10" id="experience">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
//         Experience
//       </h1>
//       <div className="border-b-2 border-blue-500 w-[55px]" />

//       <div className="mt-10 space-y-10">
//         {experienceList.map((item, index) => (
//           <div key={index} className="flex gap-6 relative">

//             {/* LEFT TIMELINE */}
//             <div className="relative flex flex-col items-center">
//               {/* DOT */}
//               <div className="border-[2px] rounded-full w-[16px] h-[16px] border-blue-950 bg-white z-10" />

//               {/* VERTICAL LINE */}
//               {index !== experienceList.length - 1 && (
//                 <div className="absolute top-full w-[2px] bg-blue-950 h-full min-h-[90px]" />
//               )}
//             </div>

//             {/* RIGHT CONTENT */}
//             <div className="flex flex-col gap-2">
//               {/* DESIGNATION */}
//               <h1 className="font-semibold text-black text-[20px]">
//                 {item.designation || defaultExperience.designation}
//               </h1>

//               {/* DURATION */}
//               <span className="inline-flex bg-sky-100 py-1 px-3 w-fit font-semibold text-[15px] rounded-[3px]">
//                 {item.duration || defaultExperience.duration}
//               </span>

//               {/* ORGANIZATION */}
//               <span className="italic">
//                 {item.organization || defaultExperience.organization}
//               </span>

//               {/* TOPICS */}
//               {item.topics && item.topics.length > 0 && (
//                 <div className="text-[14px] text-gray-700 block">
//                   <span className="font-semibold text-black inline-block">Topic:</span>{" "}
//                   {item.topics.join(", ")}
//                 </div>
//               )}
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


'use client'
import React from "react";

const defaultExperience = {
  designation: "MASTER ARTIFICIAL INTELLIGENCE",
  duration: "Sep 2020 - Dec 2025",
  organization: "Université Paris-Saclay, Paris, France",
  topics: ["Meta-Learning", "Computer Vision"],
};

export default function Experience({ data = [], useStatic = false }) {

  // ===== CASE 1: design/demo mode =====
  if (useStatic) {
    return (
      <div className="pt-16 pl-8 md:pl-16 mb-10" id="experience">
        <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Experience</h1>
        <div className="border-b-2 border-blue-500 w-[55px]" />

        <div className="mt-10 space-y-10">
          <div className="flex gap-6 relative">

            {/* LEFT TIMELINE */}
            <div className="relative flex flex-col items-center">
              <div className="border-[2px] rounded-full w-[16px] h-[16px] border-blue-950 bg-white z-10" />
              <div className="absolute top-full w-[2px] bg-blue-950 h-full min-h-[90px]" />
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-black text-[20px]">{defaultExperience.designation}</h1>
              <span className="inline-flex bg-sky-100 py-1 px-3 w-fit font-semibold text-[15px] rounded-[3px]">{defaultExperience.duration}</span>
              <span className="italic">{defaultExperience.organization}</span>
              <div className="text-[14px] text-gray-700 block">
                <span className="font-semibold text-black inline-block">Topic:</span> {defaultExperience.topics.join(", ")}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  const hasFetchedData = Array.isArray(data) && data.length > 0;

  // ===== CASE 3: fetched but empty =====
  if (data && data.length === 0) {
    return (
      <div className="pt-16 pl-8 md:pl-16 mb-10" id="experience">
        <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Experience</h1>
        <div className="border-b-2 border-blue-500 w-[55px]" />

        <p className="mt-10 text-gray-500 italic">Section not created yet</p>
      </div>
    );
  }

  // ===== CASE 2: fetched data exists =====
  const experienceList = hasFetchedData ? data : [defaultExperience];

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10" id="experience">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Experience</h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <div className="mt-10 space-y-10">
        {experienceList.map((item, index) => (
          <div key={index} className="flex gap-6 relative">

           
            {/* <div className="relative flex flex-col items-center">
              <div className="border-[2px] rounded-full w-[16px] h-[16px] border-blue-950 bg-white z-10" />
              {index !== experienceList.length - 1 && (
                <div className="absolute top-full w-[2px] bg-blue-950 h-full min-h-[90px]" />
              )}
            </div> */}

       
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-black text-[20px]">{item.designation}</h1>
              <span className="inline-flex bg-sky-100 py-1 px-3 w-fit font-semibold text-[15px] rounded-[3px]">{item.duration}</span>
              <span className="italic">{item.organization}</span>

              {item.topics && item.topics.length > 0 && (
                <div className="text-[14px] text-gray-700 block">
                  <span className="font-semibold text-black inline-block">Topic:</span>{" "}
                  {item.topics.join(", ")}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
