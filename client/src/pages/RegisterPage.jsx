import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schema/profile.schema";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";
import { Eye, EyeOff } from "lucide-react";
import "./AuthPages.css";
import RegisterBg from "../assets/images/auth_bg.png";

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [registered, setRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/register", data);
      setRegistered(true);
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
      if (err.status === 409) setUserExist(true);
    } finally {
      reset();
    }
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
          {userExist && (
            <p className="bg-red-400 rounded-xs text-amber-50">
              User already exists, please login!!
            </p>
          )}

          {registered && (
            <p className="bg-green-400 rounded-xs text-amber-50">
              Succesfully registered, please login!!
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="mb-4"
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}

            {/* Email */}
            <input
              type="text"
              className="mb-4"
              placeholder="Email Address"
              {...register("email")}
            />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}

            {/* Password */}
            <div className="input-wrapper mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 8 chars)"
                {...register("password")}
              />
              <div
                className="toggle-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}

            {/* Confirm Password */}
            <div className="input-wrapper mb-4">
              <input
                type={showVerifyPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("verifyPassword")}
              />
              <div
                className="toggle-icon"
                onClick={() => setShowVerifyPassword((prev) => !prev)}
              >
                {showVerifyPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.verifyPassword && (
              <p className="error-text">{errors.verifyPassword.message}</p>
            )}

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
