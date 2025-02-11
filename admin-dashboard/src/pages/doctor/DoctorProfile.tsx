import { useEffect, useState } from "react";
import config from "../../config/config";
import { TDoctor } from "../../types/adminType";
import { useDoctorStore } from "../../store/doctorStore";

const DoctorProfile = () => {
  const { doctorProfile } = useDoctorStore();

  const defaultUserData: TDoctor = {
    _id: '',
    name: '',
    email: '',
    image: '',
    speciality: '',
    degree: '',
    experience: '',
    about: '',
    available: false,
    fees: 0,
    address: { line1: '', line2: '' },
    phone: '',
    slotsBooked: {},
    gender: '',
    role: "doctor",
  };

  const [profileData, setProfileData] = useState<TDoctor>(defaultUserData);
  const [isEdit, setIsEdit] = useState(false);
  // const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const profile = await doctorProfile();
      setProfileData(profile);  
    };
    getProfile();
  }, [doctorProfile]);

  return (
    <div>
      <div className="flex flex-col gap-4 m-5">
        <div>
          <img
            src={profileData?.image}
            alt="Doctor"
            className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
          />
        </div>

        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          {/* Doctor info */}
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {profileData?.name}
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>{profileData?.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {profileData?.experience}
            </button>
          </div>

          {/* Doctor about */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-700 mt-3">
              About:
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {profileData?.about}
            </p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment Fee:{" "}
            <span className="text-gray-800">
              {config.currency}{" "}
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) => setProfileData((prev) => ({...prev, fees: parseFloat(e.target.value),}))}
                  value={profileData?.fees}
                  className="border px-2 py-1 rounded-md"
                />
              ) : (
                profileData?.fees
              )}
            </span>
          </p>

          <div className="flex gap-2 py-2">
            <p>Address:</p>
            <p>
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value }}) )}
                  value={profileData?.address.line1}
                  className="border px-2 py-1 rounded-md"
                />
              ) : (
                profileData?.address.line1
              )}
            </p>
            <p>
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) => setProfileData((prev) => ({...prev, address: {...prev.address, line2: e.target.value,}}))
                  }
                  value={profileData?.address.line2}
                  className="border px-2 py-1 rounded-md"
                />
              ) : (
                profileData?.address.line2
              )}
            </p>
          </div>

          <div className="flex gap-1 pt-2">
            <input
              onChange={() => setProfileData((prev) => ({...prev, available: !prev.available }))}
              checked={profileData?.available}
              type="checkbox"
              id="availability"
            />
            <label htmlFor="availability" className="text-sm">
              Available for appointments
            </label>
          </div>

          {isEdit ? (
            <button
              onClick={() => setIsEdit(false)}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
