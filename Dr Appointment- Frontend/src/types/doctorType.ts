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
  slotsBooked: {
    [key: string]: string[];
  }
}

export type TUseDoctorStore = {
  doctors: TDoctor[] | undefined;
  loading: boolean;
  getAllDoctors: () => void;
  getDoctor: (id: string) => Promise<TDoctor | undefined>;
}