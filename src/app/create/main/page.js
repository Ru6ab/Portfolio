// "use client";

// import React, { useRef, useState } from "react";
// import axios from "axios";
// import { FaTimes, FaPlus } from "react-icons/fa";

// export default function Page() {
//   const imgRef = useRef(null);

//   const [name, setName] = useState("");
//   const [bgFile, setBgFile] = useState(null); // real file
//   const [bgImage, setBgImage] = useState(""); // preview
//   const [badges, setBadges] = useState([]);

//   // image preview + store real file
//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setBgImage(URL.createObjectURL(file)); // preview
//       setBgFile(file); // real file
//     }
//   };

//   // badge controls
//   const addBadge = () => setBadges((prev) => [...prev, ""]);
//   const removeBadge = (index) =>
//     setBadges((prev) => prev.filter((_, i) => i !== index));

//   const updateBadge = (index, value) => {
//     const copy = [...badges];
//     copy[index] = value;
//     setBadges(copy);
//   };

//   // submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("badges", JSON.stringify(badges));

//     if (bgFile) {
//       formData.append("img", bgFile); // ✅ append real file
//     }

//     try {
//       const res = await axios.post("/api/userportfolio/main", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//       alert("Data submitted successfully!");
//       console.log(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div
//       className="relative min-h-screen w-full bg-cover bg-center"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       <div className="absolute inset-0 "></div>

//       <div className="relative z-10 text-white p-10 max-w-xl">
//         <h1 className="text-3xl font-bold mb-6">
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="bg-transparent  px-2 py-1 focus:outline-none text-black text-3xl w-full placeholder-black"
//           />
//         </h1>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 rounded-lg">
//           <h2 className="text-xl font-bold text-black">Professional Interests</h2>

//           {badges.map((badge, index) => (
//             <div key={index} className="relative">
//               <input
//                 type="text"
//                 value={badge}
//                 onChange={(e) => updateBadge(index, e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2 text-black"
//                 placeholder={`Badge ${index + 1}`}
//               />
//               <button
//                 type="button"
//                 onClick={() => removeBadge(index)}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
//               >
//                 <FaTimes size={12} />
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addBadge}
//             className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded w-max"
//           >
//             <FaPlus /> Add Badge
//           </button>

//           <button
//             type="submit"
//             className="fixed bottom-4 right-4 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md"
//           >
//             Submit
//           </button>
//         </form>

//         {/* Image upload input stays outside form, works fine */}
//         <input
//           type="file"
//           ref={imgRef}
//           onChange={handleImageSelect}
//           accept="image/*"
//           hidden
//         />

//         <button
//           onClick={() => imgRef.current.click()}
//           className="mt-6 ml-6 bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Change Background Image
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaTimes, FaPlus } from "react-icons/fa";

export default function Page() {
  const imgRef = useRef(null);

  const [name, setName] = useState("");
  const [badges, setBadges] = useState([]);
  const [bgFile, setBgFile] = useState(null); // real file
  const [bgImage, setBgImage] = useState(""); // preview
  const [isUpdate, setIsUpdate] = useState(false);

  /* ------------------------------------
     GET DATA (for update mode)
  ------------------------------------ */
  useEffect(() => {
    const fetchMainSection = async () => {
      try {
        const res = await axios.get("/api/userportfolio/main", {
          withCredentials: true,
        });

        const data = res.data?.data;
        if (data) {
          setName(data.name || "");
          setBadges(data.badges || []);
          setBgImage(data.img || "");
          setIsUpdate(true); // 🔑 switch to update mode
        }
      } catch (err) {
        console.log("No existing main section");
      }
    };

    fetchMainSection();
  }, []);

  /* ------------------------------------
     IMAGE SELECT
  ------------------------------------ */
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBgImage(URL.createObjectURL(file)); // preview
      setBgFile(file); // real file
    }
  };

  /* ------------------------------------
     BADGES
  ------------------------------------ */
  const addBadge = () => setBadges((prev) => [...prev, ""]);

  const removeBadge = (index) =>
    setBadges((prev) => prev.filter((_, i) => i !== index));

  const updateBadge = (index, value) => {
    const copy = [...badges];
    copy[index] = value;
    setBadges(copy);
  };

  /* ------------------------------------
     SUBMIT (POST / PUT)
  ------------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("badges", JSON.stringify(badges));

    if (bgFile) {
      formData.append("img", bgFile);
    }

    try {
      const method = isUpdate ? "put" : "post";

      const res = await axios({
        method,
        url: "/api/userportfolio/main",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert(isUpdate ? "Updated successfully!" : "Created successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }}
    >
      <div className="relative z-10 text-white p-10 max-w-xl">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent px-2 py-1 focus:outline-none text-black text-3xl w-full placeholder-black"
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
          <h2 className="text-xl font-bold text-black">
            Professional Interests
          </h2>

          {badges.map((badge, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                value={badge}
                onChange={(e) => updateBadge(index, e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                placeholder={`Badge ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeBadge(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addBadge}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded w-max"
          >
            <FaPlus /> Add Badge
          </button>

          <button
            type="submit"
            className="fixed bottom-4 right-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            {isUpdate ? "Update" : "Submit"}
          </button>
        </form>

        <input
          type="file"
          ref={imgRef}
          onChange={handleImageSelect}
          accept="image/*"
          hidden
        />

        <button
          onClick={() => imgRef.current.click()}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Change Background Image
        </button>
      </div>
    </div>
  );
}
