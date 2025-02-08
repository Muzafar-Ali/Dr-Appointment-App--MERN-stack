import { useEffect } from "react";
import { useDoctorStore } from "../../store/doctorStore"
import { calculateAge } from "../../utils/calculateAge";
import { slotDtateFormat } from "../../utils/slotDateFormat";
import config from "../../config/config";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {appointments, getDoctorAppointments, completeAppointment} = useDoctorStore();
  console.log('appointments', appointments);
  
  useEffect(() => {
    const fetchDoctorAppoitmenst = async () => {
      await getDoctorAppointments()
    }
    fetchDoctorAppoitmenst()
    
  },[])

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Payment</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments?.map((item, index) => (
          <div key={item._id} className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500  py-3 px-6 border-b hover:bg-gray-50">
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img src={item.userId.image} alt={item.userId.name} className="w-8 rounded-full border" /> <p>{item.userId.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userId.dob)}</p>
            <p>{slotDtateFormat(item.slotDate)}, {item.slotTime}</p>
            {/* <div className="flex items-center gap-2"> */}
              {item.payment === "paid" && <p className="text-green-500">Paid</p>}
              {item.payment === "unpaid" && <p className="text-red-400">Unpaid</p>}
              {/* <img src={item.doctorId.image} alt={item.doctorId.name} className="w-8 rounded-full border" /> <p>{item.doctorId.name}</p> */}
            {/* </div> */}
            <p>{config.currency} {item.amount}</p>

            <div className="flex items-center gap-2">
              {item.status === "cancelled" && <p className="text-red-400">Cancelled</p>}
              {item.status === "completed" && <p className="text-green-500">Completed</p>}
              {item.status === "scheduled" &&  
                <div className="flex items-center gap-2">  
                  <button onClick={() => completeAppointment(item._id)}> <img src={assets.tick_icon} alt="delete" /></button>
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments