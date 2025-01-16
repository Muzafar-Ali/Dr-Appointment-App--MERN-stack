import {v2 as cloudinary} from 'cloudinary'
import config from '../../config/config.js';

const connectCloudinary = async () => {

  cloudinary.config({
    cloud_name: config.CloudinaryCloudNAme,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  });

  // return cloudinary;
}

export default connectCloudinary;