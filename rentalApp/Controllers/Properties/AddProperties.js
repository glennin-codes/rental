import { v4 as uuidv4 } from "uuid";
import { Properties } from "../../Models/Properties.js";
import { imagekit } from "../../assets/ImageKit.js";
import sharp from 'sharp'; // Import the 'sharp' library
import processAndUploadImage from "./utils/imageUtil.js";

const addProperties = async (req, res) => {
try {
  if (req.rateLimit.remaining < 0) {
    // Rate limit exceeded, send custom message
    return res.status(429).json({ message: req.rateLimit.message });
  }
    // Process and store images using ImageKit
    const imagePromises = req.files.map(async (photo) => {
      const { buffer, originalname } = photo;

      return await processAndUploadImage(buffer,originalname);
    });

    const processedImages = await Promise.all(imagePromises);
    console.log("imagesUrl processed ", processedImages);

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
      location: req.body.location,
      Owner:req.body.email,
    };

    // Create new property listing
    const property = new Properties(propertyData);
    await property.save();

    res.status(200).json({ message: "Property added successfully!" ,property:property});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add property." });
  }
};

export default addProperties;
