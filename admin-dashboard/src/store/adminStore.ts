import { create } from "zustand";
import { TAdminState } from "../types/adminType";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAdminStore = create<TAdminState>() (persist((set, get) => ({
  admin:  null,
  doctors: [],
  appointments: [],
  dashboardData: null,
  loading: false,
  adminLogin: async (userInput: {email: string, password: string}) => {

    set({ loading: true })
    
    try {
      const response = await axios.post(`${config.baseUri}/api/v1/admin/login`, userInput, {
        withCredentials: true
      })
           
      if (response.data.success) {
        set({ admin: response.data.admin})
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
        set({ admin: null })
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
  getAllAppointments: async () => {
    set({ loading: true })

    try {
      const response = await axios.get(`${config.baseUri}/api/v1/admin/appointments`, {
        withCredentials: true,
      })
      
      if (response.data.success) {
        set({appointments: response.data.appointments, loading: false })
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
    set({ loading: true })

    try {
      const response = await axios.patch(`${config.baseUri}/api/v1/admin/appointments/cancel`, {appointmentId}, {
        withCredentials: true,
      })

      if (response.data.success) {
        set({ loading: false })
        await get().getAllAppointments()
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
  adminDashboard: async () => {
    set({ loading: true })

    try {
      const response = await axios.get(`${config.baseUri}/api/v1/admin/dashboard`, {
        withCredentials: true,
      })

      set({ 
        dashboardData: {
          latestAppointments: response.data.latestAppointments,
          totalAppointments: response.data.totalAppointments,
          totalDoctors: response.data.totalDoctors,
          totalUsers: response.data.totalUsers,
        }
      }); 

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
  name: "admin", 
  storage: createJSONStorage(() => localStorage), // use localStorage
  partialize: (state) => ({ admin: state.admin }), // only persist the `admin` state
}
))