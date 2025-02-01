import { NextFunction, Request, Response } from "express";
import generateJwtTokenAndSetCookie from "../utils/generateJwtTokenAndSetCookie.js";
import UserModel from "../models/user.model.js";
import ErrorHandler from "../utils/errorClass.js";
import { TUserLoginZod, TUserProfileUpdateZod, TUserRegisterZod } from "../schema/user.schema.js";
import { createUser, updateUserProfile } from "../services/user.service.js";
import { AppointmentModel } from "../models/appoinments.js";
import DoctorModel from "../models/doctor.model.js";
import { date } from "zod";

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

export const bookAppointmentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { doctorId, slotDate, slotTime, amount } = req.body;
    const userId = req.user.id;

    console.log('req.body', req.body);
    console.log('userId', userId);
    
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
      date: Date.now();
    });
    
    await appointment.save();
    // // save appointment in user's model
    // await UserModel.findByIdAndUpdate(userId, { $push: { appointments: appointment._id } });
    
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