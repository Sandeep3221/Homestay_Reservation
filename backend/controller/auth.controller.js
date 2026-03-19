import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
export const signup=async(req,res)=>{
        try {
        let { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        let existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: "email already exists" });
        }
        let existUsername = await User.findOne({ userName });
        if (existUsername) {
            return res.status(400).json({ message: "UserName already exist" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be atleast 8 letters" });
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userName,
            email,
            password: hashedPassword
        });

        let token = genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
            secure: false
        });
        res.status(201).json(user);
        } catch (error) {
            console.log("Error during signup:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
}
export const login=async(req,res)=>{
        try {
                let { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ message: "All fields are required" });
                }
                let user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ message: "User does not exist" });
                }
                let isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }
                let token = genToken(user._id);
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    sameSite: "lax",
                    secure: false
                });
                res.status(200).json({message:"Login successful", user});
        } catch (error) {
                console.log("Error during login:", error.message);
                res.status(500).json({ message: "Internal server error" });
        }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error during logout:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}