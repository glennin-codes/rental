import { imagekit } from "../../../assets/ImageKit.js";

async function deletePhotosFromImageKit(fileIds) {
   if(fileIds && fileIds.length>0){
    for (const fileId of fileIds) {
      try {
        await imagekit.deleteFile(fileId);
        console.log(`Deleted image with fileId: ${fileId}`);
      } catch (error) {
        console.error(`Error deleting image with fileId: ${fileId}`, error);
        throw error;
      }
    }
   }else{
      try {
        await imagekit.deleteFile(fileIds);
        console.log(`Deleted image with fileId: ${fileIds}`);
      } catch (error) {
        console.error(`Error deleting image with fileId: ${fileIds}`, error);
        throw error;
      }
   }
  }
  
  export default deletePhotosFromImageKit;