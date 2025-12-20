// import React from 'react'
// import Dashboard from '../components3/Dashboard'

// export default function page() {
//   return (
//     <div className='flex flex-row '>    
//       <Dashboard/>
//       <div><h1>Create Your Portfolio</h1></div>
    
//     </div>
//   )
// }
'use client'
import React from "react";
import { useRouter } from 'next/navigation'
import Dashboard from '../components3/Dashboard'

export default function Layout() {
  const router = useRouter();

  return (
    <div className="flex h-screen">
     

      {/* Right Side */}
      <div
        className="w-full relative flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0  bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 space-y-6 px-8 text-black">
          <h1 className="text-4xl font-bold">Create Your Portfolio Website</h1>
          <p className="text-lg">
            Showcase your skills and projects in a beautiful portfolio.
          </p>
          <button
            onClick={() => router.push("/signup")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
