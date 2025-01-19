  import mongoose from "mongoose";
  import { TDoctorDocument } from "../types/doctor.type.js";
  import bcrypt from "bcrypt";

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
    role: {
      type: String,
      required: true,
      enum: ["admin", "doctor", "user"],
      default: "doctor"
    }
  }, {
    timestamps: true,
    minimize: false // now we can use empty object as default value
  });

  // hash the password before saving
  doctorSchema.pre('save', async function (next) {
    let doctor = this as TDoctorDocument;
    if(!doctor.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10); 
      const hashPasword = await bcrypt.hash(doctor.password, salt);
      doctor.password = hashPasword;
  
      next()   
  
    } catch (error: any) {
      console.error('Failed to hash the password: ', error);
      next(error);    
    }
  })

  doctorSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const doctor = this as TDoctorDocument;

    try {
      const isMatch = await bcrypt.compare(candidatePassword, doctor.password);
      return isMatch;
      
    } catch (error) {
      console.error('Failed to compare the password: ', error);
      return false
    }
  }

                 //  if model created use it || otherwise create it       
  const DoctorModel = mongoose.models.Doctor || mongoose.model<TDoctorDocument>('Doctor', doctorSchema)

  export default DoctorModel;