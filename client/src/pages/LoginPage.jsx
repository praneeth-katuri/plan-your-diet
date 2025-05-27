import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthPages.css";
import LoginBg from "../assets/images/auth_bg.png";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <section
      className="auth-section"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
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
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />

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
