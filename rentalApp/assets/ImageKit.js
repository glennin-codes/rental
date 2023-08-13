import ImageKit from 'imagekit';
import { config } from "dotenv";
config();


// Configure ImageKit
export const imagekit = new ImageKit({
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey,
    urlEndpoint:"https://ik.imagekit.io/hcmhqwy2h"
  });