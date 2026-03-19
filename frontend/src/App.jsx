import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomestayDetails from './pages/HomestayDetails'
import Homepage from './pages/Homepage'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyBookings from './pages/MyBookings'
import NotFound from './pages/NotFound'
import { AuthProvider } from './contex/AuthContext'

export const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/room/:id' element={<HomestayDetails/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/Mybookings' element={<MyBookings/>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
        <Footer/>
      </div>
    </AuthProvider>
  )
}

export default App