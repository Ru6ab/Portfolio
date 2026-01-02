"use client";

import React, { useState, useEffect } from "react";
import PublicationCard from "../../components/Cards";
import { FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";

export default function Page() {
  const [publication, setPublication] = useState([
    { title: "", description: "", status: "" },
  ]);
  const [isEdit, setIsEdit] = useState(false);

  // 🔹 Fetch publications
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await axios.get("/api/userportfolio/publication");

        if (res.data?.data?.length) {
          setPublication(res.data.data);
          setIsEdit(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPublications();
  }, []);

  // 🔹 Handle change
  const handlePublicationChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...publication];
    updated[index][name] = value;
    setPublication(updated);
  };

  // 🔹 Add publication
  const handleAdd = () => {
    setPublication((prev) => [
      ...prev,
      { title: "", description: "", status: "" },
    ]);
  };

  // 🔹 Remove publication
  const handleRemove = (index) => {
    setPublication((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = isEdit ? "put" : "post";

      await axios[method]("/api/userportfolio/publication", {
        publication,
      });

      alert(isEdit ? "Publications updated" : "Publications saved");
      setIsEdit(true);
    } catch (err) {
      console.error(err);
    }
  };
     const handleDeleteSection = async () => {
          const confirmDelete = window.confirm(
            "Are you sure you want to delete the entire publication section?"
          );
          if (!confirmDelete) return;
        
          try {
            await axios.delete("/api/userportfolio/publication");
            setPublication([]);
            setIsEdit(false);
            alert("publication section deleted");
            navigate("/")
          } catch (err) {
            console.log(err);
          }
        }

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
        {isEdit ? "Update Publications" : "Publications"}
      </h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
        {publication.map((pub, idx) => (
          <div
            key={idx}
            className="border p-4 rounded relative max-w-2xl"
          >
            {publication.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute -top-2 -right-2 bg-white border shadow
                           rounded-full p-[4px] text-red-500"
              >
                <FaTimes size={12} />
              </button>
            )}

            <PublicationCard
              index={idx}
              {...pub}
              editable={true}
              handleChange={handlePublicationChange}
            />
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
          className="bg-blue-600 text-white px-6 py-2 rounded
                     self-end mt-4"
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
      Delete publication section
    </button>
    </div>
    </div>
  );
}
