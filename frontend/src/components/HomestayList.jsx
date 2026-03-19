import React, { useContext, useState } from 'react'
import { RoomContex } from '../contex/RoomsContex.jsx'
import { Users, Bath, Bed, Wifi, ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const amenitiesList = [
  { label: '1-2 Guests', icon: <Users size={14} /> },
  { label: 'Luxury Bath', icon: <Bath size={14} /> },
  { label: 'King Bed', icon: <Bed size={14} /> },
  { label: 'Fast WiFi', icon: <Wifi size={14} /> }
]

const HomestayList = () => {
  const { rooms, hasMore, fetchHomestay, loading, loadingMore } = useContext(RoomContex)
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')

  const handleCardClick = (_id) => {
    navigate(`/room/${_id}`)
  }

  const handleFilterClick = (category) => {
    if (loading || loadingMore) return;
    setActiveFilter(category);
    fetchHomestay(category, false); 
  }

  const handleLoadMore = () => {
    if (loading || loadingMore) return;
    fetchHomestay(activeFilter, true);
  }

  return (
    <div id="bookings" className='bg-linear-to-br from-green-900 via-blue-900 to-slate-900 py-12 md:py-20 px-4 sm:px-8 lg:px-16'>
      <div className='max-w-6xl mx-auto'>
        
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-emerald-500 pl-6">
          <div>
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight'>
              Book your stay and <br />
              <span className='bg-linear-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent'>
                relax in luxury
              </span>
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-[0.2em]">
            <Sparkles size={16} />
            <span>Curated for you</span>
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-8 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
            <button 
              onClick={() => handleFilterClick('all')}
              className={`w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${activeFilter === 'all' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10 cursor-pointer'}`}
            >
              All Stays
            </button>
            <button 
              onClick={() => handleFilterClick('popular')}
              className={`w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all cursor-pointer ${activeFilter === 'popular' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'}`}
            >
              Popular Destinations
            </button>
            <button 
              onClick={() => handleFilterClick('offbeat')}
              className={`w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${activeFilter === 'offbeat' ? 'bg-emerald-500 text-white cursor-pointer shadow-lg shadow-emerald-500/30' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'}`}
            >
              Offbeat Gems
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10'>
          {loading ? (
            <div className='col-span-full py-20 bg-white/5 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center'>
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className='mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]'>
                Fetching {activeFilter} properties...
              </p>
            </div>
          ) : rooms && rooms.length > 0 ? (
            rooms.map((room, index) => (
              <div 
                key={room._id} 
                onClick={() => handleCardClick(room._id)}
                className='bg-white rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer group flex flex-col'
              >
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className='w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90'
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 font-black text-slate-800 text-sm tracking-tighter">
                    ₹{room.price} <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">/ Night</span>
                  </div>
                </div>

                <div className='p-6 md:p-8 flex-1 flex flex-col'>
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h3 className='text-2xl font-bold text-slate-900 leading-none group-hover:text-emerald-600 transition-colors'>
                        {room.name}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Kalimpong • Verified Stay</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                      <ArrowRight size={18} />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-2 mt-auto mb-6'>
                    {amenitiesList.map((item, idx) => (
                      <div key={idx} className='flex items-center gap-2.5 bg-emerald-50/50 border border-emerald-100/50 px-3 py-2 rounded-xl group-hover:bg-emerald-50 transition-colors'>
                        <span className="text-emerald-600">{item.icon}</span>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {index % 3 === 0 ? (
                        <>
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            High Demand
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Available
                          </span>
                        </>
                      )}
                    </div>
                    
                    <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest group-hover:tracking-[0.3em] transition-all duration-300">
                      Explore 
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className='col-span-full py-20 bg-white/5 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center'>
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className='mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]'>
                No properties found.
              </p>
            </div>
          )}
        </div>

        {hasMore && !loading && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleLoadMore}
              disabled={loadingMore}
              className={`group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm transition-all backdrop-blur-sm cursor-pointer
                ${loadingMore ? 'bg-emerald-600/50 text-white cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'}`}
            >
              <span>{loadingMore ? 'Loading...' : 'Explore More Properties'}</span>
              {!loadingMore && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default HomestayList