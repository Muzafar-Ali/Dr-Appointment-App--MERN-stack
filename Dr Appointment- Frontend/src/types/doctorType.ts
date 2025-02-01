export type TDoctor = {
  _id: string;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: {
    line1: string;
    line2: string;
  };
}

export type TUseDoctorStore = {
  doctors: TDoctor[];
  setDoctors: (doctors: TDoctor[]) => void;
}