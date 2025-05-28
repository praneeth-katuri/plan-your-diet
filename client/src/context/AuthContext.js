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

  const navigate = useNavigate();

  // --- login function
  const login = useCallback(
    async (email, password) => {
      const res = await api.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      const token = res.data.accessToken;
      setAccessToken(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthenticated(true);
      navigate("/dashboard");
    },
    [navigate]
  );

  // --- logout function
  const logout = useCallback(() => {
    api.post("/logout", {}, { withCredentials: true });
    setAccessToken(null);
    setAuthenticated(false);
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  }, [navigate]);

  // --- silent refresh on first app load
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await api.post(
          "/refresh-token",
          {},
          { withCredentials: true }
        );
        const token = res.data.accessToken;
        setAccessToken(token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
        navigate("/login");
      }
    };

    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- attach axios interceptor
  useEffect(() => {
    setupInterceptors(setAccessToken, logout);
  }, [setAccessToken, logout]);

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
