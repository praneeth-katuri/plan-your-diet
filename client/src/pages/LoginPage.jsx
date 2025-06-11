import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ToHome from "@/components/ToHome";
import { Eye, EyeOff } from "lucide-react";
import "./AuthPages.css";
import LoginBg from "../assets/images/auth_bg.avif";

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/s");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section
      className="auth-section"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <ToHome />
      <div className="auth-overlay">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p>Log in to continue your healthy journey with PlanYourDiet.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="mb-6"
              required
            />

            {/* Password Field with Show/Hide */}
            <div className="input-wrapper mb-6">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <div
                className="toggle-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>

            <p className="forgot-link">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p className="small-text">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
