import express from 'express'
import update from '../controllers/update.js'
import getallusers from '../controllers/getallusers.js';
import { signup,signin } from '../controllers/Auth.js';
import authmiddleware from '../middleware/authmiddleware.js';
const router=express.Router();


router.post('/signup',signup);
router.post('/signin',signin);
router.use(authmiddleware)
router.put('/update',update);
router.get('/getallusers',getallusers);

export default router