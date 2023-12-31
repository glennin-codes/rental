import { Owner } from "../../Models/Owner.js";
import jwt from 'jsonwebtoken';
const generateAuthToken = (userId, email,name) => {
  return jwt.sign({ userId: userId, email: email,name:name }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
export const verifyCode = async (req, res) => {
  try {
    console.log(req.body);
    const{email,code,e}=req.body
   
     
    
    if (!email || !code || !e) {
      return res.status(400).json({ error: "Invalid verification code" });
    }
    if (e < Date.now()) {
      return res.status(400).json({ error: "Verification link has expired" });
    }
    const user = await Owner.findOne({ email: email, verificationCode: code });
    if (!user) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    const token = generateAuthToken(user._id, user.email,user.name);

    return res
      .status(201)
      .json({ token,id:user._id ,message:"verification was successfuly"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
