import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  checkin: {
    type: Date,
    required: true
  },
  checkout: {
    type: Date,
    required: true
  },
  guests: {
    type: String,
    required: true
  },
  rooms: {
    type: Number,
    required: true,
    default: 1
  },
  roomName: {
    type: String,
    required: true
  },
  roomId: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }
}, { timestamps: true })

const Reservation = mongoose.model("Reservation", reservationSchema)

export default Reservation