import { Owner } from "../../Models/Owner.js";

// Update user by ID with PATCH method
const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, location, longitude, latitude } = req.body;

  try {
    const user = await Owner.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (longitude) user.longitude = longitude;
    if (latitude) user.latitude = latitude;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default UpdateUser;