import accountSchema from "../model/accountSchema.js"

export default async(req,res)=>{
   try {
     const {id}=req.body
    const user=await accountSchema.findById({userId:id});
    return res.status(200).json({
        balance:user.balance
    })
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        msg:"Error while fetching user"
    })
   }
}