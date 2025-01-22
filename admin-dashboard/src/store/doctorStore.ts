import { create } from "zustand";

export const useDoctorStore = create((set, get) => ({
  doctor: null,
  setDoctor: (doctor: any) => set({ doctor }),
  clearDoctor: () => set({ doctor: null }),
}))