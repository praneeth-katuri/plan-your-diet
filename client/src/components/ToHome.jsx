import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
const ToHome = () => (
  <Link to="/" className="back-home-link">
    <ArrowLeft size={18} className="mr-1" />
    Home
  </Link>
);

export default ToHome;
