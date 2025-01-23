import { useEffect, useState } from "react";
import { useAdminStore } from "../../store/adminStore"
import { TDoctor } from "../../types/adminType";

const DoctorList = () => {
  
  const {getAllDoctors, loading, user, doctors, updateDoctorAvailability} = useAdminStore();
  
  const [refresh, setRefresh] = useState(false);
  
  const onChangeHandler = async (doctorId: string, availability: boolean) => {
    const updatedAvailability = !availability; // Toggle the availability
    
    try {
      await updateDoctorAvailability(doctorId, updatedAvailability); 
      setRefresh(!refresh); // Trigger refresh by toggling refresh state
    } catch (error) {
      console.error('Failed to update availability:', error);
    }
  };
  
  useEffect(() => {
    const fetchDoctors = async () => {
      await getAllDoctors()
    };
    fetchDoctors();
  }, [refresh])

  
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        { doctors?.map((doctor: TDoctor, index: number) => (
          <div key={index} className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group">
            <img src={doctor.image} alt="doctor image" className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"/>
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>
              <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                {
                  loading ? (<img width={15} height={15} alt='' className='inline-block bg-blue-600 rounded p-1' src="/spinner.svg" />) : (
                    <input type="checkbox" checked={doctor.available} onChange={ () => onChangeHandler( doctor._id, doctor.available) }/>
                  )
                }
                <p className="text-zinc-600 text-sm">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorList