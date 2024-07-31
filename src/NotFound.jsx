import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh; /* 전체 화면 높이에 맞춤 */
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
`;

const Message = styled.p`
  margin-bottom: 30px;
`;

const HomeButton = styled.button`
  font-size: 1.2em;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
const imageUrl = process.env.PUBLIC_URL + "/404.png";
function NotFound() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <img src={imageUrl} alt="404 Not Found" />
      <Title>404 - 내 페이지 돌려줘</Title>
      <Message>페이지를 찾을 수 없는걸?</Message>
      <HomeButton onClick={handleHomeClick}>홈으로</HomeButton>
    </Container>
  );
}

export default NotFound;
