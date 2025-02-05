import { late } from "zod";

export type TDoctor = {
  _id: string;
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
  role: "admin" | "doctor" | "user";
}

type TUserId = {
  _id: string;
  name: string;
  email: string;
  image: string;
  dob: string;
}

type TDoctorId = {
  _id: string;
  name: string;
  email: string;
  image: string;
  fees: number;
}

export type TAppointments = {
  _id: string;
  userId: TUserId;
  doctorId: TDoctorId;
  slotDate: string;
  slotTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  payment: string;
  amount: number;
  date: number;
  createdAt: string;
  updatedAt: string;
}

export type TAdminState = {
  admin: TDoctor | null;
  doctors: TDoctor[];
  appointments: TAppointments[];
  loading: boolean;
  dashboardData:{ 
    latestAppointments: TAppointments[],
    totalAppointments: number, 
    totalDoctors: number, 
    totalUsers: number 
  } | null;
  login: (userInput: {email: string, password: string}) => void;
  logout: () => void;
  addDoctor: (formDta: FormData) => void;
  getAllDoctors: () => Promise<void>;
  updateDoctorAvailability: (doctorId: string, isAvailable: boolean) => Promise<void>;
  getAllAppointments: () => Promise<void>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  adminDashboard: () => Promise<void>;
}