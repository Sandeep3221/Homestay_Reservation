import React, { useState } from 'react'
import default_image from '../assets/upload-icon-svg-download-png-7349799.webp'
import axios from 'axios'
import { backendUrl } from '../App'
import { Upload, IndianRupee, Home, AlignLeft, Type, ImagePlus, Tag } from 'lucide-react'
import toast from 'react-hot-toast'

const AddHomestay = ({ token }) => {
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [totalRooms, setTotalRooms] = useState("")
  const [category, setCategory] = useState("popular") // NEW: Added state for Category
  const [preview, setPreview] = useState(default_image)
  const [loading, setLoading] = useState(false)

  const homestaySubmittion = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("totalRooms", totalRooms)
      formData.append("category", category) // NEW: Append category to form data
      if (image) formData.append("image", image)

      const response = await axios.post(`${backendUrl}/api/homestay/add`, formData, { 
        headers: { token } 
      })

      if (response.data.success) {
        toast.success("Homestay added successfully ✅")
        // Reset all fields
        setName("")
        setDescription("")
        setPrice("")
        setTotalRooms("")
        setCategory("popular") // Reset to default
        setImage(null)
        setPreview(default_image)
      }
    } catch (error) {
      toast.error("Error adding homestay ❌")
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="w-full space-y-6 py-2">
      {/* Header Section */}
      <div className="flex justify-between items-end border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Create Listing</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Add a new property to your active portfolio.</p>
        </div>
        <div className="bg-slate-100 text-slate-600 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-widest">
          New Entry
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col xl:flex-row hover:shadow-md transition-all duration-300">
        
        {/* 1. UPLOAD SIDEBAR - Dark Slate */}
        <div className="bg-slate-900 text-white p-8 xl:w-1/4 flex flex-col justify-between border-r border-white/5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <ImagePlus size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Media</span>
            </div>
            <h2 className="text-xl font-bold leading-tight">Property Photo</h2>
            <p className="text-xs text-slate-400 mt-2">Upload a high-quality image of the homestay to attract more guests.</p>
          </div>
          
          <div className="mt-8">
            <label htmlFor="image" className="group cursor-pointer block">
              <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800/50 p-2 transition-all group-hover:border-emerald-500/50">
                <img src={preview} alt="upload" className="w-full h-40 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Upload className="text-white" size={24} />
                </div>
              </div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-3 text-center">Click to change</p>
            </label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} hidden />
          </div>
        </div>

        {/* 2. FORM CONTENT - Light Tints */}
        <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-50/30">
          
          <form className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6" onSubmit={homestaySubmittion}>
            
            {/* Basic Info Section */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                 <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Type size={20} />
                 </div>
                 <p className="text-sm font-bold text-slate-800 uppercase tracking-wider">Primary Details</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Homestay Name</label>
                <input required type="text" placeholder="e.g. Hilltop Haven" value={name} onChange={(e)=>setName(e.target.value)} 
                  className="w-full p-3 text-sm font-semibold border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                <textarea required rows="3" placeholder="Describe the property..." value={description} onChange={(e)=>setDescription(e.target.value)} 
                  className="w-full p-3 text-sm font-semibold border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none resize-none transition-all"></textarea>
              </div>
            </div>

            {/* Inventory & Pricing Section */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-5">
                
                {/* NEW: Category Dropdown */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    <Tag size={14} className="text-emerald-500" /> Category
                  </label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 text-sm font-bold border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none appearance-none bg-white cursor-pointer"
                  >
                    <option value="popular">Popular Destination</option>
                    <option value="offbeat">Offbeat / Hidden Gem</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    <Home size={14} className="text-emerald-500" /> Total Rooms
                  </label>
                  <input required type="number" placeholder="e.g. 5" value={totalRooms} onChange={(e)=>setTotalRooms(e.target.value)} 
                    className="w-full p-3 text-sm font-bold border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none" />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    <IndianRupee size={14} className="text-emerald-500" /> Price per Night
                  </label>
                  <input required type="number" placeholder="e.g. 2500" value={price} onChange={(e)=>setPrice(e.target.value)} 
                    className="w-full p-3 text-base font-bold border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none" />
                </div>
              </div>

              {/* Action Button */}
              <button type="submit" disabled={loading}
                className={`w-full py-4 text-white text-sm font-bold rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2
                ${loading ? 'bg-slate-400' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-emerald-100'}`}>
                {loading ? "Processing..." : <><Upload size={18}/> Publish Property</>}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default AddHomestay