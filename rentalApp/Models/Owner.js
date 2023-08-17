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

  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetToken: String, // To store the reset token
  resetTokenExpiry: Date, // To store the expiry time of the reset token
  signupMethod: {
    type: String,
    enum: ['manual', 'google'], // 'manual' for manual signup, 'google' for Google signup
  },

  
});


export const Owner = mongoose.model('Owner', ownerSchema)