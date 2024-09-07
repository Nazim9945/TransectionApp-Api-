import mongoose from 'mongoose'
const dbconnect=async()=>{
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("db connected successfully")
}).catch((error)=>{
    console.log(error)
    console.log("issue while connecting with db")
})
}
export default dbconnect