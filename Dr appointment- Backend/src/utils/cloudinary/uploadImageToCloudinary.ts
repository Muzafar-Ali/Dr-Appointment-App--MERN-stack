import { v2 as cloudinary } from "cloudinary";
import config from "../../config/config.js";
import ErrorHandler from "../errorClass.js";

cloudinary.config({
  cloud_name: config.CloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret
});

const uploadImageToCloudinary = async ( image:Express.Multer.File, subFolder: string ) => {
  try {
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  
    const imageUpload = await cloudinary.uploader.upload(dataURI, {
      resource_type: "image",
      public_id: `image${Math.round(Math.random() * 1E9)}`,
      folder: `dr-appointment/${subFolder}`,
    });
    
    return imageUpload.secure_url;
    
  } catch (error) {
    console.error('uploadImageToCloudinary error: ', error);
    throw new ErrorHandler(500, "Failed to upload the image to Cloudinary");   
  }
};

export default uploadImageToCloudinary;