import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Adapté à votre hook d'authentification

const ProtectedRoute = () => {
  const { token } = useAuth();
  console.log("ProtectedRoute token:", token); // Pour voir ! 
  return token ? <Outlet /> : <Navigate to="/connexion" />;
};

export default ProtectedRoute;
