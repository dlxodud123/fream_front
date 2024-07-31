import { Cookie } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 URL에서 'jwtToken' 쿼리 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const jwtToken = urlParams.get('jwtToken');
    const userId = urlParams.get('loginCookie');
 

    if (jwtToken) {
      // 'jwtToken'을 로컬 스토리지에 저장
      localStorage.setItem('jwtToken', jwtToken);
      // 쿠키 값 생성
      document.cookie = "loginCookie="+ userId +"; expires="
           + new Date(new Date().getTime() + 60*60*24*7).toUTCString() + "; path=/"

      
      // '/' 경로로 리다이렉트
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      {/* 페이지 내용이 없어도 됩니다. */}
    </div>
  );
};

export default TokenHandler;
