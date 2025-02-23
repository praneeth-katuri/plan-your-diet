import React from "react";
import "./AuthPages.css";
import LoginBg from "../assets/images/auth_bg.png";

const LoginPage = () => {
  return (
    <section
      className="auth-section"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="auth-overlay">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p>Log in to continue your healthy journey with PlanYourDiet.</p>
          <form>
            <input type="email" placeholder="Email Address" required />
            <input type="password" placeholder="Password" required />

            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <p className="forgot-link">
              <a href="#">Forgot Password?</a>
            </p>
            <p className="small-text">
              Don't have an account? <a href="#">Register here</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
