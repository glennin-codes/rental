import { VerifyEmail } from "../Util/Email/EmailSender.js";

export const requestVerification=(req,res)=>{
    
    const {email,name}=req.body
    console.log(email,name);
    const verificationCode=Math.floor(Math.random() * 900000) + 100000;
    const verify={
        email:email,
        name:name,
        code:verificationCode,

    }
    VerifyEmail(verify);
    res.status(200).json({message:"verification code was sent to your email"})
   

}