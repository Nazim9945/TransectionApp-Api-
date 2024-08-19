import express from 'express'
import userRouter from './userRoutes.js'
import accountRouter from './accountRoutes.js'
const apiRouter=express.Router();
apiRouter.use('/user',userRouter);
apiRouter.use('/account',accountRouter);
export default apiRouter