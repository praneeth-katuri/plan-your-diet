import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import HeroImg from "../assets/images/hero_img.png";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Eat Smart. Live Strong.</h1>
          <p>
            Your personalized diet companion to transform the way you eat, feel,
            and live every day.
          </p>
          <ul className="hero-highlights">
            <li>✓ 100% Personalized Meal Plans</li>
            <li>✓ Expert-Approved Diet & Food Guides</li>
            <li>✓ Seasonal Food Recommendations</li>
          </ul>
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/login")}
            >
              Explore Meal Plans
            </button>
          </div>
          <p className="hero-small-note">
            Join 50,000+ users who trust PlanYourDiet for a healthier lifestyle.
          </p>
        </div>
        <div className="hero-image">
          <img src={HeroImg} alt="Healthy Food" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
