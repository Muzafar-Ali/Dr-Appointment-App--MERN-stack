import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  dbUri: process.env.MONGO_URI,
  // cloudinary
  CloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,

  environmentNode: process.env.NODE_ENV || "development",
};

export default config;