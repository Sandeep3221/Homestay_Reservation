import React, { useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import toast from 'react-hot-toast'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const adminLoginHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
      
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      } else {
        toast.error(response.data.message || 'Login failed')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Server error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Wrapped in a form for "Enter" key support */}
      <form onSubmit={adminLoginHandler} className="w-full max-w-sm border p-6 bg-emerald-200 rounded-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Welcome Admin
        </h2>

        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 mb-6 outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button 
          disabled={loading}
          type='submit' 
          className={`w-full text-white py-2 rounded-md cursor-pointer transition-colors ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login