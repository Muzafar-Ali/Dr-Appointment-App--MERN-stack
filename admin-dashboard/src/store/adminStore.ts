import { create } from "zustand";
import { TAdminState } from "../types/adminType";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAdminStore = create<TAdminState>() (persist((set, get) => ({
  user:  null,
  doctors: [],
  loading: false,
  login: async (userInput: {email: string, password: string}) => {

    set({ loading: true })
    
    try {
      const response = await axios.post(`${config.baseUri}/api/v1/admin/login`, userInput, {
        withCredentials: true
      })
           
      if (response.data.success) {
        set({ user: response.data.user })
        set({ loading: false })
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
  logout: async () => {
    try {
      const response = await axios.post(`${config.baseUri}/api/v1/admin/logout`, {
        withCredentials: true
      });
          
      if (response.data.success) {
        localStorage.removeItem("admin");
        set({ user: null })
        set({ loading: false })
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
  addDoctor: async (formData: FormData) => {
    set({ loading: true }) 

    try {
      const response = await axios.post(`${config.baseUri}/api/v1/admin/doctor`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
      })

      if (response.data.success) {
        set({ loading: false })
        toast.success(response.data.message)
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
  getAllDoctors: async () => {
    set({ loading: true })

    try {
      const response = await axios.get(`${config.baseUri}/api/v1/admin/doctors`, {
        withCredentials: true,
      })

      if (response.data.success) {
        set({ loading: false })
        set({ doctors: response.data.doctors })
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
  updateDoctorAvailability: async (doctorId: string, isAvailable: boolean) => {
    set({ loading: true })
    
    try {
      const response = await axios.patch(`${config.baseUri}/api/v1/admin/doctors`, {
        availability: isAvailable,
        id: doctorId
      }, {
        withCredentials: true,
      })

      if (response.data.success) {
        set({ loading: false })
        toast.success(response.data.message)
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
}), 
{
  name: "admin",
  storage: createJSONStorage(() => localStorage),
}
))