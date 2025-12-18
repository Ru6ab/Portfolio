
// import React from "react";

// export default function Languages({ data }) {
//   // ===== STATIC FALLBACK (same as your current UI) =====
//   const staticLanguages = [
//     { name: "ENGLISH", percentage: 80 },
//     { name: "URDU", percentage: 100 },
//     { name: "SPANISH", percentage: 55 },
//     { name: "FRENCH", percentage: 85 }
//   ];

//   // use fetched data if exists
//   const languages = data?.length ? data : staticLanguages;

//   // color mapping per language
//   const languageColors = {
//     ENGLISH: "#06d452",
//     URDU: "#d40606",
//     SPANISH: "#c7ed07",
//     FRENCH: "#4407ed"
//   };

//   return (
//     <div className="pt-16 pl-8 mb-10 md:pl-16 font-sans" id="Languages">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
//         Languages
//       </h1>
//       <div className="border-b-2 border-blue-500 w-[55px]" />

//       <div className="flex flex-col gap-[12px]">
//         {languages.map((lang, index) => {
//           const color =
//             languageColors[lang.name?.toUpperCase()] || "#2563eb";

//           return (
//             <div key={index} className="flex flex-col gap-2">
//               <h1 className="font-bold text-black text-[19px] mt-12">
//                 {lang.name}
//               </h1>

//               <span
//                 className="w-[250px] h-[14px] rounded-[3px] block"
//                 style={{
//                   background: `linear-gradient(
//                     to right,
//                     ${color} ${lang.percentage}%,
//                     #d4d4d4 ${lang.percentage}%
//                   )`,
//                 }}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


'use client'
import React from "react";

export default function Languages({ data = [], useStatic = false }) {
  // ===== STATIC FALLBACK (design/demo) =====
  const staticLanguages = [
    { name: "ENGLISH", percentage: 80 },
    { name: "URDU", percentage: 100 },
    { name: "SPANISH", percentage: 55 },
    { name: "FRENCH", percentage: 85 }
  ];

  // color mapping per language
  const languageColors = {
    ENGLISH: "#06d452",
    URDU: "#d40606",
    SPANISH: "#c7ed07",
    FRENCH: "#4407ed"
  };

  // ===== CASE 1: design/demo mode =====
  if (useStatic) {
    return (
      <div className="pt-16 pl-8 mb-10 md:pl-16 font-sans" id="Languages">
        <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
          Languages
        </h1>
        <div className="border-b-2 border-blue-500 w-[55px]" />

        <div className="flex flex-col gap-[12px] mt-6">
          {staticLanguages.map((lang, index) => {
            const color = languageColors[lang.name.toUpperCase()] || "#2563eb";
            return (
              <div key={index} className="flex flex-col gap-2">
                <h1 className="font-bold text-black text-[19px]">{lang.name}</h1>
                <span
                  className="w-[250px] h-[14px] rounded-[3px] block"
                  style={{
                    background: `linear-gradient(to right, ${color} ${lang.percentage}%, #d4d4d4 ${lang.percentage}%)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ===== CASE 3: fetched but empty =====
  if (data && data.length === 0) {
    return (
      <div className="pt-16 pl-8 mb-10 md:pl-16 font-sans" id="Languages">
        <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
          Languages
        </h1>
        <div className="border-b-2 border-blue-500 w-[55px]" />

        <p className="mt-6 text-gray-500 italic">Section not created yet</p>
      </div>
    );
  }

  // ===== CASE 2: fetched data exists =====
  const languages = data.length ? data : staticLanguages;

  return (
    <div className="pt-16 pl-8 mb-10 md:pl-16 font-sans" id="Languages">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
        Languages
      </h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <div className="flex flex-col gap-[12px] mt-6">
        {languages.map((lang, index) => {
          const color = languageColors[lang.name?.toUpperCase()] || "#2563eb";
          return (
            <div key={index} className="flex flex-col gap-2">
              <h1 className="font-bold text-black text-[19px]">{lang.name}</h1>
              <span
                className="w-[250px] h-[14px] rounded-[3px] block"
                style={{
                  background: `linear-gradient(to right, ${color} ${lang.percentage}%, #d4d4d4 ${lang.percentage}%)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
