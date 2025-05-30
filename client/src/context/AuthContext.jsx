import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../api/axios";
import { setupInterceptors } from "../api/axiosInterceptor";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = useCallback(async (email, password) => {
    const res = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    const token = res.data.accessToken;
    const userData = res.data.user;
    setAccessToken(token);
    setUser(userData);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("hasSession", "true");
    setAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      setAccessToken(null);
      setUser(null);
      setAuthenticated(false);
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("hasSession");
    } catch (err) {
      console.warn("Logout request failed:", err.message);
    }
  }, []);

  // token refresh on page reload
  useEffect(() => {
    const tryRefresh = async () => {
      const hasSession = localStorage.getItem("hasSession") === "true";
      if (!hasSession) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const token = res.data.accessToken;
        const userData = res.data.user;
        setAccessToken(token);
        setUser(userData);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthenticated(true);
        console.log("Token refreshed and set.");
      } catch (err) {
        console.warn("Token refresh failed", err);
        setAuthenticated(false);
        setUser(null);
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
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
