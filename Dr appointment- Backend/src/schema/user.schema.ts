import escape  from "lodash/escape.js";
import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    })
    .min(3, {message: "Name must be at least 3 characters long"})
    .transform((value) => escape(value.trim())), // Sanitizing by trimming and escaping HTML,
    
    email: z.string({
      required_error: "Email is required",
    })
    .email("Not a valid email")
    .transform((value) => escape(value.trim().toLocaleLowerCase())), // Trimming and escaping,
    
    password: z.string({
      required_error: "Password is required",
    })
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters")
    .transform((value) => escape(value.trim())), // Trimming and escaping,
    
    confirmPassword: z.string({
      required_error: "confirmPassword is required",
    })
    .transform((value) => escape(value.trim())), // Trimming and escaping,
    
    // role: z.enum(["admin", "doctor", "user"]).default("user"),
  }).refine((val) => val.password === val.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  }),
})

export const userLoginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    })
    .email("Not a valid email")
    .transform((value) => escape(value.trim().toLocaleLowerCase())), // Trimming and escaping

    password: z.string({
      required_error: "Password is required",
    })
    .min(6, "Password must be more than 6 characters")
    .max(30, "Password must be less than 30 characters")
    .transform((value) => escape(value.trim())), // Trimming and escaping
  }),
})


export const updateUserPrifleSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be a string",
    })
    .min(1, { message: "Name must not be empty" })
    .optional()
    .transform((value) => value ? escape(value.trim()) : value),

    email: z.string({
      invalid_type_error: "Email must be a valid string",
    })
    .email("Not a valid email")
    .optional()
    .transform((value) => value ? escape(value.trim().toLowerCase()) : value),

  phone: z.string({
      invalid_type_error: "Phone must be a valid string",
    })
    .optional()
    .transform((value) => value ? escape(value.trim()) : value),

    address: z.object({
      line1: z.string({
        invalid_type_error: "Address line 1 must be a string",
      })
      .min(3, { message: "Address line 1 must be at least 3 characters long" })
      .optional()
      .transform((value) => value ? escape(value.trim()) : value),

      line2: z.string({
        invalid_type_error: "Address line 2 must be a string",
      })
      .min(3, { message: "Address line 2 must be at least 3 characters long" })
      .optional()
      .transform((value) => value ? escape(value.trim()) : value),
    }).optional(),

    gender: z.string({
      invalid_type_error: "gender must be valid staring"
    })
    .optional()
    .transform((value) => value ? escape(value.trim()) : value),

    dob: z.string({
      invalid_type_error: "Date of birth must be a valid string",
    })
      .optional()
      .transform((value) => value ? escape(value.trim()) : value),
  }),
});



export type TUserRegisterZod = z.infer<typeof registerUserSchema>
export type TUserLoginZod = z.infer<typeof userLoginSchema>
export type TUserProfileUpdateZod = z.infer<typeof updateUserPrifleSchema>