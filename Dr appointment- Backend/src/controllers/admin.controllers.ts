import { NextFunction, Request, Response } from "express";
import { TAdminLoginZod, TDoctorZod } from "../schema/admin.schema.js";
import { createDoctor } from "../services/admin.service.js";
import ErrorHandler from "../utils/errorClass.js";
import DoctorModel from "../models/doctor.model.js";
import generateJwtTokenAndSetCookie from "../utils/generateJwtTokenAndSetCookie.js";
import { AppointmentModel } from "../models/appoinments.model.js";
import mongoose from "mongoose";

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
        image: user.image,
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

// get all appointments
export const getAllAppointmentsAdminHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointments = await AppointmentModel.find({}).populate("doctorId", "name email image fees").populate("userId", "name email dob image")

    res.status(200).json({
      success: true,
      appointments
    })
  } catch (error) {
    console.error('getAppointmentsForAdmin error: ', error);
    next(error);
  }
}

// cancel appointment
export const cancelAppointmentAdminHandler = async (req: Request, res: Response, next: NextFunction) => {
  // add session to roll back entire process if something goes wrong
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { appointmentId } = req.body;

    const appointment = await AppointmentModel.findById(appointmentId).session(session);

    if(!appointment) throw new ErrorHandler(404, "Appointment not found");

    if(appointment.status === 'cancelled') throw new ErrorHandler(400, "Appointment already cancelled");

    // release doctor slot
    const doctor = await DoctorModel.findById(appointment.doctorId).session(session);
    let slotsBooked = doctor.slotsBooked;

    slotsBooked[appointment.slotDate] = slotsBooked[appointment.slotDate]?.filter((item: any) => item !== appointment.slotTime);
    
    const slotReleased = await DoctorModel.findByIdAndUpdate(appointment.doctorId, { slotsBooked: slotsBooked }, {new: true, session});
    if(!slotReleased) throw new ErrorHandler(404, "Slot not released");

    // save appointment status
    appointment.status = 'cancelled';
    await appointment.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Appointment cancelled",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('cancelAppointmentAdmin error: ', error);
    next(error);
  }
}

// admin dashboard for admin panel
export const adminDashboardHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalAppointments = await AppointmentModel.countDocuments();
    const totalDoctors = await DoctorModel.countDocuments();
    const totalUsers = await DoctorModel.countDocuments();

    const appointments = await AppointmentModel.find({}).populate("doctorId", "name email image fees").populate("userId", "name email dob image")
    
    res.status(200).json({
      success: true,
      totalDoctors,
      totalUsers,
      totalAppointments,
      latestAppointments: appointments.reverse().slice(0, 5)
    })
  } catch (error) {
    console.error('adminDashboardHandler error: ', error);
    next(error);
  }
}
