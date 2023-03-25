import { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
      toast.info("Logged in with local token", {toastId: "localToken"});
    }
  }, []);

  const handleLogin = (token: string) => {
    setToken(token);
  }

  return (
    <div className="App">
      {token ? <Dashboard /> : <Login onLogin={handleLogin} /> }
      <ToastContainer position='bottom-center' hideProgressBar={true} autoClose={5000} />
    </div>
  )
}

export default App
