import styles from "./Footer.module.css";
import Pill from "../assets/images/medicine.png";
import Yoga from "../assets/images/exercise.png";
import Lemon from "../assets/images/orange.png";
import Fruits from "../assets/images/fruits.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react"; // Lucide icons

function Footer() {
  const location = useLocation();
  const showFeatures =
    location.pathname === "/" || location.pathname === "/contact";
  return (
    <footer className={styles.footer}>
      {/* Features Section */}
      {showFeatures && (
        <div className={styles.features}>
          <div className={styles.feature}>
            <img src={Pill} alt="Best Option" />
            <h3>The Best Option</h3>
            <p>
              Smart diet choices designed by top nutritionists for your
              well-being.
            </p>
          </div>
          <div className={styles.feature}>
            <img src={Yoga} alt="Program Exercises" />
            <h3>Program Exercises</h3>
            <p>
              Stay active and healthy with personalized exercise programs
              integrated with your meal plans.
            </p>
          </div>
          <div className={styles.feature}>
            <img src={Fruits} alt="Why Fruits?" />
            <h3>Why Fruits?</h3>
            <p>
              Learn how seasonal fruits boost your immunity, digestion, and
              overall health naturally.
            </p>
          </div>
          <div className={styles.feature}>
            <img src={Lemon} alt="Healthy Eating" />
            <h3>Healthy Eating</h3>
            <p>
              Explore healthy eating habits, meal timings, and food combinations
              to live your best life.
            </p>
          </div>
        </div>
      )}

      {/* Actual Footer Content */}
      <div className={styles.footerContent}>
        <div className={styles.container}>
          <div className={styles.footerCol}>
            <h4>About Us</h4>
            <p>
              PlanYourDiet is your personal nutrition companion, bringing
              expert-approved meal plans, food tips, and wellness insights right
              to your fingertips.
            </p>
          </div>
          <div className={styles.footerCol}>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link href="/diet">Meal Plans</Link>
              </li>
              <li>
                <Link to="/food-facts">Food Tips</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Contact</h4>
            <p>
              <Mail size={16} /> support@planyourdiet.com
            </p>
            <p>
              <Phone size={16} /> +91 98765 43210
            </p>
            <div className={styles.socialIcons}>
              <a href="#">
                <Facebook size={24} />
              </a>
              <a href="#">
                <Instagram size={24} />
              </a>
              <a href="#">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyRight}>
        <span>
          © {new Date().getFullYear()} PlanYourDiet. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
