
export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type TLoginUser = {
  email: string;
  password: string;
}

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
  }
  speciality: string;
  gender: string;
  dob: string;
  image: string;
  role: "admin" | "doctor" | "user";
}

export type TAppointment = {
  doctorId: string;
  slotDate: string;
  slotTime: string;
  amount: number;
}

export type TMyAppointments = {
  _id: string;
  doctorId: TUser;
  userId: TUser;
  slotDate: string;
  slotTime: string;
  amount: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  payment: 'unpaid' | 'paid';
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TUseUserStore = {
  user: TUser | null;
  loading: boolean;
  registerUser: (user: FormData) => Promise<boolean>;
  login: (user: TLoginUser) => Promise<boolean>;
  logout: () => void;
  getUserProfile: () => Promise<TUser>;
  updateUserProfile: (user: FormData) => void;
  bookAppointment: (appointmentData: TAppointment) => Promise<void>;
  getMyAppointment: () => Promise<TMyAppointments[]>
  cancelAppointment: (appointmentId: string) => Promise<void>;
}
