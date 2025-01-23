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


export type TAdminState = {
  user: TDoctor | null;
  doctors: TDoctor[];
  loading: boolean;
  login: (userInput: {email: string, password: string}) => void;
  logout: () => void;
  addDoctor: (formDta: FormData) => void;
  getAllDoctors: () => void;
  updateDoctorAvailability: (doctorId: string, isAvailable: boolean) => void;
}