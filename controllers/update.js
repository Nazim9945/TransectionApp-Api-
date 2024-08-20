import userSchema from "../model/userSchema.js";
import z from 'zod'
const bodySchema=z.object({
    
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().optional()
})

export default async(req,res)=>{
    try {
        const body=req.body
        const {firstName,lastName}=body;
        if(!bodySchema.safeParse(body).success)return res.status(411).json({
            msg:"Inputs incorrects"
        })
      await userSchema.updateOne({_id:req.body.id},{firstName,lastName});
      
       return res.status(200).json({
        msg:"upadated successfully"
       })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"error while updating"
        })
    }
}