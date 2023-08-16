import { Properties } from "../../Models/Properties.js";
import deletePhotosFromImageKit from "./utils/helperDelete.js";
import processAndUploadImage from "./utils/imageUtil.js";

export const UpdateProperty = async (req, res) => {
  const { id } = req.params;
  const photosToUpdate = req.body.photosToUpdate; // Array of updated photos

  try {
    const propertyToUpdate = await Properties.findById(id);
    if (!propertyToUpdate) {
      return res.status(404).send({ message: "Property not found" });
    }

  
    for (const photo of photosToUpdate) {
      const { photoIndex, newPhotoFile } = photo;

      if (newPhotoFile) {
        const { buffer, originalname } = newPhotoFile;
       const uploadResult=await processAndUploadImage(buffer,originalname)

        // Delete old photo from ImageKit
        if (propertyToUpdate.photos[photoIndex]?.id) {
          await deletePhotosFromImageKit(propertyToUpdate.photos[photoIndex].id);
        }

        propertyToUpdate.photos[photoIndex] = uploadResult;
      }
    }

    // Update other fields
    propertyToUpdate.price = req.body.price;
    propertyToUpdate.rentFrequency = req.body.rentFrequency;
    propertyToUpdate.rooms = req.body.rooms;
    propertyToUpdate.title = req.body.title;
    propertyToUpdate.baths = req.body.baths;
    propertyToUpdate.area = req.body.area;
    propertyToUpdate.isVerified = req.body.isVerified;
    propertyToUpdate.description = req.body.description;
    propertyToUpdate.amenities = req.body.amenities;
    propertyToUpdate.purpose = req.body.purpose;
    propertyToUpdate.location = req.body.location;
    propertyToUpdate.Owner = req.body.email;

    const updatedProperty = await propertyToUpdate.save();

    res.status(200).send({ message: "Property updated successfully", property: updatedProperty });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Server error" });
  }
};
