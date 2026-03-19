import Reservation from "../models/reservation.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [totalBookings, pendingBookings, confirmedBookings, cancelledBookings, recentBookings] =
      await Promise.all([
        Reservation.countDocuments(),
        Reservation.countDocuments({ status: "pending" }),
        Reservation.countDocuments({ status: "confirmed" }),
        Reservation.countDocuments({ status: "cancelled" }),
        Reservation.find().sort({ createdAt: -1 }).limit(5),
      ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
      },
      recentBookings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error fetching dashboard stats" });
  }
};