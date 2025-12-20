import React from "react";
import PublicationCard from "./Cards";

export default function Publications({ data = [] }) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10 md:pr-0">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Publications</h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <div className="flex flex-col gap-4 mt-6">
        {hasData ? (
          data.map((pub, idx) => (
            <PublicationCard
              key={idx}
              index={idx}
              {...pub}
              editable={false}   // view mode
            />
          ))
        ) : (
          <PublicationCard isEmpty={true} />  // shows "Section not created yet"
        )}
      </div>
    </div>
  );
}

