

// 'use client'
// import Languages from '@/app/components/Languages';
// import React, { useState, useRef, useEffect } from 'react';
// import { FaTimes, FaPlus } from 'react-icons/fa';

// export default function Page() {
//   const [formData, setFormData] = useState([
//     { name: "", percentage: 50 }
//   ]);

//   const barRefs = useRef([]);
//   const draggingIndex = useRef(null);

//   // -----------------------------
//   // DRAGGING LOGIC
//   // -----------------------------
//   const handleMouseDown = (index) => {
//     draggingIndex.current = index;
//   };

//   const handleMouseUp = () => {
//     draggingIndex.current = null;
//   };

//   const handleMouseMove = (e) => {
//     if (draggingIndex.current === null) return;

//     const index = draggingIndex.current;
//     const bar = barRefs.current[index];
//     if (!bar) return;

//     const rect = bar.getBoundingClientRect();
//     let newPercentage = ((e.clientX - rect.left) / rect.width) * 100;
//     newPercentage = Math.max(0, Math.min(100, newPercentage));

//     const updated = [...formData];
//     updated[index].percentage = Math.round(newPercentage);
//     setFormData(updated);
//   };

//   useEffect(() => {
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseup', handleMouseUp);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [formData]);

//   const handleNameChange = (index, value) => {
//     const updated = [...formData];
//     updated[index].name = value;
//     setFormData(updated);
//   };

//   const handleAdd = () => {
//     setFormData([...formData, { name: "", percentage: 50 }]);
//   };

//   const handleRemove = (index) => {
//     setFormData(formData.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = new FormData()
//     payload.append("percentage",percentage)
//     payload.append("name:",name)
//     console.log("Final:", formData);
    
//   };

//   return (
//     <div className="pt-16 pl-8 md:pl-16 ">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">formData</h1>
//       <div className="border-b-4 border-blue-500 w-[55px] mb-6" />

//       <form id="languageForm" onSubmit={handleSubmit} className="w-full max-w-xl relative  ">


//         {formData.map((lang, index) => (
//   <div key={index} className="relative mb-8 w-[350px]">

//     {/* --- BORDERED SECTION --- */}
//     <div className="border border-gray-300 rounded-lg p-4 relative">

//       {/* DELETE BUTTON: top-right outside the border */}
//       {formData.length > 1 && (
//         <button
//           type="button"
//           onClick={() => handleRemove(index)}
//           className="absolute -top-3 -right-3 bg-white border border-gray-300 shadow rounded-full p-1 text-red-500 hover:text-red-700 z-10"
//         >
//           <FaTimes size={12} />
//         </button>
//       )}

//       {/* LANGUAGE INPUT */}
//       <input
//         type="text"
//         placeholder={`Language ${index + 1}`}
//         value={lang.name}
//         onChange={(e) => handleNameChange(index, e.target.value)}
//         className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//       />

//       {/* LABEL ABOVE BAR */}
//       <div className="font-semibold mt-3">
//         {lang.percentage}%
//       </div>

//       {/* PROGRESS BAR */}
//       <div
//         ref={(el) => (barRefs.current[index] = el)}
//         className="w-[300px] h-6 bg-gray-200 rounded-full relative cursor-pointer mt-2"
//         onMouseDown={() => handleMouseDown(index)}
//       >
//         <div
//           className="h-full bg-blue-500 transition-all rounded-full duration-100"
//           style={{ width: `${lang.percentage}%` }}
//         ></div>

//         {/* Drag handle */}
//         <div
//           className="absolute  cursor-grab"
//           style={{
//             left: `${lang.percentage}%`,
//             transform: "translateX(-50%)",
//           }}
//         ></div>
//       </div>

//     </div>
//   </div>
// ))}


//         {/* ADD BUTTON */}
//         <button
//           type="button"
//           onClick={handleAdd}
//           className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded hover:bg-blue-50 w-max"
//         >
//           <FaPlus /> Add Language
//         </button>

//         {/* SUBMIT */}
   

//       </form>
//            <div className=" relative w-full mt-8   pb-10">
//   <button
//     type="submit"
//     form="languageForm" 
//     className="bg-blue-600 text-white px-4 py-2  rounded absolute right-4 -bottom-24  "
//   >
//     Submit
//   </button>
// </div>
//     </div>
//   );
// }


