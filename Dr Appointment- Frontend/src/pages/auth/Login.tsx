import { useUserStore } from "@/store/userStore";
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {loading, registerUser, login} = useUserStore();

  const [state, setState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  
  const onSubmoitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === 'Sign Up') {    
      const formData =  new FormData();
      
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);

      const registeredUser = await registerUser(formData);
      if(registeredUser) {
        navigate('/login');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
      }
    } 

    if(state === 'Login') {      
      const formData =  new FormData();
      
      formData.append('email', email);
      formData.append('password', password);

      const loggedInUser = await login({email, password});
      if(loggedInUser) {
        navigate('/');
      }
    }

  }
 
  return (
    <form onSubmit={onSubmoitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border  rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'Sign up' : 'Login '} to book appointment</p>
        { state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input 
              type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input 
            type="email" placeholder="Enter your email" value={email} required
            onChange={(e) => setEmail(e.target.value)} 
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input 
            type="password" placeholder="Enter your password" value={password} required
            minLength={6}
            onChange={(e) => setPassword(e.target.value)} 
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        { state === 'Sign Up' && (
          <div className="w-full">
            <p>confirm Password</p>
            <input 
              type="password" placeholder="confirm your password" value={confirmPassword} required
              minLength={6}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>
        )}
        { loading ? (
          <button  type="submit" disabled
            className="bg-primary_base text-white w-full py-2 rounded-md text-base"
          >
            Please Wait  <img width={20} height={20} alt='' className='inline-block bg-transparent' src="/spinner.svg" />
          </button>
        ) : (
          <button  type="submit"
            className="bg-primary_base text-white w-full py-2 rounded-md text-base"
          >
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>
        )}
        {
          state === 'Sign Up' 
          ? <p className="text-base">Already have an account? <span className="text-primary_base underline cursor-pointer" onClick={() => setState('Login')}>Login here</span></p>
          : 
          <p className="text-base">Create a new account? <span className="text-primary_base underline cursor-pointer" onClick={() => setState('Sign Up')}>Click here</span></p>
        }
      </div>

    </form>
  )
}

export default Login