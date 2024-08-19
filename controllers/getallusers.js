import userSchema from "../model/userSchema.js";

export default async(req,res)=>{
try {
    const{filter}=req.query || "";
    const users=await userSchema.find({
        $or:[{
            firstName:{
                '$regex':filter,
                '$options':"i"
            }
        },
        {
            lastName:{
                '$regex':filter,
                '$options':"i"
            }
        }
    ]
    })
    const filterUser=users.filter(user=> (user._id).valueOf()!==req.body.id);
    const response=filterUser.map(fil=>({
        id:fil._id,
        firstName:fil.firstName
    }));
    return res.status(200).json({
        response
    })

    
} catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"error while filtering"
        })
    }
}