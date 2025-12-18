'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function Education() {
  const [formData, setFormData] = useState([
    { school: "", degree: "", duration: "" }
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newEdu = [...formData];
    newEdu[index][name] = value;
    setFormData(newEdu);
  };

  const addEducation = () => {
    setFormData(prev => [...prev, { school: "", degree: "", duration: "" }]);
  };

  const removeEducation = (index) => {
    setFormData(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const res = await axios.post('/api/userportfolio/education', formData, {
        headers: { "Content-Type": "application/json" }
      });
      console.log('Response:', res.data);
      alert("submitted")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-6" id="Education">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Education</h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6 pb-10 relative">
        {formData.map((edu, index) => (
          <div key={index} className="relative w-max">
            {formData.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="absolute -top-3 -right-3 bg-white border shadow rounded-lg border-gray-300 p-1 text-red-500 hover:text-red-700 z-10"
              >
                <FaTimes size={12} />
              </button>
            )}

            <div className="border border-gray-300 rounded px-4 py-3 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Degree</label>
                <input
                  className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm"
                  value={edu.degree ?? ""}       // ← fixed
                  type="text"
                  name="degree"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Duration</label>
                <input
                  className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm"
                  value={edu.duration ?? ""}     // ← fixed
                  type="text"
                  name="duration"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">School</label>
                <input
                  className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm italic"
                  value={edu.school ?? ""}       // ← fixed
                  type="text"
                  name="school"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded hover:bg-blue-50 w-max mt-2"
        >
          + Add Education
        </button>

        <div className="flex justify-end pr-6 w-full mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
