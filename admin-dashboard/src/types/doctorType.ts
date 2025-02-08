import { TAppointments, TDoctor } from "./adminType";

export type TDoctorState = {
  doctor: TDoctor | null;
  appointments: TAppointments[] | null;
  loading: boolean;
  doctorDashboardData:{ 
    patients: number, 
    earning: number, 
    appointments: number 
    latestAppointments: TAppointments[],
  } | null;
  doctorLogin: (userInput: {email: string, password: string}) => Promise<void>;
  getDoctorAppointments: () => Promise<void>;
  completeAppointment: (appointmentId: string) => Promise<void>;
  getDashboardData: () => Promise<void>;
  doctorProfile: () => Promise<TDoctor>;
  doctorLogout: () => void;
}