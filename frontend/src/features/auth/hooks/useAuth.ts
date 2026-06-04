import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/authApi";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await login(email, password);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      await register(email, password);

      const res = await login(email, password);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard", { replace: true });
    } catch {
      setError("Could not create account");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return {
    loginUser,
    registerUser,
    logout,
    loading,
    error,
  };
};