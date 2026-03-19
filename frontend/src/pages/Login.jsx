import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backendUrl } from '../App'
import { AuthContext } from '../contex/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(`${backendUrl}/api/user/login`, formData, {
        withCredentials: true
      })
      if (res.status === 200) {
        login(res.data.user)
        window.location.href = '/'
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-green-900 via-blue-900 to-slate-900 flex items-start md:items-center justify-center px-4 pt-24 pb-8'>

      {/* Decorative blobs */}
      <div className='absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none' />

      <div className='relative w-full max-w-md'>

        {/* Card */}
        <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl'>

          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl mb-4'>
              <svg className='w-8 h-8 text-emerald-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
              </svg>
            </div>
            <h1 className='text-3xl font-bold text-white'>Welcome Back</h1>
            <p className='text-white/60 mt-1 text-sm'>Sign in to book your perfect stay</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>

            <div>
              <label className='block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='you@example.com'
                required
                className='w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2'>Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                required
                className='w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200'
              />
            </div>

            {error && (
              <div className='bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3'>
                <p className='text-red-400 text-sm'>{error}</p>
              </div>
            )}

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/40 mt-2'
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <p className='text-center text-white/50 text-sm mt-6'>
            Don't have an account?{' '}
            <Link to='/signup' className='text-emerald-400 font-semibold hover:text-emerald-300 transition-colors'>
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login