import ImageKit from 'imagekit';
import { v4 as uuidv4 } from 'uuid';
import { Properties } from '../../Models/Properties.js';
import { config } from "dotenv";
config();
// Configure ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.publicKey,
  privateKey: process.env.privateKey,
  urlEndpoint:"https://ik.imagekit.io/hcmhqwy2h"
});

const addProperties = async (req, res) => {
  try {

    // Process and store images using ImageKit
    const imagePromises = req.body.photos.map(async (photo) => {
      const { buffer, originalname } = photo;

      const uniqueId = uuidv4(); // Generate unique ID for the image
      const uploadResult = await imagekit.upload({
        file: buffer,
        fileName: uniqueId + '_' + originalname
      });

      const { fileId, url } = uploadResult;
      return { id: fileId, url, title: originalname };
    });

    const processedImages = await Promise.all(imagePromises);

    // Prepare property data
    const propertyData = {
      price: req.body.price,
      rentFrequency: req.body.rentFrequency,
      rooms: req.body.rooms,
      title: req.body.title,
      baths: req.body.baths,
      area: req.body.area,
      isVerified: req.body.isVerified,
      description: req.body.description,
      amenities: req.body.amenities,
      photos: processedImages,
      purpose: req.body.purpose,
      location: req.body.location
    };

    // Create new property listing
    const property = new Properties(propertyData);
    await property.save();

    res.status(200).json({ message: 'Property added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add property.' });
  }
};

export default addProperties;
