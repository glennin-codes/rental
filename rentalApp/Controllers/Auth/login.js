import { Owner } from '../../Models/Owner.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import admin from './Config/config.js';

const generateAuthToken = (userId, email,name) => {
  return jwt.sign(
    { userId: userId, email: email,name:name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export const loginUser = async (req, res) => {
  try {
    if (req.body.googleId) {
      // Signing in with Google

      const user = await Owner.findOne({ email:req.body.email, signupMethod: 'google' });

      if (user) {
        const token = generateAuthToken(user._id, user.email);
        return res.status(200).json({ token, email: user.email, name: user.name, id: user._id });
      } else {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
    } else {
      // Manual Sign-in
      const { email, password } = req.body;
      const user = await Owner.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      if (!user.isVerified) {
        return res.status(401).json({ error: 'Your email is not verified on our systems,Please verify your email before logging in' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = generateAuthToken(user._id, user.email,user.name);

      res.status(200).json({ token});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
