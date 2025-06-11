import { Mail, Phone, MapPin } from "lucide-react";
import ContactBg from "../assets/images/auth_bg.avif"; // Optional background

const ContactUs = () => {
  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${ContactBg})` }}
    >
      <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-xl w-full max-w-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-2 font-[Poppins]">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-6">
          We'd love to hear from you! Send us a message.
        </p>

        {/* Contact Form */}
        <form className="space-y-4 text-left">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="mt-8 text-sm text-left space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail size={18} /> <span>support@planyourdiet.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} /> <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} /> <span>Hyderabad, India</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
