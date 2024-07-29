import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 URL에서 'jwtToken' 쿼리 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const jwtToken = urlParams.get('jwtToken');

    if (jwtToken) {
      // 'jwtToken'을 로컬 스토리지에 저장
      localStorage.setItem('jwtToken', jwtToken);
      
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
