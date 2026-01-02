"use client";
import React, { useEffect, useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import axios from "axios";

export default function ProjectInputs() {
  const [project, setProject] = useState([
    {
      title: "",
      description: "",
      detailedDescription: "",
      contributions: [""],
    },
  ]);
  const [isEdit, setIsEdit] = useState(false);

  // 🔹 Fetch projects on load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/userportfolio/project");
       console.log("hie")
        if (res.data.data?.length) {
            const formatted = res.data.data.map((p) => ({
            title: p.title || "",
            description: p.description || "",
            detailedDescription: p.detailedDescription || "",
            contributions: p.contributions?.length ? p.contributions : [""],
          }));

          console.log(res.data.data)
          setProject(formatted);
          setIsEdit(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
  }, []);

  // 🔹 Handle normal fields
  const handleChange = (index, field, value) => {
    const updated = [...project];
    updated[index][field] = value;
    setProject(updated);
  };

  // 🔹 Contribution handlers
  const handleContributionChange = (pIndex, cIndex, value) => {
    const updated = [...project];
    updated[pIndex].contributions[cIndex] = value;
    setProject(updated);
  };

  const addContribution = (pIndex) => {
    const updated = [...project];
    updated[pIndex].contributions.push("");
    setProject(updated);
  };

  const removeContribution = (pIndex, cIndex) => {
    const updated = [...project];
    updated[pIndex].contributions = updated[pIndex].contributions.filter(
      (_, i) => i !== cIndex
    );
    setProject(updated);
  };

  // 🔹 Add / remove project
  const addProject = () => {
    setProject([
      ...project,
      {
        title: "",
        description: "",
        detailedDescription: "",
        contributions: [""],
      },
    ]);
  };

  const removeProject = (index) => {
    setProject(project.filter((_, i) => i !== index));
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = isEdit ? "put" : "post";

      await axios[method]("/api/userportfolio/project", {
        project,
      });

      alert(isEdit ? "Projects updated" : "Projects saved");
      setIsEdit(true);
    } catch (err) {
      console.log(err);
    }
  };
     const handleDeleteSection = async () => {
          const confirmDelete = window.confirm(
            "Are you sure you want to delete the entire project section?"
          );
          if (!confirmDelete) return;
        
          try {
            await axios.delete("/api/userportfolio/project");
            setProject([]);
            setIsEdit(false);
            alert("project section deleted");
            navigate("/")
          } catch (err) {
            console.log(err);
          }
        }

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10" id="Projects">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
        {isEdit ? "Update Projects" : "Projects"}
      </h1>
      <div className="border-b-4 border-blue-500 w-[55px]" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col pt-8 gap-6 max-w-md"
      >
        {project.map((p, index) => (
          <div key={index} className="relative border p-4 rounded">
            <input
              type="text"
              placeholder="Project Title"
              value={p.title}
              onChange={(e) =>
                handleChange(index, "title", e.target.value)
              }
              className="w-full border px-3 py-2 rounded mb-2 font-semibold"
            />

            <input
              type="text"
              placeholder="Short Description"
              value={p.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="w-full border px-3 py-2 rounded mb-2 italic"
            />

            <textarea
              placeholder="Detailed Description"
              value={p.detailedDescription}
              onChange={(e) =>
                handleChange(index, "detailedDescription", e.target.value)
              }
              rows={4}
              className="w-full border px-3 py-2 rounded mb-3 resize-none"
            />

            <p className="font-semibold mb-1">Contributions</p>

            {p.contributions.map((c, cIndex) => (
              <div key={cIndex} className="relative mb-2">
                <input
                  type="text"
                  value={c}
                  onChange={(e) =>
                    handleContributionChange(
                      index,
                      cIndex,
                      e.target.value
                    )
                  }
                  className="w-full border px-3 py-2 rounded"
                />

                {p.contributions.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      removeContribution(index, cIndex)
                    }
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
              onClick={() => addContribution(index)}
              className="flex items-center gap-2 text-blue-600 font-semibold
                         px-3 py-1 border border-blue-600 rounded w-max mt-2"
            >
              <FaPlus /> Add Contribution
            </button>

            {project.length > 1 && (
              <button
                type="button"
                onClick={() => removeProject(index)}
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
          onClick={addProject}
          className="flex items-center gap-2 text-blue-600 font-semibold
                     px-3 py-2 border border-blue-600 rounded w-max"
        >
          <FaPlus /> Add More Projects
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
      Delete project section
    </button>
    </div>
    </div>
  );
}
