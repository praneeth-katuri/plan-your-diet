import { useAuth } from "@/context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Layout from "@/layouts/layout";
import Home from "@/pages/Home";
import FoodFacts from "@/pages/FoodFacts";
import LoginPage from "@/pages/LoginPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import RegisterPage from "@/pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import DietPlan from "@/components/DietPlan";
import ProfileEdit from "@/components/ProfileEdit";
import ContactUs from "@/pages/ContactUs";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  const { isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="food-facts" element={<FoodFacts />} />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diet"
          element={
            <ProtectedRoute>
              <DietPlan />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<ContactUs />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
