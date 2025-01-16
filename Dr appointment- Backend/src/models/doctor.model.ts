  import mongoose from "mongoose";
  import { TDoctorDocument } from "../types/doctor.type.js";

  const doctorSchema = new mongoose.Schema<TDoctorDocument>({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    slotsBooked: {
      type: Object,
      default: {},
    },
    gender: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
    minimize: false // now we can use empty object as default value
  });

                 //  if model created use it || otherwise create it       
  const DoctorModel = mongoose.models.Doctor || mongoose.model<TDoctorDocument>('Doctor', doctorSchema)

  export default DoctorModel;