import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";
import "./AuthPages.css";
import RegisterBg from "../assets/images/auth_bg.png";

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", formData);
      console.log("success", res.data);
    } catch (error) {
      console.log("Error:", error.response?.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (isAuthenticated) return <Navigate to="/diet" />;

  return (
    <section
      className="auth-section"
      style={{ backgroundImage: `url(${RegisterBg})` }}
    >
      <div className="auth-overlay">
        <div className="auth-card">
          <h1>Create Your Account</h1>

          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" required />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password (min 8 chars)"
              onChange={handleChange}
              minLength="8"
              required
            />

            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <p className="small-text">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
