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
  const navigate = useNavigate();

  // --- login function wrapped in useCallback
  const login = useCallback(
    async (email, password) => {
      const res = await api.post("/login", { email, password });
      setAccessToken(res.data.accessToken);
      api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
      navigate("/dashboard");
    },
    [navigate]
  );

  // --- logout function wrapped in useCallback
  const logout = useCallback(() => {
    setAccessToken(null);
    delete api.defaults.headers.Authorization;
    navigate("/login");
  }, [navigate]);

  // --- Setup Axios interceptor with correct dependencies
  useEffect(() => {
    setupInterceptors(setAccessToken, logout);
  }, [setAccessToken, logout]);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
