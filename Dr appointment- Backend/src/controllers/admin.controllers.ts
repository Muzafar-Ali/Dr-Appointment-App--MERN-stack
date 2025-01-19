import { NextFunction, Request, Response } from "express";
import { TDoctorZod } from "../schema/admin.schema.js";
import { createDoctor } from "../services/admin.service.js";
import ErrorHandler from "../utils/errorClass.js";
import DoctorModel from "../models/doctor.model.js";
import jwt from "jsonwebtoken";
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
        doctor
      })
    } catch (error) {
      console.error('addDoctorHandler error: ', error);
      next(error);
    }
}


export const loginAdminHandler = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) throw new ErrorHandler(400, "Please provide email and password");
    
    const doctor = await DoctorModel.findOne({ email });
    if(!doctor) throw new ErrorHandler(401, "Invalid credentials 1");

    const isMatch = await doctor.comparePassword(password);
    if(!isMatch) throw new ErrorHandler(401, "Invalid credentials 2");

    generateJwtTokenAndSetCookie( res, doctor._id, doctor.role);

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      user: req.user
    })
    
    console.log(req.user);
    
  } catch (error) {
    console.error('loginAdminHandler error: ', error);
    next(error);
  }
}