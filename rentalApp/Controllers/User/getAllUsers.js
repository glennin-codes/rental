import { Owner } from "../../Models/Owner.js";

// Get all users
export const getAllUsers = async (req, res) => {
  
  try {
    const users = await Owner.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error ' });
  }
};
