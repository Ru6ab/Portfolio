
'use client'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import SideNav from '../components/SideNav'

import { inter } from '../fonts'
import Education2 from '../components2/Education2'
import MainSection2 from '../components2/MainSection2'
import About2 from '../components2/About2'
import Education from '../components2/Education2'
export default function Page() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div className={`flex h-screen font-sans relative ${inter.className}`}>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 z-50 lg:hidden p-2 bg-blue-500 rounded-full"
        onClick={() => setOpenMenu(prev => !prev)}
      >
        {openMenu ? <FaTimes size={20} className='text-white' /> : <FaBars size={20} className='text-white' />}
      </button>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-[285px] h-screen overflow-auto overflow-x-hidden sidebar-scroll transform transition-transform duration-500 ease-linear">
        <SideNav />
      </div>

      {/* Mobile sidebar overlay */}
      {openMenu && (
        <div
          className="fixed inset-0 z-40  bg-opacity-30 lg:hidden"
          onClick={() => setOpenMenu(false)}
        ></div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 left-0 w-[80vw] md:w-[290px] lg:w-[285px] z-50 h-screen bg-[#010912] transform transition-transform duration-500 ease-linear lg:hidden ${
          openMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex p-4"></div>
        <SideNav closeSidebar={() => setOpenMenu(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 h-full overflow-auto main-scroll">
        <MainSection2 />
        < About2/>
        <Education2/>
        </div>
        </div>

  )
}
