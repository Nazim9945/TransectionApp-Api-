import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config();
export const mePoint=async(req,res)=>{
try {
    const authtoken=req.headers.token;
    if(!authtoken || !authtoken.startsWith("Bearer")){
        return res.status(200).json({
            msg:false
        })
    }
    const token=authtoken.split(" ")[1];
    let decode=jwt.decode(token,process.env.JWT_SECRECT);
    if(!decode){
        return res.status(200).json({
            msg:false
        })
    }
    return res.json({
        msg:true
    })

    
} catch (error) {
    console.log(error)
    return res.status(500).json({
        msg:"issue on the server side"
    }) 
}
}