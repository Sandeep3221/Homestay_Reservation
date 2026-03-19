import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-green-900 flex items-center justify-center px-4'>
      <div className='text-center max-w-md'>
        <h1 className='text-7xl sm:text-8xl font-black text-white tracking-tight'>404</h1>
        <p className='mt-4 text-2xl font-bold text-white'>Page Not Found</p>
        <p className='mt-2 text-slate-300 font-medium'>The page you are looking for does not exist.</p>
        <Link
          to='/'
          className='inline-flex items-center justify-center mt-8 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-colors cursor-pointer'
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
