import { Schema, model } from 'mongoose';

const PropertyListingSchema = new Schema({
  price: String,
  rentFrequency: String,
  rooms: Number,
  title: String,
  baths: Number,
  area: String,
  isVerified: Boolean,
  description: String,
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
      title: String
    }
  ],
  purpose: String,
  location: {
    latitude: String,
    longitude: String,
    address: String,
    city: String,
    country: String
  }
});

const Properties = model('Property', PropertyListingSchema);


