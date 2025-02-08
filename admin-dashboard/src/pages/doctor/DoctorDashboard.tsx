import { useEffect } from "react";
import { useDoctorStore } from "../../store/doctorStore"
import { assets } from "../../assets/assets";
import { slotDtateFormat } from "../../utils/slotDateFormat";
import config from "../../config/config";

const DoctorDashboard = () => {
  const {doctorDashboardData, getDashboardData} = useDoctorStore();
  console.log('doctorDashboardData', doctorDashboardData);
  
  useEffect(() => {
    const fetchData = async () => {
      await getDashboardData()      
    }
    fetchData();
  }, [])

   return (
      <div className="m-5">
        <div className=" flex flex-wrap gap-3">
          
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img src={assets.earning_icon} alt="dr icon" className="w-14"/>
            <div>
              <p className="text-xl font-semibold text-gray-600"><span>{config.currency}</span>{doctorDashboardData?.earning}</p>
              <p className="text-gray-400">Earning</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img src={assets.appointments_icon} alt="dr icon" className="w-14"/>
            <div>
              <p className="text-xl font-semibold text-gray-600">{doctorDashboardData?.appointments}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img src={assets.patients_icon} alt="dr icon" className="w-14"/>
            <div>
              <p className="text-xl font-semibold text-gray-600">{doctorDashboardData?.patients}</p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
  
        </div>
  
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="appoitnment" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
  
          <div className="pt-4 border border-t-0">
            {doctorDashboardData?.latestAppointments.map((appointment) => (
              <div key={appointment._id} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
                <img src={appointment.userId.image} alt={appointment.userId.name} className="w-10 rounded-full border"/>
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{appointment.userId.name}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-gray-600">{slotDtateFormat(appointment.slotDate)}</p>
                    <p className="text-gray-600">{appointment.slotTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {appointment.status === "cancelled" && <p className="text-red-400">Cancelled</p>}
                  {appointment.status === "completed" && <p className="text-green-500">Completed</p>}
                  {/* {appointment.status === "scheduled" &&  
                  <button onClick={() => cancelAppointment(appointment._id)}> <img src={assets.cancel_icon} alt="delete" /></button>
                } */}
              </div>
              </div>
            ))}
          </div>
        </div>
  
      </div>
    )
}

export default DoctorDashboard