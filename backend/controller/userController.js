import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" })
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, role: 'admin' }, 
        process.env.JWT_SECRET,
        { expiresIn: '24h' } 
      )
      
      return res.status(200).json({ success: true, token })
    } else {
      return res.status(401).json({ success: false, message: "Invalid login credentials" })
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error during admin login" })
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    return res.status(200).json({
      success: true,
      user
    })

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" })
  }
}