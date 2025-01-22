import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  dbUri: process.env.MONGO_URI,
  corsOrigin: process.env.CLIENT_URL,

  // cloudinary
  CloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,

  environmentNode: process.env.NODE_ENV,
  secure: process.env.NODE_ENV === "development" ? false : true,
  jwtSecret: process.env.JWT_SECRET,
  jwtTokenAge: 24*60*60*1000,
  saltWorkFactor: process.env.SALT,

};

export default config;