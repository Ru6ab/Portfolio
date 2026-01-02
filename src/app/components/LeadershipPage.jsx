'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function LeadershipForm() {
  const [leadership, setLeadership] = useState([{ school: "", degree: "", year: "" }]);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const res = await axios.get('/api/userportfolio/leadership');
        if (res.data?.data?.length) {
          setLeadership(res.data.data);
          setIsEdit(true);
        }
      } catch (err) {
        console.error('Failed to fetch leadership:', err.response?.data || err.message);
      }
    };
    fetchLeadership();
  }, []);

 const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...leadership];
    updated[index][name] = value;
    setLeadership(updated);
  };

  const addLeadership = () => {
    setLeadership(prev => [...prev, { school: "", degree: "", year: "" }]);
  };

  const removeLeadership = (index) => {
    setLeadership(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clean and validate inputs
    const cleaned = leadership.map(l => ({
      school: l.school.trim(),
      degree: l.degree.trim(),
      year: l.year.trim(),
    })).filter(l => l.school && l.degree && l.year);

    if (cleaned.length === 0) {
      alert('All leadership fields are required');
      return;
    }

    try {
      const method = isEdit ? 'put' : 'post';
      const res = await axios[method]('/api/userportfolio/leadership', { leadership: cleaned });
      console.log('Response:', res.data);
      alert(isEdit ? 'Leadership updated' : 'Leadership saved');
      setIsEdit(true);
    } catch (err) {
      console.error('Submission error:', err.response?.data || err.message);
    }
  };
  const handleDeleteSection = async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete the entire leadership section?"
        );
        if (!confirmDelete) return;
      
        try {
          await axios.delete("/api/userportfolio/leadership");
          setLeadership([]);
          setIsEdit(false);
          alert("leadership section deleted");
          
        } catch (err) {
          console.log(err);
        }
      }
  
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
                <label className="font-semibold text-gray-700">Year</label>
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
            {isEdit ? "Update Leadership" : "Submit Leadership"}
          </button>
        </div>
      </form>
         <div className="flex justify-end mr-4 relative">
    <button
      type="button"
      onClick={handleDeleteSection}
      className="text-red-600 text-sm  self-end absolute bottom-0 mr-4"
    >
      Delete leadership section
    </button>
    </div>
    </div>
  );
}
