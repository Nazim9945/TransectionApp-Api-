import mongoose from "mongoose";
const accountSchema=new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'userSchema'},
    balance:{type:Number,required:true}
})
export default mongoose.model("accountSchema",accountSchema)