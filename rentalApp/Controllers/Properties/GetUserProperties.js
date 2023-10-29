import { Properties } from '../../Models/Properties.js';
export const GetUserProperties=async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const searchQuery = req.query.search || ''; // Get the search query from the request
    const locationQuery = req.query.l || '';
    // Extract minPrice and maxPrice from query parameters
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : 0;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : Number.MAX_VALUE;

    try{
        let query = {};

    // Check if startDate and endDate parameters are provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const startDateWithoutTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endDateWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());

      query.createdAt = {
        $gte: startDateWithoutTime,
        $lte: endDateWithoutTime,
      };
    }
if(minPrice && maxPrice){
    query.price = { $gte: minPrice, $lte: maxPrice };
}
      
    if (searchQuery || locationQuery) {
        query.$or = [
          {  title: { $regex: searchQuery, $options: 'i' } }, 
          {  room: { $regex: searchQuery, $options: 'i' } }, 
          { propertyType: { $regex: searchQuery, $options: 'i' } }, 
          { location: { $regex: locationQuery, $options: 'i' } }, 
        ];
      }
      const totalItems = await Properties.countDocuments(query);
    const skip = (page - 1) * limit;

        if (req.rateLimit.remaining < 0) {
            // Rate limit exceeded, send custom message
            return res.status(429).json({ message: req.rateLimit.message });
          }
        const properties = await Properties.find(query)
        .skip(skip)
        .limit(limit);
        res.status(200).json({ properties, totalItems }); 
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}