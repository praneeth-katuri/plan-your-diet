import { Utensils, CheckCircle, Leaf } from "lucide-react";
import "./WhyChooseSection.css";

const WhyChooseSection = () => {
  return (
    <section className="why-choose">
      <h2>Why Choose PlanYourDiet?</h2>
      <div className="features">
        <div className="feature">
          <Utensils size={48} />
          <h3>Personalized Meal Plans</h3>
          <p>
            Get meal plans tailored to your goals, preferences, and lifestyle.
          </p>
        </div>
        <div className="feature">
          <CheckCircle size={48} />
          <h3>Expert-Approved Food Tips</h3>
          <p>
            Access food guides and diet tips curated by certified nutritionists.
          </p>
        </div>
        <div className="feature">
          <Leaf size={48} />
          <h3>Seasonal Fruit Guides</h3>
          <p>Discover the best seasonal fruits to enrich your daily meals.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
