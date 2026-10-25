'use client';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

export default function About2() {
  const cvRef = useRef(null);
  const [cvFile, setCvFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    dob: '',
    email: '',
    cv: '',
  });

  // Fetch existing About (only fills empty fields, never overwrites typing)
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await axios.get('/api/userportfolio/about', { withCredentials: true });
        const d = res.data?.data;
        console.log('About GET:', d);
        if (!active || !d) return;

        const rawBirthday= d.birthday|| d.birthday || '';
        setFormData((prev) => ({
          description: prev.description || d.description || '',
          dob: prev.birthday|| (rawBirthday? String(rawDob).slice(0, 10) : ''),
          email: prev.email || d.email || '',
          cv: d.cv || '',
        }));
      } catch (err) {
        console.log('No existing About:', err.response?.status);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCvSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setCvFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Read directly from the form, not from state
    const fd = new FormData(e.currentTarget);
    const description = (fd.get('description') || '').toString().trim();
    const email = (fd.get('email') || '').toString().trim();
    const birthday= (fd.get('dob') || '').toString();
    console.log('SUBMIT values:', { description, email, birthday});

    const missing = [];
    if (!description) missing.push('Description');
    if (!email) missing.push('Email');
    if (!birthday) missing.push('Birthday');
    if (missing.length) {
      alert(`Missing: ${missing.join(', ')}`);
      return;
    }

    const payload = new FormData();
    payload.append('description', description);
    payload.append('email', email);
    payload.append('birthday', birthday);
    if (cvFile) payload.append('cv', cvFile);

    try {
      setSaving(true);
      const res = await axios.post('/api/userportfolio/about', payload, {
        withCredentials: true, // no manual Content-Type, axios sets the boundary
      });
      console.log('About saved:', res.data);
      alert('About section saved');
    } catch (error) {
      console.error('Status:', error.response?.status);
      console.error('Response:', error.response?.data);
      alert(error.response?.data?.message || error.message || 'Failed to save About section');
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    'w-full md:w-[500px] lg:w-[300px] border border-gray-300 rounded px-2 py-1 text-neutral-800';

  return (
    <div className="pt-16 px-2 md:pl-16 md:pr-0 pb-10" id="About">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">About</h1>
      <div className="border-b-2 border-blue-500 w-[55px]" />

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-black">About Yourself:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full md:w-[500px] lg:w-[700px] border border-gray-300 rounded px-2 py-1 text-neutral-800"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-black">Birthday:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-black">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-black">Upload CV</label>
          <input
            type="file"
            ref={cvRef}
            onChange={handleCvSelect}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => cvRef.current?.click()}
            className={`${inputCls} text-left`}
          >
            {cvFile ? cvFile.name : formData.cv || 'Choose File'}
          </button>
        </div>

        <div className="flex justify-end w-full md:w-[500px] lg:w-[700px]">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}