import { useUserStore } from "@/store/userStore";
import { TMyAppointments } from "@/types/userType";
import { useEffect, useState } from "react";

const MyAppointments = () => {
  const {getMyAppointment, cancelAppointment} = useUserStore();

  const [appointments, setAppointments] = useState<TMyAppointments[]>([])
  const [refresh, setRefresh] = useState<boolean>(false)
  
  useEffect(() => {
    const getAppointments = async () => {
      const appointments = await getMyAppointment();
      setAppointments(appointments.reverse()); // keep new appointment at the top
    }
    getAppointments();
  },[refresh])
  

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
      <div>
        { appointments?.map((item,index) => (
          <div key={index} className=" grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
            <div>
              <img src={item.doctorId.image} alt={item.doctorId.name} className="w-32 bg-indigo-50"/>
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.doctorId.name}</p>
              <p>{item.doctorId.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-sm">{item.doctorId.address.line1}</p>
              <p className="text-sm">{item.doctorId.address.line2}</p>
              <p className="text-xs mt-1"><span className="text-sm text-neutral-700 font-medium">Date & Time: </span> {item.slotDate} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {
                item.payment === "paid" ? ( 
                  <p className="text-sm text-white text-center sm:min-w-48 py-2 border rounded bg-primary_base transition-all duration-300">Paid</p> 
                ) 
                : (
                  <button className={`text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary_base hover:text-white transition-all duration-300 ${item.status === "cancelled" || item.status === "completed"? "hidden": "visible"}`}>Pay Online</button>
                ) 
              }
              
              { item.status === "cancelled" && <p className="text-sm text-red-600 text-center sm:min-w-48 py-2 border border-red-600 rounded  transition-all duration-300"> Cancelled </p>}
              
              { item.status === "completed" && <p className="text-sm text-primary_base text-center sm:min-w-48 py-2 border rounded border-primary_base transition-all duration-300"> Completed </p>}
              { 
                item.status === "scheduled" &&  
                <button
                  onClick={ async () => {
                    await cancelAppointment(item._id)
                    setRefresh((prev) => !prev)
                  }}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">Cancel appointment</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments