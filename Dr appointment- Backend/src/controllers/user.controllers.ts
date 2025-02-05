import { NextFunction, Request, Response } from "express";
import generateJwtTokenAndSetCookie from "../utils/generateJwtTokenAndSetCookie.js";
import UserModel from "../models/user.model.js";
import ErrorHandler from "../utils/errorClass.js";
import { TUserLoginZod, TUserProfileUpdateZod, TUserRegisterZod } from "../schema/user.schema.js";
import { createUser, updateUserProfile } from "../services/user.service.js";
import { AppointmentModel } from "../models/appoinments.model.js";
import DoctorModel from "../models/doctor.model.js";
import { date } from "zod";
import mongoose from "mongoose";

// user registration
export const registerUserHandler = (async (req: Request<{}, {}, TUserRegisterZod["body"]>, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;

    // Call the function to create a new user
    const user = await createUser(userData)

    res.status(201).json({
      success: true,
      message: "User created successfully",
    })
  } catch (error) {
    console.error('registerUserHandler error: ', error);
    next(error);
  }
})

// user login
export const userLoginHandler = async (req: Request<{}, {}, TUserLoginZod["body"]>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    const user = await UserModel.findOne({ email });    
    if(!user) throw new ErrorHandler( 404, "Invalid credentials");  
    
    const isMatch = await user.comparePassword(password);
    if(!isMatch) throw new ErrorHandler(404, "Invalid credentials");

    generateJwtTokenAndSetCookie(res, user._id, user.role)

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        _id: user._id,
        role: user.role,
        image: user.image,      }
    })
  } catch (error) {
    console.error('userLogin error: ', error);
    next(error);
  }
}

// user logout
export const userLogoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("utoken", { path: '/' });
    
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    })
  } catch (error) {
    console.error('userLogout error: ', error);
    next(error);
  }
}

// get user profile
export const getUserProfileHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        dob: user.dob,
      },
    })
  } catch (error) {
    console.error('getUserProfile error: ', error);
    next(error);
  }
}

// update user profile
export const updateUserProfileHandler = async (req: Request<{}, {}, TUserProfileUpdateZod["body"] >, res: Response, next: NextFunction) => {
  try {
    const userData = req.body
    const image = req.file
    
    if(image) {
      updateUserProfile(req.user.id, userData, image)
    } else {
      updateUserProfile(req.user.id, userData)
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error('updateUserProfile error: ', error);
    next(error);
  }
}

/****** appointment handlers ******/

// book an appointment
export const bookAppointmentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { doctorId, slotDate, slotTime, amount } = req.body;
    const userId = req.user.id;
    
    const doctor = await DoctorModel.findById(doctorId);

    if(!doctor.available) throw new ErrorHandler(400, "Doctor is not available");
    // if(!doctor.slots.includes(slotTime)) throw new ErrorHandler(400, "Slot is not available");

    let slotsBooked = doctor.slotsBooked;
    
    // checking for slot availability
    if(slotsBooked[slotDate]) {
      if(slotsBooked[slotDate].includes(slotTime)) throw new ErrorHandler(409, "Slot not available");
      slotsBooked[slotDate].push(slotTime);
    } else {
      slotsBooked[slotDate] = [];
      slotsBooked[slotDate] = [slotTime];
    }

    const appointment = new AppointmentModel({
      doctorId,
      userId,
      slotDate,
      slotTime,
      amount,
      date: Date.now()
    });
    
    await appointment.save();

    // save updated slot in doctor's model
    await DoctorModel.findByIdAndUpdate(doctorId, { slotsBooked: slotsBooked });
    
    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    })

  } catch (error) {
    console.error('bookAppointment error: ', error);
    next(error);
  }
}

// get user appointments
export const getMyAppointmentsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;

    const appointments = await AppointmentModel.find({ userId }).populate('doctorId', 'name image specialization address speciality');

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      appointments,
    })
  } catch (error) {
    console.error('getMyAppointments error: ', error);
    next(error);
  }
}

// cancel appointment
export const cancelAppointmentHandler = async (req: Request, res: Response, next: NextFunction) => {
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

    slotsBooked[appointment.slotDate] = slotsBooked[appointment.slotDate].filter((item: any) => item !== appointment.slotTime);
    
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