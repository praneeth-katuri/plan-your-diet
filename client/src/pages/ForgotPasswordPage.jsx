import React from "react";
import "./AuthPages.css";
import ForgotBg from "../assets/images/auth_bg.png";

const ForgotPasswordPage = () => {
  return (
    <section
      className="auth-section"
      style={{ backgroundImage: `url(${ForgotBg})` }}
    >
      <div className="auth-overlay">
        <div className="auth-card">
          <h1>Forgot Password?</h1>
          <p>
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
          <form>
            <input type="email" placeholder="Email Address" required />
            <button type="submit" className="btn btn-primary">
              Send Reset Link
            </button>
            <p className="small-text">
              Remember your password? <a href="#">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
