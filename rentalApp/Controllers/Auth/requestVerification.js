import { Owner } from "../../Models/Owner.js";
import { VerifyEmail } from "../Util/Email/EmailSender.js";

export const requestVerification=async(req,res)=>{
    
    const {email,name}=req.body
    console.log(email,name);
    const verificationCode=Math.floor(Math.random() * 900000) + 100000;
   
    try {
        const user=await Owner.findOne({email});
        if(!user){
            return res.status(404).json({error:"user not found"})
        }
        if(user.isVerified){
            return res.status(400).json({error:"user is already verified"})
        }
        user.verificationCode =verificationCode;
        await user.save();
        const verify={
            email,
            name:user.name,
            code:user.verificationCode,
    
        }
        VerifyEmail(verify);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"server error"})
        
    }
   
    res.status(200).json({message:"verification code was sent to your email"})
   

}