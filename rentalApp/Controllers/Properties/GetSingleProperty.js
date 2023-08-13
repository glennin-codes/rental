import { Properties } from "../../Models/Properties.js"

export const GetSingleProperty=async(req,res)=>{
    const { id}=req.params
   try {
    
    const property= await Properties.findOne({_id:id});
   
    if(!property){
       return res.status(404).send("property not found")
    }else{
        console.log("properties",property);
        res.status(200).send(property)
    }
    
   } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
   }

}