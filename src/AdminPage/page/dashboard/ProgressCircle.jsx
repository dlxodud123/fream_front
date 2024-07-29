// Material-UI에서 필요한 모듈과 컴포넌트를 임포트
import { Box, useTheme } from "@mui/material"; // Box 컴포넌트와 현재 테마에 접근하기 위한 훅
import { tokens } from "../../theme"; // 테마 모드에 따라 색상 토큰을 생성하는 함수

// ProgressCircle 함수형 컴포넌트 정의
const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  // useTheme 훅을 사용하여 현재 테마에 접근
  const theme = useTheme();
  // 현재 테마 모드에 따라 색상 토큰 생성
  const colors = tokens(theme.palette.mode);
  // 진행 각도 계산
  const angle = progress * 360;

  // Box 컴포넌트를 반환
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`, // 배경 스타일: 방사형 그라데이션, 원뿔형 그라데이션, 기본 배경색
        borderRadius: "50%", // 둥근 모서리를 위해 테두리 반지름 설정
        width: `${size}px`, // 컴포넌트의 너비 설정
        height: `${size}px`, // 컴포넌트의 높이 설정
      }}
    />
  );
};

// ProgressCircle 컴포넌트를 기본 익스포트로 내보내기
export default ProgressCircle;
