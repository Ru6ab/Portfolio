
'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import LeadershipPage from '../../components/LeadershipPage'

export default function Page() {
  const [award, setAward] = useState([
    { school: '', degree: '', year: '' },
  ])
  const [isUpdate, setIsUpdate] = useState(false)
  const [loading, setLoading] = useState(true)

  // ==========================
  // FETCH EXISTING DATA
  // ==========================
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const res = await axios.get('/api/userportfolio/award', {
          withCredentials: true,
        })

        if (res.data?.data?.length > 0) {
          setAward(res.data.data)
          setIsUpdate(true)
        }
      } catch (err) {
        console.log('No existing awards')
      } finally {
        setLoading(false)
      }
    }

    fetchAwards()
  }, [])

  // ==========================
  // INPUT HANDLERS
  // ==========================
  const handleChange = (index, e) => {
    const { name, value } = e.target
    const updated = [...award]
    updated[index][name] = value
    setAward(updated)
  }

  const addAward = () => {
    setAward([...award, { school: '', degree: '', year: '' }])
  }

  const removeAward = (index) => {
    setAward(award.filter((_, i) => i !== index))
  }

  // ==========================
  // SUBMIT
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault()

    const cleanedAwards = award
      .map(a => ({
        school: a.school.trim(),
        degree: a.degree.trim(),
        year: a.year.trim(),
      }))
      .filter(a => a.school || a.degree || a.year)

    if (cleanedAwards.length === 0) {
      alert('Add at least one award')
      return
    }

    try {
      const url = '/api/userportfolio/award'
      const method = isUpdate ? 'put' : 'post'

      const res = await axios[method](
        url,
        { award: cleanedAwards },
        { withCredentials: true }
      )

      console.log(res.data)
      alert(isUpdate ? 'Updated successfully' : 'Submitted successfully')
      setIsUpdate(true)
    } catch (err) {
      console.error(err.response?.data || err.message)
    }
  }
     const handleDeleteSection = async () => {
          const confirmDelete = window.confirm(
            "Are you sure you want to delete the entire award section?"
          );
          if (!confirmDelete) return;
        
          try {
            await axios.delete("/api/userportfolio/award");
            setAward([]);
         
            alert("award section deleted");
            
          } catch (err) {
            console.log(err);
          }
        }

  if (loading) return <p className="pt-16 pl-8">Loading...</p>

  return (
    <div className="pt-16 pl-8 md:pl-16 mb-10" id="degrees">
      <h1 className="font-bold text-[#04274a] text-[30px] mb-3">
        Honors & Awards
      </h1>
      <div className="border-b-4 border-blue-500 w-[55px]" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6 relative">
        {award.map((awrd, index) => (
          <div key={index} className="relative w-max">
            {award.length > 1 && (
              <button
                type="button"
                onClick={() => removeAward(index)}
                className="absolute -top-3 -right-3 bg-white border border-gray-300 rounded-full p-1 text-red-500"
              >
                <FaTimes size={12} />
              </button>
            )}

            <div className="border border-gray-300 rounded px-4 py-3 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Award</label>
                <input
                  className="w-[450px] border rounded px-2 py-1 text-sm"
                  name="degree"
                  value={awrd.degree}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Year</label>
                <input
                  className="w-[450px] border rounded px-2 py-1 text-sm"
                  name="year"
                  value={awrd.year}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">School</label>
                <input
                  className="w-[450px] border rounded px-2 py-1 text-sm italic"
                  name="school"
                  value={awrd.school}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addAward}
          className="text-blue-600 font-semibold px-3 py-2 border border-blue-600 rounded w-max"
        >
          + Add Award
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded absolute bottom-0 right-12"
        >
          {isUpdate ? 'Update' : 'Submit'}
        </button>
      </form>
             <div className="flex justify-end mr-4 relative">
    <button
      type="button"
      onClick={handleDeleteSection}
      className="text-red-600 text-sm  self-end absolute bottom-0 mr-4"
    >
      Delete award section
    </button>
    </div>
      <LeadershipPage />
    </div>
  )
}

