import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/authApi";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (email: string, password: string) => {
    setLoading(true);

    try {
      const res = await login(email, password);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (email: string, password: string) => {
    setLoading(true);

    try {
      await register(email, password);

      const res = await login(email, password);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    registerUser,
    loading,
  };
};