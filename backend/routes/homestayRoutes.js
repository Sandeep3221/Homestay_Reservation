import express from 'express'
import { addHomestay, listHomestay, removeHomestay, singleHomestay } from '../controller/homestayController.js'
import upload from '../middleware/multer.js'
import {adminAuth} from '../middleware/adminAuth.js'

const homestayRouter=express.Router()

homestayRouter.post('/add',adminAuth,upload.single("image"),addHomestay)
homestayRouter.get('/list',listHomestay)
homestayRouter.delete('/delete',adminAuth,removeHomestay)
homestayRouter.get('/single/:id',singleHomestay)

export default homestayRouter