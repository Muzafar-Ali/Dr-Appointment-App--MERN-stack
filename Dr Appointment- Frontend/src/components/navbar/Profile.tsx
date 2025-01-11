import { assets } from "@/assets/assets";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const [isOPen, setIsOPen] = useState(false)
  console.log(isOPen);
  
  return (
    <DropdownMenu open={isOPen} onOpenChange={setIsOPen}>
      <DropdownMenuTrigger 
        asChild 
        onMouseEnter={() => setIsOPen(true)}
        onMouseLeave={() => setIsOPen(false)}
        className="cursor-pointer duration-300"
      >
      <div className="flex items-center gap-2">
        <img src={assets.profile_pic} className="w-[40px] h-[40px] rounded-full" alt="profile"/>
        <img src={assets.dropdown_icon} className="w-2.5" alt="" />
      </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute top-5 -right-8">
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={"/profile"} className="flex items-center gap-2">
            <p>Profile</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile