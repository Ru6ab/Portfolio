
// 'use client'
// import { useState } from 'react'
// import { FaBars, FaTimes } from 'react-icons/fa'

// import MainSection from '../components/MainSection'



// import Dashboard from '../components3/Dashboard'

// export default function Home() {
//   const [openMenu, setOpenMenu] = useState(false)

//   return (
//     <div className={`flex h-screen font-sans relative `}>
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
//         <MainSection />
//         <div className="min-h-screen">
          
//         </div>
//       </div>
//     </div>
//   )
// }

'use client';
import MainSection from '../components/MainSection';

export default function Page() {
  return (
    <div className="min-h-screen">
      <MainSection />
      {/* Other page content */}
    </div>
  );
}
