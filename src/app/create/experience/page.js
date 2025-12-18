// 'use client'
// import React, { useState } from 'react'
// import { FaTimes } from 'react-icons/fa';

// export default function page() {
//     const [experience, setExperience] = useState([
//         { organization: "", designation: "", duration: "" ,topic:[""]}
//       ]);
    
//       const handleChange = (index, e) => {
//         const { name, value } = e.target;
//         const newExp = [...experience];
//         newExp[index][name] = value;
//         setExperience(newExp);
//       };
    
//       const addExperience = () => {
//         setExperience((prev) => [...prev, { organization: "", designation: "", duration: "" }]);
//       };
    
//       const removeExperience = (index) => {
//         setExperience((prev) => prev.filter((_, i) => i !== index));
//       };
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           const res = await axios.post('/api/userportfolio/experience', experience);
//           console.log('Response:', res.data);
//           alert('experience submitted successfully!');
//         } catch (err) {
//           console.error(err);
//           alert('Error submitting experience');
//         }
//       };
//   return (
//       <div className="pt-16 pl-8 md:pl-16 mb-10" id="experience">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Experience</h1>
//       <div className="border-b-2 border-blue-500 w-[55px]" />

      
//             <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6 relative">
//               {experience.map((exp, index) => (
//                 <div key={index} className="relative w-max ">
//                   {/* X button above border */}
//                   {experience.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeExperience(index)}
//                       className="absolute -top-3 -right-3 bg-white border border-gray-300 rounded-full p-1 text-red-500 hover:text-red-700 z-10"
//                     >
//                       <FaTimes size={12} />
//                     </button>
//                   )}
      
//                   {/* Section Border */}
//                   <div className="border border-gray-300 rounded px-4 py-3 flex flex-col gap-3">
//                     {/* designation */}
//                     <div className="flex flex-col gap-1">
//                       <label className="font-semibold text-gray-700">designation</label>
//                       <input
//                         className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm"
//                         value={exp.designation}
//                         type="text"
//                         name="designation"
//                         onChange={(e) => handleChange(index, e)}
//                       />
//                     </div>
      
//                     {/* Duration */}
//                     <div className="flex flex-col gap-1">
//                       <label className="font-semibold text-gray-700">Duration</label>
//                       <input
//                         className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm"
//                         value={exp.duration}
//                         type="text"
//                         name="duration"
//                         onChange={(e) => handleChange(index, e)}
//                       />
//                     </div>
      
//                     {/* organization */}
//                     <div className="flex flex-col gap-1">
//                       <label className="font-semibold text-gray-700">organization</label>
//                       <input
//                         className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm italic"
//                         value={exp.organization}
//                         type="text"
//                         name="organization"
//                         onChange={(e) => handleChange(index, e)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
      
//               {/* Add experience Button */}
//               <button
//                 type="button"
//                 onClick={addExperience}
//                 className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded hover:bg-blue-50 w-max mt-2"
//               >
//                 + Add Experience
//               </button>
      
//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white p-2 rounded absolute bottom-0 right-12"
//               >
//                 Submit
//               </button>
//             </form>
      
//       </div>
//   )
// }

'use client'
import React, { useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import axios from 'axios';

export default function ExperiencePage() {
  const [experience, setExperience] = useState([
    { organization: "", designation: "", duration: "", topic: [""] }
  ]);

  // Handle input change for organization, designation, duration
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newExp = [...experience];
    newExp[index][name] = value;
    setExperience(newExp);
  };
  
  
  // Handle topic change
  const handleTopicChange = (expIndex, topicIndex, value) => {
    const newExp = [...experience];
    newExp[expIndex].topic[topicIndex] = value;
    setExperience(newExp);
  };

  // Add new topic
  const addTopic = (expIndex) => {
    const newExp = [...experience];
    newExp[expIndex].topic.push("");
    setExperience(newExp);
  };

  // Remove topic
  const removeTopic = (expIndex, topicIndex) => {
    const newExp = [...experience];
    newExp[expIndex].topic = newExp[expIndex].topic.filter((_, i) => i !== topicIndex);
    setExperience(newExp);
  };

  // Add new experience
  const addExperience = () => {
    setExperience(prev => [...prev, { organization: "", designation: "", duration: "", topic: [""] }]);
  };

  // Remove experience
  const removeExperience = (index) => {
    setExperience(prev => prev.filter((_, i) => i !== index));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/userportfolio/experience', experience);
      console.log('Response:', res.data);
       alert("submitted")
      } catch (err) {
      console.error(err);
      console.log(error)
    }
  };

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10" id="experience">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Experience</h1>
      <div className="border-b-4 border-blue-500 w-[55px]" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8 relative">
        {experience.map((exp, index) => (
          <div key={index} className="relative w-max mb-4">
            {/* X button above border */}
            {experience.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="absolute -top-3 -right-3 bg-white border border-gray-300 rounded-full p-1 text-red-500 hover:text-red-700 z-10"
              >
                <FaTimes size={12} />
              </button>
            )}

            {/* Section Border */}
            <div className="border border-gray-300 rounded px-4 py-3 flex flex-col gap-3">
              {/* designation */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Designation</label>
                <input
                  className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm"
                  value={exp.designation}
                  type="text"
                  name="designation"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              {/* Duration */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Duration</label>
                <input
                  className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm"
                  value={exp.duration}
                  type="text"
                  name="duration"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              {/* Organization */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Organization</label>
                <input
                  className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm italic"
                  value={exp.organization}
                  type="text"
                  name="organization"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              {/* Topics */}
              <div className="flex flex-col gap-2 mt-2">
                <label className="font-semibold text-gray-700">Topics</label>
                {exp.topic.map((topicItem, tIndex) => (
                  <div key={tIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={topicItem}
                      onChange={(e) => handleTopicChange(index, tIndex, e.target.value)}
                      className="w-[400px] border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    {exp.topic.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTopic(index, tIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addTopic(index)}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-700 mt-1"
                >
                  <FaPlus /> Add Topic
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Experience */}
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded hover:bg-blue-50 w-max mt-2"
        >
          + Add Experience
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded absolute bottom-0 right-12"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

