import { Link, NavLink, useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets"
import { useState } from "react";

const NavbarDesktop = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<boolean>(true)
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <Link to={"/"} className="flex items-center gap-2">
        <img src={assets.logo} className="w-[50px] h-[40px]" />
        <p className="text-xl font-bold text-primary_base font-nunito">Dr Appointment</p>
      </Link>
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary_base w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary_base w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary_base w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary_base w-3/5 m-auto hidden"/>
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        { 
          token ?  (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img src={assets.profile_pic} alt="profile" className="w-8 rounded-full"/>
              <img src={assets.dropdown_icon} alt="profile" className="w-2.5"/>

              <div className="absolute top-0 right-0 z-20 pt-14 text-base font-medium text-gray-600 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col items-start gap-4 p-4 ">
                  <p onClick={() => navigate("my-profile")} className="cursor-pointer">My Profile</p>
                  <p onClick={() => navigate("my-appoitnments")} className="cursor-pointer">My Appointments</p>
                  <p onClick={() => setToken(false)} className="cursor-pointer">logout</p>
                </div>
              </div>
            </div>
          )
          : <button onClick={() => navigate("/login")} className="bg-primary_base text-white px-8 py-3 rounded-xl font-light hidden md:block">create account</button>
        }
      </div>
    </div>
  )
}

export default NavbarDesktop