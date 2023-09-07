import { Properties } from "../../Models/Properties.js";

export const GetSingleProperty = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.rateLimit.remaining < 0) {
      // Rate limit exceeded, send custom message
      return res.status(429).json({ message: req.rateLimit.message });
    }
    const property = await Properties.findOne({ _id: id });

    if (!property) {
      return res.status(404).send("property not found");
    } else {
      console.log("properties", property);
      res.status(200).send(property);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
