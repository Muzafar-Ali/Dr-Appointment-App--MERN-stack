import { FormEvent, useState } from "react"
import { useAdminStore } from "../store/adminStore"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [state, setState] = useState<string | undefined>("admin")
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const {login, loading} = useAdminStore();
  
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({email, password})  
  }

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto"><span className="text-primary">{state}</span> Login</p>
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required 
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required 
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {
          loading ? (
            <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">Loading...</button>
          ) : (
            <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
          )
        }
          
        {
          state === "Admin" ? (
            <p className="text-center w-full mt-2">Are you a doctor? <span className="text-primary text-base cursor-pointer underline" onClick={() => setState("Doctor")}>Login as Doctor</span></p>
          ) : (
            <p className="text-center w-full mt-2">Are you an admin? <span className="text-primary text-base cursor-pointer underline" onClick={() => setState("Admin")}>Login as Admin</span></p>
          )
        }
      </div>
    </form>
  )
}

export default Login