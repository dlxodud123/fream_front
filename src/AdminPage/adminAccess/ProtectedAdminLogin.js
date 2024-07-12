import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./adminAccess";

const ProtectedAdminLogin = () => {
  const { adminAccess } = useAuth();

  return adminAccess ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedAdminLogin;
