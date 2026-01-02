"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

export default function SkillInputs() {
  const [skills, setSkills] = useState([""]);
  const [isEdit, setIsEdit] = useState(false);

  // 🔹 Fetch existing skills ON LOAD
 useEffect(() => {
  const fetchSkills = async () => {
    try {
      const res = await axios.get("/api/userportfolio/skill")
      setSkills(res.data.data.length ? res.data.data : [""])
      setIsEdit(res.data.data.length > 0)
    } catch (err) {
      console.log(err)
    }
  }
  fetchSkills()
}, [])


  const handleChange = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const handleRemove = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setSkills([...skills, ""]);
  };

  // 🔹 POST (create) or PUT (replace)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = isEdit ? "put" : "post";

      const res = await axios[method]("/api/userportfolio/skill", {
        skill: skills,
      });

      console.log(res.data);
      alert(isEdit ? "Skills updated" : "Skills saved");
      setIsEdit(true); // after first save → edit mode
    } catch (error) {
      console.log(error);
    }
  };
    const handleDeleteSection = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the entire skill section?"
    );
    if (!confirmDelete) return;
  
    try {
      await axios.delete("/api/userportfolio/skill");
      setSkills([]);
      setIsEdit(false);
      alert("skill section deleted");
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10" id="Skills">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
        {isEdit ? "Update Skills" : "Skills"}
      </h1>
      <div className="border-b-4 border-blue-500 w-[55px]" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col pt-8 gap-4 w-full max-w-md"
      >
        {skills.map((skill, index) => (
          <div key={index} className="relative w-full">
            <input
              type="text"
              placeholder={`Skill ${index + 1}`}
              value={skill}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-[4px]"
            />

            {skills.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 
                           bg-white border shadow rounded-full p-[3px]
                           text-red-500"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 text-blue-600 font-semibold
                     px-3 py-2 border border-blue-600 rounded w-max"
        >
          <FaPlus /> Add More
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded self-end mt-4"
        >
          {isEdit ? "Update" : "Submit"}
        </button>
      </form>
            <div className="flex justify-end mr-4 relative">
    <button
      type="button"
      onClick={handleDeleteSection}
      className="text-red-600 text-sm  self-end absolute bottom-0 mr-4"
    >
      Delete skill section
    </button>
    </div>
    </div>
  );
}
