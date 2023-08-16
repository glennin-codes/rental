import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { imagekit } from '../../../assets/ImageKit.js';

const processAndUploadImage = async (buffer, originalname) => {
    const width = 500;
    const height = 350;
    const format = "webp";
    const quality = 80;
  
    try {
      const uniqueId = uuidv4();
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
      const { fileId, url, thumbnailUrl } = uploadResult;
  
      return { id: fileId, url, thumbnailUrl, title: originalname };
    } catch (error) {
      // Handle the error (e.g., log, return an error object, etc.)
      console.error("Error processing/uploading image:", error);
      throw error; // Rethrow the error to propagate it up the call stack
    }
  };
  
export default processAndUploadImage;
