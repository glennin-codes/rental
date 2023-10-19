import { Schema, model } from 'mongoose';

const PropertyListingSchema = new Schema({
  price: String,
  rentFrequency: String,
  room: String,
  title: String,
  baths: Number,
  area: String,
  isVerified: Boolean,
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
    latitude: String,
    longitude: String,
    address: String,
    city: String,
    country: String
  },
  furnishingStatus:String,
  PropertyType:String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Properties = model('Property', PropertyListingSchema);


