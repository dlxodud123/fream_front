// Material-UI에서 필요한 모듈과 컴포넌트를 임포트
import { Box, Typography, useTheme } from "@mui/material"; // Box와 Typography 컴포넌트, 현재 테마에 접근하기 위한 훅
import { tokens } from "../../theme"; // 테마 모드에 따라 색상 토큰을 생성하는 함수
import ProgressCircle from "./ProgressCircle"; // ProgressCircle 컴포넌트를 임포트
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SellerBox = ({ title, subtitle, icon, progress, increase }) => {
  // useTheme 훅을 사용하여 현재 테마에 접근
  const theme = useTheme();
  // 현재 테마 모드에 따라 색상 토큰 생성
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  // Box 컴포넌트를 반환
  return (
    <Box width="100%" m="0 30px" sx={{ textAlign: "center" }}>
      {/* 상단 박스: 아이콘과 제목, 진행 원형 */}
      <Box
        display="flex"
        //justifyContent="space-between"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          {icon} {/* 아이콘 표시 */}
          <Typography
            variant="h4" // 텍스트 스타일 설정 (h4)
            fontWeight="bold" // 폰트 두께 설정 (볼드)
            sx={{ color: colors.grey[100], cursor: "pointer" }} // 텍스트 색상 설정
            onClick={() => navigate("/Admin/delivery")}
          >
            {title} {/* 제목 표시 */}
          </Typography>
        </Box>
      </Box>
      {/* 하단 박스: 부제목과 증가율 */}
      <Box
        display="flex"
        mt="2px"
        //   justifyContent="space-between"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle} {/* 부제목 표시 */}
        </Typography>
      </Box>
    </Box>
  );
};

export default SellerBox;
