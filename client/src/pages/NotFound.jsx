import { Link } from "react-router-dom";
import NotFoundImage from "@/assets/404-illustration.svg";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-white">
      <img src={NotFoundImage} alt="404 Not Found" className="w-64 mb-6" />
      <h1 className="text-4xl font-bold text-red-600 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-green-600 text-white px-5 py-3 rounded-md text-sm font-semibold hover:bg-green-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
