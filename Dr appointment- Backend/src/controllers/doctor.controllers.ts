import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorClass.js";
import DoctorModel from "../models/doctor.model.js";
import generateJwtTokenAndSetCookie from "../utils/generateJwtTokenAndSetCookie.js";
import { AppointmentModel } from "../models/appoinments.model.js";

// @desc    Update doctor availability
// @route   PATCH /api/v1/doctors
// @access  Private (Admin only)
export const updateAvailability = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const { id, availability } = req.body;
    
    const doctor = await DoctorModel.findByIdAndUpdate(id, { available: availability }, { new: true });
    
    if(!doctor) throw new ErrorHandler(404,"Doctor not found");

    res.status(200).json({
      success: true,
      message: "Availability updated ",
      doctor: {
        id: doctor._id,
        available: doctor.available
      }
    })
    
  } catch (error) {
    console.error('updateAvailability error: ', error);
    next(error);
  }
}

// @desc    Get all doctors (excluding passwords)
// @route   GET /api/v1/doctor/list
// @access  Public
export const getAllDoctorsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctors = await DoctorModel.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      doctors
    })
  } catch (error) {
    console.error('listOfDoctors error: ', error);
    next(error);
  }
} 

// @desc    Get doctor by ID (excluding password)
// @route   GET /api/v1/doctor/:id
// @access  Public
export const getDoctorHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const doctor = await DoctorModel.findById(req.params.id).select("-password");

    if(!doctor) throw new ErrorHandler(404, "Doctor not found");

    res.status(200).json({
      success: true,
      message: "Doctor fetched successfully",
      doctor
    })
  } catch (error) {
    console.error('getDoctorHandler error: ', error);
    next(error);
  }
}

// @desc    Doctor login and JWT token generation
// @route   POST /api/v1/doctor/login
// @access  Public
export const doctorLoginHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const doctor = await DoctorModel.findOne({ email });    
    if(!doctor) throw new ErrorHandler( 404, "Invalid credentials");
    
    const isMatch = await doctor.comparePassword(password);
    if(!isMatch) throw new ErrorHandler(404, "Invalid credentials");

    generateJwtTokenAndSetCookie(res, doctor._id, doctor.role)

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      doctor: {
        name: doctor.name,
        email: doctor.email,
        role: doctor.role,
        image: doctor.image,
      }
    })
  } catch (error) {
    console.error('userLogin error: ', error);
    next(error);
  }
}

// @desc    Get all appointments for the authenticated doctor
// @route   GET /api/v1/doctor/appointments
// @access  Private (Doctor only)
export const doctorAppointmentsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.doctor
    
    const appointments = await AppointmentModel.find({doctorId: id}).populate("doctorId", "name email image fees").populate("userId", "name email dob image")

    if(!appointments) throw new ErrorHandler(404, "appointments not found");
    
    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      appointments
    })
  } catch (error) {
    console.error('doctorAppointments error: ', error);
    next(error);
  }
}

// @desc    Mark appointment as completed
// @route   PATCH /api/v1/doctor/appointments/complete
// @access  Private (Doctor only)
export const completeAppointmentHandler = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.doctor;
    const { appointmentId } = req.body;

    const appointment = await AppointmentModel.findById(appointmentId);

    if(!appointment) throw new ErrorHandler(404, "Appointment not found");

    if(appointment.status === 'completed') throw new ErrorHandler(400, "Appointment already completed");

    if(appointment.doctorId.toString() !== id) throw new ErrorHandler(401, "Unauthorized");
    
    appointment.status = 'completed';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment completed",
    });
  } catch (error) {
    console.error('completeAppointment error: ', error);
    next(error);
  }
}

// @desc    Get doctor dashboard data (appointments, earnings, patients)
// @route   GET /api/v1/doctor/dashboard
// @access  Private (Doctor only)
export const doctorDashboardHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.doctor;

    const appointments = await AppointmentModel.find({doctorId: id}).populate("doctorId", "name email image fees").populate("userId", "name email dob image")
    if(!appointments) throw new ErrorHandler(404, "appointments not found");
    console.log('appointments', appointments);
    
    // calculate earning of doctor
    let earning = appointments.reduce((total, appointment: any) => {
      if (appointment.status === 'completed' && appointment.payment === 'paid') {
        return total + appointment.amount;
      }
      return total;
    }, 0);  

    // calculate number of patients
    let patients: string[] = [];
    appointments.map((appointment: any) => {
      if (!patients.includes(appointment.userId._id.toString())) {
          patients.push(appointment.userId._id.toString());
        }
    });

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      dashboardData: {
        earning,
        patients: patients.length,
        appointments: appointments.length,
        latestAppointments: appointments.reverse().slice(0, 5)
      }
    })
  } catch (error) {
    console.error('doctorAppointments error: ', error);
    next(error);
  }
}

// @desc    Get the authenticated doctor's profile
// @route   GET /api/v1/doctor/profile
// @access  Private (Doctor only)
export const doctorProfileHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.doctor;

    const doctorPrifle = await DoctorModel.findById(id).select("-password");

    if(!doctorPrifle) throw new ErrorHandler(404, "Doctor not found");

    res.status(200).json({
      success: true,
      message: "Doctor fetched successfully",
      doctorPrifle
    })
  } catch (error) {
    console.error('doctorProfile error: ', error);
    next(error);
  }
}

// @desc    Log out the doctor and clear their authentication token (dtoken)
// @route   POST /api/v1/doctor/logout
// @access  Private (Doctor only - must be authenticated to log out)
export const doctorLogoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("dtoken");
    res.status(200).json({
      success: true,
      message: "Doctor logged out successfully"
    })
  } catch (error) {
    console.error('logoutDoctor error: ', error);
    next(error);
  }
}

// // @desc    Update doctor profile
// // @route   PATCH /api/v1/doctor/profile
// // @access  Private (Doctor only)
// export const updateDoctorProfile = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const {id} = req.doctor;
//     const { name, email, image, fees, available } = req.body;

//     const doctor = await DoctorModel.findByIdAndUpdate(id, { name, email, image, fees, available }, { new: true });

//     if(!doctor) throw new ErrorHandler(404, "Doctor not found");

//     res.status(200).json({
//       success: true,
//       message: "Doctor updated successfully",
//       doctor
//     })
//   } catch (error) {
//     console.error('updateDoctorProfile error: ', error);
//     next(error);
//   }
// }
