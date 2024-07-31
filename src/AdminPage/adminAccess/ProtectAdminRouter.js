import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./adminAccess";

const ProtectedRoute = () => {
  const { successAdmin } = useAuth();

  return successAdmin ? <Outlet /> : <Outlet />;
  // <Navigate to="/" />
};

export default ProtectedRoute;
