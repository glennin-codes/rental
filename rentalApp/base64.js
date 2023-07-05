import { dir } from 'console';
import { readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';

// Read the image file as a buffer
const imageBuffer = readFileSync('/home/glen/Desktop/youngsters.jpg');

// Convert the image buffer to a base64-encoded string
const base64Image = imageBuffer.toString('base64');


 writeFileSync(
    '/home/glen/Desktop/backEnd/rental/youngsters.txt',
    base64Image,
   
    ); // Write it out into another text file for testing purposes (optional step).

