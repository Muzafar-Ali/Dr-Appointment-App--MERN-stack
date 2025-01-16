import mongoose from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  image: string;
  address: { line1: string; line2: string };
  gender: string;
  dob: string;
  phone: string;
  role: "admin" | "doctor" | "user";
}

export type TUserDocument = TUser & mongoose.Document & {
  createdAt: Date;
  updatedAt: Date;
}
