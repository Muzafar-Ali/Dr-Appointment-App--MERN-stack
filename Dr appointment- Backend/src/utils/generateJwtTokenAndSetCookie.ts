import { Response } from "express";
import mongoose from "mongoose";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const generateJwtTokenAndSetCookie = (res:Response, userId: mongoose.Types.ObjectId, role: string ) => {
  
  if(role === "user") {
    const token = jwt.sign({ id: userId, role }, config.jwtSecret!, { expiresIn: "1d" });

    res.cookie("utoken", token, {
      httpOnly: true, 
      sameSite: 'none', 
      maxAge: config.jwtTokenAge,
      secure: config.secure,
    });

    return token;
  }

  const token = jwt.sign({ id: userId, role }, config.jwtSecret!, { expiresIn: "1d" });
   
  res.cookie("atoken", token, {
    httpOnly: true, 
    sameSite: 'none', 
    maxAge: config.jwtTokenAge,
    secure: config.secure,
  });

  return token;
}

export default generateJwtTokenAndSetCookie;