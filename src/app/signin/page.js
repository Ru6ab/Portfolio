'use client'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useState } from 'react';

export default function Page() {
    const router = useRouter()
    const [error1,setError1] = useState(null)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await axios.post('/api/auth/login', formData);
      console.log("User loggedIn:", response.data);
      router.push('/profile')
    } catch (error) {     
         console.log(" Error:", error.response.data);
         setError1(error.response?.data?.message || "Something went wrong")
      
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
        />

       
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded"
        >
          Log In
        </button>
      </form>
      { error1 && 
      ( 
      <p className='text-rose-500'>{error1}</p>
      )}
    </div>
  );
}
