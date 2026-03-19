import React from 'react'
import { Facebook, Instagram, Youtube, MessageCircle, Phone, ArrowRight, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className='bg-slate-950 text-white border-t border-white/5'>
      <div className='px-6 sm:px-10 lg:px-20 pt-16 pb-10 md:pt-20 md:pb-12'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8'>
          
          <div className='md:col-span-5 flex flex-col items-start'>
            <div className='flex items-center gap-2 mb-6'>
              <div className='p-2.5 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-900/20'>
                <Home size={24} className="text-white" />
              </div>
              <h2 className='text-2xl sm:text-3xl font-bold text-white tracking-tight'>
                Kalimpong <span className="text-emerald-500">Homestays</span>
              </h2>
            </div>
            
            <p className='text-slate-400 text-sm sm:text-base leading-relaxed mb-6 md:mb-8 max-w-sm font-medium'>
              Experience the serene beauty of Kalimpong with comfortable stays, breathtaking views, and warm hospitality in the heart of the Himalayas.
            </p>
            
            <div className='inline-block bg-slate-900 border border-slate-800 px-4 py-2 rounded-full'>
              <p className='text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]'>Established 2026</p>
            </div>
          </div>

          <div className='md:col-span-3 flex flex-col items-start'>
            <h3 className='text-lg font-bold text-white mb-5 md:mb-6 tracking-tight'>
              Navigation
            </h3>
            <ul className='space-y-4'>
              {[
                { name: 'Explore Rooms', action: () => scrollToSection('bookings') },
                { name: 'Facilities', action: () => scrollToSection('facilities') },
                { name: 'My Bookings', action: () => navigate('/Mybookings') },
                { name: 'Contact Us', action: null }
              ].map((link, idx) => (
                <li 
                  key={idx}
                  onClick={link.action} 
                  className='text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors duration-300 font-medium flex items-center gap-2 group text-sm sm:text-base'
                >
                  <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-500 hidden sm:block" />
                  <span className="sm:-ml-5 group-hover:ml-0 transition-all duration-300">{link.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='md:col-span-4 flex flex-col items-start'>
            <h3 className='text-lg font-bold text-white mb-5 md:mb-6 tracking-tight'>
              Get in Touch
            </h3>
            
            <div className='space-y-4 mb-6 md:mb-8'>
              <a href='https://wa.me/919876543210' target='_blank' rel='noopener noreferrer' className='flex items-center gap-4 text-slate-400 hover:text-emerald-400 transition-colors duration-300 group w-fit'>
                <div className='w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all shrink-0'>
                  <MessageCircle size={18} className='text-slate-500 group-hover:text-emerald-500 transition-colors' />
                </div>
                <span className='text-sm font-semibold tracking-wide'>+91 98765 43210</span>
              </a>
              
              <a href='tel:+919876543210' className='flex items-center gap-4 text-slate-400 hover:text-emerald-400 transition-colors duration-300 group w-fit'>
                <div className='w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all shrink-0'>
                  <Phone size={18} className='text-slate-500 group-hover:text-emerald-500 transition-colors' />
                </div>
                <span className='text-sm font-semibold tracking-wide'>+91 98765 43210</span>
              </a>
            </div>

            <div className='flex gap-3'>
              {[
                { icon: <Facebook size={18} />, url: '#' },
                { icon: <Instagram size={18} />, url: '#' },
                { icon: <Youtube size={18} />, url: '#' }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.url} 
                  target='_blank' 
                  rel='noopener noreferrer' 
                  className='w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:border-emerald-500 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-emerald-900/50 shrink-0'
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className='border-t border-white/5 px-6 sm:px-10 lg:px-20 py-6 bg-slate-950/50'>
        <div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500'>
          <p className='text-center sm:text-left'>
            © {new Date().getFullYear()} Kalimpong Homestay.
          </p>
          <p className='text-center sm:text-right flex items-center gap-1.5'>
            Crafted with <span className='text-rose-500 text-sm'>♥</span> by Sandeep
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer