import express from 'express'
import { adminLogin, getProfile } from '../controller/userController.js'
import { login, logout, signup } from '../controller/auth.controller.js'
import isAuth from '../middleware/isAuth.js'

const userRouter=express.Router()


userRouter.post('/admin',adminLogin)
userRouter.post('/user',signup)
userRouter.post('/login',login)
userRouter.post('/logout',logout)
userRouter.get('/profile', isAuth, getProfile)

export default userRouter