import accountSchema from "../model/accountSchema.js";

export default async(req,res)=>{
    try {
        const session=await mongoose.startSession();
        await session.startTransection()
        const {to,amount}=req.body;
        const touser=await accountSchema.find({userId:to});
        const currentuser=await accountSchema.find({userid:req.body.id})
        if(!touser || !currentuser){
            await session.abortTransection()
            return res.status(404).json({
                msg:"Invalid user"
            }
            )
        }
        if(current.balance<amount){
            await session.abortTransection()
            return res.status(404).json({
                msg:"Not have enough balance"
            }
            )
        }
        await accountSchema.updateOne({userId:to},{$inc:{balance:amount}},{new:true})
        await accountSchema.updateOne({userId:req.body.id},{$inc:{balance:-amount}},{new:true})
        await session.commitTransaction();
        return res.status.json({
            msg:"Money transfered successfully!!"
        })


        
    } catch (error) {
    console.log(error);
    return res.status(500).json({
        msg:"Error while fetching"
    })
}
}