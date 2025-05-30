import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <nav className="bg-green-600 shadow-md sticky w-full z-50 top-0 text-white">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-20 w-20" />
            <span className="text-2xl font-bold">PlanYourDiet</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/food-facts" className="hover:text-gray-200">
              Food Facts
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/diet"
                  className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100 font-semibold"
                >
                  Diet
                </Link>
              </>
            )}

            {!isAuthenticated && (
              <>
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
              </>
            )}

            {isAuthenticated && (
              <div className="relative group">
                {/* Icon as hover trigger */}
                <div className="cursor-pointer p-2 rounded-full bg-gray-200 text-green-600">
                  <User className="w-6 h-6" />
                </div>

                {/* Dropdown stays open while hovering */}
                <div className="absolute right-0 mt-4 w-44 bg-white text-green-700 rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-150 z-50">
                  <Link
                    to="/profile/edit"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm rounded-md"
                  >
                    Update Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-red-400 text-left px-4 py-2 rounded-md hover:bg-gray-100 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
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
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-200"
          >
            Home
          </Link>
          <Link
            to="/food-facts"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-200"
          >
            Food Facts
          </Link>

          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100 font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={setMenuOpen(false)}
                className="block bg-yellow-400 text-green-900 px-4 py-2 rounded-md hover:bg-yellow-300 font-semibold"
              >
                Register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link
                to="/update-profile"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-gray-200"
              >
                Update Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 rounded-md bg-red-100 text-red-800 hover:bg-red-200 font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
