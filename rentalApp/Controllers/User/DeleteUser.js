import { Owner } from "../../Models/Owner.js";
import { Properties } from "../../Models/Properties.js";
import deletePhotosFromImageKit from "../Properties/utils/helperDelete.js";

  
// Delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user to be deleted
    const deletedUser = await Owner.findOne({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

     // Find properties associated with the user's email
     const properties = await Properties.find({ Owner: deletedUser.email });

     // If user has properties, proceed to delete photos and properties
     if (properties && properties.length > 0) {
       for (const property of properties) {
         if (property.photos && property.photos.length > 0) {
           const photoIds = property.photos
             .filter(photo => photo && photo.id) // Filter out null or empty photos
             .map(photo => photo.id);
           if (photoIds.length > 0) {
             await deletePhotosFromImageKit(photoIds);
           }
         }
         await Properties.deleteOne({ _id: property._id });
       }
     }
 
     // Delete the user from the database
     await Owner.deleteOne({ _id: id });

    res.status(200).json({ message: "User and associated data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default deleteUser;
