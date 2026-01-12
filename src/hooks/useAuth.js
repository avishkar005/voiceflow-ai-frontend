import { useState } from "react";
import { loginApi, registerApi } from "../api/auth.api";
import { useApp } from "../context/AppContext";

export const useAuth = () => {
  const { setUser, setCurrentPage } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 const login = async (email, password) => {
  try {
    setLoading(true);
    setError(null);

    const res = await loginApi({ email, password });

    if (res && res.data) {
      setUser(res.data);
      setCurrentPage("dashboard");
    }

  } catch (err) {
    setError("Invalid credentials");
  } finally {
    setLoading(false);
  }
};


const register = async (name, email, password) => {
  try {
    setLoading(true);
    setError(null);

    const res = await registerApi({ name, email, password });

    // 🔥 FIX: handle successful save even if response is weird
    if (res && res.data) {
      setUser(res.data);
      setCurrentPage("dashboard");
    } else {
      // fallback (backend succeeded but response empty)
      setUser({ name, email });
      setCurrentPage("dashboard");
    }

  } catch (err) {
    console.error("Register error:", err);
    setError("Registration failed");
  } finally {
    setLoading(false);
  }
};


  const logout = () => {
    // ✅ clear session
    localStorage.removeItem("voiceflow_user");
    setUser(null);
    setCurrentPage("auth");
  };

  return { login, register, logout, loading, error };
};
