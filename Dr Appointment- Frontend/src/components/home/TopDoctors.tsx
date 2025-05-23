import { useDoctorStore } from "@/store/doctorStore";
import { useNavigate } from "react-router-dom"

const TopDoctors = () => {
  const navigate = useNavigate();
  const {doctors} = useDoctorStore();

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium"> Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        { doctors?.slice(0,10).map((item) => (
          <div 
            key={item._id} 
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            onClick={() => {navigate(`appointment/${item._id}`); scrollTo(0,0)}}
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
      <div>
        <button 
          className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10" 
          onClick={() =>{
            navigate("/doctors"); 
            scrollTo(0,0)
          }}>
            See all
          </button>
      </div>
    </div>
  )
}

export default TopDoctors