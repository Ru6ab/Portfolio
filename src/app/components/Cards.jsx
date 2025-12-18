// 'use client'
// import React from 'react';

// export default function PublicationCard({ index, title, description,  status, handleChange }) {
//   return (
//     <div className="flex flex-col gap-2 mt-4">
//       {/* Heading */}
//       <label className="font-semibold text-[14px] text-gray-700">Publication Title</label>
//       <input
//         type="text"
//         name="title"
//         value={title}
//         onChange={(e) => handleChange(index, e)}
//         className="w-[450px] border border-gray-300 rounded px-2 py-1 text-[16px] font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
//       />

//       {/* Status */}
//       <label className="font-semibold text-[14px] text-gray-700">Status</label>
//       <input
//         type="text"
//         name="status"
//         value={status}
//         onChange={(e) => handleChange(index, e)}
//         className={`w-[100px] border border-gray-300 rounded px-2 py-1 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-300 `}
//       />

//       {/* Description */}
//       <label className="font-semibold text-[14px] text-gray-700">Description</label>
//       <input
//         type="text"
//         name="description"
//         value={description}
//         onChange={(e) => handleChange(index, e)}
//         className="w-[450px] border border-gray-300 rounded px-2 py-1 italic focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// }

// 'use client'
// import React from 'react';

// export default function PublicationCard({
//   index,
//   title,
//   description,
//   status,
//   handleChange,
//   editable = false, // editable flag
// }) {
//   return (
//     <div className="flex flex-col gap-2 mt-4 text-black">
//       {/* Title */}
//       <label className="font-semibold text-[14px] text-gray-700">Publication Title</label>
//       {editable && handleChange ? (
//         <input
//           type="text"
//           name="title"
//           value={title}
//           onChange={(e) => handleChange(index, e)}
//           className="w-[450px] border border-gray-300 rounded px-2 py-1 text-[16px] font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
//         />
//       ) : (
//         <p className="text-[16px] font-semibold">{title}</p>
//       )}

//       {/* Status */}
//       <label className="font-semibold text-[14px] text-gray-700">Status</label>
//       {editable && handleChange ? (
//         <input
//           type="text"
//           name="status"
//           value={status}
//           onChange={(e) => handleChange(index, e)}
//           className="w-[100px] border border-gray-300 rounded px-2 py-1 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-300"
//         />
//       ) : (
//         <p className="w-[100px] font-semibold">{status}</p>
//       )}

//       {/* Description */}
//       <label className="font-semibold text-[14px] text-gray-700">Description</label>
//       {editable && handleChange ? (
//         <input
//           type="text"
//           name="description"
//           value={description}
//           onChange={(e) => handleChange(index, e)}
//           className="w-[450px] border border-gray-300 rounded px-2 py-1 italic focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       ) : (
//         <p className="w-[450px] italic">{description}</p>
//       )}
//     </div>
//   );
// }

'use client'
import React from 'react';

export default function PublicationCard({
  index,
  title,
  description,
  status,
  handleChange,
  editable = true,
  isEmpty = false,
}) {

  // 👉 CASE 3: fetched but not created yet
  if (isEmpty && !editable) {
    return (
      <p className="mt-4 text-gray-500 italic">
        Section not created yet
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 mt-4 text-black">

      {/* TITLE */}
      {editable && (
        <label className="font-semibold text-[14px] text-gray-700">
          Publication Title
        </label>
      )}

      {editable ? (
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => handleChange(index, e)}
          className="w-[450px] border border-gray-300 rounded px-2 py-1 text-[16px] font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      ) : (
        <p className="text-[16px] font-semibold">{title}</p>
      )}

      {/* STATUS */}
      {editable && (
        <label className="font-semibold text-[14px] text-gray-700">
          Status
        </label>
      )}

      {editable ? (
        <input
          type="text"
          name="status"
          value={status}
          onChange={(e) => handleChange(index, e)}
          className="w-[100px] border border-gray-300 rounded px-2 py-1 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      ) : (
        <p className="w-[100px] font-semibold">{status}</p>
      )}

      {/* DESCRIPTION */}
      {editable && (
        <label className="font-semibold text-[14px] text-gray-700">
          Description
        </label>
      )}

      {editable ? (
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => handleChange(index, e)}
          className="w-[450px] border border-gray-300 rounded px-2 py-1 italic focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="w-[450px] italic">{description}</p>
      )}

    </div>
  );
}
