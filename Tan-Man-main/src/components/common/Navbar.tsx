import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.div 
            className="mr-2"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 6,
              ease: "easeInOut" 
            }}
          >
            <Brain size={32} className="text-primary-500" />
          </motion.div>
          <span className="font-bold text-2xl bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            Tan-Man
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-primary-500 transition-colors">
            Home
          </Link>
          <Link to="/about" className="font-medium hover:text-primary-500 transition-colors">
            About Us
          </Link>
          
          {user ? (
            <>
              <Link to="/features" className="font-medium hover:text-primary-500 transition-colors">
                Features
              </Link>
              <button 
                onClick={logout} 
                className="btn-outline-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn-outline-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="py-2 font-medium hover:text-primary-500 transition-colors">
              Home
            </Link>
            <Link to="/about" className="py-2 font-medium hover:text-primary-500 transition-colors">
              About Us
            </Link>
            
            {user ? (
              <>
                <Link to="/features" className="py-2 font-medium hover:text-primary-500 transition-colors">
                  Features
                </Link>
                <button 
                  onClick={logout} 
                  className="btn-outline-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn-outline-primary">
                  Sign Up
                </Link>
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;