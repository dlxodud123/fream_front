import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminAccess, setAdminAccess] = useState(true);
  const [successAdmin, setSuccessAdmin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        try {
          const response = await axios.post(
            "/api/adminPage/loginCheck",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            setAdminAccess(true);
            setSuccessAdmin(true);
          } else {
            // setAdminAccess(false);
            // setSuccessAdmin(false);
          }
        } catch (error) {
          // setAdminAccess(false);
          // setSuccessAdmin(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const logout = async () => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        await axios.post(
          "/api/adminPage/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Failed to logout", error);
      }
      localStorage.removeItem("adminToken");
      setAdminAccess(false);
      setSuccessAdmin(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        adminAccess,
        setAdminAccess,
        successAdmin,
        setSuccessAdmin,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
