import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Connects to the backend auth registration route 
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      
      // Store the JWT token and user info securely
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/configurator'); // Redirect directly to the 3D experience
      
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* Cinematic animated background gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-900/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-gray-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-light tracking-widest text-center text-white uppercase mb-8">
          Request <span className="font-bold">Access</span>
        </h2>

        {error && <div className="mb-4 text-red-500 text-sm text-center tracking-wider">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
              required 
            />
          </div>

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
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs tracking-widest">
            Already registered? <Link to="/login" className="text-white hover:underline">Return to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;