import React, { useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login'
import SideBar from './components/SideBar'
import AddHomestay from './pages/AddHomestay'
import ListHomestay from './pages/ListHomestay'
import Reservation from './pages/Reservation'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

export const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || "")

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  return (
    <div className='bg-slate-50 min-h-screen'>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div className='flex w-full'>
          <SideBar setToken={setToken} />
          <main className='flex-1 p-8 md:p-12 overflow-y-auto max-h-screen'>
            <div className='max-w-7xl mx-auto'>
              <Routes>
                <Route path='/' element={<Navigate to="/dashboard" />} />
                
                <Route path='/dashboard' element={<Dashboard token={token} />} />  
                <Route path='/add'       element={<AddHomestay token={token} />} />
                <Route path='/list'      element={<ListHomestay token={token} />} />
                <Route path='/reservation' element={<Reservation token={token} />} />
                
                {/* Fallback for 404s */}
                <Route path='*' element={<NotFound />}/>
              </Routes>
            </div>
          </main>
        </div>
      )}
    </div>
  )
}

export default App