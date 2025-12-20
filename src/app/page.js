
// 'use client'
// import { useState } from 'react'
// import { FaBars, FaTimes } from 'react-icons/fa'
// import Dashboard from './components3/Dashboard'
// import MainSection from './components/MainSection'
// import About from './components/About'
// import Education from './components/Education'
// import Languages from './components/Languages'
// import { inter } from './fonts'
// import Publications from './components/Publications'
// import { useRouter } from 'next/navigation'
// export default function Home() {
//   const router = useRouter()
//   const STATIC_MAIN_DATA = {
//   name: "Rubab Mahmood",
//   badges: [
//     "Web Developer",
//     "React Developer",
//     "Frontend Engineer",
//     "UI/UX Designer",
//   ],
//   img: "/assets/hero-bg.jpg",
// };
// const STATIC_ABOUT_DATA = {
//   description: "I am a Research Engineer working at ChaLearn U.S.A...",
//   email: "rubab.mehmod@gmail.com",
//   dob: "1995-05-05",
//   cv: "/assets/cv.pdf",
// };
//   const [openMenu, setOpenMenu] = useState(false)

//   return (
//     <div className={`flex h-screen font-sans relative ${inter.className}`}>
//       {/* Mobile Menu Button */}
//       <button
//         className="fixed top-4 right-4 z-50 lg:hidden p-2 bg-blue-500 rounded-full"
//         onClick={() => setOpenMenu(prev => !prev)}
//       >
//         {openMenu ? <FaTimes size={20} className='text-white' /> : <FaBars size={20} className='text-white' />}
//       </button>

//       {/* Desktop sidebar */}
//       <div className="hidden lg:block w-[285px] h-screen overflow-auto overflow-x-hidden sidebar-scroll transform transition-transform duration-500 ease-linear">
//         <Dashboard />
//       </div>

//       {/* Mobile sidebar overlay */}
//       {openMenu && (
//         <div
//           className="fixed inset-0 z-40  bg-opacity-30 lg:hidden"
//           onClick={() => setOpenMenu(false)}
//         ></div>
//       )}

//       {/* Mobile sidebar */}
//       <div
//         className={`fixed top-0 left-0 w-[80vw] md:w-[290px] lg:w-[285px] z-50 h-screen bg-[#010912] transform transition-transform duration-500 ease-linear lg:hidden ${
//           openMenu ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <div className="flex p-4"></div>
//         <Dashboard closeSidebar={() => setOpenMenu(false)} />
//       </div>

//       {/* Main content */}
//       <div className="flex-1 h-full overflow-auto main-scroll">
//         <MainSection  data={STATIC_MAIN_DATA}/>
//         <div className="min-h-screen">
//           <div className='flex flex-col gap-2'>
//            <button onClick={()=>router.push('/signup')} className='text-blue-700 hover:text-blue-900 mt-10  '>Signup</button>
//             <button onClick={()=>router.push('/signin')} className='text-blue-700 hover:text-blue-900 mt-10  '>Signin</button>
//             </div>
//           {/* <button onClick={()=>router.push('/create/main')} className='text-blue-700 hover:text-blue-900 mt-10  '>GO to Create Portfolio Page</button> */}
//            <About data={STATIC_ABOUT_DATA}/>
//           <Education />
//           <Languages />
//           <Publications/> 
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'
import React from "react";
import { useRouter } from 'next/navigation'

export default function Layout() {
  const router = useRouter();

  return (
    <div className="flex h-screen">
      {/* Right Side */}
      <div
        className="w-full relative flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-md space-y-6 px-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Create Your Portfolio Website
          </h1>
          <p className="text-lg text-gray-700">
            Showcase your skills and projects in a beautiful, professional portfolio.
          </p>
          <button
            onClick={() => router.push("/signup")}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Get Started
          </button>

          <p className="text-gray-800">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/signin")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
