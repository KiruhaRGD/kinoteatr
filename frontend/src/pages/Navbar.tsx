import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex gap-6">
        <Link 
          to="/" 
          className={`hover:text-blue-400 ${location.pathname === '/' ? 'text-blue-400 font-bold' : ''}`}
        >
            Главная
        </Link>
        <Link 
          to="/admin" 
          className={`hover:text-blue-400 ${location.pathname === '/admin' ? 'text-blue-400 font-bold' : ''}`}
        >
            admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;