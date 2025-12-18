// import React from "react";
// import SkillTag from "./SkillTag";
// import Image from "next/image";
// import { inter } from '../fonts';
// export default function MainSection({data}) {
//   const skills = [
//     "Web Developer",
//     "React Developer",
//     "Frontend Engineer",
//     "UI/UX Designer",
//   ];
//   return (
//     <div className="relative h-screen" id="Home">
//       <Image
//         src="/assets/hero-bg.jpg"
//         fill
//         alt="hero"
//         className="object-cover"
//       />
//       <div className={`relative z-10 flex flex-col  justify-center lg:items-start  h-full pl-4  lg:pl-[166px]    text-white  lg:items-start`}>
//         <h1 className="font-bold text-[30px] md:text-[40px] lg:text-[60px] pl-8 flex md:pl-40 lg:pl-0  md:self-start  md:pl-0">Rubab Mahmood</h1>
//         <div className="mb-12 md:mb-6 lg:mb-12 pl-8 flex md:self-start  md:pl-40 lg:pl-0">
//         <SkillTag skills={skills} speed={150} pause={1500} className="  " />
//         </div>
         
//          <div className="flex flex-col md:self-start ">
//           <h2 className="mt-12 font-bold text-[21px] pl-4 md:pl-40 lg:pl-0  mb-2 ">
//             Professional Interests
//           </h2>
//           </div>
        
//         <div className=" hidden md:block md:flex flex-col md:self-start md:pl-40 lg:pl-0 gap-1">
//           <div className="flex flex-row gap-1">
//             <span className="text-[14px] text-white font-normal px-3 py-1 bg-blue-400 rounded-[4px]">
//               Artificial Intelligence
//             </span>
//             <span className="text-[14px] text-white font-normal px-3 py-1 bg-green-400 rounded-[4px]">
//               Machine Learning
//             </span>
//             <span className="text-[14px] text-white font-normal px-3 py-1 bg-orange-500 rounded-[4px]">
//               Data Science
//             </span>
//           </div>

//           <div className="flex flex-row gap-1">
//             <span className="text-[14px] text-white font-normal px-3 py-1 bg-pink-600 rounded-[4px]">
//               Datasets
//             </span>
//             <span className="text-[14px] text-white font-normal px-3 py-1 bg-purple-600 rounded-[4px]">
//               Compititions/Benchmarks
//             </span>
//             <span className="text-[14px] text-white font-normal px-3 py-1 bg-orange-500 rounded-[4px]">
//               Software Engineering
//             </span>
//           </div>
//         </div>

//         {/* MOBILE LAYOUT (< md) */}
//         <div className="block md:hidden space-y-2 pl-4 pr-6">
//           <div className="flex flex-row   gap-1">
//             <span className="inline-block w-auto text-[14px] text-white font-normal px-3 py-1 rounded-[4px] bg-blue-400">
//               Artificial Intelligence
//             </span>
//             <span className="inline-block w-auto text-[14px] text-white font-normal px-3 py-1 rounded-[4px] bg-green-400">
//               Machine Learning
//             </span>
//           </div>

//           {/* Row 2 - 1 item */}
//           <div className="grid grid-cols-1 gap-1 justify-items-start ">
//             <span className=" inline-block w-auto text-[14px] text-white font-normal px-2 py-1 rounded-[4px] bg-orange-500">
//               Data Science
//             </span>
//           </div>

//           <div className="grid grid-cols-2 justify-items-start">
//             <div className="flex gap-1">
//               <span className="inline-block w-auto text-[14px] text-white font-normal px-3 py-1 rounded-[4px] bg-pink-500">
//                 Datasets
//               </span>
//               <span className="inline-block w-auto text-[14px] text-white font-normal px-3 py-1 rounded-[4px] bg-purple-800">
//                 Compitions/Benchmarks
//               </span>
//             </div>
//           </div>

//           {/* Row 4 - 1 item */}
//           <div className="grid grid-cols-1 gap-1  justify-items-start">
//             <span className="text-[14px] text-white font-normal px-3 py-1 rounded-[4px] bg-orange-600">
//               Software Engineering
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import Image from "next/image";
// import SkillTag from "./SkillTag";

// export default function MainSection({ data }) {
//  console.log("prop data is ",data)

//   const {
//     name = "",
//     badges = [],
//     img = "/assets/hero-bg.jpg",
//   } = data || {};

//   return (
//     <div className="relative h-screen" id="Home">
//       <Image
//         src={img}
//         fill
//         alt="hero"
//         className="object-cover"
//         priority
//       />

//       <div className="relative z-10 flex flex-col justify-center h-full pl-4 lg:pl-[166px] text-white">
        
//         {/* Name */}
//         <h1 className="font-bold text-white text-[30px] md:text-[40px] lg:text-[60px] pl-8 md:pl-40 lg:pl-0">
//           {name}
//         </h1>

//         {/* Animated badges */}
//         <div className="mb-12 md:mb-6 lg:mb-12 pl-8 md:pl-40 lg:pl-0">
//           <SkillTag skills={badges} speed={150} pause={1500} />
//         </div>

//         {/* Interests */}
//         <h2 className="mt-12 font-bold text-[21px] pl-4 md:pl-40 lg:pl-0 mb-2">
//           Professional Interests
//         </h2>

//         {/* Desktop */}
//         <div className="hidden md:flex flex-wrap gap-2 pl-4 md:pl-40 lg:pl-0">
//           {badges.map((badge, index) => (
//             <span
//               key={index}
//               className="text-[14px] text-white px-3 py-1 bg-blue-500 rounded-[4px]"
//             >
//               {badge}
//             </span>
//           ))}
//         </div>

//         {/* Mobile */}
//         <div className="block md:hidden space-y-2 pl-4 pr-6">
//           {badges.map((badge, index) => (
//             <span
//               key={index}
//               className="inline-block text-[14px] text-white px-3 py-1 bg-blue-500 rounded-[4px] mr-1"
//             >
//               {badge}
//             </span>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }


import React from "react";
import Image from "next/image";
import SkillTag from "./SkillTag";

export default function MainSection({ data }) {
  // Prevent crash if data is null/undefined
  if (!data) return <p className="text-white">Loading...</p>;

  // Destructure with defaults
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
