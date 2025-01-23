import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorClass.js";
import DoctorModel from "../models/doctor.model.js";

export const updateAvailability = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const { id, availability } = req.body;
    
    const doctor = await DoctorModel.findByIdAndUpdate(id, { available: availability }, { new: true });
    console.log('doctor', doctor);
    
    if(!doctor) throw new ErrorHandler(404,"Doctor not found");

    res.status(200).json({
      success: true,
      message: "Availability updated ",
      doctor: {
        id: doctor._id,
        available: doctor.available
      }
    })
    
  } catch (error) {
    console.error('updateAvailability error: ', error);
    next(error);
  }
}

export const listOfDoctors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctors = await DoctorModel.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      doctors
    })
  } catch (error) {
    console.error('listOfDoctors error: ', error);
    next(error);
  }
} 