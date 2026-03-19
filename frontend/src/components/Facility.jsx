import React from 'react'
import { MapPin, Leaf, Wifi, Coffee, UtensilsCrossed } from 'lucide-react'

const facilities = [
  {
    id: '01',
    title: 'Local Cuisine',
    subtitle: 'Home-Cooked Delights',
    desc: 'Experience authentic Himalayan flavors. We serve fresh, organic meals prepared daily using locally sourced ingredients from the Kalimpong markets.',
    icon: <UtensilsCrossed size={24} />,
    status: 'Made To Order',
    span: 'md:col-span-2',
    glow: 'group-hover:bg-orange-500/20',
    iconColor: 'text-orange-400',
    borderColor: 'group-hover:border-orange-500/30'
  },
  {
    id: '02',
    title: 'Scenic Views',
    subtitle: 'Nature At Your Window',
    desc: 'Wake up to crisp mountain air and panoramic views of the surrounding lush green hills and valleys.',
    icon: <Leaf size={24} />,
    status: 'Every Room',
    span: 'md:col-span-1',
    glow: 'group-hover:bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    borderColor: 'group-hover:border-emerald-500/30'
  },
  {
    id: '03',
    title: 'Fast Wi-Fi',
    subtitle: 'Stay Connected',
    desc: 'Reliable high-speed internet throughout the property. Perfect for sharing memories or quiet remote work.',
    icon: <Wifi size={24} />,
    status: 'Complimentary',
    span: 'md:col-span-1',
    glow: 'group-hover:bg-blue-500/20',
    iconColor: 'text-blue-400',
    borderColor: 'group-hover:border-blue-500/30'
  },
  {
    id: '04',
    title: 'Travel Desk',
    subtitle: 'Local Sightseeing',
    desc: 'From Deolo paragliding to quiet monastery visits, we arrange reliable cab services and custom local itineraries directly from the homestay.',
    icon: <MapPin size={24} />,
    status: 'On Request',
    span: 'md:col-span-2',
    glow: 'group-hover:bg-rose-500/20',
    iconColor: 'text-rose-400',
    borderColor: 'group-hover:border-rose-500/30'
  }
]

const Facility = () => {
  return (
    <div className='bg-slate-950 py-20 md:py-32 px-4 sm:px-8 lg:px-16 relative overflow-hidden'>
      
      <div className="absolute top-0 right-0 w-96 h-96 scale-150 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 scale-150 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className='max-w-6xl mx-auto relative z-10'>
        
        <div className='mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8'>
          <div>
            <p className='text-emerald-500 font-black text-xs sm:text-sm tracking-widest uppercase mb-4'>Homestay Amenities</p>
            <h2 className='text-4xl md:text-6xl font-black text-white tracking-tight leading-none'>
              Essential <br />
              <span className='text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500'>
                Comforts
              </span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-6 text-white/40 font-medium text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Always Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee size={16} />
              <span>Warm Hospitality</span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
          {facilities.map((fac) => (
            <div 
              key={fac.id} 
              className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 overflow-hidden transition-all duration-500 hover:-translate-y-1 ${fac.span} ${fac.borderColor}`}
            >
              
              <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl transition-colors duration-700 bg-transparent ${fac.glow} pointer-events-none`}></div>
              
              <div className="absolute bottom-6 right-6 text-9xl leading-none font-black text-white/5 select-none pointer-events-none group-hover:scale-110 group-hover:text-white/10 transition-transform duration-700">
                {fac.id}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-12">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg group-hover:scale-110 transition-transform duration-500 ${fac.iconColor}`}>
                    {fac.icon}
                  </div>
                  <span className="bg-slate-950/50 border border-white/5 text-white/70 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-md">
                    {fac.status}
                  </span>
                </div>

                <div className="mt-auto">
                  <p className={`font-black text-xs uppercase tracking-wider mb-3 transition-colors duration-500 ${fac.iconColor}`}>
                    {fac.subtitle}
                  </p>
                  <h3 className='text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight'>
                    {fac.title}
                  </h3>
                  <p className='text-slate-400 font-medium leading-relaxed text-sm sm:text-base max-w-md group-hover:text-slate-300 transition-colors duration-500'>
                    {fac.desc}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Facility