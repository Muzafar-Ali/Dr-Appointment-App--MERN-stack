import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Appointment from './pages/Appointment'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Login from './pages/auth/Login'
import NavbarDesktop from './components/navbar/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    // <div className='mx-4 sm:mx[10%]'>
    <div className=''>
      <ToastContainer />
      <NavbarDesktop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/appointment/:drId' element={<Appointment />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
