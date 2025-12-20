"use client";
import axios from "axios";
import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

export default function Badges({ nameProp, bgImg }) {
  const [badges, setBadges] = useState([]);

  const handleBadgeChange = (index, value) => {
    const updated = [...badges];
    updated[index] = value;
    setBadges(updated);
  };

  const addBadge = () => {
    setBadges((prev) => [...prev, ""]);
  };

  const removeBadge = (index) => {
    setBadges((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: nameProp,
      img: bgImg,
      badges,
    };

    await axios.post("/api/userportfolio", payload);
    alert("Submitted!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col gap-3 bg-white/10 p-5 rounded-lg backdrop-blur-md w-[350px]"
    >
      <h2 className="text-lg font-bold">Badges</h2>

      {badges.map((badge, index) => (
        <div key={index} className="relative">
          <input
            value={badge}
            onChange={(e) => handleBadgeChange(index, e.target.value)}
            className="w-full border px-3 py-2 rounded text-black"
            placeholder={`Badge ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => removeBadge(index)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
          >
            <FaTimes size={12} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addBadge}
        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded"
      >
        <FaPlus /> Add Badge
      </button>

      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-2 rounded mt-2"
      >
        Submit
      </button>
    </form>
  );
}
