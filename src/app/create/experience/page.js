"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

export default function ExperienceInputs() {
  const [experiences, setExperiences] = useState([
    {
      designation: "",
      organization: "",
      duration: "",
      topics: [""],
    },
  ]);
  const [isEdit, setIsEdit] = useState(false);

  // 🔹 Fetch existing experience ON LOAD
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get("/api/userportfolio/experience");

        if (res.data.data?.length) {
          const formatted = res.data.data.map((item) => ({
            designation: item.designation || "",
            organization: item.organization || "",
            duration: item.duration || "",
            topics: item.topics?.length ? item.topics : [""],
          }));
          console.log(res.data.data)
          setExperiences(formatted);
          setIsEdit(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchExperience();
  }, []);

  // 🔹 Handle input change
  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  // 🔹 Topic handlers
  const handleTopicChange = (expIndex, topicIndex, value) => {
    const updated = [...experiences];
    updated[expIndex].topics[topicIndex] = value;
    setExperiences(updated);
  };

  const addTopic = (expIndex) => {
    const updated = [...experiences];
    updated[expIndex].topics.push("");
    setExperiences(updated);
  };

  const removeTopic = (expIndex, topicIndex) => {
    const updated = [...experiences];
    updated[expIndex].topics = updated[expIndex].topics.filter(
      (_, i) => i !== topicIndex
    );
    setExperiences(updated);
  };

  // 🔹 Add / Remove experience
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        designation: "",
        organization: "",
        duration: "",
        topics: [""],
      },
    ]);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = isEdit ? "put" : "post";

      await axios[method]("/api/userportfolio/experience", {
        experience: experiences,
      });

      alert(isEdit ? "Experience updated" : "Experience saved");
      setIsEdit(true);
    } catch (error) {
      console.log(error);
    }
  };
    const handleDeleteSection = async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete the entire experience section?"
        );
        if (!confirmDelete) return;
      
        try {
          await axios.delete("/api/userportfolio/experience");
          setExperiences([]);
          setIsEdit(false);
          alert("experience section deleted");
          navigate("/")
        } catch (err) {
          console.log(err);
        }
      }

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10" id="Experience">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
        {isEdit ? "Update Experience" : "Experience"}
      </h1>
      <div className="border-b-4 border-blue-500 w-[55px]" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col pt-8 gap-6 w-full max-w-md"
      >
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative border border-gray-300 p-4 rounded"
          >
            <input
              type="text"
              placeholder="Designation"
              value={exp.designation}
              onChange={(e) =>
                handleChange(index, "designation", e.target.value)
              }
              className="w-full border px-3 py-2 rounded mb-2"
            />

            <input
              type="text"
              placeholder="Organization"
              value={exp.organization}
              onChange={(e) =>
                handleChange(index, "organization", e.target.value)
              }
              className="w-full border px-3 py-2 rounded mb-2"
            />

            <input
              type="text"
              placeholder="Duration (e.g. 2022 - 2024)"
              value={exp.duration}
              onChange={(e) =>
                handleChange(index, "duration", e.target.value)
              }
              className="w-full border px-3 py-2 rounded mb-3"
            />

            <p className="font-semibold mb-1">Topics</p>

            {exp.topics.map((topic, tIndex) => (
              <div key={tIndex} className="relative mb-2">
                <input
                  type="text"
                  placeholder={`Topic ${tIndex + 1}`}
                  value={topic}
                  onChange={(e) =>
                    handleTopicChange(index, tIndex, e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded"
                />

                {exp.topics.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTopic(index, tIndex)}
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
              onClick={() => addTopic(index)}
              className="flex items-center gap-2 text-blue-600 font-semibold
                         px-3 py-1 border border-blue-600 rounded w-max mt-2"
            >
              <FaPlus /> Add Topic
            </button>

            {experiences.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="absolute -right-3 -top-3
                           bg-white border shadow rounded-full p-[4px]
                           text-red-500"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-2 text-blue-600 font-semibold
                     px-3 py-2 border border-blue-600 rounded w-max"
        >
          <FaPlus /> Add More Experience
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
      Delete experience section
    </button>
    </div>
    </div>
  );
}
