"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"

export default function Education() {
  const [education, setEducation] = useState([{ school: "", degree: "", year: "" }])
  const [isEdit, setIsEdit] = useState(false)

  // 🔹 GET existing education
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get("/api/userportfolio/education")
        if (res.data.data?.length > 0) {
          setEducation(res.data.data)
          setIsEdit(true)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchEducation()
  }, [])

  const handleChange = (index, e) => {
    const { name, value } = e.target
    const updated = [...education]
    updated[index][name] = value
    setEducation(updated)
  }

  const addEducation = () => {
    const last = education[education.length - 1]
    if (!last.school.trim() || !last.degree.trim() || !last.year.trim()) return
    setEducation(prev => [...prev, { school: "", degree: "", year: "" }])
  }

  const removeEducation = index => {
    setEducation(prev => prev.filter((_, i) => i !== index))
  }

  // ✅ check all rows for non-empty fields
  // const validInput = education.every(e => e.school.trim() && e.degree.trim() && e.year.trim())

  const handleSubmit = async e => {
    e.preventDefault()

    const cleanedEducation = education.map(e => ({
      school: e.school.trim(),
      degree: e.degree.trim(),
      year: e.year.trim(),
    }))

    if (cleanedEducation.length === 0) {
      alert("Add at least one education entry")
      return
    }

    try {
      if (isEdit) {
        await axios.put("/api/userportfolio/education", { education: cleanedEducation })
        alert("Education updated")
      } else {
        await axios.post("/api/userportfolio/education", { education: cleanedEducation })
        alert("Education saved")
        setIsEdit(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteSection = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete the entire education section?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete("/api/userportfolio/education");
    setEducation([{ school: "", degree: "", year: "" }]);
    setIsEdit(false);
    alert("Education section deleted");
    navigate("/")
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className="pt-16 h-screen pl-8 md:pl-16 mb-6 " id="Education">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
        {isEdit ? "Update Education" : "Education"}
      </h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6 pb-10">
        {education.map((edu, index) => (
          <div key={index} className="relative w-max">
            {education.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="absolute -top-3 -right-3 bg-white border shadow rounded-lg p-1 text-red-500"
              >
                <FaTimes size={12} />
              </button>
            )}

            <div className="border border-gray-300 rounded px-4 py-3 flex flex-col gap-3">
              <input
                name="degree"
                placeholder="Degree"
                value={edu.degree}
                onChange={e => handleChange(index, e)}
                className="w-[450px] border px-2 py-1 rounded"
              />
              <input
                name="year"
                placeholder="Year / Duration"
                value={edu.year}
                onChange={e => handleChange(index, e)}
                className="w-[450px] border px-2 py-1 rounded"
              />
              <input
                name="school"
                placeholder="School"
                value={edu.school}
                onChange={e => handleChange(index, e)}
                className="w-[450px] border px-2 py-1 rounded"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addEducation}
          className="text-blue-600 font-semibold border border-blue-600 px-3 py-2 rounded w-max"
        >
          + Add Education
        </button>

        <button
          type="submit"
          // disabled={!validInput}
          className={`bg-blue-600 text-white px-4 py-2 rounded mt-22 self-end mr-4 `}
        >
          {isEdit ? "Update" : "Save"}
        </button>
      </form>
     
          <div className="flex justify-end mr-4 relative">
    <button
      type="button"
      onClick={handleDeleteSection}
      className="text-red-600 text-sm  self-end absolute bottom-0 mr-4"
    >
      Delete education section
    </button>
    </div>
  
    </div>
  )
}
