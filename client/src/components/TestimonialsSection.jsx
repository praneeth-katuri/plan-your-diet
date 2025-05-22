import React from "react";
import { Smile, Heart, Star } from "lucide-react";
import "./TestimonialsSection.css";

const TestimonialsSection = () => {
  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonial-slider">
        <div className="testimonial-card">
          <Smile size={48} />
          <p>
            "I've lost 10 kg in 3 months thanks to PlanYourDiet's meal plans. It
            fits into my daily routine perfectly."
          </p>
          <h4>Ramesh, Bangalore</h4>
        </div>
        <div className="testimonial-card">
          <Heart size={48} />
          <p>
            "The seasonal food tips are life-changing. My skin and health have
            never been better."
          </p>
          <h4>Anjali, Hyderabad</h4>
        </div>
        <div className="testimonial-card">
          <Star size={48} />
          <p>
            "As someone with a busy job, their easy recipes have made my healthy
            eating goals possible."
          </p>
          <h4>Vikram, Chennai</h4>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
