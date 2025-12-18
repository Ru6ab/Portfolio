

'use client'
import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import SideNav from '../components/SideNav'
import MainSection from '../components/MainSection'
 import About from '../components/About'
 import Education from '../components/Education'
  import Experience from '../components/Experience'
import Publications from '../components/Publications'

import axios from 'axios'
import Award from '../components/award'
import Leadership from '../components/Leadership'
import Project from '../components/Project'
import Languages from '../components/Languages'
import Skill from '../components/Skill'
import Interest from '../components/Interest'

export default function Home() {
  const [openMenu, setOpenMenu] = useState(false)
  // const [sideData,setSideData] = useState(null)
   const [main, setMain] = useState(null);
    const [about, setAbout] = useState(null);
   const [education, setEducation] = useState([]);
      const [experience, setExperience] = useState([])
   const [language, setLanguage] = useState([]);
  const [publication, setPublication] = useState([]);
   const [award, setAward] = useState([]);
   const [leadership,setLeadership] = useState([])
   const [project,setProject] = useState([])   
   const[skill,setSkill] = useState([])
   const [interest,setInterest] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        
        const [mainRes, aboutRes,eduRes,expRes,pubRes,awardRes,leadRes, projectRes, skillRes,interestRes,langRes] = await Promise.all([
          axios.get("/api/userportfolio/main"),
          axios.get("/api/userportfolio/about"),
          axios.get("/api/userportfolio/education"),
          axios.get("/api/userportfolio/experience"),
          axios.get("/api/userportfolio/publication"),
          axios.get("/api/userportfolio/award"),
          axios.get("/api/userportfolio/leadership"),
          axios.get('/api/userportfolio/project'),
          axios.get('/api/userportfolio/skill'),
          axios.get('/api/userportfolio/interest'),
          axios.get('/api/userportfolio/language')
          ]);

       
        setMain(mainRes.data.data);
        setAbout(aboutRes.data.data);
        setEducation(eduRes.data.data)
        setExperience(expRes.data.data)
        setPublication(pubRes.data.data)
        setAward(awardRes.data.data)
        setLeadership(leadRes.data.data)
        setProject(projectRes.data.data)
        setSkill(skillRes.data.data)
        setInterest(interestRes.data.data)
        setLanguage(langRes.data.data)
        console.log("about is:",aboutRes.data.data)
         console.log("pub.. data",pubRes.data.data)
            console.log("lang data",langRes.data.data)
      } catch (error) {
        console.error("API fetch error:", error);
      } 
    }

    fetchData();
  }, []);


  return (
    <div className={`flex h-screen font-sans relative `}>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 z-50 lg:hidden p-2 bg-blue-500 rounded-full"
        onClick={() => setOpenMenu(prev => !prev)}
      >
        {openMenu ? <FaTimes size={20} className='text-white' /> : <FaBars size={20} className='text-white' />}
      </button>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-[285px] h-screen overflow-auto overflow-x-hidden sidebar-scroll transform transition-transform duration-500 ease-linear">
        <SideNav/>
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
        <SideNav  closeSidebar={() => setOpenMenu(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 h-full overflow-auto main-scroll">
        <MainSection data={main}/>
        <div className="min-h-screen">
           <About  data={about}/>
           <Education data={education}/>
           <Experience data={experience}/>         
          <Publications data = {publication}/> 
          <Award data={award} />
          <Leadership data={leadership}/>
          <Project data={project}/>
          <Skill data={skill}/>
          <Interest data={interest}/>
          <Languages data={language}/>
          
        </div>
      </div>
    </div>
  )
}
