import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'

const UserDetailsEdit = ({ close }) => {
  const user = useSelector(state => state.user)

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: ''
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setUserData({
      name: user.name || '',
      email: user.email || '',
      mobile: user.mobile || ''
    })
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const response = await Axios({
        ...SummaryApi.userUpdateDetails,
        data: userData
      })

      if (response.data.success) {
        toast.success(response.data.message)
        close() // 👈 CLOSE MODAL AFTER UPDATE
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">

        <h2 className="text-lg font-semibold text-center mb-4">
          Edit Profile Details
        </h2>

        <form className="grid gap-4" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-neutral-100 border focus:ring-2 focus:ring-teal-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-neutral-100 border focus:ring-2 focus:ring-teal-300"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="text-sm font-medium">Mobile</label>
            <input
              type="number"
              name="mobile"
              value={userData.mobile}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-neutral-100 border focus:ring-2 focus:ring-teal-300"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
            >
              {loading ? 'Saving...' : 'Update'}
            </button>

            <button
              type="button"
              onClick={close}
              className="flex-1 border py-2 rounded-lg hover:bg-red-100"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </section>
  )
}

export default UserDetailsEdit
