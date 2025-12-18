
'use client'
import axios from "axios";
import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

export default function Interest() {
  const [interest, setInterest] = useState([""]); // start with one input

  const handleChange = (index, value) => {
    const newInterest = [...interest];
    newInterest[index] = value;
    setInterest(newInterest);
  };

  const handleRemove = (index) => {
    setInterest(interest.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setInterest([...interest, ""]);
  };

  const handleSubmit =async (e) => {
     e.preventDefault();
     try{
     const res = await axios.post("/api/userportfolio/interest",interest)
     console.log(res.data)
      alert("submitted")
     }catch(error){
       console.log(error)
     }
   };
 

  return (
     <div className="pt-16 pl-8 md:pl-16 mb-10" id="Education">
       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Interests</h1>
       <div className="border-b-4 border-blue-500 w-[55px]" />

    <form onSubmit={handleSubmit} className="flex flex-col pt-8 gap-4 w-full max-w-md">
           {interest.map((interest, index) => (
  <div key={index} className="relative w-full">
    <input
      type="text"
      placeholder={`Interest ${index + 1}`}
      value={interest}
      onChange={(e) => handleChange(index, e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-gray-200"
    />

    {interest.length > 1 && (
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
