import accountSchema from "../model/accountSchema.js"
import userSchema from "../model/userSchema.js";

export default async(req,res)=>{
    try {
        const {id}=req.body
       await accountSchema.deleteOne({userId:id},{new:true});
       await userSchema.deleteOne({_id:id},{new:true});
       return res.status(200).json({
        msg:"Deleted Account"
       })

        
    } catch (error) {
        return res.status(404).json({
            msg:"Cant't Delete An Account"
        })
    }
}
