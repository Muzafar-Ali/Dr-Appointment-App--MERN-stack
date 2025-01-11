import Banner from "@/components/home/Banner"
import HeroSection from "@/components/home/HeroSection"
import SpecialityMenu from "@/components/home/SpecialityMenu"
import TopDoctors from "@/components/home/TopDoctors"

const Home = () => {
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