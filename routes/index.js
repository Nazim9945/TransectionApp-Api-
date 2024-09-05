import express from 'express'
import userRouter from './userRoutes.js'
import accountRouter from './accountRoutes.js'
import { mePoint } from '../controllers/mePoint.js';
const apiRouter=express.Router();

apiRouter.get('/me',mePoint);
apiRouter.use('/user',userRouter);
apiRouter.use('/account',accountRouter);
export default apiRouter