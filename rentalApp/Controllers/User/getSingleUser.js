import { Owner } from "../../Models/Owner.js";

// Get single user by ID or email
const getSingleUser = async (req, res) => {
  const idOrEmail = req.params.id;
  try{
    let user;

    // Check if the parameter is a valid email address
    if (/^\S+@\S+\.\S+$/.test(idOrEmail)) {
      user = await Owner.findOne({ email: idOrEmail });
    } else {
      user = await Owner.findById(idOrEmail);
    }
  
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }

  } catch(error){
    console.error(error);
    res.status(500).json({ message: error.message });

  }
 
};
  
export default getSingleUser;