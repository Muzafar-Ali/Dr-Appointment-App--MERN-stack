import { create } from "zustand";
import {TDoctor} from "@/types/doctorType"
import { doctors } from "@/assets/assets";

type TDoctorState = {
  doctors: TDoctor[];
}


export const useDoctorStore = create<TDoctorState>((set, get) =>({
  doctors: doctors,
}))