import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import { Calendar, Users, Phone, Mail, ArrowLeft, XCircle, Home, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

const statusBadge = (status) => {
  if (status === 'confirmed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Confirmed
      </span>
    )
  }
  if (status === 'cancelled') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 text-rose-400">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Cancelled
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 text-amber-400">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Pending
    </span>
  )
}

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/reservation/my-bookings`, {
          withCredentials: true
        });
        if (res.data.success) {
          setBookings(res.data.reservations);
        }
      } catch (err) {
        setError('Failed to fetch bookings. Please login to see your bookings.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await axios.put(`${backendUrl}/api/reservation/cancel/${id}`, {}, {
        withCredentials: true
      });
      setBookings(prev =>
        prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b)
      );
      toast.success('Booking cancelled successfully');
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-green-900 pt-24 md:pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <p className='text-[10px] tracking-[0.3em] uppercase text-emerald-400 font-black mb-2'>Dashboard</p>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">My Bookings</h1>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 text-white font-bold transition-all cursor-pointer w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Retrieving reservations...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-8 text-center max-w-lg mx-auto mt-12">
            <XCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <p className="text-rose-200 font-medium mb-6">{error}</p>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-rose-600 text-white font-bold rounded-2xl hover:bg-rose-700 transition-colors cursor-pointer shadow-lg shadow-rose-900/20"
            >
              Sign In
            </button>
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center max-w-2xl mx-auto mt-12 shadow-2xl">
            <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">No Active Retreats</h2>
            <p className="text-slate-400 mb-8 font-medium">Your itinerary is currently empty. Ready to plan your Kalimpong getaway?</p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all cursor-pointer shadow-xl shadow-emerald-900/20 active:scale-95"
            >
              Explore Properties
            </button>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {bookings.map((booking) => {
              const { _id, roomName, status, checkin, checkout, guests, rooms, email, phone, totalPrice } = booking;
              const isPastBooking = new Date(checkin) < today;

              return (
                <div
                  key={_id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col group"
                >
                  <div className="p-6 md:p-8 flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Ref: {_id.slice(-8)}</p>
                        <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">{roomName}</h3>
                      </div>
                      <div className="shrink-0 ml-4">
                        {statusBadge(status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1.5"><Calendar size={12} className="text-emerald-500"/> Check In</p>
                        <p className="text-sm font-bold text-slate-200">{formatDate(checkin)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Check Out</p>
                        <p className="text-sm font-bold text-slate-200">{formatDate(checkout)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-8 border-b border-slate-800 pb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-500">
                          <Users size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Guests</p>
                          <p className="text-sm font-bold text-white">{guests}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-500">
                          <Home size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rooms</p>
                          <p className="text-sm font-bold text-white">{rooms || 1}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-400 font-medium"><CreditCard size={14}/> Total Amount</span>
                        <span className="font-black text-emerald-400 text-lg">₹{totalPrice ? totalPrice.toLocaleString('en-IN') : '0'}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-slate-500"><Mail size={12}/> Email</span>
                        <span className="text-slate-300 font-medium truncate max-w-37.5">{email}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-slate-500"><Phone size={12}/> Contact</span>
                        <span className="text-slate-300 font-medium">{phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 border-t border-slate-800 mt-auto">
                    {status === 'cancelled' ? (
                      <div className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-slate-500 font-bold text-sm rounded-xl cursor-not-allowed select-none border border-slate-800">
                        <XCircle className="w-4 h-4" />
                        Cancelled
                      </div>
                    ) : isPastBooking ? (
                      <div className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-slate-500 font-bold text-sm rounded-xl cursor-not-allowed select-none border border-slate-800">
                        <Calendar className="w-4 h-4" />
                        Completed Stay
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCancelBooking(_id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white font-bold text-sm rounded-xl transition-all duration-300 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel Reservation
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;