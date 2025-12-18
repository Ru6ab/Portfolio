// import React from 'react'
// import { FaTimes } from 'react-icons/fa'

// export default function page() {
//   return (
//       <div className="pt-16 pl-8 md:pl-16 mb-10" id="Education">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Skills</h1>
//       <div className="border-b-2 border-blue-500 w-[55px]" />
      
//       {/* <div className='flex flex-row gap-[px]'>
//       <div className='pt-8 relative w-[250px]'>
//         <input className='bg-gray-300 border-gray-300 px-2 py-1 rounded-[4px]  outline-focus:none' placeholder='skill 1'/>
//         <FaTimes size={12} className='absolute top-8 right-13'/>
//       </div>

//             <div className='pt-8 relative w-[250px]'>
//         <input className='bg-gray-300 border-gray-300 px-2 py-1 rounded-[4px]  outline-focus:none' placeholder='skill 1'/>
//         <FaTimes size={12} className='absolute top-8 right-13'/>
//       </div>
//             <div className='pt-8 relative w-[250px]'>
//         <input className='bg-gray-300 border-gray-300 px-2 py-1 rounded-[4px]  outline-focus:none' placeholder='skill 1'/>
//         <FaTimes size={12} className='absolute top-8 right-13'/>
//       </div>
//       </div> */}
//       <div className="flex flex-row gap-4"> {/* add gap-x if you want spacing between inputs */}
//   {[1,2,3].map((_, idx) => (
//     <div key={idx} className="relative w-[250px]">
//       <input
//         className="bg-gray-300 border border-gray-300 px-2 py-1 rounded-[4px] w-full"
//         placeholder={`Skill ${idx+1}`}
//       />
//       <FaTimes
//         size={12}
//         className="absolute top-1 right-2 text-gray-700 cursor-pointer"
//       />
//     </div>
//   ))}
// </div>

//       </div>
//   )
// }

'use client'
import axios from "axios";
import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

export default function SkillInputs() {
  const [skills, setSkills] = useState([""]); // start with one input

  const handleChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleRemove = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setSkills([...skills, ""]);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
    const res = await axios.post("/api/userportfolio/skill",skills)
    console.log(res.data)
    alert("submitted")
    }catch(error){
      console.log(error)
    }
  };

  return (
     <div className="pt-16 pl-8 md:pl-16 mb-10" id="Education">
       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Skills</h1>
       <div className="border-b-4 border-blue-500 w-[55px]" />

    <form onSubmit={handleSubmit} className="flex flex-col pt-8 gap-4 w-full max-w-md">
      {/* {skills.map((skill, index) => (
        <div key={index} className="relative w-full">
          <input
            type="text"
            placeholder={`Skill ${index + 1}`}
            value={skill}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          {skills.length > 1 && (
            <FaTimes
              onClick={() => handleRemove(index)}
              className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-500 cursor-pointer "
              size={14}
            />
          )}
        </div>
      ))} */}
      
      {skills.map((skill, index) => (
  <div key={index} className="relative w-full">
    <input
      type="text"
      placeholder={`Skill ${index + 1}`}
      value={skill}
      onChange={(e) => handleChange(index, e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-gray-200"
    />

    {skills.length > 1 && (
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 
                   bg-white border border-gray-300 shadow 
                   rounded-full p-[3px] text-red-500 hover:text-red-700"
      >
        <FaTimes size={12} />
      </button>
    )}
  </div>
))}


      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded hover:bg-blue-50 w-max"
      >
        <FaPlus /> Add More
      </button>

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
