// 'use client'
// import React, { useState } from 'react'
// import PublicationCard from '../../components/Cards'
// import { FaPlus, FaTimes } from 'react-icons/fa';

// export default function Page() {
//   const [publication, setPublication] = useState([
//     { title: '', description: '', status: '' }
//   ]);

//   const handlePublicationChange = (index, e) => {
//     const { name, value } = e.target;
//     const updated = [...publication];
//     updated[index][name] = value;
//     setPublication(updated);
//   };

//   const handleAdd = () => {
//     setPublication([...publication, { title: '', description: '', status: '' }]);
//   };

//   const handleRemove = (index) => {
//     setPublication(publication.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="pt-16 pl-8 md:pl-16 mb-10 md:pr-0" id='Publication'>
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Publications</h1>
//       <div className="border-b-2 border-blue-500 w-[55px]" />

//       <div className='flex flex-col gap-4 mt-6'>
//         {publication.map((pub, idx) => (
//           <div
//             key={idx}
//             className="border border-gray-300 rounded-lg p-4 max-w-min shadow-sm relative"
//           >
//             {/* Remove button only for added publication (not first) */}
//             {idx > 0 && (
//               <button
//                 type="button"
//                 onClick={() => handleRemove(idx)}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//               >
//                 <FaTimes size={12} />
//               </button>
//             )}

//             {/* PublicationCard */}
//             <PublicationCard
//               index={idx}
//               {...pub}
//               handleChange={handlePublicationChange}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Add More button */}
//       <button
//         type="button"
//         onClick={handleAdd}
//         className="mt-10 flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded hover:bg-blue-50 w-max"
//       >
//         <FaPlus /> Add More
//       </button>

//       {/* Submit button */}
//       <button
//         type="submit"
//         className="bg-blue-600 text-white p-2 rounded absolute bottom-4 right-12"
//       >
//         Submit
//       </button>
//     </div>
//   )
// }

'use client'
import React, { useState } from 'react'
import PublicationCard from '../../components/Cards'
import { FaPlus, FaTimes } from 'react-icons/fa';
import axios from 'axios';

export default function Page() {
  const [publication, setPublication] = useState([
    { title: '', description: '', status: '' }
  ]);

   const handlePublicationChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...publication];
    updated[index][name] = value;
    setPublication(updated);
  };

  const handleAdd = () => {
    setPublication(prev => [...prev, { title: '', description: '', status: '' }]);  // ← Use prev like award
  };

  const handleRemove = (index) => {
    setPublication(prev => prev.filter((_, i) => i !== index)); 
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post('/api/userportfolio/publication', publication);  // ← Plain JSON like award
      console.log('Response:', res.data);
      alert("submitted")
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10 md:pr-0" id='Publication'>
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Publications</h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
        <div className='flex flex-col gap-4'>
          {publication.map((pub, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg p-4 max-w-2xl shadow-sm relative"
            >
              {idx > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-sm"
                >
                  <FaTimes size={12} />
                </button>
              )}

              <PublicationCard
                index={idx}
                {...pub}
                handleChange={handlePublicationChange}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded hover:bg-blue-50 w-max self-start"
        >
          <FaPlus /> Add More
        </button>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Publications
          </button>
        </div>
      </form>
    </div>
  );
}
