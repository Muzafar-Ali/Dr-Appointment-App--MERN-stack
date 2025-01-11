import { assets } from "@/assets/assets"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left side */}
        <div className="flex flex-col">
          <Link to={"/"} className="flex items-center gap-2 mb-5">
            <img src={assets.logo} className="w-[30px] h-[30px]" />
            <p className="text-base font-bold text-primary_base font-nunito">Dr Appointment</p>
          </Link>
          <p className="w-full md:w-2/3 text-gray-600 leading-6 text-start">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
        </div>

        {/* center */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* right side */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-242-654-9874</li>
            <li>appointment@drappointment.com</li>
          </ul>
        </div>

      </div>

      {/* copy right */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-gray-600">© 2025 Dr Appointment. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer