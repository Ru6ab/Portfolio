'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const imgRef = useRef(null);

  const [preview, setPreview] = useState('/assets/placeholderImg.jpg');
  const [bgFile, setBgFile] = useState(null);

  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error1, setError1] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    gitHubUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    linkedInUrl: '',
    img: '',
  });

  // ==========================
  // FETCH EXISTING PROFILE
  // ==========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/userportfolio/profile', {
          withCredentials: true,
        });

        const data = res.data?.data;

        if (data) {
          setFormData({
            name: data.name || '',
            gitHubUrl: data.gitHubUrl || '',
            facebookUrl: data.facebookUrl || '',
            twitterUrl: data.twitterUrl || '',
            linkedInUrl: data.linkedInUrl || '',
            img: data.img || '',
          });
        

          setPreview(
               data.img
             ? data.img
              : '/assets/placeholderImg.jpg'
          );

          setIsUpdate(true);
        }
      } catch (err) {
        console.log('No existing profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  console.log("img ",formData.img)
  // ==========================
  // IMAGE SELECT
  // ==========================
  const handleImageSelect = () => {
    const file = imgRef.current.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setBgFile(file);
  };

  // ==========================
  // INPUT CHANGE
  // ==========================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ==========================
  // SUBMIT (CREATE / UPDATE)
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError1('Name is required');
      return;
    }

    setError1(null);

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('gitHubUrl', formData.gitHubUrl);
    payload.append('facebookUrl', formData.facebookUrl);
    payload.append('twitterUrl', formData.twitterUrl);
    payload.append('linkedInUrl', formData.linkedInUrl);

    if (bgFile) {
      payload.append('img', bgFile);
    }

    try {
      const method = isUpdate ? 'put' : 'post';

      await axios({
        method,
        url: '/api/userportfolio/profile',
        data: payload,
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      alert(isUpdate ? 'Profile updated successfully' : 'Profile created successfully');
      setIsUpdate(true);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError1('Failed to submit profile');
    }
  };

  // ==========================
  // LOADING STATE
  // ==========================
  if (loading) return <p className="pt-16 pl-8">Loading...</p>;

  return (
    <div className="min-h-screen pl-12 max-w-md flex flex-col justify-center mt-16 mb-10 items-center relative">
      <h1 className="text-2xl font-semibold mb-4">
        {isUpdate ? 'Update Profile' : 'Create Profile'}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full relative">
        {/* PROFILE IMAGE */}
        <div
          className="h-[90px] w-[90px] rounded-full border overflow-hidden cursor-pointer"
          onClick={() => imgRef.current.click()}
        >
          <img src={preview} className="h-full w-full object-cover" alt="Profile" />
        </div>

        <input
          type="file"
          ref={imgRef}
          onChange={handleImageSelect}
          className="hidden"
          accept="image/*"
        />

        {/* NAME */}
        <div className="flex flex-col gap-1 w-full">
          <label>Your Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* GITHUB */}
        <div className="flex flex-col gap-1 w-full">
          <label>Github URL</label>
          <input
            name="gitHubUrl"
            value={formData.gitHubUrl}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* TWITTER */}
        <div className="flex flex-col gap-1 w-full">
          <label>Twitter URL</label>
          <input
            name="twitterUrl"
            value={formData.twitterUrl}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* FACEBOOK */}
        <div className="flex flex-col gap-1 w-full">
          <label>Facebook URL</label>
          <input
            name="facebookUrl"
            value={formData.facebookUrl}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* LINKEDIN */}
        <div className="flex flex-col gap-1 w-full">
          <label>LinkedIn URL</label>
          <input
            name="linkedInUrl"
            value={formData.linkedInUrl}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {error1 && <p className="text-rose-500">{error1}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded fixed bottom-10 right-12"
        >
          {isUpdate ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
}