'use client'
import React, { useState, useRef, useEffect } from 'react'
import { FaTimes, FaPlus } from 'react-icons/fa'
import axios from 'axios'

export default function LanguagesForm() {
  const [formData, setFormData] = useState([{ name: '', percentage: 50 }])
  const barRefs = useRef([])
  const draggingIndex = useRef(null)

  // -----------------------------
  // DRAGGING LOGIC
  // -----------------------------
  const handleMouseDown = (index) => {
    draggingIndex.current = index
  }

  const handleMouseUp = () => {
    draggingIndex.current = null
  }

  const handleMouseMove = (e) => {
    if (draggingIndex.current === null) return
    const index = draggingIndex.current
    const bar = barRefs.current[index]
    if (!bar) return

    const rect = bar.getBoundingClientRect()
    let newPercentage = ((e.clientX - rect.left) / rect.width) * 100
    newPercentage = Math.max(0, Math.min(100, newPercentage))

    const updated = [...formData]
    updated[index].percentage = Math.round(newPercentage)
    setFormData(updated)
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [formData])

  // -----------------------------
  // INPUT HANDLERS
  // -----------------------------
  const handleNameChange = (index, value) => {
    const updated = [...formData]
    updated[index].name = value
    setFormData(updated)
  }

  const handleAdd = () => {
    setFormData([...formData, { name: '', percentage: 50 }])
  }

  const handleRemove = (index) => {
    setFormData(formData.filter((_, i) => i !== index))
  }

  // -----------------------------
  // SUBMIT HANDLER
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Clean payload: ensure name trimmed & percentage is Number
    const payload = formData.map((item) => ({
      name: item.name.trim(),
      percentage: Number(item.percentage),
    }))

    // Basic validation
    if (payload.some((l) => !l.name)) {
      alert('Language name cannot be empty')
      return
    }

    console.log('Final payload:', payload)

    // Send to backend
    try {
      const res = await axios.post('/api/userportfolio/language', payload, {
        withCredentials: true,
      })
      console.log('Response:', res.data)
       alert("submitted")
    } catch (err) {
      console.log('Backend error:', err.response?.data || err.message)
    }
  }

  return (
    <div className="pt-16 pl-8 md:pl-16">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Languages</h1>
      <div className="border-b-4 border-blue-500 w-[55px] mb-6" />

      <form
        id="languageForm"
        onSubmit={handleSubmit}
        className="w-full max-w-xl relative"
      >
        {formData.map((lang, index) => (
          <div key={index} className="relative mb-8 w-[350px]">
            <div className="border border-gray-300 rounded-lg p-4 relative">
              {/* DELETE BUTTON */}
              {formData.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute -top-3 -right-3 bg-white border border-gray-300 shadow rounded-full p-1 text-red-500 hover:text-red-700 z-10"
                >
                  <FaTimes size={12} />
                </button>
              )}

              {/* LANGUAGE INPUT */}
              <input
                type="text"
                placeholder={`Language ${index + 1}`}
                value={lang.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              {/* LABEL ABOVE BAR */}
              <div className="font-semibold mt-3">{lang.percentage}%</div>

              {/* PROGRESS BAR */}
              <div
                ref={(el) => (barRefs.current[index] = el)}
                className="w-[300px] h-6 bg-gray-200 rounded-full relative cursor-pointer mt-2"
                onMouseDown={() => handleMouseDown(index)}
              >
                <div
                  className="h-full bg-blue-500 transition-all rounded-full duration-100"
                  style={{ width: `${lang.percentage}%` }}
                ></div>

                {/* Drag handle */}
                <div
                  className="absolute cursor-grab"
                  style={{
                    left: `${lang.percentage}%`,
                    transform: 'translateX(-50%)',
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {/* ADD BUTTON */}
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded hover:bg-blue-50 w-max"
        >
          <FaPlus /> Add Language
        </button>

        {/* SUBMIT BUTTON */}
        <div className="relative w-full mt-8 pb-10">
          <button
            type="submit"
            form="languageForm"
            className="bg-blue-600 text-white px-4 py-2 rounded absolute right-4 -bottom-24"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}



 

 

