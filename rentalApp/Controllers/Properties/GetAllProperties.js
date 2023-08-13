import { Properties } from '../../Models/Properties.js';
export const GetAllProperties=async(req,res)=>{
    try{
        const properties=await Properties.find();
        res.status(200).json(properties);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}