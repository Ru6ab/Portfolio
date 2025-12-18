// import React from "react";

// const defaultEducation = {
//   degree: "MASTER ARTIFICIAL INTELLIGENCE",
//   year: "Sep 2020 - Dec 2025",
//   school: "Université Paris-Saclay, Paris, France",
// };

// export default function Education({ data = [] }) {
//   const educationList = data.length ? data : [defaultEducation];

//   return (
//     <div className="pt-16 pl-8 md:pl-16 mb-10" id="Education">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Education</h1>
//       <div className="border-b-2 border-blue-500 w-[55px]" />

//       <div className="mt-10 space-y-10">
//         {educationList.map((item, index) => (
//           <div key={index} className="flex gap-6 relative">
            
//             {/* LEFT TIMELINE */}
//             <div className="relative flex flex-col items-center">
//               {/* DOT */}
//               <div className="border-[2px] rounded-full w-[16px] h-[16px] border-blue-950 bg-white z-10" />

//               {/* LINE */}
//               {index !== educationList.length - 1 && (
//                 <div className="absolute top-full w-[2px] bg-blue-950 h-full min-h-[80px]" />
//               )}
//             </div>

//             {/* RIGHT CONTENT */}
//             <div className="flex flex-col gap-2">
//               <h1 className="font-semibold text-black text-[20px]">
//                 {item.degree || (index === 0 ? defaultEducation.degree : "")}
//               </h1>

//               <span className="inline-flex bg-sky-100 py-1 px-3 w-fit font-semibold text-[15px] rounded-[3px]">
//                 {item.year || (index === 0 ? defaultEducation.year : "")}
//               </span>

//               <span className="-italic">
//                 {item.school || (index === 0 ? defaultEducation.school : "")}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

'use client'
import React from "react";

const defaultEducation = {
  degree: "MASTER ARTIFICIAL INTELLIGENCE",
  year: "Sep 2020 - Dec 2025",
  school: "Université Paris-Saclay, Paris, France",
};

export default function Education({ data = [] }) {
  const hasFetchedData = Array.isArray(data) && data.length > 0;

  // CASE: fetched but not created yet
  if (data && data.length === 0) {
    return (
      <div className="pt-16 pl-8 md:pl-16 mb-10" id="Education">
        <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Education</h1>
        <div className="border-b-2 border-blue-500 w-[55px]" />

        <p className="mt-10 text-gray-500 italic">Section not created yet</p>
      </div>
    );
  }

  // Decide list: fetched data first, fallback to default
  const educationList = hasFetchedData ? data : [defaultEducation];

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10" id="Education">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Education</h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <div className="mt-10 space-y-10">
        {educationList.map((item, index) => (
          <div key={index} className="flex gap-6 relative">

            {/* LEFT TIMELINE */}
            {/* <div className="relative flex flex-col items-center">
             
              <div className="border-[2px] rounded-full w-[16px] h-[16px] border-blue-950 bg-white z-10" />

             
              {index !== educationList.length - 1 && (
                <div className="absolute top-full w-[2px] bg-blue-950 h-full min-h-[80px]" />
              )}
            </div> */}

            {/* RIGHT CONTENT */}
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-black text-[20px]">
                {item.degree || (index === 0 ? defaultEducation.degree : "")}
              </h1>

              <span className="inline-flex bg-sky-100 py-1 px-3 w-fit font-semibold text-[15px] rounded-[3px]">
                {item.year || (index === 0 ? defaultEducation.year : "")}
              </span>

              <span className="italic">
                {item.school || (index === 0 ? defaultEducation.school : "")}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
