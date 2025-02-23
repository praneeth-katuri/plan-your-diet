import { useState } from "react";
import "./AuthPages.css";
import RegisterBg from "../assets/images/auth_bg.png";

const RegisterPage = () => {
  const [role, setRole] = useState("member");

  return (
    <section
      className="auth-section"
      style={{ backgroundImage: `url(${RegisterBg})` }}
    >
      <div className="auth-overlay">
        <div className="auth-card">
          <h1>Create Your Account</h1>

          {/* Role toggle */}
          <div className="role-toggle">
            <span
              className={role === "member" ? "active" : ""}
              onClick={() => setRole("member")}
            >
              Member
            </span>
            <span className="separator">|</span>
            <span
              className={role === "nutritionist" ? "active" : ""}
              onClick={() => setRole("nutritionist")}
            >
              Nutritionist
            </span>
          </div>

          <form>
            <input type="text" name="name" placeholder="Full Name" required />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password (min 8 chars)"
              minLength="8"
              required
            />

            {role === "member" && (
              <>
                <input
                  type="number"
                  name="age"
                  placeholder="Age (in years)"
                  required
                />
                <input
                  type="number"
                  name="height"
                  placeholder="Height (cm)"
                  required
                />
                <input
                  type="number"
                  name="weight"
                  placeholder="Weight (kg)"
                  required
                />
              </>
            )}

            <button type="submit" className="btn btn-primary">
              Register as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
            <p className="small-text">
              Already have an account? <a href="#">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
