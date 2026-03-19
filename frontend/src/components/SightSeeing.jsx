import React, { useState } from 'react'
import { MapPin, Camera, Wind, History, Sparkles, CloudFog, Flame } from 'lucide-react'

const sights = [
  {
    title: 'Deolo Hill',
    tag: 'Highest Point',
    icon: <Wind size={28} />,
    desc: 'Rising 1,704 meters above sea level, Deolo is the crown of Kalimpong. On clear mornings, the Kanchenjunga range reveals itself in full majesty. It is the premier destination for paragliding, offering a bird-eye view of the Teesta River and the rolling emerald valleys below.',
  },
  {
    title: 'Durpin Dara Hill',
    tag: 'Spiritual Vista',
    icon: <Sparkles size={28} />,
    desc: 'Famous for the Zang Dhok Palri Phodang monastery, this peak offers a panoramic sweep of the Chola Range. The monastery, consecrated by the Dalai Lama, houses rare Tibetan scrolls and provides a sanctuary of profound peace overlooking the plains of Siliguri.',
  },
  {
    title: 'Morgan House',
    tag: 'Colonial Heritage',
    icon: <History size={28} />,
    desc: 'A hauntingly beautiful 1930s British mansion built by jute baron George Morgan. Wrapped in ivy and stone, this estate is a living time capsule of colonial architecture, now serving as a boutique heritage stay that captures the old-world charm of the hills.',
  },
  {
    title: 'Pine View Nursery',
    tag: 'Botanical Gem',
    icon: <Camera size={28} />,
    desc: 'Home to one of the most exotic collections of cacti and orchids in Asia. This nursery is a kaleidoscope of high-altitude flora, showcasing rare species that thrive in Kalimpong’s unique subtropical climate.',
  },
  {
    title: 'Mangal Dham',
    tag: 'Peace Shrine',
    icon: <MapPin size={28} />,
    desc: 'A stunning prayer complex dedicated to Lord Krishna. Spanning two acres of manicured gardens and vibrant murals, the Dham is an oasis of silence and artistry, reflecting the deep spiritual roots of the local community.',
  }
]

const atmospheres = [
  {
    id: 'mist',
    name: 'Dawn Mist',
    icon: <CloudFog size={24} />,
    temp: '14°C',
    metric: 'Humidity 85%',
    desc: 'Watch the valley disappear under a blanket of thick, cool mountain fog. The perfect excuse to stay under the covers with a hot cup of Darjeeling.',
    theme: 'from-slate-900 via-slate-800 to-sky-900',
    glow: 'bg-sky-500/20',
    textHighlight: 'text-sky-300'
  },
  {
    id: 'pine',
    name: 'Pine Canopy',
    icon: <Wind size={24} />,
    temp: '1,250m',
    metric: 'Altitude',
    desc: 'Breathe in the absolute purity of high-altitude air. The only soundtrack up here is the wind moving through the ancient Kalimpong pine forests.',
    theme: 'from-slate-950 via-green-950 to-emerald-950',
    glow: 'bg-emerald-500/20',
    textHighlight: 'text-emerald-400'
  },
  {
    id: 'hearth',
    name: 'Evening Hearth',
    icon: <Flame size={24} />,
    temp: 'Cozy',
    metric: 'Woodfire',
    desc: 'As the temperature drops, the retreat warms up. Gather around the crackling fire pit under a canopy of zero-light-pollution stars.',
    theme: 'from-slate-950 via-orange-950/80 to-rose-950/80',
    glow: 'bg-orange-500/20',
    textHighlight: 'text-orange-400'
  }
]

