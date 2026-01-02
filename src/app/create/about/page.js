// "use client";
// import React, { useRef, useState } from "react";
// import axios from "axios";

// export default function About2() {
//   const [cvFile,setCvFile] = useState(null)
//   const cvRef = useRef(null);
//    const handleCvSelect = () => {
//     const file = cvRef.current.files[0];
//     if (file) setCvFile(file);
//   };
//   const [formData, setFormData] = useState({
//     description: "",
//     birthday: "",
//     email: "",
//     cv: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = new FormData()
//     payload.append("description",formData.description)
//      payload.append("birthday",formData.birthday)
//       payload.append("email",formData.email)
//       if (cvFile) {  
//   payload.append("cv", cvFile);  
// }
//     try {
//       console.log("Sending about:", payload);
//       const res = await axios.post("/api/userportfolio/about", payload, {
//               headers: {
//            "Content-Type": "multipart/form-data",
//          },
//        });
//       console.log("About posted:", res.data);
//        alert("submitted")
//     } catch (error) {
//       console.log("Error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="pt-16 pl-8 md:pl-16 md:pr-0 mb-10" id="About">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">About</h1>
//       <div className="border-b-2 border-blue-500 border-[2px] w-[55px]" />

//       <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
//         {/* Description */}
//         <div className="flex flex-col gap-1">
         
//              <label className="font-semibold text-black">About Yoursef:</label>
//             <textarea
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows={5}
//               className="w-[700px] border border-gray-300 rounded px-2 py-1 text-neutral-800"
//             />
         
         
//         </div>

//         {/* Birthday */}
//         <div  className="flex flex-col gap-[2px]">
//           <label className="font-semibold text-black">Birthday:</label>
//           <input
//             type="date"
//             name="birthday"
//             value={formData.birthday}
//             onChange={handleChange}
//             className="w-[300px] border border-gray-300 rounded px-2 py-1 text-neutral-800 "
//           />
//         </div>

//         {/* Email */}
//         <div className="flex flex-col gap-1">
//           <label className="font-semibold text-black">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-[300px] border border-gray-300 rounded px-2 py-1 text-neutral-800 "
//           />
//         </div>

//         {/* CV */}
//         <div className="flex flex-col gap-1">
//           <label className="font-semibold text-black">Upload CV</label>
//           <input
//             name="cv"
//             type="file"
//             ref={cvRef}
//             onChange={handleCvSelect}
//             accept=".pdf,.doc,.docx"
//             className="w-[300px] border border-gray-300 rounded px-2 py-1 text-neutral-800 hidden"
//           />
//            <button
//     type="button"
//     onClick={() => cvRef.current.click()}
//     className="w-[300px] border border-gray-300 rounded px-2 py-1 text-left text-neutral-800"
//   >
//     {cvFile ? cvFile.name : "Choose File"} {/* shows placeholder or selected file name */}
//   </button>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 rounded absolute bottom-4 right-12"
//         >
//        Submit
//         </button>
//       </form>
//     </div>
//   );
// }

'use client'
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function About2() {
  const [cvFile, setCvFile] = useState(null);
  const cvRef = useRef(null);

  const [formData, setFormData] = useState({
    description: "",
    dob: "",
    email: "",
    cv: "",
  });

  // -----------------------------
  // Fetch existing About
  // -----------------------------
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get("/api/userportfolio/about");
        if (res.data?.data) {
          const data = res.data.data;
          setFormData({
            description: data.description || "",
            dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
            email: data.email || "",
            cv: data.cv || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch About:", err.response?.data || err.message);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCvSelect = () => {
    const file = cvRef.current.files[0];
    if (file) setCvFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.description.trim() || !formData.email.trim() || !formData.dob) {
      alert("Description, Email, and Birthday are required");
      return;
    }

    const payload = new FormData();
    payload.append("description", formData.description.trim());
    payload.append("email", formData.email.trim());
    payload.append("dob", formData.dob);
    if (cvFile) {
      payload.append("cv", cvFile);
    }

    try {
      const res = await axios.post("/api/userportfolio/about", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("About saved:", res.data);
      alert("About section saved");
    } catch (err) {
      console.error("Submission error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="pt-16 pl-8 md:pl-16 md:pr-0 mb-10" id="About">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">About</h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 relative">
        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-black">About Yourself:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-[700px] border border-gray-300 rounded px-2 py-1 text-neutral-800"
          />
        </div>

        {/* Birthday */}
        <div className="flex flex-col gap-[2px]">
          <label className="font-semibold text-black">Birthday:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-[300px] border border-gray-300 rounded px-2 py-1 text-neutral-800"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-black">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-[300px] border border-gray-300 rounded px-2 py-1 text-neutral-800"
          />
        </div>

        {/* CV */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-black">Upload CV</label>
          <input
            name="cv"
            type="file"
            ref={cvRef}
            onChange={handleCvSelect}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => cvRef.current.click()}
            className="w-[300px] border border-gray-300 rounded px-2 py-1 text-left text-neutral-800"
          >
            {cvFile ? cvFile.name : formData.cv ? formData.cv : "Choose File"}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded absolute bottom-4 right-12"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
