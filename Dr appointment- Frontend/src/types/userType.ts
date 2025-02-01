import { promises } from "dns";

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
  gender: string;
  dob: string;
  image: string;
  role: "admin" | "doctor" | "user";
}

export type TUseUserStore = {
  user: TUser | null;
  loading: boolean;
  registerUser: (user: FormData) => Promise<boolean>;
  login: (user: TLoginUser) => Promise<boolean>;
  logout: () => void;
  getUserProfile: () => Promise<TUser>;
  updateUserProfile: (user: FormData) => void;
}
