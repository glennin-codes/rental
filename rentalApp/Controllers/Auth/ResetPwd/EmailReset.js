import  bcrypt from 'bcrypt';
import { Owner } from "../../../Models/Owner.js";
import { ResetEmail } from '../../Util/Email/EmailSender.js';
import admin from '../Config/config.js'

export const pwdResetEmails =  async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await Owner.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
  
      user.resetToken = resetToken;
      user.resetTokenExpiry = resetTokenExpiry;
      await user.save();
    if(user.signupMethod === 'manual'){
        ResetEmail(email,resetToken);
        res.status(200).json({ message: 'Password reset email sent successfully' });
      
    }
    else{ 
         await admin.auth().sendPasswordResetEmail(email);
        res.status(200).json({ message: 'Password reset email sent. Please check your inbox.' });
    }
  
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
 export  const UpdatePwd= async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      const user = await Owner.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  