import escape  from "lodash/escape.js";
import { z } from "zod";

export const createDoctorSchema = z.object({
  body: z.object({

    name: z.string({ 
      required_error: "Name is required", 
      invalid_type_error: "Name must be a string",
    })
    .min(3, {message: "Name must be at least 3 characters long"})
    .transform((value) => escape(value.trim())), // Sanitizing by trimming and escaping HTML
    
    email: z.string({ 
      required_error: "Email is required", 
    })
    .email({message: "Invalid email address"})
    .transform((value) => escape(value.trim().toLocaleLowerCase())), // Trimming and escaping
    
    password: z.string({ 
      required_error: "Password is required"
    })
    .min(6, {message: "Password must be at least 6 characters long"})
    .transform((value) => escape(value.trim())),

    phone: z.string({
      required_error: "Phone number is required"
    })
    .min(10, {message: "Phone number must be at least 10 characters long"}),
    
    address: z.object({
      line1: z.string({
        required_error: "Address line 1 is required",
        invalid_type_error: "Address line 1 must be a string"
      }).min(3, {message: "Address line 1 must be at least 3 characters long"}),

      line2: z.string({
        required_error: "Address line 2 is required",
        invalid_type_error: "Address line 2 must be a string"
      }).min(3, {message: "Address line 2 must be at least 3 characters long"}),
    }).required(),
    
    speciality: z.string({
      required_error: "Specialization is required", 
      invalid_type_error: "Specialization must be a string"
    })
    .min(3, {message: "Specialization must be at least 3 characters long"})
    .transform((value) => escape(value.trim())), // Sanitizing by trimming and escaping HTML
    
    about: z.string({
      required_error: "About is required",
      invalid_type_error: "About must be a string"
    })
    .min(3, {message: "About must be at least 3 characters long"})
    .transform((value) => escape(value.trim())), // Sanitizing by trimming and escaping HTML

    degree: z.string({
      required_error: "Degree is required",
      invalid_type_error: "Degree must be a string"
    })
    .min(3, {message: "Degree must be at least 3 characters long"})
    .transform((value) => escape(value.trim())), // Sanitizing by trimming and escaping HTML

    experience: z.string({
      required_error: "Experience is required",
      invalid_type_error: "Experience must be a string"
    })
    .min(1, {message: "Experience must be at least 1 characters long"})
    .transform((value) => escape(value.trim())), // Sanitizing by trimming and escaping HTML

    available: z.boolean({
      required_error: "Available is required",
      invalid_type_error: "Available must be a boolean"
    }).default(true),

    gender: z.string({
      required_error: "Gender is required",
      invalid_type_error: "Gender must be a string"
    })
    .min(3, {message: "Gender must be at least 3 characters long"})
    .transform((value) => escape(value.trim())), // Sanitizing by trimming and escaping HTML
    
    fees: z.number({
      required_error: "Fees is required", 
      invalid_type_error: "Fees must be a number"
    }).min(1, {message: "Fees must be at least 1"}),
    
    role: z.object({
     role: z.enum(["admin", "doctor", "user"]).default("doctor"),
    }).optional()
  })
})

export const AdminLoginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    })
    .email({message: "Invalid email address"})
    .transform((value) => escape(value.trim().toLocaleLowerCase())), // Trimming and escaping

    password: z.string({
      required_error: "Password is required"
    })
    .min(6, {message: "Password must be at least 6 characters long"})
    .transform((value) => escape(value.trim())),
  })
});

export type TDoctorZod = z.infer<typeof createDoctorSchema>
export type TAdminLoginZod = z.infer<typeof AdminLoginSchema>