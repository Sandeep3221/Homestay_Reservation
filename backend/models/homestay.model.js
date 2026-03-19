import mongoose from "mongoose";

const homestaySchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
                trim: true
        },
        price: {
                type: Number,
                required: true
        },
        description: {
                type: String,
                required: true,
                trim: true
        },
        image: {
                type: String,
                required: true,
        },
        totalRooms: {
                type: Number,
                required: true,
                default: 1
        },
        date: {
                type: Date,
                default: Date.now
        },
        
        // --- NEW CATEGORY FIELD ---
        // Enum restricts the data: the database will ONLY accept 'popular' or 'offbeat'.
        // If the admin forgets to select one during upload, it defaults to 'popular' so the app doesn't crash.
        category: {
                type: String,
                enum: ['popular', 'offbeat'],
                required: true,
                default: 'popular'
        }
}, { timestamps: true })

// --- DATABASE OPTIMIZATION (INDEXING) ---
// This creates a B-Tree index in MongoDB. 
// When a user clicks "Offbeat" and then clicks "Load More", MongoDB uses this index 
// to instantly jump to the correct category and the last loaded _id without scanning the whole database.
// This is what makes the API fast (O(1) time complexity) even with thousands of users.
homestaySchema.index({ category: 1, _id: 1 });

const Homestay = mongoose.model("Homestay", homestaySchema)
export default Homestay