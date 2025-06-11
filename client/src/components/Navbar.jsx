import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import logo from "../assets/logo.avif";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  const commonLinks = [
    { to: "/", label: "Home" },
    { to: "/food-facts", label: "Food Facts" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-green-600/80 backdrop-blur-md shadow-md sticky top-0 w-full z-50 text-white">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="PlanYourDiet Logo"
              className="h-14 w-14 md:h-20 md:w-20"
            />
            <span className="text-2xl font-bold tracking-wide">
              PlanYourDiet
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {commonLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`hover:text-gray-100 transition duration-150 ease-in-out border-b-2 ${
                  isActive(to) ? "border-white" : "border-transparent"
                }`}
              >
                {label}
              </Link>
            ))}

            {isAuthenticated && (
              <Link
                to="/diet"
                className={`hover:text-gray-100 transition duration-150 ease-in-out border-b-2 ${
                  isActive("/diet") ? "border-white" : "border-transparent"
                }`}
              >
                Diet
              </Link>
            )}

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-400 text-green-900 px-4 py-2 rounded-md hover:bg-yellow-300 transition font-semibold"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative group">
                <div className="cursor-pointer p-2 rounded-full bg-gray-200 text-green-600">
                  <User className="w-6 h-6" />
                </div>

                {/* Dropdown */}
                <div
                  className="absolute right-0 mt-4 w-44 bg-white text-green-700 rounded-xl shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50"
                  role="menu"
                >
                  <div className="absolute -top-2 right-5 w-3 h-3 bg-white rotate-45 z-40" />
                  <Link
                    to="/profile/edit"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm rounded-md"
                    role="menuitem"
                  >
                    Update Profile
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full text-left text-red-500 px-4 py-2 hover:bg-gray-100 text-sm rounded-md"
                    role="menuitem"
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
              aria-expanded={menuOpen}
              type="button"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-600 px-6 py-4 text-white space-y-3 rounded-b-xl shadow-lg border-t border-white/10">
          {commonLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`block hover:text-gray-100 transition ${
                isActive(to) ? "underline" : ""
              }`}
            >
              {label}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <Link
                to="/profile/edit"
                onClick={() => setMenuOpen(false)}
                className={`block hover:text-gray-100 transition ${
                  isActive("/profile/edit") ? "underline" : ""
                }`}
              >
                Update Profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 rounded-md bg-red-100 text-red-800 hover:bg-red-200 transition font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100 transition font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block bg-yellow-400 text-green-900 px-4 py-2 rounded-md hover:bg-yellow-300 transition font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
