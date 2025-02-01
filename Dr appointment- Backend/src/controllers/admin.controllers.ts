import { NextFunction, Request, Response } from "express";
import { TAdminLoginZod, TDoctorZod } from "../schema/admin.schema.js";
import { createDoctor } from "../services/admin.service.js";
import ErrorHandler from "../utils/errorClass.js";
import DoctorModel from "../models/doctor.model.js";
import generateJwtTokenAndSetCookie from "../utils/generateJwtTokenAndSetCookie.js";

export const addDoctorHandler = async( req: Request<{}, {}, TDoctorZod["body"]>, res: Response, next: NextFunction) => {
  try {
    const doctorData = req.body;
    const image = req.file;
          
    const doctor = await createDoctor(doctorData, image);    
    if(!doctor) throw new ErrorHandler(404, "Doctor not created");
      
    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      // doctor
    })
  } catch (error) {
    console.error('addDoctorHandler error: ', error);
    next(error);
  }
}

export const getAllDoctorsHAndler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctors = await DoctorModel.find({}).select("-password");
    
    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      doctors
    })
  } catch (error) {
    console.error('getAllDoctorsHAndler error: ', error);
    next(error);
  }
}

export const adminLoginHandler = async (req: Request<{}, {}, TAdminLoginZod["body"]>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await DoctorModel.findOne({ email });    
    if(!user) throw new ErrorHandler( 404, "Invalid credentials");
    
    const isMatch = await user.comparePassword(password);
    if(!isMatch) throw new ErrorHandler(404, "Invalid credentials");

    generateJwtTokenAndSetCookie(res, user._id, user.role)

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      admin: {
        name: user.name,
        email: user.email,
        role: user.role,
        Image: user.image,
      }
    })
  } catch (error) {
    console.error('userLogin error: ', error);
    next(error);
  }
}

export const adminLogoutHandler = async(req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("atoken");
    res.status(200).json({
      success: true,
      message: "Admin logged out successfully"
    })
  } catch (error) {
    console.error('logoutAdminHandler error: ', error);
    next(error);
  }
}