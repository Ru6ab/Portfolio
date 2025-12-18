'use client'
import axios from 'axios';
import React, { useState } from 'react'

export default function Education() {
    const [education,setEducation]= useState([
        {school:"",degree:"",duration:""},
        { school:"",degree:"",duration:""}
    ])
    const handleChange=(index,e)=>{
   const {name, value} = e.target;
   const newEdu  = [...prev]
   newEdu[index][name] = value
   return newEdu

    }
    const  handleSubmit= async(e)=>{
        const res = await axios.post('/api/userportfolio/education',education)
        console.log(res.data)
    }
  return (
    <div className="pt-16 pl-8 md:pl-16 -  mb-10" id='Education'>
      <h1 className="font-bold text-[#04274a]  text-[30px] mb-3 ">Education</h1>
      <div className="border-b-2 border-blue-500 border-[2px] w-[55px]" />
      
      <div className='flex flex-row gap-4 '>
      <div className='flex flex-col'>
    <div className=' mt-10 border-[2px] rounded-full w-[16px] h-[16px] border-blue-950'/>
    <div className='pl-[7px] border-r-2 h-[130px] w-[0.25px] border-blue-950  '/>
    <div className='  border-[2px] rounded-full w-[16px] h-[16px] border-blue-950'/>
     <div className='pl-[7px] border-r-2 h-[100px] md:h-[115px] w-[0.25px] border-blue-950  '/>
      </div>
     
       <div className='flex flex-col gap-6 '>
         <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-2 '>
       
         <h1 className="font-semibold text-black  text-[20px]  mt-8 "> <input placeholder='MASTER ARTIFICIAL INTELLIGENCE' value={education[0].degree} type='text' onChange={handleChange} name='degree'/></h1>
       
        <span className='flex text-center items-center justify-center bg-sky-100  py-1 w-[170px] font-semibold text-[15px] rounded-[3px] '><input placeholder='Sep 2020 - Dec 2025' value={education[0].duration} onChange={handleChange} type='text' name='duration'/></span>
     <span className='- italic'> <input placeholder='Université Paris-Saclay, Paris, France' value={education[0].school} type='text' onChange={handleChange}  name='school'/></span>
      </div>
        <div className='flex flex-col gap-2 '>
         <h1 className="font-semibold text-black  text-[20px]  mt-8 "> <input placeholder='MASTER CYBER SECURITY' type='text' value={education[1].degree}  onChange={handleChange} name='degree'/></h1>
       
        <span className='flex text-center items-center justify-center bg-sky-100  py-1 w-[170px] font-semibold text-[15px] rounded-[3px] '><input placeholder='Sep 2020 - Dec 2025'  value={education[1].duration} onChange={handleChange}  type='text' name='duration'/></span>
     <span className='- italic'> <input placeholder='Université Tokyo, TOKYO, JAPAN' value={education[1].school}  onChange={handleChange} type='text' name='school'/></span>
      </div>

  

      <button type='submit' className=' mt-10 p-3 bg-blue-500'>Submit</button>    
      </form>
              
      </div>
      
      </div>
      
      </div>
  )
}
