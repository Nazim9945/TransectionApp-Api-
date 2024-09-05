import express from 'express'
import dbconnect from './config/dbconnect.js';
import apiRouter from './routes/index.js';
import cors from 'cors'
import * as dotenv from 'dotenv';
dotenv.config();
const app=express();
const port=process.env.PORT
app.use(cors())
app.use(express.json());

app.use('/api/v1',apiRouter)
dbconnect()
app.listen(port,()=>{
    console.log(`server is running at ${port} `)
})
app.get('/',(req,res)=>{
    res.send("Entry point of backend")
})