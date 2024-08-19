import express from 'express'
import balance from '../controllers/balance.js';
import transfer from '../controllers/transfer.js';
import authmiddleware from '../middleware/authmiddleware.js';
const router=express.Router();
router.use(authmiddleware)
router.post('/transfer',transfer);
router.get('/balance',balance);

export default router