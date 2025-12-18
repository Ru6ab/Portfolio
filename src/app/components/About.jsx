// "use client";
// import React from "react";
// import { FaAngleRight } from "react-icons/fa6";
// import { FaRegFilePdf } from "react-icons/fa6";
// import { HiMiniPaperClip } from "react-icons/hi2";

// export default function About({data}) {
  
//   return (
//     <div className="pt-16 pl-8 md:pl-16   md:pr-0 " id='About'>
//       <h1 className="font-bold text-[#04274a]  text-[30px] mb-3 ">About</h1>
//       <div className="border-b-2 border-blue-500 border-[2px] w-[55px]" />

//       <p className="max-w-[740px] text-neutral-800 text-[16px] leading-relaxed tracking-wide mt-12">
//         I am a Research Engineer working at ChaLearn U.S.A. I did my Master in
//         Artificial Intelligence from Universite Paris-Saclay, France in 2022. I
//         have done my Bachelor in Computer Software Engineering from UET
//         Peshawar, Pakistan.
//       </p>
//       <p className="max-w-[740px] text-neutral-800 text-[16px] leading-relaxed tracking-wide mt-4 mb-4">
//         My research interests include Machine Learning, Deep Learning, Computer
//         Vision, Meta-Learning, Datasets Curation, Challenge Organization and
//         Fainess in ML.
//       </p>

//       <div className="flex flex-col gap-2">
//         <div className="flex flex-row items-center gap-1 ">
//           <span>
//             <FaAngleRight className=" mt-1 text-blue-500" />
//           </span>{" "}
//           <span className="font-semibold text-black"> Birthday:</span>
//           <span className="text-neutral-800"> &nbsp; 05 May 1995</span>
//         </div>
//         <div className="flex flex-row items-center gap-1 ">
//           <span>
//             <FaAngleRight className=" mt-1 text-blue-500" />
//           </span>{" "}
//           <span className="font-semibold text-black"> Website:</span>
//           <span className="text-neutral-800"> &nbsp; localhost:3000</span>
//         </div>

//         <div className="flex flex-row items-center gap-1 ">
//           <span>
//             <FaAngleRight className=" mt-1 text-blue-500" />
//           </span>{" "}
//           <span className="font-semibold text-black"> Email:</span>
//           <span className="text-neutral-800"> &nbsp; rubab.mehmod@gmail.com</span>
//         </div>

//           <div className="flex flex-row  items-center gap-1 ">
//           <FaAngleRight className=" text-blue-500" />          
//            <span className="font-semibold text-blue-500  text-[20px]"><FaRegFilePdf  /> </span>
//           <span className="font-semibold text-black"> CV: &nbsp; </span>
//            <HiMiniPaperClip  className="text-blue-500 text-[20px] font-bold"/>
       
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import React from "react";
// import { FaAngleRight } from "react-icons/fa6";
// import { FaRegFilePdf } from "react-icons/fa6";
// import { HiMiniPaperClip } from "react-icons/hi2";

// export default function About({ data }) {
//   // Fallback to empty object to avoid crashes
//   const {
//     description = "No description provided.",
//     email = "Not available",
//     dob = null,
//     cv = "",
//   } = data || {};

//   // Format date if present
//   const dobFormatted = dob
//     ? new Date(dob).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       })
//     : "Not available";

//   return (
//     <div className="pt-16 pl-8 md:pl-16 md:pr-0" id="About">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">About</h1>
//       <div className="border-b-2 border-blue-500 w-[55px]" />

//       {/* Description */}
//       <p className="max-w-[740px] text-neutral-800 text-[16px] leading-relaxed tracking-wide mt-12">
//         {description}
//       </p>

//       {/* Personal Info */}
//       <div className="flex flex-col gap-2 mt-8">
//         <div className="flex flex-row items-center gap-1">
//           <FaAngleRight className="mt-1 text-blue-500" />
//           <span className="font-semibold text-black">Birthday:</span>
//           <span className="text-neutral-800"> &nbsp; {dobFormatted}</span>
//         </div>
//         <div className="flex flex-row items-center gap-1">
//           <FaAngleRight className="mt-1 text-blue-500" />
//           <span className="font-semibold text-black">Email:</span>
//           <span className="text-neutral-800"> &nbsp; {email}</span>
//         </div>
//         <div className="flex flex-row items-center gap-1">
//           <FaAngleRight className="mt-1 text-blue-500" />
//           <span className="font-semibold text-blue-500 text-[20px]">
//             <FaRegFilePdf />
//           </span>
//           <span className="font-semibold text-black"> CV: &nbsp;</span>
//           {cv && <HiMiniPaperClip className="text-blue-500 text-[20px]" />}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaRegFilePdf } from "react-icons/fa6";
import { HiMiniPaperClip } from "react-icons/hi2";

