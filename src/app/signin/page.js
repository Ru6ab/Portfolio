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
      router.push('/create/main')
    } catch (error) {     
         console.log(" Error:", error.response.data);
         setError1(error.response?.data?.message || "Something went wrong")
      
    }
  };

  return (
    // <div className="p-6 max-w-md mx-auto">
    //   <h1 className="text-2xl font-semibold mb-4">Login</h1>

    //   <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    //     <input
    //       name="username"
    //       placeholder="Username"
    //       value={formData.username}
    //       onChange={handleChange}
    //       className="border p-2 rounded"
    //     />

    //     <input
    //       name="password"
    //       type="password"
    //       placeholder="Password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       className="border p-2 rounded"
    //     />

       
    //     <button
    //       type="submit"
    //       className="bg-blue-600 text-white p-2 rounded"
    //     >
    //       Log In
    //     </button>
    //   </form>
    //   { error1 && 
    //   ( 
    //   <p className='text-rose-500'>{error1}</p>
    //   )}
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-xl">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
      Login
    </h1>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition shadow-md hover:shadow-lg"
      >
        Log In
      </button>
    </form>

    {error1 && (
      <p className="text-rose-500 mt-3 text-center font-medium">{error1}</p>
    )}

    <p className="mt-4 text-gray-600 text-center">
      Don’t have an account?{" "}
      <span
        onClick={() => router.push("/signup")}
        className="text-blue-600 hover:underline cursor-pointer"
      >
        Sign Up
      </span>
    </p>
  </div>
</div>

  );
}
