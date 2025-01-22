import { NextFunction, Request, Response } from "express";
import generateJwtTokenAndSetCookie from "../utils/generateJwtTokenAndSetCookie.js";
import UserModel from "../models/user.model.js";
import DoctorModel from "../models/doctor.model.js";

export const userLoginHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) throw new Error("Please provide email and password");

    const user = await DoctorModel.findOne({ email });
    console.log('user', user);
    
    if(!user) throw new Error("Invalid credentials");

    generateJwtTokenAndSetCookie(res, user._id, user.role)

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
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