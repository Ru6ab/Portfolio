// import React from 'react'
// import PublicationCard from './Cards'
// import { data } from '../constants'

// export default function Publications() {
//   return (
//      <div className="pt-16 pl-8 md:pl-16 mb-10  md:pr-0 " id='Publications'>
//       <h1 className="font-bold text-[#04274a]  text-[30px] mb-3 ">Publications</h1>
//       <div className="border-b-2 border-blue-500 border-[2px] w-[55px]" />
//    <div className='flex flex-col gap-4 mt-6'>
//      {data.map((card,indx)=>(
//         <PublicationCard key={indx} {...card}/>
//      ))}
//      </div>
//    </div>
//   )
// }


// import React from "react";
// import PublicationCard from "./Cards";
// import { data as staticPublications } from "../constants";

// export default function Publications({ data }) {
//   // Use fetched data if available, otherwise fallback to static data
//   const publicationList = data && data.length ? data : staticPublications;

//   return (
//     <div className="pt-16 pl-8 md:pl-16 mb-10 md:pr-0" id="Publications">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
//         Publications
//       </h1>
//       <div className="border-b-2 border-blue-500 w-[55px]" />

//       <div className="flex flex-col gap-4 mt-6">
//         {publicationList.map((card, index) => (
//           <PublicationCard key={index} {...card} />
//         ))}
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import PublicationCard from "./Cards";
// import { data as staticPublications } from "../constants";

// export default function Publications({ data, editable = false, handleChange }) {
//   const publicationList = data && data.length ? data : staticPublications;

//   return (
//     <div className="pt-16 pl-8 md:pl-16 mb-10 md:pr-0" id="Publications">
//       <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Publications</h1>
//       <div className="border-b-2 border-blue-500 w-[55px]" />

//       <div className="flex flex-col gap-4 mt-6">
//         {publicationList.map((card, index) => (
//           <PublicationCard
//             key={index}
//             index={index}
//             {...card}
//             editable={editable}
//             handleChange={handleChange}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";
import PublicationCard from "./Cards";
import { data as staticPublications } from "../constants";

export default function Publications({ data, editable = false, handleChange }) {
  const hasFetchedData = Array.isArray(data) && data.length > 0;

  // CASE: fetched but not created yet
  if (!editable && data && data.length === 0) {
    return (
      <div className="pt-16 pl-8 md:pl-16 mb-10 md:pr-0" id="Publications">
        <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
          Publications
        </h1>
        <div className="border-b-2 border-blue-500 w-[55px]" />

        {/* show empty message */}
        <PublicationCard isEmpty />
      </div>
    );
  }

  // fallback list (static if no data and not editable)
  const publicationList = hasFetchedData
    ? data
    : editable
    ? data
    : staticPublications;

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10 md:pr-0" id="Publications">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
        Publications
      </h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <div className="flex flex-col gap-4 mt-6">
        {publicationList.length > 0 ? (
          publicationList.map((card, index) => (
            <PublicationCard
              key={index}
              index={index}
              {...card}
              editable={editable}
              handleChange={handleChange}
            />
          ))
        ) : (
          <PublicationCard isEmpty /> // handle empty fallback
        )}
      </div>
    </div>
  );
}
