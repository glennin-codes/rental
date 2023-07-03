import mongoose from "mongoose";

const { Schema } = mongoose;
//defining schema
const ownerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    
  },
   longitude: {
    type:String,
   
  },
   latitude: {
    type:String,
    
  },
  // verificationCode: {
  //   type: Number,
  // },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  

  
});


export const Owner = mongoose.model('Owner', ownerSchema)