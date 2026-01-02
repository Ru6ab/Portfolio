
"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import axios from "axios";

export default function LanguagesForm() {
  const [formData, setFormData] = useState([
    { name: "", percentage: 50 },
  ]);
  const [isEdit, setIsEdit] = useState(false);

  const barRefs = useRef([]);
  const draggingIndex = useRef(null);

  // -----------------------------
  // FETCH EXISTING LANGUAGES
  // -----------------------------
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get("/api/userportfolio/language");

        if (res.data?.data?.length) {
          const formatted = res.data.data.map((l) => ({
            name: l.name || "",
            percentage:
              typeof l.percentage === "number" ? l.percentage : 50,
          }));

          setFormData(formatted);
          setIsEdit(true);
        }
      } catch (err) {
        console.log("Fetch error:", err.response?.data || err.message);
      }
    };

    fetchLanguages();
  }, []);

  // -----------------------------
  // DRAGGING LOGIC
  // -----------------------------
  const handleMouseDown = (index) => {
    draggingIndex.current = index;
  };

  const handleMouseUp = () => {
    draggingIndex.current = null;
  };

  const handleMouseMove = (e) => {
    if (draggingIndex.current === null) return;

    const index = draggingIndex.current;
    const bar = barRefs.current[index];
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    let newPercentage = ((e.clientX - rect.left) / rect.width) * 100;
    newPercentage = Math.max(0, Math.min(100, newPercentage));

    const updated = [...formData];
    updated[index].percentage = Math.round(newPercentage);
    setFormData(updated);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [formData]);

  // -----------------------------
  // INPUT HANDLERS
  // -----------------------------
  const handleNameChange = (index, value) => {
    const updated = [...formData];
    updated[index].name = value;
    setFormData(updated);
  };

  const handleAdd = () => {
    setFormData([...formData, { name: "", percentage: 50 }]);
  };

  const handleRemove = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  // -----------------------------
  // SUBMIT (POST / PUT)
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedLanguages = formData
      .map((l) => ({
        name: l.name.trim(),
        percentage: Number(l.percentage),
      }))
      .filter(
        (l) =>
          l.name &&
          !Number.isNaN(l.percentage) &&
          l.percentage >= 0 &&
          l.percentage <= 100
      );

    if (cleanedLanguages.length === 0) {
      alert("Please add at least one valid language");
      return;
    }

    try {
      const method = isEdit ? "put" : "post";

      await axios[method](
        "/api/userportfolio/language",
        { language: cleanedLanguages },
        { withCredentials: true }
      );

      alert(isEdit ? "Languages updated" : "Languages saved");
      setIsEdit(true);
    } catch (err) {
      console.log("Save error:", err.response?.data || err.message);
    }
  };
   const handleDeleteSection = async () => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the entire language section?"
      );
      if (!confirmDelete) return;
    
      try {
        await axios.delete("/api/userportfolio/language");
        setFormData([]);
        setIsEdit(false);
        alert("language section deleted");
        navigate("/")
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="pt-16 pl-8 md:pl-16">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
        {isEdit ? "Update Languages" : "Languages"}
      </h1>
      <div className="border-b-4 border-blue-500 w-[55px] mb-6" />

      <form onSubmit={handleSubmit} className="w-full max-w-xl relative">
        {formData.map((lang, index) => (
          <div key={index} className="relative mb-8 w-[350px]">
            <div className="border border-gray-300 rounded-lg p-4 relative">
              {formData.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute -top-3 -right-3 bg-white border shadow
                             rounded-full p-1 text-red-500"
                >
                  <FaTimes size={12} />
                </button>
              )}

              <input
                type="text"
                placeholder={`Language ${index + 1}`}
                value={lang.name}
                onChange={(e) =>
                  handleNameChange(index, e.target.value)
                }
                className="w-full border px-3 py-2 rounded focus:outline-none
                           focus:ring-2 focus:ring-blue-300"
              />

              <div className="font-semibold mt-3">
                {lang.percentage}%
              </div>

              <div
                ref={(el) => (barRefs.current[index] = el)}
                className="w-[300px] h-6 bg-gray-200 rounded-full
                           relative cursor-pointer mt-2"
                onMouseDown={() => handleMouseDown(index)}
              >
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${lang.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 text-blue-600 font-semibold
                     px-3 py-2 border border-blue-600 rounded w-max"
        >
          <FaPlus /> Add Language
        </button>

        <div className="relative w-full mt-8 pb-10">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded
                       absolute right-4 -bottom-24"
          >
            {isEdit ? "Update" : "Submit"}
          </button>
        </div>
      </form>
             <div className="flex justify-end mr-4 relative">
    <button
      type="button"
      onClick={handleDeleteSection}
      className="text-red-600 text-sm  self-end absolute bottom-0 mr-4"
    >
      Delete language section
    </button>
    </div>
    </div>
  );
}


 

 

