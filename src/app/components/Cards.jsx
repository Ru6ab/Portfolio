'use client'
import React from 'react';

export default function PublicationCard({
  index,
  title = '',
  description = '',
  status = '',
  handleChange,
  editable = false,
  isEmpty = false,
}) {

  
  if (isEmpty && !editable) {
    return (
      <p className="mt-4 text-gray-500 italic">
        Section not created yet
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 mt-4 text-black">

    
      {editable && <label className="font-semibold text-[14px] text-gray-700">Publication Title</label>}
      {editable ? (
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => handleChange(index, e)}
          className="w-[450px] border border-gray-300 rounded px-2 py-1 text-[16px] font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      ) : (
        <p className="text-[16px] font-semibold">{title || '-'}</p>
      )}

   
      {editable && <label className="font-semibold text-[14px] text-gray-700">Status</label>}
      {editable ? (
        <input
          type="text"
          name="status"
          value={status}
          onChange={(e) => handleChange(index, e)}
          className="w-[100px]   rounded px-2 py-1 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      ) : (
        <p className="inline-flex bg-sky-100 py-1 px-3 w-fit font-semibold text-[15px] rounded-[3px]">{status || '-'}</p>
      )}

  
      {editable && <label className="font-semibold text-[14px] text-gray-700">Description</label>}
      {editable ? (
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => handleChange(index, e)}
          className="w-[450px] border border-gray-300 rounded px-2 py-1 italic focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="w-[450px] italic">{description || '-'}</p>
      )}

    </div>
  );
}
