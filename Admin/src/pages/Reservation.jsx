import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { Check, X, Trash2, Mail, Phone, Calendar, User, Home, Fingerprint } from 'lucide-react'
import toast from 'react-hot-toast'

const statusBadge = (status) => {
  const styles = {
    confirmed: "bg-emerald-500 text-white",
    cancelled: "bg-rose-500 text-white",
    pending: "bg-amber-400 text-white"
  }
  const currentStyle = styles[status] || styles.pending;

  return (
    <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${currentStyle}`}>
      {status || 'pending'}
    </span>
  )
}

const Reservation = ({ token }) => {
  const [reservation, setReservation] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchReservation = async () => {
    try {
      setLoading(true)
      const response = await axios.get(backendUrl + '/api/reservation/get')
      if (response.data.reservations) {
        setReservation(response.data.reservations)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Permanently delete this record?')) {
      try {
        await axios.delete(`${backendUrl}/api/reservation/delete/${id}`, { headers: { token } })
        setReservation(prev => prev.filter(r => r._id !== id))
      } catch (error) {
        toast.error('Error deleting')
      }
    }
  }

  const handleConfirm = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/reservation/confirm/${id}`, {}, { headers: { token } })
      setReservation(prev => prev.map(r => r._id === id ? { ...r, status: 'confirmed' } : r))
    } catch (error) {
      toast.error('Error confirming')
    }
  }

  const handleCancel = async (id) => {
    if (window.confirm('Cancel this booking?')) {
      try {
        await axios.put(`${backendUrl}/api/reservation/cancel/${id}`, {}, { headers: { token } })
        setReservation(prev => prev.map(r => r._id === id ? { ...r, status: 'cancelled' } : r))
      } catch (error) {
        toast.error('Error cancelling')
      }
    }
  }

  useEffect(() => {
    fetchReservation()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6 py-2">
      <div className="flex justify-between items-end border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Reservations</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage guest bookings and property occupancy.</p>
        </div>
        <div className="bg-slate-100 text-slate-600 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-widest">
          {reservation.length} Records
        </div>
      </div>

      <div className="space-y-4">
        {reservation.map((res) => (
          <div key={res._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col xl:flex-row hover:shadow-md transition-all duration-300">
            
            <div className="bg-slate-900 text-white p-6 xl:w-1/5 flex flex-col justify-between border-r border-white/5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Home size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Listing</span>
                </div>
                <h2 className="text-lg font-bold leading-tight">{res.roomName}</h2>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                <Fingerprint size={12} className="text-slate-500" />
                <p className="text-[10px] font-mono font-bold text-emerald-300/80 uppercase">{res._id.slice(-8)}</p>
              </div>
            </div>

            <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50/30">
              
              <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-center h-full shadow-xs">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-100">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-800 leading-none">{res.name}</p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase mt-1">Guest Info</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Mail size={14} className="text-emerald-500" />
                    <span className="text-xs font-semibold">{res.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Phone size={14} className="text-emerald-500" />
                    <span className="text-xs font-semibold">{res.phone}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="bg-white py-4 px-6 rounded-2xl border border-slate-100 flex-1 flex flex-col justify-center shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Check In</p>
                      <p className="text-sm font-bold text-slate-700">{new Date(res.checkin).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                    <div className="h-6 w-px bg-emerald-100"></div>
                    <div className="text-center">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Check Out</p>
                      <p className="text-sm font-bold text-slate-700">{new Date(res.checkout).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                   <div className="flex-1 bg-emerald-600 text-white py-2 rounded-xl text-center text-[10px] font-bold tracking-widest uppercase">{res.guests} Guests</div>
                   <div className="flex-1 bg-slate-900 text-white py-2 rounded-xl text-center text-[10px] font-bold tracking-widest uppercase">{res.rooms} Rooms</div>
                </div>
              </div>

              <div className="lg:col-span-3 h-full flex flex-col items-center lg:items-end justify-center gap-4 pl-4 border-l border-slate-100">
                <div className="text-center lg:text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Total Revenue</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-emerald-600">₹</span>
                    <span className="text-3xl font-bold text-slate-800 tracking-tighter">{res.totalPrice || 0}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {(!res.status || res.status === 'pending') ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleConfirm(res._id)} className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-sm">
                        <Check size={18} />
                      </button>
                      <button onClick={() => handleCancel(res._id)} className="p-2.5 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-sm">
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      {statusBadge(res.status)}
                      <div className="w-px h-4 bg-slate-200"></div>
                      <button onClick={() => handleDelete(res._id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reservation