export default function About({ data }) {
  // Fallback to empty object to avoid crashes
  const {
    description = "No description provided.",
    email = "Not available",
    dob = null,
    cv = "",
  } = data || {};

  // Format date if present
  const dobFormatted = dob
    ? new Date(dob).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  // Extract filename from CV path for display
  const cvFilename = cv ? cv.split("/").pop() : "";

  return (
    <div className="pt-16 pl-8 md:pl-16 md:pr-0" id="About">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">About</h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      {/* Description */}
      <p className="max-w-[740px] text-neutral-800 text-[16px] leading-relaxed tracking-wide mt-12">
        {description}
      </p>

      {/* Personal Info */}
      <div className="flex flex-col gap-2 mt-8">
        <div className="flex flex-row items-center gap-1">
          <FaAngleRight className="mt-1 text-blue-500" />
          <span className="font-semibold text-black">Birthday:</span>
          <span className="text-neutral-800"> &nbsp; {dobFormatted}</span>
        </div>

        <div className="flex flex-row items-center gap-1">
          <FaAngleRight className="mt-1 text-blue-500" />
          <span className="font-semibold text-black">Email:</span>
          <span className="text-neutral-800"> &nbsp; {email}</span>
        </div>

        <div className="flex flex-row items-center gap-1">
          <FaAngleRight className="mt-1 text-blue-500" />
          <span className="font-semibold text-black">CV: &nbsp;</span>
          {cv ? (
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 hover:underline"
            >
              <HiMiniPaperClip className="text-[20px]" />
              <span>{cvFilename || "View CV"}</span>
            </a>
          ) : (
            <span className="text-neutral-800">Not uploaded</span>
          )}
        </div>
      </div>
    </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import { FaAngleRight, FaRegFilePdf } from "react-icons/fa6";
// import { HiMiniPaperClip } from "react-icons/hi2";
// import axios from "axios";

// export default function About() {
//   const [about, setAbout] = useState({
//     discription: "",
//     birthday: "",
//     email: "",
//     cv: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAbout((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Sending about:", about);
//       const res = await axios.post("/api/userportfolio/about", about, {
//         headers: { "Content-Type": "application/json" },
//       });
//       console.log("About posted:", res.data);
//     } catch (error) {
//       console.log("Error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="pt-16 pl-8 md:pl-16 md:pr-0" id="About">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">About</h1>
//       <div className="border-b-2 border-blue-500 border-[2px] w-[55px]" />

//       <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
//         <p className="max-w-[740px] text-neutral-800 text-[16px] leading-relaxed tracking-wide">
//           <input
//             type="text"
//             name="discription"
//             placeholder="Description"
//             value={about.discription}
//             onChange={handleChange}
//             className="w-full border rounded px-2 py-1 text-neutral-800"
//           />
//         </p>

//         <div className="flex flex-col gap-2 mt-4">
//           <div className="flex flex-row items-center gap-2">
//             <FaAngleRight className="mt-1 text-blue-500" />
//             <span className="font-semibold text-black">Birthday:</span>
//             <input
//               type="date"
//               name="birthday"
//               value={about.birthday}
//               onChange={handleChange}
//               className="text-neutral-800 border rounded px-2 py-1"
//             />
//           </div>

//           <div className="flex flex-row items-center gap-2">
//             <FaAngleRight className="mt-1 text-blue-500" />
//             <span className="font-semibold text-black">Email:</span>
//             <input
//               type="email"
//               name="email"
//               placeholder="Your email"
//               value={about.email}
//               onChange={handleChange}
//               className="text-neutral-800 border rounded px-2 py-1"
//             />
//           </div>

//           <div className="flex flex-row items-center gap-2">
//             <FaAngleRight className="mt-1 text-blue-500" />
//             <span className="font-semibold text-blue-500 text-[20px]">
//               <FaRegFilePdf />
//             </span>
//             <span className="font-semibold text-black">CV:</span>
//             <input
//               type="text"
//               name="cv"
//               placeholder="CV URL"
//               value={about.cv}
//               onChange={handleChange}
//               className="text-neutral-800 border rounded px-2 py-1"
//             />
//             <HiMiniPaperClip className="text-blue-500 text-[20px]" />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-[150px]"
//         >
//           Save About
//         </button>
//       </form>
//     </div>
//   );
// }
