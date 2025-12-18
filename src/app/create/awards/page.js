// 'use client'
// import axios from 'axios';
// import React, { useState } from 'react'
// import { FaTimes } from 'react-icons/fa';
// import Leadership from '../../components3/Leadership'
// export default function page() {
//     const [degrees, setdegrees] = useState([
//     { school: "", degree: "", duration: "" }
//   ]);

//   const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     const newdegrees = [...degrees];
//     newdegrees[index][name] = value;
//     setdegrees(newdegrees);
//   };

//   const adddegrees = () => {
//     setdegrees((prev) => [...prev, { school: "", degree: "", duration: "" }]);
//   };

//   const removedegrees = (index) => {
//     setdegrees((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/userportfolio/degree', degrees);
//       console.log('Response:', res.data);
//           } catch (err) {
//       console.error(err);
      
//     }
//   };
//   return (
//       <div className="pt-16 pl-8 md:pl-16 mb-10" id="degrees">
//        <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Honors & degrees</h1>
//        <div className="border-b-4 border-blue-500 w-[55px]" />
       
       
//         <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6 mb-8 relative">
//                {degrees.map((degrees, index) => (
//                  <div key={index} className="relative w-max ">
//                    {/* X button above border */}
//                    {degrees.length > 1 && (
//                      <button
//                        type="button"
//                        onClick={() => removedegrees(index)}
//                        className="absolute -top-3 -right-3 bg-white border border-gray-300 rounded-full p-1 text-red-500 hover:text-red-700 z-10"
//                      >
//                        <FaTimes size={12} />
//                      </button>
//                    )}
       
//                    {/* Section Border */}
//                    <div className="border border-gray-300 rounded px-4 py-3 flex flex-col gap-3">
//                      {/* degree */}
//                      <div className="flex flex-col gap-1">
//                        <label className="font-semibold text-gray-700">Award</label>
//                        <input
//                          className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm"
//                          value={degrees.degree}
//                          type="text"
//                          name="degree"
//                          onChange={(e) => handleChange(index, e)}
//                        />
//                      </div>
       
//                      {/* Duration */}
//                      <div className="flex flex-col gap-1">
//                        <label className="font-semibold text-gray-700">Duration</label>
//                        <input
//                          className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm"
//                          value={degrees.duration}
//                          type="text"
//                          name="duration"
//                          onChange={(e) => handleChange(index, e)}
//                        />
//                      </div>
       
//                      {/* School */}
//                      <div className="flex flex-col gap-1">
//                        <label className="font-semibold text-gray-700">School</label>
//                        <input
//                          className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm italic"
//                          value={degrees.school}
//                          type="text"
//                          name="school"
//                          onChange={(e) => handleChange(index, e)}
//                        />
//                      </div>
//                    </div>
//                  </div>
//                ))}
       
//                {/* Add degrees Button */}
//                <button
//                  type="button"
//                  onClick={adddegrees}
//                  className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded hover:bg-blue-50 w-max mt-2"
//                >
//                  + Add degrees
//                </button>
       
//                {/* Submit Button */}
//                <button
//                  type="submit"
//                  className="bg-blue-600 text-white p-2 rounded absolute bottom-0 right-12"
//                >
//                  Submit
//                </button>
//              </form>

//           <Leadership/>
//        </div>
//   )
// }

'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Leadership from '../../components3/Leadership';

export default function Page() {
  const [award, setAward] = useState([
    { school: "", degree: "", duration: "" }
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...award];
    updated[index][name] = value;
    setAward(updated);
  };

  const addAward = () => {
    setAward(prev => [...prev, { school: "", degree: "", duration: "" }]);
  };

  const removeAward = (index) => {
    setAward(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/userportfolio/award', award);
      console.log('Response:', res.data);
       alert("submitted")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10" id="degrees">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Honors & Degrees</h1>
      <div className="border-b-4 border-blue-500 w-[55px]" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6 relative">

        {award.map((awrd, index) => (
          <div key={index} className="relative w-max">

            {/* Remove button */}
            {award.length > 1 && (
              <button
                type="button"
                onClick={() => removeAward(index)}
                className="absolute -top-3 -right-3 bg-white border border-gray-300 rounded-full p-1 text-red-500 hover:text-red-700 z-10"
              >
                <FaTimes size={12} />
              </button>
            )}

            <div className="border border-gray-300 rounded px-4 py-3 flex flex-col gap-3">

              {/* Award / Degree */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Award</label>
                <input
                  className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm"
                  value={awrd.degree}
                  type="text"
                  name="degree"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              {/* Duration */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Duration</label>
                <input
                  className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm"
                  value={awrd.duration}
                  type="text"
                  name="duration"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              {/* School */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">School</label>
                <input
                  className="w-[450px] border border-gray-300 rounded px-2 py-1 text-sm italic"
                  value={awrd.school}
                  type="text"
                  name="school"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

            </div>
          </div>
        ))}

        {/* Add Button */}
        <button
          type="button"
          onClick={addAward}
          className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded hover:bg-blue-50 w-max mt-2"
        >
          + Add Degrees
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded absolute bottom-0 right-12"
        >
          Submit
        </button>
      </form>

      <Leadership />
    </div>
  );
}

