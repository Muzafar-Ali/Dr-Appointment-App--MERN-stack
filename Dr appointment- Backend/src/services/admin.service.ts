import omit from "lodash/omit.js"
import DoctorModel from "../models/doctor.model.js"
import { TDoctorZod } from "../schema/admin.schema.js"
import ErrorHandler from "../utils/errorClass.js"
import uploadImageToCloudinary from "../utils/cloudinary/uploadImageToCloudinary.js"

export const createDoctor = async (doctorData: TDoctorZod["body"], image: Express.Multer.File | undefined) => {
  try {
    const doctorExist = await DoctorModel.findOne({email: doctorData.email})
    if(doctorExist) throw new ErrorHandler(409, "Doctor already exist")

    // upload image to cloudinary
    // const imageUrl = await uploadImageToCloudinary(image!, "doctors")
      
    const newDoctor = await DoctorModel.create({
      ...doctorData, 
      // image: imageUrl
      // address: JSON.parse(doctorData.address)
    })
   
    return omit(newDoctor.toJSON(),"password") 

  } catch (error) {
    console.error('createDoctor error: ', error);
    if(error instanceof ErrorHandler) throw error // Propagate known errors
    // throw new ErrorHandler(500, "Internal server error") // Handle unknown errors
  }
}