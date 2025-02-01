import Login from "./pages/Login"
import { useAdminStore } from "./store/adminStore"
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Appointments from "./pages/admin/Appointments";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorList from "./pages/admin/DoctorList";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const {admin} = useAdminStore();
  
  return admin ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer/>
      <Navbar/>
      <div className="flex items-start">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard/>}/>
          <Route path="/all-appointments" element={<Appointments/>}/>
          <Route path="/add-doctor" element={<AddDoctor/>}/>
          <Route path="/doctor-list" element={<DoctorList/>}/>
        </Routes>
      </div>
    </div>
  ): (
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App
