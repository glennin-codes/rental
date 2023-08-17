import { Owner } from '../../Models/Owner.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import admin from './Config/config.js';

const generateAuthToken = (userId, email) => {
  return jwt.sign(
    { userId: userId, email: email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export const loginUser = async (req, res) => {
  try {
    if (req.body.tokenId) {
      // Signing in with Google
      const { tokenId } = req.body;
      const decodedToken = await admin.auth().verifyIdToken(tokenId);
      const { email } = decodedToken;
      const user = await Owner.findOne({ email, signupMethod: 'google' });

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

      const token = generateAuthToken(user._id, user.email);

      res.status(200).json({ token, email: user.email, name: user.name, id: user._id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
