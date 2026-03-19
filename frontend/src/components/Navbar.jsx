import { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, User, LogOut, CalendarDays, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, { withCredentials: true })
        if (res.data.success) setUser(res.data.user)
      } catch {
        setUser(null)
      }
    }
    fetchProfile()
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/user/logout`, {}, { withCredentials: true })
      setUser(null);
      setDropdownOpen(false);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  const navLinks = [
    { name: 'Explore', path: '/', id: 'bookings' },
    { name: 'Facilities', path: '/', id: 'facilities' },
    { name: 'My Bookings', path: '/Mybookings', id: null },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="p-2 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-bold leading-none transition-colors duration-300 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              Kalimpong
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
              HomeStays
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => link.id ? document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' }) : navigate(link.path)}
              className={`text-sm font-bold transition-colors cursor-pointer ${
                scrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/login')} 
                className={`px-5 py-2 text-sm font-bold transition-all cursor-pointer ${
                  scrolled ? 'text-slate-700 hover:text-emerald-600' : 'text-white hover:text-emerald-300'
                }`}
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/signup')} 
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-3 p-1.5 pr-4 rounded-full transition-all cursor-pointer border ${
                  scrolled ? 'bg-slate-50 border-slate-200' : 'bg-white/10 border-white/20'
                }`}
              >
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-md">
                  <User size={18} />
                </div>
                <span className={`text-sm font-bold ${scrolled ? 'text-slate-700' : 'text-white'}`}>
                  {user.userName}
                </span>
                <ChevronDown size={14} className={scrolled ? 'text-slate-400' : 'text-white/60'} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { navigate('/Mybookings'); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    <CalendarDays size={16} /> My Bookings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-colors border-t border-slate-50 cursor-pointer"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
            scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                link.id ? document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' }) : navigate(link.path);
                setIsOpen(false);
              }}
              className="block w-full text-left text-lg font-bold text-slate-800 hover:text-emerald-600"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            {!user ? (
              <>
                <button onClick={() => navigate('/login')} className="w-full py-3 text-slate-700 font-bold border border-slate-200 rounded-xl">Sign In</button>
                <button onClick={() => navigate('/signup')} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-100">Get Started</button>
              </>
            ) : (
              <button onClick={handleLogout} className="w-full py-3 text-rose-500 font-bold bg-rose-50 rounded-xl flex items-center justify-center gap-2">
                <LogOut size={18} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;