

// 'use client'
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import React, { useRef, useState } from 'react';

// export default function Page() {
//   console.log("create home page");
//   const router = useRouter();
//   const imgRef = useRef(null);

//   const [preview, setPreview] = useState("/assets/placeholderImg.jpg");
//   const [error1, setError1] = useState(null);
//   const [bgFile,setBgFile] =  useState(null)

//   const [formData, setFormData] = useState({
//     name: "",
//     github: "",
//     twitter: "",
//     facebook: "",
//     linkedIn: "",
//     img:"/assets/placeholderImg.jpg"
//   });

//   const handleImageSelect = () => {
//     const file = imgRef.current.files[0];
//     if (file) setPreview(URL.createObjectURL(file));
//     setBgFile(file);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent page reload

    
//     const payload = new FormData();
//     payload.append("name", formData.name);  
//     if (bgFile) {
//       payload.append("img", bgFile); // ✅ append real file
//     }
//     try {
//          const res = await axios.post("/api/userportfolio/profile", payload, {
//          headers: {
//            "Content-Type": "multipart/form-data",
//          },
//        });
//          console.log(res.data);
//        } catch (error) {
//          console.error(error);
//        }
//   };

//   return (
//     <div className="min-h-screen pl-12 max-w-md flex flex-col justify-center mt-16 mb-10 items-center   relative">
//       <h1 className="text-2xl font-semibold mb-4">Profile Page</h1>

//       <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full relative">

//         {/* Profile Image */}
//         <div
//           className="h-[90px] w-[90px] rounded-full border overflow-hidden cursor-pointer"
//           onClick={() => imgRef.current.click()}  // click circle to open file picker
//         >
//           {preview ? (
//             <img
//               src={preview}
//               className="h-full w-full object-cover"
//               alt="Profile"
//             />
//           ) : (
//             <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">
//               Profile Image
//             </div>
//           )}
//         </div>

//         {/* Hidden file input */}
//         <input
//           type="file"
//           ref={imgRef}
//           onChange={handleImageSelect}
//           className="hidden"
//           accept="image/*"
//         />

//         {/* Username */}
//         <div className="flex flex-col gap-1 w-full">
//           <label className="font-normal">Your Name</label>
//           <input
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="border  border-gray-300 p-2 rounded w-full"
//           />
//         </div>

//         {/* Github */}
//         <div className="flex flex-col gap-1 w-full">
//           <label className="font-normal">Github URL</label>
//           <input
//             name="github"
//             type="text"
//             value={formData.github}
//             onChange={handleChange}
//             className="border border-gray-300  p-2 rounded w-full"
//           />
//         </div>

//         {/* Twitter */}
//         <div className="flex flex-col gap-1 w-full">
//           <label className="font-normal">Twitter URL</label>
//           <input
//             name="twitter"
//             type="text"
//             value={formData.twitter}
//             onChange={handleChange}
//             className="border border-gray-300  p-2 rounded w-full"
//           />
//         </div>

//         {/* Facebook */}
//         <div className="flex flex-col gap-1 w-full">
//           <label className="font-md">Facebook URL</label>
//           <input
//             name="facebook"
//             type="text"
//             value={formData.facebook}
//             onChange={handleChange}
//             className="border border-gray-300  p-2 rounded w-full"
//           />
//         </div>

//         {/* LinkedIn */}
//         <div className="flex flex-col gap-1 w-full">
//           <label className="font-normal">LinkedIn URL</label>
//           <input
//             name="linkedIn"
//             type="text"
//             value={formData.linkedIn}
//             onChange={handleChange}
//             className="border border-gray-300  p-2 rounded w-full"
//           />
//         </div>

//         {/* Error message */}
//         {error1 && <p className="text-rose-500">{error1}</p>}

//         {/* Submit button fixed at bottom-right */}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 rounded fixed bottom-10 right-12 shadow-lg"
//         >
//           Submit
//         </button>

//       </form>
//     </div>
//   );
// }

'use client'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useRef, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const imgRef = useRef(null);

  const [preview, setPreview] = useState("/assets/placeholderImg.jpg");
  const [bgFile, setBgFile] = useState(null);
  const [error1, setError1] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    gitHubUrl: "",
    twitterUrl: "",
    facebookUrl: "",
    linkedInUrl: "",
    img: "/assets/placeholderImg.jpg",
  });

  const handleImageSelect = () => {
    const file = imgRef.current.files[0];
    if (file) setPreview(URL.createObjectURL(file));
    setBgFile(file);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      setError1("Name is required");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("gitHubUrl", formData.gitHubUrl);
    payload.append("twitterUrl", formData.twitterUrl);
    payload.append("facebookUrl", formData.facebookUrl);
    payload.append("linkedInUrl", formData.linkedInUrl);

    if (bgFile) {
      payload.append("img", bgFile); // existing image setup
    }

    try {
      const res = await axios.post("/api/userportfolio/profile", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      setError1(null);
    alert("submitted")
      router.refresh();
    } catch (error) {
      console.error("Profile submit error:", error);
      setError1("Failed to submit profile. Try again.");
    }
  };

  return (
    <div className="min-h-screen pl-12 max-w-md flex flex-col justify-center mt-16 mb-10 items-center relative">
      <h1 className="text-2xl font-semibold mb-4">Profile Page</h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full relative">

        {/* Profile Image */}
        <div
          className="h-[90px] w-[90px] rounded-full border overflow-hidden cursor-pointer"
          onClick={() => imgRef.current.click()}
        >
          <img
            src={preview}
            className="h-full w-full object-cover"
            alt="Profile"
          />
        </div>

        <input
          type="file"
          ref={imgRef}
          onChange={handleImageSelect}
          className="hidden"
          accept="image/*"
        />

        {/* Name */}
        <div className="flex flex-col gap-1 w-full">
          <label>Your Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Github */}
        <div className="flex flex-col gap-1 w-full">
          <label>Github URL</label>
          <input
            name="gitHubUrl"
            value={formData.gitHubUrl}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Twitter */}
        <div className="flex flex-col gap-1 w-full">
          <label>Twitter URL</label>
          <input
            name="twitterUrl"
            value={formData.twitterUrl}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Facebook */}
        <div className="flex flex-col gap-1 w-full">
          <label>Facebook URL</label>
          <input
            name="facebookUrl"
            value={formData.facebookUrl}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* LinkedIn */}
        <div className="flex flex-col gap-1 w-full">
          <label>LinkedIn URL</label>
          <input
            name="linkedInUrl"
            value={formData.linkedInUrl}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {error1 && <p className="text-rose-500">{error1}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded fixed bottom-10 right-12 shadow-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
