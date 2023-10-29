import { Properties } from "../../../Models/Properties.js";

export const GetAllProperties = async (req, res) => {
  const page = req.query.page || 1; // Get the page number from the request query parameter
  const perPage = 10; // Number of products to show per page
  const skip = (page - 1) * perPage; // Calculate the number of documents to skip
 
  const sort = req.query.sort || "price-desc";
  const searchQuery = req.query.search || ""; // Get the search query from the request
const location=req.query.location || '';
const long = parseFloat(req.query.long ) || '';
const lat = parseFloat(req.query.lat) || '';



  // Extract minPrice and maxPrice from query parameters
  const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : 0;
  const maxPrice = req.query.maxPrice
    ? parseFloat(req.query.maxPrice)
    : Number.MAX_VALUE;

    const radiusInKilometers = 2; // Define the search radius in kilometers

// Convert the radius to radians (earth's radius is approximately 6371 kilometers)
const radiusInRadians = radiusInKilometers / 6371;
 // Define the center point (user's coordinates)
const centerPoint = [long, lat];

  try {
    let query = {};

    if (location || (long && lat)) {
      query.$or = [];
    
      if (location) {
        query.$or.push({
          'location.locationText': {
            $regex: location, // Match location text
            $options: 'i', // Case-insensitive search
          },
        });
      }
    
      if (long && lat) {
       
        query.$or.push({
          'location.coordinates': {
            $geoWithin: {
              $centerSphere: [centerPoint, radiusInRadians],
            },
          },
        });
      }
    }
    
 

const sortOptions = {};

if (sort === 'price-asc') {
  sortOptions.price = 1; // Ascending order for price
} else if (sort === 'price-desc') {
  sortOptions.price = -1; // Descending order for price
}

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { room: { $regex: searchQuery, $options: "i" } },
        { propertyType: { $regex: searchQuery, $options: "i" } },
       
      ];
    }

    const totalItems = await Properties.countDocuments(query);

    if (req.rateLimit.remaining < 0) {
      // Rate limit exceeded, send custom message
      return res.status(429).json({ message: req.rateLimit.message });
    }
    const properties = await Properties.find(query)
      .skip(skip)
      .limit(perPage)
      .sort(sortOptions)
      .exec();

    res.status(200).json({ properties, totalItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
