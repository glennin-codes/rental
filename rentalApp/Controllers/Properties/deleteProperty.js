import { Properties } from "../../Models/Properties.js";
import { imagekit } from "../../assets/ImageKit.js";
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
      await deleteImagesFromImageKit(fileIdsToDelete);
  
      await Properties.deleteOne({ _id: id });
  
      res.status(200).send("Property deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  async function deleteImagesFromImageKit(fileIds) {
    for (const fileId of fileIds) {
      // Delete the image from ImageKit.io
      try {
        await imagekit.deleteFile(fileId);
        console.log(`Deleted image with fileId: ${fileId}`);
      } catch (error) {
        console.error(`Error deleting image with fileId: ${fileId}`, error);
      }
    }
  }