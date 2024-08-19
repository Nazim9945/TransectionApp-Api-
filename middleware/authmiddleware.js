import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config();
export default async(req,res,next)=>{
try {
    const authtoken=req.headers.token;
    if(!authtoken || !authtoken.startsWith('Bearer')){
        return res.status(403).json({
            msg:"token is missing!"
        })
    }
    const token=authtoken.split(" ")[1];
    let decode=jwt.decode(token,process.env.JWT_SECRECT);
    if(!decode){
        return res.status(404).json({
            msg:"error while decoding token"
        })
    }
    req.body.id=decode.id
    next()





    
} catch (error) {
    console.log(error)
    return res.status(500).json({
        msg:"Token is invalid"
    })
}
}