import { Schema, model } from 'mongoose';

const PropertyListingSchema = new Schema({
  price: String,
  rentFrequency: String,
 
  baths: Number,
  area: String,
  isVerified: Boolean,
   room: String,
  title: String,
  description: String,
  Owner:String,
  amenities: [
    {
      text: { type: String},
      externalID: String
    }
  ],
  photos: [
    {
      id: String,
      url: String,
      title: String,
      thumbnailUrl:String
    }
  ],
  purpose: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere', // 2dsphere index for geospatial queries
    },
    address: {
      type: String,
      
    },
  },
  furnishingStatus:String,
  propertyType:String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Properties = model('Property', PropertyListingSchema);


