import { NextFunction, Request, Response } from "express";
import { TDoctorZod } from "../schema/admin.schema.js";
import { createDoctor } from "../services/admin.service.js";
import ErrorHandler from "../utils/errorClass.js";

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
    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
    })
  } catch (error) {
    console.error('loginAdminHandler error: ', error);
    next(error);
  }
}