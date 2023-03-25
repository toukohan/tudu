import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify';
import axios from '../axiosInstance'

export interface LoginProps {
    onLogin: (token: string) => void;
}

const Login = ({onLogin}: LoginProps) => {
    const [isRegister, setIsRegister] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        name: ''
      });

      const toggleRegister = () => {
        setIsRegister(!isRegister);
        }

      const loginUser = async (e: FormEvent) => {
        e.preventDefault();
        const { email, password } = loginData;
        try {
          const response = await axios.post('/auth/login', { email, password });
          console.log(response.data)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', response.data.id);
          onLogin(response.data.token);
          
        } catch (error: any) {
          if(error.response && error.response.status === 401) {
            toast.warning("Invalid email or password.");
          } else {
            toast.error("Something went wrong. Please try again later.");
          }
        }
        
      }
      
      const registerUser = async (e: FormEvent) => {
        e.preventDefault();
        const { name, email, password } = loginData;
        try {
          const response = await axios.post('/auth/register', { name, email, password });
          if(response.status === 201) {
            toast.success("User registered successfully. You can login now.");
          }
          toggleRegister()
        } catch (error: any) {
          if(error.response && error.response.status === 400) {
            toast.warning("Email already registered.");
          } else {
            toast.error("Something went wrong. Please try again later.");
          }
        }
      }
   
    return (
        <div className="loginInput">
          <form onSubmit={isRegister ? registerUser : loginUser}>

          {isRegister && <input type="text" placeholder="name" value={loginData.name} onChange={(e) => setLoginData({...loginData, name: e.target.value})} />}
          <input type="text" placeholder="email" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
          <input type="password" placeholder="password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
          <button type="submit">{isRegister ? "Register" : "Login"}</button>
          </form>
          <p onClick={toggleRegister}>{isRegister ? "Login instead" : "Register instead"}</p>
        </div>
    )
}

export default Login