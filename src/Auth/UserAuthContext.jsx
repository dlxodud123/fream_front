// UserAuth.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// UserAuthContext 생성
export const UserAuthContext = createContext();

// UserAuthProvider 컴포넌트 생성
export const UserAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false); // 추가된 상태
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      axios
        .post("http://192.168.0.13:3001/auth/verifyToken", { token: jwtToken })
        .then((response) => {
          if (response.data.valid) {
            setIsLoggedIn(true);
            console.log("reda:", response.data.userId);
            setUserId(response.data.userId);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("토큰 검증 에러", error);
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsInitialized(true); // 초기화 완료
        });
    } else {
      setIsLoggedIn(false);
      setIsInitialized(true);
    }
  }, [location]);

  const handleLogout = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      axios
        .post(
          "http://localhost:3001/auth/logout",
          {},
          {
            headers: {
              "token-for-blacklist": jwtToken,
            },
          }
        )
        .then((response) => {
          if (response.data === 1) {
            localStorage.removeItem("jwtToken"); // 로그아웃 시 JWT 토큰 제거
            setIsLoggedIn(false);
            setUserId(null);
            navigate("/login");
          } else {
            console.error("로그아웃 에러");
          }
        })
        .catch((error) => {
          console.error("로그아웃 에러", error);
        });
    }
  };

  return (
    <UserAuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, handleLogout, userId, isInitialized }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
