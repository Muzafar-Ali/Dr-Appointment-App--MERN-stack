import mongoose from "mongoose";

export type TDoctor = {
  name: string;
  email: string;
  password: string;
  image: string;
  speciality: string;
  degree: string,
  experience: string;
  about: string;
  available: boolean;
  fees: number;
  address: Object;
  phone: string;
  slotsBooked: Object;
  gender: string;
}

export type TDoctorDocument = TDoctor & mongoose.Document & {
  createdAt: Date;
  updatedAt: Date;
}