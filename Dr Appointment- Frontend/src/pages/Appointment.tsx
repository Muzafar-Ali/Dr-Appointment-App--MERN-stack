import { assets } from "@/assets/assets";
import RelatedDoctors from "@/components/RelatedDoctors";
import config from "@/config/config";
import { useDoctorStore } from "@/store/doctorStore";
import { useUserStore } from "@/store/userStore";
import { TDoctor } from "@/types/doctorType";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";

type  TDocTimeSlot = {
  dateTime: Date; 
  time: string; 
}[]

const Appointment = () => {
  const  {doctorId} = useParams();
  const navigate = useNavigate();
  const {getDoctor, getAllDoctors} = useDoctorStore();
  const {user, bookAppointment} = useUserStore();

  const [doctorInfo, setDoctorInfo] = useState<TDoctor>();
  const [docSlots, setDocSlots] = useState<TDocTimeSlot[]>([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('')
  const [refresh, setRefresh] = useState(false)

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getAvailableSlot = () => {
    setDocSlots([]);  // Reset the slots
  
    let today = new Date();
    let allSlots = [];  // Temporary array to collect all time slots
  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);
  
      // Set starting time for today and future days
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
  
      let timeSlots = [];
      while (currentDate < endTime) {
        let formatedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // logic to remove booket time slots starts
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let slotDate = `${day}-${month}-${year}`;
        let slotTime = formatedTime;
        
        // Check if the slot is available
        let isSlotAvailable = doctorInfo?.slotsBooked[slotDate] && doctorInfo?.slotsBooked[slotDate].includes(slotTime) ? false : true
        // logic to remove booket time slots ends
        
        if(isSlotAvailable) {
          // Add time slot to the day's array
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formatedTime,
          });
        }
  
        // Increment by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      // Add the day's time slots to allSlots array
      allSlots.push(timeSlots);
    }
  
    // Set the docSlots state after the loop completes
    setDocSlots(allSlots);
  };
  

  const bookAppointmentHandler = async () => {
    if(!user) {
      toast.warn('Please login to book an appointment');
    }

    try {
      if(!doctorInfo) return

      const date = docSlots[slotIndex][0].dateTime
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}-${month}-${year}`;
      
      const appointmentData = {
        doctorId: doctorInfo?._id,
        slotDate,
        slotTime,
        amount: doctorInfo?.fees
      }
       await bookAppointment(appointmentData)

    } catch (error) {
      
    }
  }

  useEffect(() => {
    const fetchDocTorInfo = async () => {
      const docInfo = await getDoctor(doctorId as string)
      setDoctorInfo(docInfo);
    }
    fetchDocTorInfo();
    getAllDoctors();  // fetch all doctor for related doctor logic
  }, [doctorId])

  useEffect(() => {
    getAvailableSlot();
  }, [doctorInfo])

  useEffect(() => {
    // console.log('docSlots', docSlots);
    
  },[docSlots])
  
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

      {/* Booking slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {
            docSlots.length && docSlots.map((daySlots, index) => (
              <div
                key={index} 
                onClick={() => setSlotIndex(index) }
                className={`text-center py-4 min-w-16 rounded-full cursor-pointer ${slotIndex == index ? "bg-primary_base text-white":"border border-gray-200"}`}
              >
                <p className="text-sm">{daySlots[0] && daysOfWeek[daySlots[0].dateTime.getDay()]}</p>
                <p className="text-sm">{daySlots[0] && daySlots[0].dateTime.getDate()}</p>

                {/* <p>{daysOfWeek[new Date(daySlots[0].dateTime).getDay()]}</p>
                <p>{new Date(daySlots[0].dateTime).getDate()}</p> */}
              </div>
            ))
          }
        </div>
        <div className=" flex items-center gap-3  w-full overflow-x-scroll mt-4">
          {
            docSlots.length && docSlots[slotIndex].map((Item, index) => (
              <p 
                key={index}
                onClick={() => setSlotTime(Item.time)} 
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${Item.time === slotTime ? "bg-primary_base text-white": "text-gray-400 border border-gray-300"} `}>
                {Item.time.toLowerCase()}
              </p>
            ))
          }
        </div>
        <button 
          onClick={() => {
            bookAppointmentHandler(),
            navigate("/my-appointments")

          }}
          className="bg-primary_base text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an Appointment</button>
      </div>
      <RelatedDoctors doctorId={doctorId!} speciality = {doctorInfo?.speciality!}/>
    </div>
  )
}

export default Appointment