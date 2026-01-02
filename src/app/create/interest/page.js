"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { FaTimes, FaPlus } from "react-icons/fa"

export default function Interest() {
  const [interest, setInterest] = useState([""])
  const [isEdit, setIsEdit] = useState(false)
  const isDisabled = interest.every(item => !item.trim())

  // ================= GET =================
  useEffect(() => {
    const fetchInterest = async () => {
      try {
        const res = await axios.get("/api/userportfolio/interest")
        if (res.data.data.length > 0) {
          setInterest(res.data.data)
          setIsEdit(true)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchInterest()
  }, [])

  const handleChange = (index, value) => {
    const updated = [...interest]
    updated[index] = value
    setInterest(updated)
  }

  const handleRemove = (index) => {
    setInterest(interest.filter((_, i) => i !== index))
  }

  const handleAdd = () => {
    setInterest([...interest, ""])
  }

  // ================= POST / PUT =================
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { interest }

      if (isEdit) {
        await axios.put("/api/userportfolio/interest", payload)
        alert("Interest updated")
        } else {
        await axios.post("/api/userportfolio/interest", payload)
        alert("Interest saved")
        setIsEdit(true)
      }
    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    }
  }
    const handleDeleteSection = async () => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the entire interest section?"
      );
      if (!confirmDelete) return;
    
      try {
        await axios.delete("/api/userportfolio/interest");
        setInterest([]);
        setIsEdit(false);
        alert("interest section deleted");
        navigate("/")
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Interests</h1>
      <div className="border-b-4 border-blue-500 w-[55px]" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col pt-8 gap-4 w-full max-w-md"
      >
        {interest.map((value, index) => (
          <div key={index} className="relative w-full">
            <input
              type="text"
              placeholder={`Interest ${index + 1}`}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-[4px]"
            />

            {interest.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 
                           bg-white border border-gray-300 shadow 
                           rounded-full p-[3px] text-red-500"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded w-max"
        >
          <FaPlus /> Add More
        </button>

        <button
          type="submit"
          disabled={isDisabled}
          className={`p-2 rounded self-end ${
    isDisabled
      ? "bg-blue-100 cursor-not-allowed"
      : "bg-blue-600 text-white"
  }`}
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
      Delete interest section
    </button>
    </div>
    </div>
  )
}
