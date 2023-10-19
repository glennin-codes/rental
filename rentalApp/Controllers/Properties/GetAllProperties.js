import { Properties } from '../../Models/Properties.js';
export const GetAllProperties=async(req,res)=>{
    try{
        if (req.rateLimit.remaining < 0) {
            // Rate limit exceeded, send custom message
            return res.status(429).json({ message: req.rateLimit.message });
          }
        const properties = await Properties.find();
        res.status(200).json(properties);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}