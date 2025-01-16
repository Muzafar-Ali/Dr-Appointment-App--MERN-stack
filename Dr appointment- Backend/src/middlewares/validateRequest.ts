import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import ErrorHandler from "../utils/errorClass.js";

function validateRequest (schema: AnyZodObject) {
    
  return function (req: Request, res: Response, next: NextFunction) {
    try {
        const result = schema.safeParse({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        if(!result.success) {
          const errorMessages = result.error.errors.map((err: {message: any}) => err.message).join(", ");
          throw new ErrorHandler(400, `${errorMessages}`);  
        }

        // If validation succeeds, assign validated data to the request
        req.body = result.data.body;
        req.query = result.data.query;
        req.params = result.data.params;

        next();
    } catch (error) {
      console.error("validateRequest error = ", error);
        next(error);
    }
  }
}

export default validateRequest;