import { create } from "zustand";
import { TAdminState } from "../types/adminType";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";
import { addDoctorSchema } from "../schema/admin.schema";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAdminStore = create<TAdminState>() (persist((set, get) => ({
  user:  null,
  loading: false,
  login: async (userInput: {email: string, password: string}) => {

    set({ loading: true })
    
    try {
      const response = await axios.post(`${config.baseUri}/api/v1/admin/login`, userInput)
           
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
        localStorage.removeItem("user");
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
      formData.forEach((value, key) => {
        console.log('add doc',key, value)
      })
      
      // convert the FormData entries into a plain object:
      const formDataObj = Object.fromEntries(formData.entries());  
      formDataObj.address = JSON.parse(formDataObj.address as string);
      formDataObj.fees = Number(formDataObj.fees);
      
      // const {success, data, error} = addDoctorSchema.safeParse({...formDataObj, fees: Number(formDataObj.fees)})
      // console.log('success', success);
      // console.log('data', data);
      // console.log('error', error);

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
  }
}), 
{
  name: "user",
  storage: createJSONStorage(() => localStorage),
}
))