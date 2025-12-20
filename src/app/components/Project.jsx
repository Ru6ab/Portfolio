import React from "react";


const defaultProject = {
  title: "AI Research Project",
  description: "Developed an AI model for image classification",
  detailedDescription: "Worked on data preprocessing, model training, and evaluation",
  contributions: ["Data Preprocessing", "Model Training", "Evaluation"],
};

export default function Projects({ data, useStatic = false }) {
  // Case 1: Fetched data exists
  if (data && data.length > 0) {
    return (
      <div className="pt-16 pl-8 md:pl-16 mb-10" id="Projects">
        <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Projects</h1>
        <div className="border-b-2 border-blue-500 w-[55px]" />

        <div className="mt-10 space-y-10">
          {data.map((item, index) => (
            <div key={index} className="flex gap-6 relative">
              {/* RIGHT CONTENT */}
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-black text-[20px]">
                  {item.title}
                </h1>

                <span className="inline-flex bg-sky-100 py-1 px-3 w-fit font-semibold text-[15px] rounded-[3px]">
                  {item.description}
                </span>

                {item.detailedDescription && (
                  <p className="text-gray-700 italic">
                    {item.detailedDescription}
                  </p>
                )}

                {item.contributions && item.contributions.length > 0 && (
                  <p className="text-gray-700">
                    <span className="font-semibold text-black">Contributions:</span>{" "}
                    {item.contributions.join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Case 2: Fallback static design (optional)
  if (useStatic) {
    return (
      <div className="pt-16 pl-8 md:pl-16 mb-10" id="Projects">
        <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Projects</h1>
        <div className="border-b-2 border-blue-500 w-[55px]" />

        <div className="mt-10 space-y-10">
          <div className="flex gap-6 relative">
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-black text-[20px]">
                {defaultProject.title}
              </h1>

              <span className="inline-flex bg-sky-100 py-1 px-3 w-fit font-semibold text-[15px] rounded-[3px]">
                {defaultProject.description}
              </span>

              <p className="text-gray-700 italic">
                {defaultProject.detailedDescription}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold text-black">Contributions:</span>{" "}
                {defaultProject.contributions.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: No fetched data, show section not created
  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10" id="Projects">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">Projects</h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <p className="mt-6 text-gray-500 italic">Section not created yet.</p>
    </div>
  );
}

