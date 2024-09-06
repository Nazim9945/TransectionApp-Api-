import accountSchema from "../model/accountSchema.js";
import mongoose from "mongoose";
export default async(req,res)=>{
    try {
        const session=await mongoose.startSession();
     session.startTransaction();
        const {to,amount}=req.body;
        if(amount<=0){
            await session.abortTransaction()
            return res.status(404).json({
                msg:"Invalid amount"
            })
        }
        const touser=await accountSchema.findOne({userId:to});
        const currentuser=await accountSchema.findOne({userId:req.body.id})
        console.log("payable:",amount,typeof (amount))
        console.log("kitna hai",currentuser.balance,typeof currentuser.balance)
        console.log("who is ",currentuser)
         console.log("who is ",touser)
        if(!touser || !currentuser){
             await session.abortTransaction();
            return res.status(404).json({
                msg:"Invalid user"
            }
            )
        }
        if(Number(currentuser.balance)<Number(amount)){
           await session.abortTransaction();
            return res.status(404).json({
                msg:"Not have enough balance"
            }
            )
        }
        await accountSchema.updateOne({userId:to},{$inc:{balance:amount}},{new:true})
        await accountSchema.updateOne({userId:req.body.id},{$inc:{balance:-amount}},{new:true})
       session.commitTransaction();
        return res.status(200).json({
            msg:"Money transfered successfully!!"
        })


        
    } catch (error) {
    console.log(error);
    return res.status(500).json({
        msg:"Error while fetching"
    })
}
}