import { Owner } from "../../Models/Owner.js";

const generateAuthToken = (userId, email,name) => {
  return jwt.sign({ userId: userId, email: email,name:name }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

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
