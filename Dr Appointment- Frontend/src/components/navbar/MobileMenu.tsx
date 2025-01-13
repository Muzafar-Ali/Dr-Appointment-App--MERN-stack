import { Dispatch } from "react"
import { assets } from "../../assets/assets"
import { NavLink } from "react-router-dom"

type TMobileMenuProps = {
  showMenu: boolean
  setShowMenu: Dispatch<React.SetStateAction<boolean>>
}

const MobileMenu = ({showMenu, setShowMenu}: TMobileMenuProps) => {
  return (
    <div className={` ${showMenu ? "fixed w-full": "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
      <div className="flex items-center justify-between px-5 py-6">
        <img src={assets.logo} alt="logo" className="w-[50px] h-[40px]"/>
        <img src={assets.cross_icon} alt="icon" onClick={() => setShowMenu(false)} className="w-7"/>
      </div>
      <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
        <NavLink to='/' onClick={() => setShowMenu(false)} >
          <p className="px-4 py-2 rounded inline-block">HOME</p>
        </NavLink>
        <NavLink to='/doctors' onClick={() => setShowMenu(false)}>
          <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
        </NavLink>
        <NavLink to='/about' onClick={() => setShowMenu(false)}>
          <p className="px-4 py-2 rounded inline-block">ABOUT</p>
        </NavLink>
        <NavLink to='/contact' onClick={() => setShowMenu(false)}>
          <p className="px-4 py-2 rounded inline-block">CONTACT</p>
        </NavLink>
      </ul>
    </div>
  )
}

export default MobileMenu