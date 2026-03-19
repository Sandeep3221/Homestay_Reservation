import uploadOnCloudinary from "../config/cloudinary.js";
import Homestay from "../models/homestay.model.js";

export const addHomestay = async (req, res) => {
  try {
    let { name, price, description, totalRooms, category } = req.body

    if (!name || !price || !description || !totalRooms || !category) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }
    
    let imageUrl = "https://via.placeholder.com/150";

    if (req.file?.path) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResponse) {
        imageUrl = cloudinaryResponse; 
      }
    }

    const homestay = await Homestay.create({
      name,
      price,
      description,
      image: imageUrl,
      totalRooms: parseInt(totalRooms),
      category
    })
    
    return res.status(201).json({ success: true, message: "Homestay added Successfully", homestay })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error in adding homestay" })
  }
}

export const listHomestay = async (req, res) => {
  try {
    const { category = 'all', limit = 4, lastId } = req.query;
    const parsedLimit = parseInt(limit) || 4;
    let query = {};
    if (category !== 'all') {
      query.category = category;
    }
    if (lastId) {
      query._id = { $gt: lastId }; 
    }
    // THE FIX: Fetch limit + 1 (e.g., ask for 5 items instead of 4)
    const homestays = await Homestay.find(query)
      .sort({ _id: 1 })          
      .limit(parsedLimit + 1);   
    // Check if we got that extra item
    let hasMore = false;
    if (homestays.length > parsedLimit) {
      hasMore = true;
      homestays.pop(); // Remove the 5th item so the frontend only gets 4
    }
    return res.status(200).json({ 
        success: true, 
        message: "Filtered Listings", 
        homestays, 
        hasMore 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error in fetching homestay" });
  }
}

export const removeHomestay = async (req, res) => {
  try {
    const {_id}= req.body
    const homestay = await Homestay.findByIdAndDelete(_id)
    
    if (!homestay) {
      return res.status(404).json({ success: false, message: "Homestay not found" })
    }
    
    return res.status(200).json({ success: true, message: "Room deleted successfully" })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error in removing homestay" })
  }
}

export const singleHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id)
    
    if (!homestay) {
      return res.status(404).json({ success: false, message: "Homestay not found" })
    }
    
    return res.status(200).json({ success: true, homestay })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching the Homestay" })
  }
}