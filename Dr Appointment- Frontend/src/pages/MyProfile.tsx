import { useUserStore } from "@/store/userStore"
import { TUser } from "@/types/userType";
import { useEffect, useState } from "react"

const MyProfile = () => {

  const {user, getUserProfile, updateUserProfile} = useUserStore();

  const defaultUserData: TUser = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
    },
    gender: '',
    dob: '',
    image: '',
    role: 'user',
  };
  
  const [userData, setUserData] = useState<TUser>(defaultUserData)
  const [isEditing, setIsEditing] = useState(false)
  const [image, setImage] = useState<File | null>()

  console.log('userData', userData);
  
  const updateUserProfileHandler = async () => {
    try {
      const formData = new FormData();

      formData.append('name', userData?.name);
      formData.append('phone', userData?.phone); 
      formData.append('gender', userData?.gender);
      formData.append('dob', userData?.dob);
      formData.append('address', JSON.stringify({ line1: userData.address.line1, line2: userData.address.line2 }))

      image && formData.append('image', image);
      
      updateUserProfile(formData);

      setIsEditing(false);
      setImage(null);
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    const getProfile = async () => {
      const profile = await getUserProfile();     
      setUserData(profile);
    }
    getProfile();
  },[])

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      { isEditing ?
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img src={ image ? URL.createObjectURL(image) : userData.image } alt="" className="w-36 rounded opacity-75"/>
          </div>
          <input onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} type="file" id="image" hidden/>
        </label> 
        : <img src={userData?.image} alt="profile image" className="w-36 rounded-lg shadow-md" />
      }
      { isEditing
        ?<input 
          type="text" value={userData?.name} 
          onChange={(e) => setUserData((prev) => ({...prev, name: e.target.value}))}
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
        />
        :<p className="font-medium text-3xl text-neutral-800 mt-4">{userData?.name}</p>
      }
      <hr className="bg-zinc-400 h-[1px] border-none"/>

      <div>
        <p className=" text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData?.email}</p>
          <p className="font-medium">Phone:</p>
          { isEditing
            ? <input 
              type="text" value={userData?.phone} 
              onChange={(e) => setUserData((prev) => ({...prev, phone: e.target.  value}))}
              className="bg-gray-100 max-w-52"
            />
            : <p className="text-blue-400">{userData?.phone}</p>
          }
          <p className="font-medium">Address:</p>
          { isEditing
            ? <p>
              <input 
                type="text" value={userData?.address.line1}
                onChange={(e) => setUserData((prev) => ({...prev, address: {...prev.address, line1: e.target.value}}))} 
                className="bg-gray-50"
              />
              <br />
              <input 
                type="text" value={userData?.address.line2}
                onChange={(e) => setUserData((prev) => ({...prev, address: {...prev.address, line2: e.target.value}}))} 
                className="bg-gray-50"
              />
              
            </p>
            : <p className="text-gray-500">
              {userData?.address.line1}
              <br />
              {userData?.address.line2}
            </p>
          }
        </div>
      </div>
      <div>
        <p className=" text-neutral-500 underline mt-3">BASIC INFROMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          { isEditing 
            ? <select value={userData?.gender} onChange={(e) => setUserData((prev) => ({...prev, gender: e.target.value}))} className="max-w-20 bg-gray-100">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className="text-gray-400">{userData?.gender}</p>
          }
          <p className="font-medium">date of Birth:</p>
          { isEditing
            ? <input type="date" value={userData?.dob === "Not Selected" ? "" : userData.dob} onChange={(e) => setUserData((prev) => ({...prev, dob: e.target.value}))} className="max-w-28 bg-gray-100"/>
            : <p className="text-gray-400">{userData?.dob}</p>
          }
        </div>
      </div>
      <div>
        { isEditing 
            ? <button onClick={updateUserProfileHandler} className="border border-primary_base px-8 py-2 rounded-full hover:bg-primary_base hover:text-white transition-all duration-300">Save information</button>
            : <button onClick={() => setIsEditing(true)} className="border border-primary_base px-8 py-2 rounded-full hover:bg-primary_base hover:text-white transition-all duration-300">Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile