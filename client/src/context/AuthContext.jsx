import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setupInterceptors } from "../api/axiosInterceptor";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const login = useCallback(async (email, password) => {
    const res = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    const token = res.data.accessToken;
    setAccessToken(token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    api.post("/auth/logout", {}, { withCredentials: true });
    setAccessToken(null);
    setAuthenticated(false);
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  }, [navigate]);

  // token refresh on page
  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await api.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const token = res.data.accessToken;
        setAccessToken(token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthenticated(true);
        console.log("Token refreshed and set.");
      } catch (err) {
        console.warn("Token refresh failed", err);
        setAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    tryRefresh();
  }, []);

  // Attach interceptors
  useEffect(() => {
    setupInterceptors(setAccessToken, logout);
  }, [setAccessToken, logout]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
