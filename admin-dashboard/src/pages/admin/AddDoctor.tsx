import { FormEvent, useState } from "react"
import uploadAreaIcon  from "../../assets/upload_area.svg"
import { useAdminStore } from "../../store/adminStore"

const AddDoctor = () => {
  const [doctorImage, setDoctorImage] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('General Physician')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const {addDoctor} = useAdminStore();

  const specialities = ["General Physician", "Gastroenterologist", "Neurologist", "Dermatologist", "Pediatrician", "Gynecologist"]

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault()

    const formData = new FormData()
    
    if(doctorImage){
      formData.append('image', doctorImage as File)
    }

    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('experience', experience)
    formData.append('fees', fees)
    formData.append('about', about)
    formData.append('speciality', speciality)
    formData.append('degree', degree)
    formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
    // formData.append('address', JSON.stringify({ line1: address1, line22: address2 }))

    // formData.forEach((value, key) => {
    //   console.log(key, value)
    // })
    
    addDoctor(formData)
  }
  
  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
       
       <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doctorImage">
            <img src={ doctorImage ? URL.createObjectURL(doctorImage) : uploadAreaIcon} alt="doctor Image" className="w-16 bg-gray-100 rounded-full cursor-pointer"/>
          </label>
            <input type="file" id="doctorImage" hidden 
              onChange={(e) => setDoctorImage(e.target.files ? e.target.files[0] : null)} 
            />
            <p>Upload doctor <br/> picture</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input type="text" placeholder="Name" required 
                className="border rounded px-3 py-2"
                onChange={(e) => setName(e.target.value)} value={name}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor email</p>
              <input type="text" placeholder="Name" required 
                className="border rounded px-3 py-2"
                onChange={(e) => setEmail(e.target.value) }value={email}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor password</p>
              <input type="text" placeholder="Name" required 
                className="border rounded px-3 py-2"
                onChange={(e) => setPassword(e.target.value)} value={password}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select name="experience" id="experience" 
                className="border rounded px-3 py-2"
                onChange={(e) => setExperience(e.target.value)} value={experience}
              > 
                {
                  Array.from({ length: 10 }, (_, index) => index + 1).map((quantity, index) => (
                    <option key={index} value={`${quantity}`}>
                      {quantity} Year{quantity > 1 ? "s" : ""}
                    </option>
                  ))
                }
                {/* <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option> */}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input type="number" placeholder="fees" required 
                className="border rounded px-3 py-2"
                onChange={(e) => setFees(e.target.value)} value={fees}
              />
            </div>

          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Specialization</p>
              <select name="specialization" id="specialization" 
                className="border rounded px-3 py-2"
                onChange={(e) => setSpeciality(e.target.value)} value={speciality}
              >
              { 
                  specialities.map((speciality, index) => (
                  <option key={index} value={speciality}>
                    {speciality}
                  </option>
                ))
              }
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input type="text" placeholder="Education" required 
                className="border rounded px-3 py-2"
                onChange={(e) => setDegree(e.target.value)} value={degree}
              />
            </div>
            
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input type="text" placeholder="address 1" required 
                className="border rounded px-3 py-2"
                onChange={(e) => setAddress1(e.target.value)} value={address1}
              />
              <input type="text" placeholder="address 2" required 
                className="border rounded px-3 py-2"
                onChange={(e) => setAddress2(e.target.value)} value={address2}
              />
            </div>

          </div>

        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea name="" id="" placeholder="Write about doctor" rows={5} required 
            className="w-full px-4 pt-2 border rounded"
            onChange={(e) => setAbout(e.target.value)} value={about}
          />
        </div>

        <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">Add Doctor</button>

       </div>
    </form>
  )
}

export default AddDoctor