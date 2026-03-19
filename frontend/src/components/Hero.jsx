import { MapPin, Heart, Users, Star, Mountain, ArrowRight } from 'lucide-react';

function Hero() {
  const scrollToRooms = () => {
    const element = document.getElementById('bookings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-linear-to-br from-green-900 via-blue-900 to-slate-900 overflow-hidden pt-20 md:pt-24">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-4 w-56 h-56 bg-green-300 rounded-full blur-3xl opacity-20 sm:left-10 sm:w-72 sm:h-72" />
        <div className="absolute top-40 right-4 w-56 h-56 bg-blue-300 rounded-full blur-3xl opacity-20 sm:right-10 sm:w-72 sm:h-72" />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-56 h-56 bg-emerald-300 rounded-full blur-3xl opacity-20 sm:w-72 sm:h-72" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-block">
              <div className="flex items-center gap-2 bg-emerald-500 bg-opacity-30 px-4 py-2 rounded-full border border-emerald-300 backdrop-blur-sm">
                <Star className="w-4 h-4 text-emerald-300 fill-emerald-300" />
                <span className="text-emerald-100 text-xs sm:text-sm font-semibold uppercase tracking-widest">Premium Homestay Experience</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Discover Your <br />
              <span className="bg-linear-to-r from-emerald-300 via-green-300 to-blue-300 bg-clip-text text-transparent">
                Dream Homestay
              </span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-300 font-normal">
                in Kalimpong
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-lg">
              Experience authentic mountain living with <span className="text-emerald-400 font-semibold">stunning views</span> and <span className="text-emerald-400 font-semibold">warm hospitality</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button onClick={scrollToRooms} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer transition-all shadow-xl shadow-emerald-900/20 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
                Book Your Stay <ArrowRight size={18} />
              </button>
              <button onClick={scrollToRooms} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-bold rounded-xl cursor-pointer transition-all backdrop-blur-md">
                Explore Rooms
              </button>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                <span>Free Cancellation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-2xl border border-slate-100">
              <div className="flex items-start justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                    <Mountain className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-snug">Top Destinations</h3>
                </div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg uppercase tracking-widest shrink-0">Kalimpong</span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Popular</p>
                  {['Delo Park', 'Durpin Hill', 'Dadharey Bhir', 'Mangal Dham'].map((loc, i) => (
                    <div key={loc} className="flex items-center gap-2 group cursor-pointer">
                      <span className="text-[10px] font-black text-emerald-200 group-hover:text-emerald-500 transition-colors shrink-0">0{i + 1}</span>
                      <p className="text-xs sm:text-sm font-bold text-gray-700 group-hover:text-emerald-600 transition-colors leading-tight">{loc}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pl-4 border-l border-slate-100">
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Offbeat</p>
                  {['Lava', 'Lolegaon', 'Munsong', 'Sillary Gaon'].map((loc, i) => (
                    <div key={loc} className="flex items-center gap-2 group cursor-pointer">
                      <span className="text-[10px] font-black text-blue-200 group-hover:text-blue-500 transition-colors shrink-0">0{i + 1}</span>
                      <p className="text-xs sm:text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors leading-tight">{loc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Homestays', val: '50+', icon: <MapPin size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Rating', val: '4.9/5', icon: <Heart size={18} />, color: 'text-rose-600', bg: 'bg-rose-50' },
                { label: 'Travelers', val: '1.2k', icon: <Users size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Support', val: '24/7', icon: <Star size={18} />, color: 'text-orange-600', bg: 'bg-orange-50' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-3 rounded-xl flex items-center gap-2.5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`p-2 ${stat.bg} ${stat.color} rounded-lg shrink-0`}>
                    {stat.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-bold text-gray-900 leading-tight">{stat.val}</p>
                    <p className={`font-bold text-[9px] uppercase tracking-widest ${stat.color} whitespace-nowrap`}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;