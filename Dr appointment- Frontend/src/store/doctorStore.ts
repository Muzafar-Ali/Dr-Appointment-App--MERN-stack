import { doctors } from "@/assets/assets";
import { TUseDoctorStore } from "@/types/doctorType";
import { create } from "zustand";


export const useDoctorStore = create<TUseDoctorStore>((set) => ({
  doctors: doctors,
  setDoctors: (doctors) => set({ doctors }),
}))