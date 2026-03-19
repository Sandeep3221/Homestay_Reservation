import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Calendar,
  Zap,
  ArrowUpRight
} from 'lucide-react'

const statusBadge = (status) => {
  const styles = {
    confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    cancelled: "bg-rose-50 text-rose-600 border-rose-100",
    pending: "bg-amber-50 text-amber-600 border-amber-100"
  }
  const currentStyle = styles[status] || styles.pending;

  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-sm ${currentStyle}`}>
      {status || 'pending'}
    </span>
  )
}

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/dashboard/stats`, {
          headers: { token },
        })
        if (res.data.success) {
          setStats(res.data.stats)
          setRecentBookings(res.data.recentBookings)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [token])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  const cards = [
    { label: 'Total Volume', value: stats.totalBookings, icon: <Users size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Awaiting Action', value: stats.pendingBookings, icon: <Clock size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Success Stays', value: stats.confirmedBookings, icon: <CheckCircle2 size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Dropped', value: stats.cancelledBookings, icon: <XCircle size={20} />, color: 'text-rose-600', bg: 'bg-rose-50' },
  ]

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      
      {/* Refined Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1 text-emerald-400 font-bold text-[10px] tracking-[0.2em] uppercase">
            <Zap size={14} fill="currentColor" />
            Live System Status
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Executive <span className="text-emerald-400">Dashboard</span></h1>
          <p className="text-slate-400 text-sm mt-1 font-medium">Monitoring property performance and guest flow.</p>
        </div>
        <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl text-right">
           <p className="text-slate-400 text-[10px] font-bold uppercase mb-0.5 tracking-wider">Session Date</p>
           <p className="text-base font-bold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <div
            key={card.label}
            className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className={`w-10 h-10 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{card.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden border-t-2 border-t-emerald-500">
        <div className="px-8 py-5 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Live Activity Stream</h3>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-bold rounded-full uppercase tracking-tighter">Updated Just Now</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-slate-400 border-b border-slate-50">
                <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest">Homestay Location</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest">Guest Detail</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest">Stay Window</th>
                <th className="px-8 py-4 text-center text-[10px] font-bold uppercase tracking-widest">Live Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-8 py-16 text-center text-slate-300 italic text-sm font-medium">No Active Records</td>
                </tr>
              ) : (
                recentBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors group cursor-default">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                        <div>
                          <p className="text-base font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                            {booking.roomName}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">#{booking._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-sm font-bold text-slate-700">{booking.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">Verified Client</p>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">{new Date(booking.checkin).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <ArrowUpRight size={12} className="text-slate-300" />
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">{new Date(booking.checkout).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-center">
                      {statusBadge(booking.status || 'pending')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard