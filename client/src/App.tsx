import { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  const handleLogin = (token: string) => {
    setToken(token);
  }

  return (
    <div className="App">
      {token ? <Dashboard /> : <Login onLogin={handleLogin} /> }
    </div>
  )
}

export default App
