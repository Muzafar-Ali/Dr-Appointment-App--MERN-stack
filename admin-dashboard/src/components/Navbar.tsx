import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useAdminStore } from '../store/adminStore'

const Navbar = () => {
  const {admin, logout} = useAdminStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className="flex items-center gap-10">
        <div className='flex items-center gap-2'>
          <img src={logo} className="w-[50px] h-[40px]" />
          <p className="text-xl font-bold text-primary font-nunito hidden md:block">Dr Appointment</p>
        </div>
        <div className='flex justify-between items-center gap-3'>
          <p className='text-sm border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{ admin?.role == "admin"? "Admin" : "Doctor"}</p>
          <p className="text-sm font-bold text-gray-600 font-nunito hidden md:block">Dashboard panel</p>
        </div>
      </div>
      <button className='bg-primary text-white text-sm px-10 py-2 rounded-full' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar