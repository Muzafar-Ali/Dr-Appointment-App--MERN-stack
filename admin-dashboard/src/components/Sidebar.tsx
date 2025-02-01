import { NavLink } from "react-router-dom";
import { useAdminStore } from "../store/adminStore"
import homeIcon  from "../assets/home_icon.svg";
import appointmentIcon  from "../assets/appointment_icon.svg";
import doctorIcon  from "../assets/add_icon.svg";
import peopleIcon  from "../assets/people_icon.svg";


const Sidebar = () => {
  const {admin} = useAdminStore();

  return (
    <div className="min-h-screen bg-white border-r">
      { admin?.role === "admin" && (
        <ul className="text-[#515151] mt-5">
          <NavLink to={"/admin-dashboard"} className={({isActive}) => `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary": ''}`}>
            <img src={homeIcon}/>
            <p>Dashboard</p>
          </NavLink>
       
          <NavLink to={"/all-appointments"} className={({isActive}) => `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary": ''}`}>
            <img src={appointmentIcon}/>
            <p>Appointments</p>
          </NavLink>
       
          <NavLink to={"/add-doctor"} className={({isActive}) => `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary": ''}`}>
            <img src={doctorIcon}/>
            <p>Add Doctor</p>
          </NavLink>
       
          <NavLink to={"/doctor-list"} className={({isActive}) => `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary": ''}`}>
            <img src={peopleIcon}/>
            <p>Doctor List</p>
          </NavLink>

        </ul>
      )}
    </div>
  )
}

export default Sidebar