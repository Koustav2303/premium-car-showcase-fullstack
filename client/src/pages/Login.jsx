import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Connects to the backend auth route we created in Step 14 
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      
      // Store the JWT token securely
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/configurator');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* Cinematic animated background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-900/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-light tracking-widest text-center text-white uppercase mb-8">
          Access <span className="font-bold">Portal</span>
        </h2>

        {error && <div className="mb-4 text-red-500 text-sm text-center tracking-wider">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
              required 
            />
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 py-4 bg-white text-black uppercase tracking-widest text-sm font-bold hover:bg-gray-200 transition-colors rounded-sm"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs tracking-widest">
            New user? <Link to="/register" className="text-white hover:underline">Request Access</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;