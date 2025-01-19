import { Response } from "express";
import mongoose from "mongoose";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const generateJwtTokenAndSetCookie = (res:Response, userId: mongoose.Types.ObjectId, role: string ) => {
  
  const token = jwt.sign({ id: userId, role }, config.jwtSecret!, { expiresIn: "1d" });
  
  res.cookie("token", token, {
    httpOnly: true, 
    sameSite: 'none', 
    maxAge: config.jwtTokenAge,
    secure: config.secure,
  });

  return token;
}

export default generateJwtTokenAndSetCookie;