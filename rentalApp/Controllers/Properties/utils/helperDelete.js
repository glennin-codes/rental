import { imagekit } from "../../../assets/ImageKit.js";

async function deletePhotosFromImageKit(fileIds) {
    for (const fileId of fileIds) {
      try {
        await imagekit.deleteFile(fileId);
        console.log(`Deleted image with fileId: ${fileId}`);
      } catch (error) {
        console.error(`Error deleting image with fileId: ${fileId}`, error);
      }
    }
  }
  
  export default deletePhotosFromImageKit;