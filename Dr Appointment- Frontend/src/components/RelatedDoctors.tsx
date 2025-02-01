import { useDoctorStore } from "@/store/doctorStore"
import { TDoctor } from "@/types/doctorType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({doctorId, speciality}: { doctorId: string, speciality: string}) => {
  const {doctors} = useDoctorStore();
  const navigate = useNavigate();

  const [relatedDoctors, setRelatedDoctors] = useState<TDoctor[] | undefined>([]);

  useEffect(() => {
    const filteredDoctors = doctors?.filter((doctor) => doctor.speciality === speciality && doctor._id !== doctorId);
    setRelatedDoctors(filteredDoctors);
  }, [doctors, doctorId, speciality]);
  
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium"> Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        { relatedDoctors?.slice(0,5).map((item) => (
          <div 
            key={item._id} 
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            onClick={() => { 
              navigate(`/appointment/${item._id}`)
              scrollTo(0,0) 
            }}
          >
            <img src={item.image} alt={item.name} className="bg-blue-50"/>
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className=" w-2 h-2 bg-green-500 rounded-full"></p><p>Available</p>
              </div>
              <p className="text-gray-900 text-start text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-start text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors