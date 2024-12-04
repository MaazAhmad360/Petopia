import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Replace this with your actual authentication logic
  const isAuthenticated = !!localStorage.getItem("token"); // Example: Check token in localStorage

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
