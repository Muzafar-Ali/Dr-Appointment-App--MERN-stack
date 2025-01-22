import { NextFunction, Request, Response } from "express";
import { TAdminLoginZod, TDoctorZod } from "../schema/admin.schema.js";
import { createDoctor } from "../services/admin.service.js";
import ErrorHandler from "../utils/errorClass.js";
import DoctorModel from "../models/doctor.model.js";
import omit from "lodash/omit.js";
import generateJwtTokenAndSetCookie from "../utils/generateJwtTokenAndSetCookie.js";

export const addDoctorHandler = async( req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('req.body', req.body);
    console.log('req.file', req.file);
    
    const doctorData = req.body;
    const image = req.file;
          
    // const doctor = await createDoctor(doctorData, image);    
    // if(!doctor) throw new ErrorHandler(404, "Doctor not created");
      
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


export const loginAdminHandler = async(req: Request<{}, {}, TAdminLoginZod["body"]>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    const doctor = await DoctorModel.findOne({ email });
    if(!doctor) throw new ErrorHandler(401, "Invalid credentials");

    const isMatch = await doctor.comparePassword(password);
    if(!isMatch) throw new ErrorHandler(401, "Invalid credentials");

    generateJwtTokenAndSetCookie( res, doctor._id, doctor.role);

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      user: omit(doctor.toJSON(),"password") 
    })
    
  } catch (error) {
    console.error('loginAdminHandler error: ', error);
    next(error);
  }
}

export const logoutAdminHandler = async(req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Admin logged out successfully"
    })
  } catch (error) {
    console.error('logoutAdminHandler error: ', error);
    next(error);
  }
}