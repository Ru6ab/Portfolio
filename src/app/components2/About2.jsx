

// import React, { useState } from "react";
// import axios from "axios";
// import { FaAngleRight, FaRegFilePdf } from "react-icons/fa6";

// export default function About2() {
//   const [about, setAbout] = useState({
//     discription: "",
//     birthday: "",
//     email: "",
//     cv: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAbout((prev) => ({ ...prev, [name]: value })); // <-- object, not array
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
//     <div className="pt-16 pl-8 md:pl-16   md:pr-0 " id='About'>
//           <h1 className="font-bold text-[#04274a]  text-[30px] mb-3 ">About</h1>
//       <div className="border-b-2 border-blue-500 border-[2px] w-[55px]" />
//     <form onSubmit={handleSubmit}>
//       <div>
//        <p className="max-w-[740px] text-neutral-800 text-[16px] leading-relaxed tracking-wide mt-12">
//         <input
//           type="text"
//           name="discription"
//           value={about.discription}
//           onChange={handleChange}
//         />
//         </p>
//           <p className="max-w-[740px] text-neutral-800 text-[16px] leading-relaxed tracking-wide mt-4 mb-4">
//         My research interests include Machine Learning, Deep Learning, Computer
//         Vision, Meta-Learning, Datasets Curation, Challenge Organization and
//         Fainess in ML.
//       </p>
//       </div>

//       <div>
//         <label>Birthday:</label>
//         <input
//           type="text"
//           name="birthday"
//           value={about.birthday}
//           onChange={handleChange}
//         />
//       </div>

//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={about.email}
//           onChange={handleChange}
//         />
//       </div>

//       <div>
//         <label>CV URL:</label>
//         <input
//           type="text"
//           name="cv"
//           value={about.cv}
//           onChange={handleChange}
//         />
//       </div>

//       <button type="submit">Save About</button>
//     </form>
  
// </div>
//   )}

"use client";
import React, { useState } from "react";
import axios from "axios";

export default function About2() {
  const [about, setAbout] = useState({
    discription: "",
    birthday: "",
    email: "",
    cv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbout((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending about:", about);
      const res = await axios.post("/api/userportfolio/about", about, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("About posted:", res.data);
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="pt-16 pl-8 md:pl-16 md:pr-0" id="About">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">About</h1>
      <div className="border-b-2 border-blue-500 border-[2px] w-[55px]" />

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
        {/* Description */}
        <div>
          <p className="max-w-[740px] text-neutral-800 text-[16px] leading-relaxed tracking-wide mt-12">
            <input
              type="text"
              name="discription"
              placeholder="Write something about yourself..."
              value={about.discription}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 text-neutral-800"
            />
          </p>
          <p className="max-w-[740px] text-neutral-800 text-[16px] leading-relaxed tracking-wide mt-4 mb-4">
            My research interests include Machine Learning, Deep Learning, Computer
            Vision, Meta-Learning, Datasets Curation, Challenge Organization and
            Fainess in ML.
          </p>
        </div>

        {/* Birthday */}
        <div>
          <label className="font-semibold text-black">Birthday:</label>
          <input
            type="text"
            name="birthday"
            value={about.birthday}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1 text-neutral-800 mt-1"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-semibold text-black">Email:</label>
          <input
            type="email"
            name="email"
            value={about.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1 text-neutral-800 mt-1"
          />
        </div>

        {/* CV */}
        <div>
          <label className="font-semibold text-black">CV URL:</label>
          <input
            type="text"
            name="cv"
            value={about.cv}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1 text-neutral-800 mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-[150px]"
        >
          Save About
        </button>
      </form>
    </div>
  );
}
