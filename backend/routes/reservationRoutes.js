import express from 'express'
import { createReservation, deleteReservation, getAllReservation, getUserReservations, checkAvailability, confirmReservation, cancelReservation } from '../controller/reservationController.js'
import isAuth from '../middleware/isAuth.js'
import { adminAuth } from '../middleware/adminAuth.js'


const router=express.Router()

router.post('/create',isAuth,createReservation)
router.get('/get',adminAuth,getAllReservation)
router.get('/my-bookings',isAuth,getUserReservations)
router.delete('/delete/:id',adminAuth,deleteReservation)
router.post('/check-availability',checkAvailability)

router.put('/confirm/:id', adminAuth, confirmReservation)// admin confirms
router.put('/cancel/:id', isAuth, cancelReservation)// user or admin cancels
export default router