import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Configurator from './pages/Configurator'; 
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/configurator" element={<Configurator />} /> {/* <-- Use the component here */}
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;