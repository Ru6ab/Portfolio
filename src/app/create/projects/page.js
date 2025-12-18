// 'use client'
// import React, { useState } from 'react';
// import { FaTimes, FaPlus } from 'react-icons/fa';

// export default function ProjectForm() {
//   const [project, setProject] = useState([{
//     title: '',
//     description: '',
//     detailedDescription: '',
//     contributions: [''], // array of strings
//   }]);

 

//    const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     const newProject = [...project];
//     newProject[index][name] = value;
//     setProject(newExp);
//   };
  
//     const handleContributionChange = (projectIndex, conIndex, value) => {
//     const newProject = [...project];
//     newProject[projectIndex].contributions[conIndex] = value;
//     setExperience(newExp);
//   };

//    const addContribution = () => {
//     setFormData((prev) => ({
//       ...prev,
//       contributions: [...prev.contributions, ''],
//     }));
//   };

//   const removeContribution = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       contributions: prev.contributions.filter((_, i) => i !== index),
//     }));
//   };

//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/userportfolio/project', project);
//       console.log('Response:', res.data);
//       } catch (err) {
//       console.error(err);
//       console.log(err)
//     }
//   };

//   return (
//     <div className="mx-auto pt-16 pl-8 md:pl-16 mb-10">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Projects</h1>
//       <div className="border-b-4 border-blue-500 w-[55px]" />

//       <form onSubmit={handleSubmit} className="flex flex-col pt-8 gap-4">
//         {/* Title */}
//         <div className="flex flex-col gap-1">
//           <label className="font-semibold">Project Title</label>
//           <input
//             type="text"
//             name="title"
//             value={project.title}
//             onChange={(e) => handleChange(index, e)}
//             className="w-[450px] border border-gray-300 rounded px-3 py-2 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Short Description */}
//         <div className="flex flex-col gap-1">
//           <label className="font-semibold italic">Short Description</label>
//           <input
//             type="text"
//             name="description"
//             value={project.description}
//             onChange={(e) => handleChange(index, e)}
//             className="w-[450px] border border-gray-300 rounded px-3 py-2 italic focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Detailed Description */}
//         <div className="flex flex-col gap-1">
//           <label className="font-semibold">Detailed Description</label>
//           <textarea
//             name="detailedDescription"
//             value={project.detailedDescription}
//             onChange={(e) => handleChange(index, e)}
//             className="w-[450px] border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows={4}
//           />
//         </div>

//         {/* Contributions */}
//         <div className="flex flex-col gap-2">
//           <label className="font-semibold">Contributions</label>
//           {project.contributions.map((contributions, index) => (
//             <div key={index} className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={contributions}
//                 name={project.contributions}
//                 onChange={(e) => handleContributionChange(index, e.target.value)}
//                 className="w-[450px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeContribution(index)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addContribution}
//             className="flex items-center gap-1 text-blue-500 hover:text-blue-700 mt-2"
//           >
//             <FaPlus /> Add Contribution
//           </button>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 rounded absolute bottom-4 right-12"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }


'use client'
import React, { useState } from 'react'
import { FaTimes, FaPlus } from 'react-icons/fa'
import axios from 'axios'

export default function ProjectForm() {
  const [project, setProject] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    contributions: [''],
  })

  // ----------------------------
  // Handle normal input changes
  // ----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ----------------------------------
  // Handle contribution input changes
  // ----------------------------------
  const handleContributionChange = (index, value) => {
    setProject((prev) => {
      const updated = [...prev.contributions]
      updated[index] = value
      return { ...prev, contributions: updated }
    })
  }

  // ----------------------------
  // Add new contribution field
  // ----------------------------
  const addContribution = () => {
    setProject((prev) => ({
      ...prev,
      contributions: [...prev.contributions, ''],
    }))
  }

  // ----------------------------
  // Remove contribution field
  // ----------------------------
  const removeContribution = (index) => {
    setProject((prev) => ({
      ...prev,
      contributions: prev.contributions.filter((_, i) => i !== index),
    }))
  }

  // ----------------------------
  // Submit form
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/userportfolio/project', project)
      console.log('Response:', res.data)
      alert("submitted")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="mx-auto pt-16 pl-8 md:pl-16 mb-10 relative">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Projects</h1>
      <div className="border-b-4 border-blue-500 w-[55px]" />

      <form onSubmit={handleSubmit} className="flex flex-col  pt-8 gap-4">
        {/* Project Title */}
        <div className="flex flex-col  gap-1">
          <label className="font-semibold">Project Title</label>
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            className="w-[450px] border rounded px-3 py-2 text-xl font-semibold"
          />
        </div>

        {/* Short Description */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold italic">Short Description</label>
          <input
            type="text"
            name="description"
            value={project.description}
            onChange={handleChange}
            className="w-[450px] border rounded px-3 py-2 italic"
          />
        </div>

        {/* Detailed Description */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Detailed Description</label>
          <textarea
            name="detailedDescription"
            value={project.detailedDescription}
            onChange={handleChange}
            rows={4}
            className="w-[450px] border rounded px-3 py-2 resize-none"
          />
        </div>

        {/* Contributions */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Contributions</label>

          {project.contributions.map((contribution, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={contribution}
                onChange={(e) =>
                  handleContributionChange(index, e.target.value)
                }
                className="w-[450px] border rounded px-3 py-2"
              />

              {project.contributions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeContribution(index)}
                  className="text-red-500"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addContribution}
            className="flex items-center gap-1 text-blue-500 mt-2"
          >
            <FaPlus /> Add Contribution
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded w-[150px] mt-6"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
