import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import rateLimit from "express-rate-limit"
import "dotenv/config"
import connectDB from './config/database.config.js'
import homestayRouter from './routes/homestayRoutes.js'
import router from './routes/reservationRoutes.js'
import userRouter from './routes/userRoutes.js'
import path from 'path';
import dashboardRouter from './routes/dashboardRoutes.js'
const __dirname = path.resolve();
const app=express()
const port=process.env.PORT || 4000
// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
})
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL].filter(Boolean),
    credentials: true
  })
)
app.use(helmet())
app.use(limiter) // rate limiter applied
app.use(cookieParser())
app.use(express.json())
connectDB();
app.use('/Public', express.static(path.join(__dirname, 'Public')));
app.use("/api/homestay",homestayRouter)
app.use('/api/reservation',router)
app.use('/api/user',userRouter)
app.use('/api/dashboard', dashboardRouter)

app.get("/",(req,res)=>{
        res.send("API is working");
})

app.listen(port,()=>{
        console.log(`Server is listening at port ${port}`)
})