const SightSeeing = () => {
  const [active, setActive] = useState(0)
  const [hoveredSight, setHoveredSight] = useState(null)

  return (
    <>
      <div id="facilities" className='bg-slate-950 py-16 md:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden relative'>
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-125 h-125 rounded-full bg-emerald-600/20 blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 rounded-full bg-blue-600/20 blur-[120px]"></div>
        </div>

        <div className='max-w-6xl mx-auto relative z-10'>
          
          <div className='mb-16 md:mb-24 text-center'>
            <p className='text-xs md:text-sm tracking-[0.4em] uppercase text-emerald-400 font-black mb-4'>Explore The Wild</p>
            <h2 className='text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none'>
              Local <span className='text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-400'>Wonders</span>
            </h2>
          </div>

          <div 
            className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full'
            onMouseLeave={() => setHoveredSight(null)}
          >
            {sights.map((sight, index) => (
              <div 
                key={index} 
                onMouseEnter={() => setHoveredSight(index)}
                className={`relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-10 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-700 ease-out group 
                  ${index === sights.length - 1 ? 'lg:col-span-2' : ''} 
                  ${hoveredSight !== null && hoveredSight !== index ? 'opacity-40 blur-[2px] scale-[0.98] grayscale-30' : 'opacity-100 blur-0 scale-100'}`}
              >
                
                <div className="absolute -bottom-6 -right-2 text-[10rem] sm:text-[12rem] leading-none font-black text-white/5 select-none group-hover:scale-110 group-hover:text-white/10 transition-transform duration-500 pointer-events-none">
                  0{index + 1}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 rounded-2xl flex items-center justify-center shadow-lg group-hover:-rotate-12 transition-transform duration-300">
                      {sight.icon}
                    </div>
                    <span className="bg-white/5 border border-white/10 text-emerald-300 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-sm">
                      {sight.tag}
                    </span>
                  </div>

                  <h3 className='text-2xl sm:text-3xl font-black text-white mb-4 tracking-tight group-hover:text-emerald-300 transition-colors'>
                    {sight.title}
                  </h3>
                  
                  <p className='text-white/60 font-medium leading-relaxed text-sm sm:text-base'>
                    {sight.desc}
                  </p>
                  
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>

      <div className={`relative w-full py-20 md:py-32 overflow-hidden transition-colors duration-1000 ease-in-out bg-linear-to-br ${atmospheres[active].theme}`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 md:w-200 md:h-200 rounded-full blur-[100px] md:blur-[120px] pointer-events-none transition-colors duration-1000 ${atmospheres[active].glow}`}></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-10 md:gap-24 items-center">
            
            <div className="w-full md:w-1/2 flex flex-col gap-5 sm:gap-6">
              <div className="flex items-center gap-2 text-white/50 mb-1 sm:mb-2">
                <MapPin size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Sensory Profile</span>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {atmospheres.map((atm, idx) => (
                  <button
                    key={atm.id}
                    onClick={() => setActive(idx)}
                    className={`flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-500 backdrop-blur-md border ${
                      active === idx 
                      ? 'bg-white/10 border-white/20 text-white shadow-lg scale-105' 
                      : 'bg-black/20 border-white/5 text-white/50 hover:bg-black/40 hover:text-white'
                    }`}
                  >
                    <span className={active === idx ? atmospheres[active].textHighlight : ''}>
                      {atm.icon}
                    </span>
                    {atm.name}
                  </button>
                ))}
              </div>

              <div className="mt-4 sm:mt-8 min-h-40 sm:min-h-45">
                <h2 className={`text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4 sm:mb-6 transition-all duration-700 translate-y-0 opacity-100`} key={active}>
                  {atmospheres[active].name}
                </h2>
                <p className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-md animate-[fadeIn_1s_ease-out]">
                  {atmospheres[active].desc}
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-center items-center text-center group hover:bg-black/30 transition-colors duration-500">
                  <span className={`text-3xl sm:text-5xl font-black mb-1 sm:mb-2 transition-colors duration-700 ${atmospheres[active].textHighlight}`}>
                    {atmospheres[active].temp}
                  </span>
                  <span className="text-white/50 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">
                    Condition
                  </span>
                </div>
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-center items-center text-center group hover:bg-black/30 transition-colors duration-500">
                  <span className={`text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 sm:mb-2 transition-colors duration-700`}>
                    {atmospheres[active].metric}
                  </span>
                  <span className="text-white/50 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">
                    Environment
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default SightSeeing