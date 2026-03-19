import Reservation from "../models/reservation.model.js";
import Homestay from "../models/homestay.model.js";

export const createReservation = async (req, res) => {
  try {
    const {name, email, phone, checkout, checkin, guests, rooms, roomName, roomId} = req.body

    if(!name || !email || !phone || !checkout || !checkin || !guests || !roomName || !roomId){
      return res.status(400).json({success: false, message:"All fields are required!"})
    }
    
    const roomsToBook = parseInt(rooms) || 1;
    
    if(roomsToBook < 1){
      return res.status(400).json({success: false, message:"You must book at least 1 room"})
    }

    const checkinDate = new Date(checkin)
    const checkoutDate = new Date(checkout)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if(checkinDate < today){
      return res.status(400).json({success: false, message:"Check-in date cannot be in the past"})
    }

    if(checkinDate >= checkoutDate){
      return res.status(400).json({success: false, message:"Checkout must be after checkin"})
    }

    const homestay = await Homestay.findById(roomId)
    if(!homestay){
      return res.status(404).json({success: false, message:"Homestay not found"})
    }

    const overlappingReservations = await Reservation.find({
      roomId: roomId,
      status: { $ne: "cancelled" },
      checkin: { $lt: checkoutDate },
      checkout: { $gt: checkinDate }
    })

    let bookedRooms = 0
    overlappingReservations.forEach(res => {
      bookedRooms += res.rooms
    })

    const availableRooms = homestay.totalRooms - bookedRooms

    if(roomsToBook > availableRooms){
      return res.status(400).json({
        success: false,
        message:`Only ${availableRooms} room(s) available for selected dates`
      })
    }

    const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
    const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const calculatedTotalPrice = numberOfNights * homestay.price * roomsToBook;

    const newReservation = await Reservation.create({
      userId:req.userId,
      name,
      email,
      phone,
      checkin:checkinDate,
      checkout:checkoutDate,
      guests,
      rooms: roomsToBook,
      roomName,
      roomId,
      totalPrice: calculatedTotalPrice
    })

    return res.status(201).json({
      success: true,
      message:"Reservation created successfully",
      newReservation
    })

  } catch (error) {
    return res.status(500).json({success: false, message:"Error in creating Reservation"})
  }
}

export const getAllReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({createdAt:-1})
    return res.json({success: true, message:"Reservation Fetched", reservations})
  } catch (error) {
    return res.status(500).json({success: false, message:"Error in fetching reservations"})
  }
}

export const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({userId:req.userId}).sort({createdAt:-1})
    return res.json({success:true, message:"User Reservations Fetched", reservations})
  } catch (error) {
    return res.status(500).json({success: false, message:"Error in fetching user reservations"})
  }
}

export const deleteReservation = async (req, res) => {
  try {
    const {id} = req.params
    await Reservation.findByIdAndDelete(id)
    return res.status(200).json({success: true, message:"Reservation deleted Successfully"})  
  } catch (error) {
    return res.status(500).json({success: false, message:"Error deleting the reservation"})
  }
}

export const checkAvailability = async (req, res) => {
  try {
    const {roomId, checkin, checkout} = req.body
    
    if(!roomId || !checkin || !checkout){
      return res.status(400).json({success: false, message:"All fields are required"})
    }

    const checkinDate = new Date(checkin)
    const checkoutDate = new Date(checkout)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if(checkinDate < today){
      return res.status(400).json({success: false, message:"Check-in date cannot be in the past"})
    }

    if(checkinDate >= checkoutDate){
      return res.status(400).json({success: false, message:"Checkout must be after checkin"})
    }

    const homestay = await Homestay.findById(roomId)
    if(!homestay){
      return res.status(404).json({success: false, message:"Homestay not found"})
    }

    const overlappingReservations = await Reservation.find({
      roomId: roomId,
      status: { $ne: "cancelled" },
      checkin: { $lt: checkoutDate },
      checkout: { $gt: checkinDate }
    })

    let bookedRooms = 0
    overlappingReservations.forEach(res => {
      bookedRooms += res.rooms
    })

    const availableRooms = homestay.totalRooms - bookedRooms

    return res.json({
      success: true,
      availableRooms: Math.max(0, availableRooms),
      totalRooms: homestay.totalRooms,
      bookedRooms: bookedRooms
    })
  } catch (error) {
    return res.status(500).json({success: false, message:"Error checking availability"})
  }
}

export const confirmReservation = async (req, res) => {
  try {
    const {id} = req.params
    const reservation = await Reservation.findById(id)
    if(!reservation){
      return res.status(404).json({success: false, message:"Reservation not found"})
    }
    reservation.status = "confirmed"
    await reservation.save()
    return res.status(200).json({success: true, message:"Reservation confirmed successfully", reservation})
  } catch (error) {
    return res.status(500).json({success: false, message:"Error confirming reservation"})
  }
}

export const cancelReservation = async (req, res) => {
  try {
    const {id} = req.params
    const reservation = await Reservation.findById(id)
    if(!reservation){
      return res.status(404).json({success: false, message:"Reservation not found"})
    }
    if (reservation.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" })
    }
    reservation.status = "cancelled"
    await reservation.save()
    return res.status(200).json({success: true, message:"Reservation cancelled successfully", reservation})
  } catch (error) {
    return res.status(500).json({success: false, message:"Error cancelling reservation"})
  }
}