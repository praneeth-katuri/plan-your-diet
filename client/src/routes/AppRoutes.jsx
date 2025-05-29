import { Routes, Route } from "react-router-dom";
import Layout from "@/layouts/layout";
import Home from "@/pages/Home";
import FoodFacts from "@/pages/FoodFacts";
import LoginPage from "@/pages/LoginPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import RegisterPage from "@/pages/RegisterPage";
import ProfileSetup from "@/pages/ProfileSetup";
import ProtectedRoute from "./ProtectedRoute";
import DietPlan from "@/pages/DietPlan";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="food-facts" element={<FoodFacts />} />
    </Route>
    <Route
      path="/profile/setup"
      element={
        <ProtectedRoute>
          <ProfileSetup />
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
    <Route path="/login" element={<LoginPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Routes>
);

export default AppRoutes;
