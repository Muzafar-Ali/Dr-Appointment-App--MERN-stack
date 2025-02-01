import Banner from "@/components/home/Banner"
import HeroSection from "@/components/home/HeroSection"
import SpecialityMenu from "@/components/home/SpecialityMenu"
import TopDoctors from "@/components/home/TopDoctors"
import { useDoctorStore } from "@/store/doctorStore"
import { useEffect } from "react"

const Home = () => {
  const {getAllDoctors} = useDoctorStore();

  useEffect(() => {
    getAllDoctors();
  },[])
  
  return (
    <div>
      <HeroSection/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home