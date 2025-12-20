'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa';

export default function LeadershipForm() {
  const [leadership, setLeadership] = useState([
    { school: "", degree: "", year: "" }
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newLeadership = [...leadership];
    newLeadership[index][name] = value;
    setLeadership(newLeadership);
  };

  const addLeadership = () => {
    setLeadership((prev) => [...prev, { school: "", degree: "", year: "" }]);
  };

  const removeLeadership = (index) => {
    setLeadership((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("leadership sent value:",leadership)
      const res = await axios.post('/api/userportfolio/leadership', leadership);
      console.log('Response:', res.data);
       alert("submitted")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-16 mb-10" id="Leadership">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Leadership</h1>
      <div className="border-b-4 border-blue-500 w-[55px]" />
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
        {leadership.map((lead, index) => (
          <div key={index} className="relative w-full max-w-2xl">
            {leadership.length > 1 && (
              <button
                type="button"
                onClick={() => removeLeadership(index)}
                className="absolute -top-3 -right-3 bg-white border border-gray-300 rounded-full p-1 text-red-500 hover:text-red-700 z-10 shadow-sm"
              >
                <FaTimes size={12} />
              </button>
            )}
            
            <div className="border border-gray-300 rounded-lg px-4 py-3 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Position/Role</label>
                <input
                  className="w-full max-w-[450px] border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lead.degree}
                  type="text"
                  name="degree"
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g., Student Council President"
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">year</label>
                <input
                  className="w-full max-w-[450px] border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lead.year}
                  type="text"
                  name="year"
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g., 2023 - 2025"
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">School/Institution</label>
                <input
                  className="w-full max-w-[450px] border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 italic"
                  value={lead.school}
                  type="text"
                  name="school"
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g., XYZ High School"
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addLeadership}
          className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded hover:bg-blue-50 w-max self-start"
        >
          + Add Leadership
        </button>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
