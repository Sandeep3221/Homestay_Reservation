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
import dashboardRouter from './routes/dashboardRoutes.js'
import path from 'path'

const __dirname = path.resolve()
const app = express()
const port = process.env.PORT || 4000

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
})

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL
].filter(Boolean)

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`))
    }
  },
  credentials: true
}))

app.use(helmet({
  crossOriginResourcePolicy: false
}))

app.use(limiter)
app.use(cookieParser())
app.use(express.json())

connectDB()
app.use('/Public', express.static(path.join(__dirname, 'Public')))
app.use("/api/homestay", homestayRouter)
app.use('/api/reservation', router)
app.use('/api/user', userRouter)
app.use('/api/dashboard', dashboardRouter)

app.get("/", (req, res) => {
  res.send("API is working")
})

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`)
})