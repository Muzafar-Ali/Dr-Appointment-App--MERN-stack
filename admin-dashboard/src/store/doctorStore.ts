import { create } from "zustand";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";
import { createJSONStorage, persist } from "zustand/middleware";
import { TDoctorState } from "../types/doctorType";

export const useDoctorStore = create<TDoctorState>() ( persist((set, get) => ({
  doctor:  null,
  appointments: null,
  doctorDashboardData: null,
  loading: false,
  doctorLogin: async (userInput: {email: string, password: string}) => {

    set({ loading: true })
    
    try {
      const response = await axios.post(`${config.baseUri}/api/v1/doctor/login`, userInput, {
        withCredentials: true
      })
      
      if (response.data.success) {
        set({ doctor: response.data.doctor})
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
  doctorLogout: async () => {
    set({ loading: true })
    try {
      const response = await axios.post(`${config.baseUri}/api/v1/doctor/logout`, {
        withCredentials: true
      })
      if (response.data.success) {
        set({ doctor: null, loading: false })
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
  getDoctorAppointments: async () => {
    set({ loading: true })

    try {
      const response = await axios.get(`${config.baseUri}/api/v1/doctor/appointments`, {
        withCredentials: true
      })
      
      if (response.data.success) {
        set({ appointments: response.data.appointments, loading: false})
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
  completeAppointment: async (appointmentId: string) => {
    set({ loading: true })

    try {
      const response = await axios.patch(`${config.baseUri}/api/v1/doctor/appointments/complete`, {appointmentId}, {
        withCredentials: true
      })

      if (response.data.success) {
        set({ loading: false })
        await get().getDoctorAppointments();
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
  getDashboardData: async () => {
    set({ loading: true })

    try {
      const response = await axios.get(`${config.baseUri}/api/v1/doctor/dashboard`, {
        withCredentials: true
      })

      if (response.data.success) {
        set({ doctorDashboardData: response.data.dashboardData, loading: false })
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
  doctorProfile: async () => {
    set({ loading: true })

    try {
      const response = await axios.get(`${config.baseUri}/api/v1/doctor/profile`, {
        withCredentials: true
      })

      if (response.data.success) {
        set({ loading: false })
        return response.data.doctorPrifle
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
  name: "doctor", 
  storage: createJSONStorage(() => localStorage), // use localStorage
  partialize: (state) => ({ doctor: state.doctor }), // only persist the `doctor` state
}
))