import { NextFunction, Request, Response } from "express"
import ErrorHandler from "../utils/errorClass.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

declare global {
  namespace Express{
    interface Request {
      user: {
        id: any,
        role: string
      }
    }
  }
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token || req.headers.authorization;
    if(!token) throw new ErrorHandler(401,'user not authorized' ) ;

    const decoded = jwt.verify(token, config.jwtSecret!) as jwt.JwtPayload;
    if(!decoded) throw new ErrorHandler(401, 'invalid token') ;
      req.user = {
        id: decoded.id,
        role: decoded.role
      };
  
    next()
  } catch (error) {
    console.error('isAuthenticated error: ', error);
    next(error);
  }
}

export default isAuthenticated;