import userSchema from "../model/userSchema.js";
import jwt from 'jsonwebtoken'
import z  from 'zod'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv';
import accountSchema from "../model/accountSchema.js";
dotenv.config();
const bodySchema=z.object({
    email:z.string().email(),
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string()
})
const signup=async(req,res)=>{
try {
    const body=req.body;
     const {email,password}=body
    if(!bodySchema.safeParse(body).success){
        return res.status(411).json({
            msg:"Input are incorrects"
        })
    }
    const existuser=await userSchema.findOne({email});
    if(existuser)
        return res.status(411).json({
    msg:"user already exist"
})
let hashpwd;
try {
    hashpwd=await bcrypt.hash(password,10)
} catch (error) {
    return res.status(411).json({
        msg:"error while hashing password"
    })
}

const user=await userSchema.create({...body,password:hashpwd});
await accountSchema.create({userId:user._id,balance:Math.floor(Math.random()*10000)+1})
const payload={
    id:user._id,
     firstName:user.firstName,
}
const token=jwt.sign(payload,process.env.JWT_SECRECT,{expiresIn:'24h'});
return res.status(200).json({
    msg:"user created successfully",
    token
})


    
} catch (error) {
 console.log(error)
 return res.status(500).json({
    msg:"Invalid Can't sign up"
 })   
}
}


//sign in 
const signin=async(req,res)=>{
try {
    const body=req.body;
    const {email,password}=body
    if(!bodySchema.safeParse(body).success){
        return res.status(411).json({
            msg:"Input are incorrects"
        })
    }
    const existuser=await userSchema.findOne({email});
    if(!existuser)
        return res.status(411).json({
    msg:"user does not exist,create account first!!"
})
if(await bcrypt.compare(password,existuser.password)){
const payload={
    id:existuser._id,
     firstName:existuser.firstName,
}
const token=jwt.sign(payload,process.env.JWT_SECRECT,{expiresIn:'24h'});
return res.status(200).json({
   
    msg:"user logged in successfully",
    token
})
}
return res.status(404).json({
    msg:"password is incorrect"
})



    
} catch (error) {
 console.log(error)
 return res.status(500).json({
    msg:"Invalid Can't sign up"
 })   
}
}
export {signup,signin}