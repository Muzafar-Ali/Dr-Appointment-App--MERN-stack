import { z } from "zod";

export const addDoctorSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  })
  .min(3)
  .max(20),

  email: z.string({
    required_error: "Email is required",
  })
  .email("invalid email address"),
  
  password: z.string({
    required_error: "Password is required",
  })
  .min(6, "Password must be at least 6 characters long")
  .max(20, "Password must be at most 20 characters long"),
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[0-9]/, "Password must contain at least one number")
  // .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),


  speciality: z.string({
    required_error: "speciality is required",
    invalid_type_error: "speciality must be a string",
  })
  .min(3),

  degree: z.string({
    required_error: "Degree is required",
    invalid_type_error: "Degree must be a string",
  })
  .min(3),
  
  fees: z.number({
    required_error: "Fees is required",
    invalid_type_error: "Fees must be a number",
  })
  .min(1, "fees must be provided"),

  // phone: z.string({
  //   required_error: "Phone is required",
  //   invalid_type_error: "Phone must be a string",
  // })
  // .min(10)
  // .max(10),

  address: z.object({
    line1: z.string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    })
    .min(3),
  
    line2: z.string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    })
    .min(3),
  }),

  about: z.string({
    required_error: "About is required",
    invalid_type_error: "About must be a string",
  })
  .min(3),

  experience: z.string({
    required_error: "Experience is required",
    invalid_type_error: "Experience must be a string",
  })
  .min(1),

})

export const adminLoginSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  })
  .email("invalid email address"),
  
  password: z.string({
    required_error: "Password is required",
  })
  .min(6)
  .max(20)
})

export type TAdminLoginZod = z.infer<typeof adminLoginSchema>;
export type TAddDoctorZod = z.infer<typeof addDoctorSchema>;