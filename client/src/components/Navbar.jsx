import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-green-600 shadow-md sticky w-full z-50 top-0 text-white">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-20 w-20" />
            <span className="text-2xl font-bold">PlanYourDiet</span>
          </div>

          {/* Desktop Navigation: All Right-Aligned */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/food-facts" className="hover:text-gray-200">
              Food Facts
            </Link>
            <Link
              to="/login"
              className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100 font-semibold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-400 text-green-900 px-4 py-2 rounded-md hover:bg-yellow-300 font-semibold"
            >
              Register
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-600 px-6 py-4 text-white space-y-3">
          <Link to="/" className="block hover:text-gray-200">
            Home
          </Link>
          <Link to="/food-facts" className="block hover:text-gray-200">
            Food Facts
          </Link>
          <Link
            to="/login"
            className="block bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block bg-yellow-400 text-green-900 px-4 py-2 rounded-md hover:bg-yellow-300"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
