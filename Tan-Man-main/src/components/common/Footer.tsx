import { Link } from 'react-router-dom';
import { Brain, Heart, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Brain size={24} className="text-primary-500 mr-2" />
              <span className="font-bold text-xl bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Tan-Man
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Your mental wellness companion, always by your side on your journey to better mental health.
            </p>
            <div className="flex items-center text-gray-600">
              <Heart size={16} className="text-primary-500 mr-1" />
              <span>Made with care for your mental wellbeing</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Subscription
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features/stress-test" className="text-gray-600 hover:text-primary-500 transition-colors">
                  PSS Stress Test
                </Link>
              </li>
              <li>
                <Link to="/features/virtual-nature" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Virtual Nature Escape
                </Link>
              </li>
              <li>
                <Link to="/features/mood-tracking" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Mood Tracking
                </Link>
              </li>
              <li>
                <Link to="/features/meditation" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Meditation Timer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="text-primary-500 mr-2" />
                <a href="mailto:support@tan-man.com" className="text-gray-600 hover:text-primary-500 transition-colors">
                  support@tan-man.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="text-primary-500 mr-2" />
                <span className="text-gray-600">+91 1234567890</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/features/emergency" className="btn-primary">
                Emergency Support
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Tan-Man. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;