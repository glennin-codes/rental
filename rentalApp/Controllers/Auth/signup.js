import { Owner } from "../../Models/Owner.js";
import { VerifyEmail } from "../Util/Email/EmailSender.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerOwner = async (req, res) => {
  try {
    if (req.body.googleUserData) {
      console.log(req.body.googleUserData);
      // Sign-up with Google
      // const googleSignupID = req.body.googleSignupID;
      // const decodedToken = await admin.auth().verifyIdToken(googleSignupID);
      const {    displayName,
        photoURL,
        email,} = req.body.googleUserData;

      const ownerExist = await Owner.findOne({ email: email });

      if (ownerExist) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const user = new Owner({
        name: displayName,
        email: email,
        photo:photoURL?photoURL:"",
        password: null,
        signupMethod: "google",
        isVerified: true,
        verificationCode:null
      });

      await user.save();

      const token = generateAuthToken(user._id, user.email,user.name);

      return res
        .status(201)
        .json({ token,id:user._id });
    } else {
      // Manual Sign-up
      const { firstName,lastName, email, password, phone,location} =
        req.body;

      const existingOwner = await Owner.findOne({ email: email });

      if (existingOwner) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = Math.floor(Math.random() * 900000) + 100000;

      const user = new Owner({
        name:`${firstName} ${lastName}`,
        email: email,
        password: hashedPassword,
        phone: phone,
        location: location,
        signupMethod: "manual",
       verificationCode,
      });

      await user.save();

      const verify = {
        email: user.email,
        name: user.name,
        code: user.verificationCode,
      };

      VerifyEmail(verify);

      return res
        .status(200)
        .json({ message:"verification sent"});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
