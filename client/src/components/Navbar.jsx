import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 md:px-16 bg-transparent backdrop-blur-sm text-white">
      <div className="text-2xl font-bold tracking-widest uppercase">
        <Link to="/">Luxe<span className="font-light">Drive</span></Link>
      </div>
      <div className="flex gap-8 text-sm uppercase tracking-widest font-medium">
        <Link to="/configurator" className="hover:text-gray-400 transition-colors duration-300">Configurator</Link>
        <Link to="/login" className="hover:text-gray-400 transition-colors duration-300">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;