import { Properties } from "../Models/Properties.js";

//define a route to delete all properties except one by ID
// export default async function deleteAllExcept  (req, res) {
//   try {
//     const idToKeep = req.params.id;

//     // Delete all properties except the one with the specified ID
//     await Properties.deleteMany({ _id: { $ne: idToKeep } });

//     res.status(200).json({ message: 'Deleted properties except for the specified ID' });
//   } catch (error) {
//     console.error('Error deleting properties:', error);
//     res.status(500).json({ error: 'Failed to delete properties' });
//   }
// }
import crypto from 'crypto'

// Generate a random Initialization Vector (IV)
const generateInitializationVector = () => {
  return crypto.randomBytes(16); // 16 bytes for AES-256-CBC
};


