import { assets } from "@/assets/assets";
import config from "@/config/config";
import { useDoctorStore } from "@/store/doctorStore";
import { TDoctor } from "@/types/doctorType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const Appointment = () => {
  const  {drId} = useParams();
  const {doctors} = useDoctorStore();

  const [doctorInfo, setDoctorInfo] = useState<TDoctor>();

  const fetchDocTorInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === drId);
    setDoctorInfo(docInfo);
  }

  useEffect(() => {
    fetchDocTorInfo();
  }, [doctors, drId])
  
  return (
    <div>
      {/* Doctors Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img src={doctorInfo?.image} alt={doctorInfo?.name} className="bg-primary_base w-full sm:max-w-72 rounded-lg"/>
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">{doctorInfo?.name} <img src={assets.verified_icon} alt="verified icon" className="w-5"/></p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p >{doctorInfo?.degree} - {doctorInfo?.speciality}</p>
            <button className="py0.5 px-2 border text-xs rounded-full">{doctorInfo?.experience}</button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">About <img src={assets.info_icon} alt="about icon" /></p>
            <p className=" text-sm text-gray-500 max-w-[700px] mt-1">{doctorInfo?.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-gray-600">{config.currencySymbol}{doctorInfo?.fees}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Appointment