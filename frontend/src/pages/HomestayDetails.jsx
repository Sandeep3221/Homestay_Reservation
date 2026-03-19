import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Car, BellRing, Waves, Tv, Utensils, Wifi, CalendarDays, Users, Home, AlertCircle, CheckCircle2 } from 'lucide-react'
import { AuthContext } from '../contex/AuthContext'
import axios from 'axios'
import { backendUrl } from '../App'
import toast from 'react-hot-toast'

const HomestayDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, loading: isAuthLoading } = useContext(AuthContext)
  
  const [room, setRoom] = useState(null)
  const [isRoomLoading, setIsRoomLoading] = useState(true)
  const [availableRooms, setAvailableRooms] = useState(0)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1
  })

  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const fetchRoomDetails = async () => {
    try {
      setIsRoomLoading(true)
      const response = await axios.get(`${backendUrl}/api/homestay/single/${id}`, { withCredentials: true })
      setRoom(response.data.homestay)
      setAvailableRooms(response.data.homestay.totalRooms)
    } catch (error) {
      console.log(error)
    } finally {
      setIsRoomLoading(false)
    }
  }

  const calculateAvailableRooms = async () => {
    if (!formData.checkIn || !formData.checkOut || !room) return
    try {
      const response = await axios.post(`${backendUrl}/api/reservation/check-availability`, {
        roomId: id,
        checkin: formData.checkIn,
        checkout: formData.checkOut
      }, { withCredentials: true })
      setAvailableRooms(response.data.availableRooms)
    } catch (error) {
      setAvailableRooms(room.totalRooms)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = end - start;
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  }

  const calculateTotal = () => {
    if (!room) return 0;
    const nights = calculateNights();
    return nights > 0 ? nights * room.price * formData.rooms : room.price;
  }

  useEffect(() => {
    calculateAvailableRooms()
  }, [formData.checkIn, formData.checkOut])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone || !formData.checkIn || !formData.checkOut) {
      toast.error('Please fill in all fields')
      return
    }

    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      toast.error('Check-out date must be after check-in date')
      return
    }

    try {
      const response = await axios.post(`${backendUrl}/api/reservation/create`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        checkin: formData.checkIn,
        checkout: formData.checkOut,
        guests: formData.guests.toString(),
        rooms: parseInt(formData.rooms),
        roomName: room.name,
        roomId: room._id
      }, { withCredentials: true })

      if (response.status === 201) {
        toast.success('Booking created successfully! Check your bookings.')
        
        const checkAvailResponse = await axios.post(`${backendUrl}/api/reservation/check-availability`, {
          roomId: id,
          checkin: formData.checkIn,
          checkout: formData.checkOut
        }, { withCredentials: true })
        
        setAvailableRooms(checkAvailResponse.data.availableRooms)
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: 1,
          rooms: 1
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating booking')
    }
  }

  useEffect(() => {
    fetchRoomDetails()
  }, [id])
  
  if (isRoomLoading) {
    return (
      <div className='min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-green-900 flex justify-center items-center'>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"></div>
      </div>
    );
  }

  if (!room && !isRoomLoading) {
    return (
      <div className='min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-green-900 flex justify-center items-center text-white'>
        <div className="text-center">
          <h2 className='text-3xl font-bold mb-4'>Retreat Not Found</h2>
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-emerald-600 rounded-2xl font-bold">Return Home</button>
        </div>
      </div>
    )
  }

  const nights = calculateNights();

  const amenities = [
    { icon: <Wifi size={18} />, label: 'Fast WiFi', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: <Tv size={18} />, label: 'Cable TV', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: <Utensils size={18} />, label: 'Restaurant', color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: <Waves size={18} />, label: 'Pool', color: 'text-rose-600', bg: 'bg-rose-50' },
    { icon: <BellRing size={18} />, label: 'Room Service', color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: <Car size={18} />, label: 'Cab Booking', color: 'text-sky-600', bg: 'bg-sky-50' }
  ];

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-green-900 pt-24 md:pt-32 pb-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
        
        <div className='lg:col-span-7 space-y-8'>
          <div className='bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-100'>
            <div className='relative h-64 sm:h-96 w-full'>
              <img 
                src={room.image} 
                alt={room.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000';
                }}
                className='w-full h-full object-cover'
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className='px-3 py-1 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-3 inline-block'>
                    Premium Stay
                  </span>
                  <h1 className='text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight'>{room.name}</h1>
                </div>
              </div>
            </div>

            <div className='p-5 sm:p-8 bg-white'>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <Users size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Capacity</p>
                    <p className="font-bold text-slate-900">Up to 3 Guests</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <Home size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory</p>
                    <p className="font-bold text-slate-900">{room.totalRooms} Total Rooms</p>
                  </div>
                </div>
              </div>

              <div className="py-5 sm:py-8">
                <h2 className='text-xl font-bold text-slate-900 mb-3 tracking-tight'>About This Space</h2>
                <p className='text-slate-600 text-base leading-relaxed font-medium'>{room.description}</p>
              </div>

              <div className="pt-5 border-t border-slate-100">
                <h2 className='text-xl font-bold text-slate-900 mb-4 tracking-tight'>Premium Amenities</h2>
                <div className='grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4'>
                  {amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className='flex flex-col items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl border border-white/50 bg-slate-50/40 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,0.8)] hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 text-center'
                    >
                      <div className={`w-9 h-9 flex items-center justify-center rounded-xl ${amenity.bg} ${amenity.color} shrink-0`}>
                        {amenity.icon}
                      </div>
                      <span className='text-[11px] sm:text-xs font-bold text-slate-700 leading-tight'>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='lg:col-span-5'>
          <div className='bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 sm:p-8 lg:sticky lg:top-32'>
            
            <div className="flex items-end justify-between mb-5 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-100">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Reservation</p>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black text-emerald-600 leading-none">₹{room.price}</span>
                  <span className="text-sm font-bold text-slate-400 mb-1">/ night</span>
                </div>
              </div>
            </div>

            {isAuthLoading ? (
              <div className='text-center py-12'>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
                <p className='text-slate-500 mt-4 text-sm font-bold'>Securing connection...</p>
              </div>
            ) : !isAuthenticated ? (
              <div className='text-center py-8'>
                <div className='w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-400'>
                  <CalendarDays size={28} strokeWidth={1.5} />
                </div>
                <h3 className='text-xl font-bold text-slate-900 mb-2 tracking-tight'>Sign in to Reserve</h3>
                <p className='text-slate-500 text-sm font-medium mb-8'>Join us to secure your preferred dates and unlock a premium homestay experience.</p>
                <button 
                  onClick={() => navigate('/signup')}
                  className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold text-base cursor-pointer transition-all duration-300 shadow-xl shadow-emerald-900/20 active:scale-95'
                >
                  Create Account / Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-3 sm:space-y-5'>
                
                {formData.checkIn && formData.checkOut ? (
                  <div className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-colors ${availableRooms > 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                    {availableRooms > 0 ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} /> : <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />}
                    <div>
                      <p className={`text-sm font-bold ${availableRooms > 0 ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {availableRooms > 0 ? `${availableRooms} Room(s) Available` : 'Fully Booked'}
                      </p>
                      <p className={`text-xs mt-0.5 ${availableRooms > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {availableRooms > 0 ? 'Your selected dates are open for booking.' : 'Please select different dates.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-slate-500">
                    <CalendarDays className="shrink-0 mt-0.5" size={18} />
                    <p className="text-sm font-medium">Select check-in and check-out dates to view live availability.</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  <div>
                    <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1'>Check-In</label>
                    <input 
                      type="date" 
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      min={todayDate}
                      className='w-full border border-slate-200 bg-slate-50 px-3 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200'
                    />
                  </div>
                  <div>
                    <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1'>Check-Out</label>
                    <input 
                      type="date" 
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      min={formData.checkIn || todayDate}
                      className='w-full border border-slate-200 bg-slate-50 px-3 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200'
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  <div>
                    <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1'>Guests</label>
                    <select 
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className='w-full border border-slate-200 bg-slate-50 px-3 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 appearance-none'
                    >
                      {[1, 2, 3].map((i) => (
                        <option key={i} value={i}>{i} Guest{i > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1'>Rooms</label>
                    <select 
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleInputChange}
                      className='w-full border border-slate-200 bg-slate-50 px-3 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 appearance-none'
                    >
                      {[1, 2, 3, 4, 5].map((i) => (
                        <option key={i} value={i} disabled={formData.checkIn && formData.checkOut && i > availableRooms}>
                          {i} Room{i > 1 ? 's' : ''} {formData.checkIn && formData.checkOut && i > availableRooms ? '(Full)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2.5 sm:space-y-4 pt-1 sm:pt-3">
                  <div>
                    <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1'>Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder='Primary Guest Name' 
                      className='w-full border border-slate-200 bg-slate-50 px-3 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 placeholder:font-medium placeholder:text-slate-400'
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1'>Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='Email Address' 
                        className='w-full border border-slate-200 bg-slate-50 px-3 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 placeholder:font-medium placeholder:text-slate-400'
                      />
                    </div>
                    <div>
                      <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1'>Phone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder='Mobile Number' 
                        className='w-full border border-slate-200 bg-slate-50 px-3 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 placeholder:font-medium placeholder:text-slate-400'
                      />
                    </div>
                  </div>
                </div>

                {formData.checkIn && formData.checkOut && nights > 0 && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-2 space-y-3">
                    <div className="flex justify-between text-sm font-medium text-slate-500">
                      <span>₹{room.price} × {nights} night{nights > 1 ? 's' : ''} × {formData.rooms} room{formData.rooms > 1 ? 's' : ''}</span>
                      <span className="text-slate-900 font-bold">₹{room.price * nights * formData.rooms}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 flex justify-between items-end">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total</span>
                      <span className="text-2xl font-black text-emerald-600 leading-none">₹{calculateTotal()}</span>
                    </div>
                  </div>
                )}

                <div className='pt-2'>
                  <button
                    type='submit'
                    disabled={formData.checkIn && formData.checkOut && availableRooms === 0}
                    className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-xl flex justify-center items-center gap-2
                    ${
                      formData.checkIn && formData.checkOut && availableRooms === 0
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-emerald-900/20 active:scale-95"
                    }`}
                  > 
                    {formData.checkIn && formData.checkOut && availableRooms === 0
                    ? "Dates Unavailable"
                    : "Confirm Reservation"}
                  </button>
                  <p className="text-center text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-widest">Pay at the property during check-in</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomestayDetails