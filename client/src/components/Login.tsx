import { useState } from 'react'
import axios from 'axios'

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

      const loginUser = async () => {
        const { email, password } = loginData;
    
        const response = await axios.post('http://localhost:4000/auth/login', { email, password });
        console.log(response.data)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.id);
        onLogin(response.data.token);
        
      }
      
      const registerUser = async () => {
        const { name, email, password } = loginData;
        const response = await axios.post('http://localhost:4000/auth/register', { name, email, password });
        toggleRegister()
      }
   
    return (
        <div className="loginInput">
          {isRegister && <input type="text" placeholder="name" value={loginData.name} onChange={(e) => setLoginData({...loginData, name: e.target.value})} />}
          <input type="text" placeholder="email" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
          <input type="password" placeholder="password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
          <button onClick={isRegister ? registerUser : loginUser}>{isRegister ? "Register" : "Login"}</button>
          <p onClick={toggleRegister}>{isRegister ? "Login instead" : "Register instead"}</p>
        </div>
    )
}

export default Login