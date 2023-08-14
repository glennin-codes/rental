import { Properties } from "../../Models/Properties.js";
import deletePhotosFromImageKit from "./utils/helperDelete.js";
export const deleteProperty = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Retrieve the property from MongoDB
      const property = await Properties.findById(id);
      if (!property) {
        return res.status(404).send("Property not found");
      }
  
    // Retrieve the fileIds of images associated with the property
    const fileIdsToDelete = (property.photos || [])
      .filter(photo => photo.id) // Filter out photos with no id
      .map(photo => photo.id);   
      // Delete images from ImageKit.io
      await deletePhotosFromImageKit(fileIdsToDelete);
  
      await Properties.deleteOne({ _id: id });
  
      res.status(200).send("Property deleted succesfuly");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  
  