import UserModel from "../models/user.model.js";
import ErrorHandler from "../utils/errorClass.js";
import { TUserProfileUpdateZod, TUserRegisterZod } from "../schema/user.schema.js";
import omit from "lodash/omit.js";
import uploadImageToCloudinary from "../utils/cloudinary/uploadImageToCloudinary.js";

export const createUser = async ( userData: TUserRegisterZod["body"]) => {
  try {
    const userExists = await UserModel.findOne({ email: userData.email });
    if(userExists) throw new ErrorHandler(409, "User already exists");

    const user = await UserModel.create({ ...userData });
    if(!user) throw new ErrorHandler(404, "User not created");

    return omit(user.toJSON(), "password");

  } catch (error) {
    console.error('createUser error: ', error);
    if(error instanceof ErrorHandler) throw error // Propagate known errors
    throw new ErrorHandler(500, "Internal server error") // Handle unknown errors    
  }
}

export const updateUserProfile = async (userId: string, userData: TUserProfileUpdateZod["body"], image?: Express.Multer.File | undefined) => {
  try {
    console.log('image', image);
    
    const user = await UserModel.findById(userId);
    if(!user) throw new ErrorHandler(404, "User not found");

    user.name = userData.name || user.name;
    user.email = userData.email || user.email;
    user.phone = userData.phone || user.phone;
    user.address = userData.address || user.address;
    user.gender = userData.gender || user.gender;
    user.dob = userData.dob || user.dob;
    
    if(image) {
      const imageURL = await uploadImageToCloudinary(image, 'user');     
      if(!imageURL) throw new ErrorHandler(500, "Image upload failed");

      user.image = imageURL;
    }

    await user.save();

    return omit(user.toJSON(), "password");
  } catch (error) {
    console.error('updateUserProfile error: ', error);
    if(error instanceof ErrorHandler) throw error // Propagate known errors
    throw new ErrorHandler(500, "Internal server error") // Handle unknown errors
  }
}