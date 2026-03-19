import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListTree, 
  ClipboardCheck, 
  LogOut 
} from 'lucide-react'

const SideBar = ({ setToken }) => {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-3.5 mx-3 my-1 rounded-lg transition-all duration-200 group ${
      isActive
        ? 'bg-white/10 text-emerald-200 shadow-inner border-r-4 border-emerald-300'
        : 'hover:bg-white/5 text-emerald-50'
    }`

  const logoutHandler = () => {
    if(window.confirm("Are you sure you want to logout?")) {
      setToken("");
      localStorage.removeItem('token');
    }
  }

  return (
    <div className='w-[20%] md:w-[22%] min-h-screen bg-linear-to-b from-emerald-600 via-teal-600 to-cyan-700 text-white shadow-2xl flex flex-col'>

      {/* Logo Section */}
      <div className='px-8 py-8'>
        <h2 className='text-2xl font-black tracking-tighter leading-tight'>
          KPG <span className='text-emerald-300'>HOMESTAYS</span>
        </h2>
        <div className='flex items-center gap-2 mt-1'>
          <span className='h-1 w-1 rounded-full bg-emerald-300 animate-pulse'></span>
          <p className='text-[10px] uppercase tracking-[0.2em] text-emerald-100/80 font-bold'>Admin Console</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className='flex-1 flex flex-col pt-4'>
        <NavLink to='/dashboard' className={linkClass}>
          <LayoutDashboard size={22} className="group-hover:scale-110 transition-transform" />
          <p className='hidden lg:block text-sm font-semibold'>Dashboard</p>
        </NavLink>

        <NavLink to='/add' className={linkClass}>
          <PlusCircle size={22} className="group-hover:scale-110 transition-transform" />
          <p className='hidden lg:block text-sm font-semibold'>Add Homestay</p>
        </NavLink>

        <NavLink to='/list' className={linkClass}>
          <ListTree size={22} className="group-hover:scale-110 transition-transform" />
          <p className='hidden lg:block text-sm font-semibold'>List Homestay</p>
        </NavLink>

        <NavLink to='/reservation' className={linkClass}>
          <ClipboardCheck size={22} className="group-hover:scale-110 transition-transform" />
          <p className='hidden lg:block text-sm font-semibold'>Reservations</p>
        </NavLink>
      </nav>

      {/* Logout at bottom */}
      <div className='p-4 border-t border-white/10'>
        <button
          onClick={logoutHandler}
          className='w-full flex items-center gap-4 px-6 py-3 rounded-lg text-emerald-100 hover:bg-red-500/20 hover:text-red-200 transition-all duration-300 cursor-pointer group'
        >
          <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
          <p className='hidden lg:block text-sm font-semibold'>Sign Out</p>
        </button>
      </div>
    </div>
  )
}

export default SideBar