import { useDoctorStore } from "@/store/doctorStore";
import { TDoctor } from "@/types/doctorType";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors } = useDoctorStore();

  const [filterDoctors, setFilterDoctors] = useState<TDoctor[] | undefined>([])
  const [showFilters, setShowFilters] = useState<boolean>(false)

  const applyFilter = () => {
    if (speciality) {
      const filteredDoctors = doctors?.filter((doctor) => doctor.speciality === speciality);
      setFilterDoctors(filteredDoctors);
    } else {
      setFilterDoctors(doctors)
    }
  }

  useEffect(() => {
    applyFilter();
  },[doctors, speciality])

  return (
    <div>
      <p className=" text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Filters button for mobile screen starts */}
        <button
          onClick={() => setShowFilters((prev) => !prev)} 
          className={`${showFilters ? "bg-primary_base text-white": ""} py-1 px-3 border rounded text-sm transition-all sm:hidden`}
        >
          Filters
        </button>
        {/* Filters button for mobile screen ends */}

        {/* left side - Filters*/}
        <div className={`${showFilters ? "flex":"hidden sm:flex"} flex-col gap-4 text-sm text-gray-600`}>
          <p 
            className={`w-[80vw] sm:w-[100%] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}
          >General physician</p>
          <p 
            className={`w-[80vw] sm:w-[100%] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer
              ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}

          >Gynecologist</p>
          <p 
            className={`w-[80vw] sm:w-[100%] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer
              ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}

          >Dermatologist</p>
          <p 
            className={`w-[80vw] sm:w-[100%] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer
              ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}

          >Pediatricians</p>
          <p 
            className={`w-[80vw] sm:w-[100%] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer
              ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}

          >Neurologist</p>
          <p 
            className={`w-[80vw] sm:w-[100%] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer
              ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
          >Gastroenterologist</p>
        </div>

        {/* right side - Doctors */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          { filterDoctors?.map((item) => (
            <div 
              key={item._id} 
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              onClick={() => navigate(`/appointment/${item._id}`)}
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
    </div>
  )
}

export default Doctors