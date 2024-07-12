import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminAccess, setAdminAccess] = useState(false);
  const [successAdmin, setSuccessAdmin] = useState(true);

  return (
    <AuthContext.Provider
      value={{ adminAccess, setAdminAccess, successAdmin, setSuccessAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
