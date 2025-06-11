import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useAuth } from "@/context/AuthContext";

// 🔃 Lazy-loaded route components
const Layout = lazy(() => import("@/layouts/layout"));
const Home = lazy(() => import("@/pages/Home"));
const FoodFacts = lazy(() => import("@/pages/FoodFacts"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Protected content
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const DietPlan = lazy(() => import("@/components/DietPlan"));
const ProfileEdit = lazy(() => import("@/components/ProfileEdit"));

const AppRoutes = () => {
  const { isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Suspense
      fallback={
        <div className="text-center p-6 text-muted-foreground">Loading...</div>
      }
    >
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
    </Suspense>
  );
};

export default AppRoutes;
