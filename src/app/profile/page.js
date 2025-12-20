'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function page() {
  const [user,setUser] = useState({})
    const router = useRouter()
    useEffect(()=>{
      const checkAuth = async()=>{
     try{
      const res =   await axios.get('/api/auth/protected',{
        withCredentials:true
      })
      console.log("res",res)
        console.log("username:",res.data.user)
        setUser(res.data.user)
     }
     catch(error){
        console.log("error:",error.message)
        // router.push('/')
     }
      }
      checkAuth()
    },[])
  return (
    <>
    <div> hello {user.username}, your protected route </div>
    <button onClick={()=>router.push('/create/main')}>go to create portfolio page</button>
    </>
      

  )
}
