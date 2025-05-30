import { Link } from "react-router-dom";
import "./AuthPages.css";
import ForgotBg from "../assets/images/auth_bg.png";

const ForgotPasswordPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

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
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email Address" required />
            <button type="submit" className="btn btn-primary">
              Send Reset Link
            </button>
            <p className="small-text">
              Remember your password? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
