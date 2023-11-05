import { v4 as uuidv4 } from "uuid";
import { Properties } from "../../Models/Properties.js";
import processAndUploadImage from "./utils/imageUtil.js";
import { clearMemory } from "./utils/clearMemory.js";

const addProperties = async (req, res) => {
try {
  if (req.rateLimit.remaining < 0) {
    // Rate limit exceeded, send custom message
    return res.status(429).json({ message: req.rateLimit.message });
  }
  console.log("files",req.files );
    // Process and store images using ImageKit
    const imagePromises = req.files.map(async (photo) => {
      const { buffer, originalname } = photo;
  console.log('buffer', buffer );
      return await processAndUploadImage(buffer,originalname);
    });
    console.log('lenght',imagePromises)

    const processedImages = await Promise.all(imagePromises);
    console.log("imagesUrl processed ", processedImages );

    const amenities = req.body.amenities.map((text) => ({
      text,
      externalID: uuidv4() 
    }));
    const locationText = req.body.locationText;
    const location = {
      type: 'Point',
      coordinates: [parseFloat(req.body.long), parseFloat(req.body.lat)],
      address: locationText,
    };
    

    
    // Prepare property data
    const propertyData = {
      price: req.body.price,
      rentFrequency: req.body.rentFrequency,
      room: req.body.room,
      title: req.body.title,
      baths: req.body.baths,
      area: req.body.area,
      isVerified: req.body.isVerified,
      description: req.body.description,
      amenities: amenities,
      photos: processedImages,
      purpose: req.body.purpose,
      location: location,
      Owner:req.body.email,
      furnishingStatus:req.body.furnishingStatus,
      propertyType:req.body.propertyType
    };

    // Create new property listing
    const property = new Properties(propertyData);
    await property.save();

    res.status(200).json({ message: "Property added successfully!" ,property:property});
    clearMemory(req, res);
  } catch (error) {
    console.error("error",error);
    res.status(500).json({ error: "Failed to add property." });
  }
};

export default addProperties;
