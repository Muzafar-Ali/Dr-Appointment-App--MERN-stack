import config from "@/config/config";
import { TAppointment, TLoginUser, TUseUserStore } from "@/types/userType";
import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create<TUseUserStore>() (persist((set) => ({
  user: null,
  loading: false,
  registerUser: async(userData: FormData) => {
    set({ loading: true });
    try {
      userData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const response = await axios.post(`${config.baseUri}/api/v1/user/register`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      if(response.data.success){
        set({ 
          user: response.data.user, 
          loading: false 
        });
        toast.success(response.data.message);
        return true;
      }

      return false;
      
    } catch (error: any) {
      set({ loading: false })
      
      if(error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }

      return false;
    }
  },
  login: async (user: TLoginUser) => {
    set({ loading: true });
    
    try {
      const response = await axios.post(`${config.baseUri}/api/v1/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });

      if(response.data.success){
        set({
          user: response.data.user,
          loading: false
        });
        toast.success(response.data.message);
        return true;
      }

      return false;

    } catch (error: any) {
      set({ loading: false })

      if(error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
      return false;
    }
  },
  logout: async () => {
    set({ loading: true });

    try {
      const response = await axios.post(`${config.baseUri}/api/v1/user/logout`, {
        withCredentials: true
      });

      if(response.data.success){
        set({
          user: null,
          loading: false
        });
      }    
      
    } catch (error: any) {
      set({ loading: false })

      if(error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
    }

  },
  getUserProfile: async () => {
    set({ loading: true });

    try {
      const response = await axios.get(`${config.baseUri}/api/v1/user/profile`, {
        withCredentials: true
      });

      if(response.data.success){
        set({ loading: false });
        return response.data.user
      }

    } catch (error: any) {
      set({ loading: false })

      if(error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
    }
  }, 
  updateUserProfile: async (user: FormData) => {
    set({ loading: true });

    try {
      const response = await axios.patch(`${config.baseUri}/api/v1/user/profile`, user, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      if(response.data.success){
        set({ loading: false });
        toast.success(response.data.message);
      }

    } catch (error: any) {
      set({ loading: false })

      if(error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
    }
  },
  bookAppointment: async (appointmentData: TAppointment) => {
    set({ loading: true });

    try {
      const response = await axios.post(`${config.baseUri}/api/v1/user/appointment`, appointmentData, {
        withCredentials: true
      });

      if(response.data.success){
        set({ loading: false });
        toast.success(response.data.message);
      }

    } catch (error: any) {
      set({ loading: false })

      if(error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
    }
  },
  getMyAppointment: async () => {
    set({ loading: true });

    try {
      const response = await axios.get(`${config.baseUri}/api/v1/user/appointment`, {
        withCredentials: true
      });

      if(response.data.success){
        set({ loading: false });
        return response.data.appointments
      }

    } catch (error: any) {
      set({ loading: false })

      if(error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
    }
  },
  cancelAppointment: async (appointmentId: string) => {
    set({ loading: true });
    console.log('appointmentId', appointmentId);
    
    try {
      const response = await axios.post(`${config.baseUri}/api/v1/user/appointment/cancel`, {appointmentId}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });

      if(response.data.success){
        set({ loading: false });
        toast.success(response.data.message);
      }

    } catch (error: any) {
      set({ loading: false })

      if(error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
    }
  }
}), 
{
  name: "user",
  storage: createJSONStorage(() => localStorage),
}
))