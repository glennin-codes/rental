import { v4 as uuidv4 } from "uuid";
import { Properties } from "../../Models/Properties.js";
import { imagekit } from "../../assets/ImageKit.js";
import sharp from 'sharp'; // Import the 'sharp' library

const addProperties = async (req, res) => {
  const width = 500;
  const height = 350;
  const format = "webp";
  const quality = 80;

  try {
  
    // Process and store images using ImageKit
    const imagePromises = req.files.map(async (photo) => {
      const { buffer, originalname } = photo;

      const uniqueId = uuidv4(); // Generate unique ID for the image
      // Process the image using sharp
      const processedImageBuffer = await sharp(buffer)
      .resize(width, height, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
        })
        .toFormat(format, { quality })
        .toBuffer();
      const uploadResult = await imagekit.upload({
        file: processedImageBuffer,
        fileName: uniqueId + "_" + originalname,
      });
      console.log("result", uploadResult);
      const { fileId, url,thumbnailUrl } = uploadResult;

      console.log("url", url);

      return { id: fileId, url: url, thumbnailUrl:thumbnailUrl, title: originalname };
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
