import config from "@/config/config";
import { TUseDoctorStore } from "@/types/doctorType";
import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

export const useDoctorStore = create<TUseDoctorStore>((set) => ({
  doctors: undefined,
  loading: false,
  getAllDoctors: async () => {
    try {
      set({ loading: true })

      const response = await axios.get(`${config.baseUri}/api/v1/doctor/list`);
            
      if(response.data.success) {
        set({ 
          doctors: response.data.doctors, 
          loading: false
        })
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
  getDoctor: async (id: string) => {
    try {
      set({ loading: true })
       
      const response = await axios.get(`${config.baseUri}/api/v1/doctor/${id}`);
    
      if(response.data.success) {
        set({ loading: false })
        return response.data.doctor       
      }

      return;
      
    } catch (error: any) {
      set({ loading: false })
      
      if(error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
    }
  }
}))