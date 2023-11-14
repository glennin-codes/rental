import { Owner } from "../../Models/Owner.js";
import crypto from "crypto";
const generateAuthToken = (userId, email,name) => {
  return jwt.sign({ userId: userId, email: email,name:name }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
export const verifyCode = async (req, res) => {
  try {
    const algorithm = 'aes-256-cbc';
  const EncryptionKey = process.env.EncryptionKey;
  const InitializationVector = '6d0cf9de18a8c78b5f888b42d9855bd2';
    const encryptedData = req.body.data;
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(EncryptionKey), Buffer.from(InitializationVector, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    
    // Assuming the decrypted string is formatted like "email=value&code=value&expires=value"
    const decryptedParams = decrypted.split('&').reduce((acc, param) => {
      const [key, value] = param.split('=');
      acc[key] = value;
      return acc;
    }, {});
    
    const email = decryptedParams.email;
    const code = decryptedParams.code;
    const expires = decryptedParams.expires;
    
    if (expires < Date.now()) {
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
