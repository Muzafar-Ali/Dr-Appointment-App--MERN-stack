import { NextFunction, Request, Response } from "express"
import ErrorHandler from "../utils/errorClass.js"

const authorizedRoles = (...allowedRoles: string[]) => {
  
  if(allowedRoles.length === 0) throw new ErrorHandler(500, "No roles provided")
    
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin || !req.admin.role) {
      throw new ErrorHandler(400, "User role not found");
    }
  
    if(!allowedRoles.includes(req.admin.role)){
      throw new ErrorHandler(403, "Access denied")
    }
  
    next()
  }
}

export default authorizedRoles;