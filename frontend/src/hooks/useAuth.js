import React, { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("benevoleToken") || "");

  useEffect(() => {
    // Met à jour le token si il change dans localStorage
    const handleStorageChange = () => {
      setToken(localStorage.getItem("benevoleToken") || "");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (newToken) => {
    localStorage.setItem("benevoleToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("benevoleToken");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
