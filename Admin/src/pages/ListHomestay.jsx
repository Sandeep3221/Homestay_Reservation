import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { Trash2, Home, IndianRupee, Image as ImageIcon, MapPin, Layers } from 'lucide-react';
import toast from 'react-hot-toast';

const ListHomestay = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHomestayList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/homestay/list?limit=1000`, {
        headers: { token },
      });
      if (response.data.success) {
        setList(response.data.homestays || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHomestay = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this property?")) return;

      const response = await axios.delete(`${backendUrl}/api/homestay/delete`, {
        data: { _id: id },
        headers: { token },
      });

      if (response.data.success) {
        toast.success("Property removed ✅");
        fetchHomestayList();
      }
    } catch (error) {
      toast.error("Error deleting homestay ❌");
    }
  };

  useEffect(() => {
    fetchHomestayList();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 py-2">
      <div className="flex justify-between items-end border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Active Listings</h1>
          <p className="text-slate-500 text-sm font-medium">Monitor and manage your property portfolio.</p>
        </div>
        <div className="bg-slate-100 text-slate-600 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-widest">
          {list.length} Total Units
        </div>
      </div>

      <div className="space-y-4">
        {list.length === 0 ? (
          <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-200 text-center text-slate-400">
            <ImageIcon size={40} className="mx-auto mb-4 opacity-20" />
            <p className="font-bold uppercase tracking-widest text-[10px]">No active listings found</p>
          </div>
        ) : (
          list.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col xl:flex-row hover:shadow-md transition-all duration-300">
              
              <div className="bg-slate-900 xl:w-1/5 relative group overflow-hidden min-h-40">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-5">
                  <p className="text-[10px] font-mono font-bold text-emerald-400/80 tracking-tighter uppercase">ID: {item._id.slice(-8)}</p>
                </div>
              </div>

              <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50/30">
                
                <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-center shadow-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Home size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 leading-tight">{item.name}</h2>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                        <MapPin size={10}/> Kalimpong, West Bengal
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="bg-white py-4 px-6 rounded-2xl border border-slate-100 flex items-center justify-center gap-3 shadow-xs">
                    <Layers size={18} className="text-emerald-500"/>
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-none">Capacity</p>
                      <p className="text-base font-bold text-slate-700">{item.totalRooms} Rooms</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex items-center justify-between pl-4 border-l border-slate-100">
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Base Rate</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-emerald-600">₹</span>
                      <span className="text-2xl font-bold text-slate-800 tracking-tight">{item.price}</span>
                      <span className="text-[10px] font-bold text-slate-300 ml-1 uppercase">/ Night</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => deleteHomestay(item._id)}
                    className="p-3.5 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all cursor-pointer group"
                    title="Remove Property"
                  >
                    <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListHomestay;