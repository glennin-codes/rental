import { Owner } from "../../../Models/Owner";
import { VerifyEmail } from "../Util/Email/EmailSender";
export const registerOwner=async (res,req)=>{
try{
    const existingOwner = await Owner.findOne({ email: req.body.email });
    if (existingOwner) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const verificationCode = Math.floor(Math.random() * 900000) + 100000; // Generate random 6-digit code

    const user = new Owner({
    name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      location: req.body.location,
      longitude:req.body.longitude,
      latitude:req.body.latitude,
      verificationCode:verificationCode//generated code
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
const verify={
  email:user.email,
  name:user.name,
  code:verificationCode,

}
    VerifyEmail(verify);

    res.status(201).json({ token ,
     email:user.email,
    name: user.name,
    id:user._id
    });
}catch(error)
{
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
}