import "./css/main.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainHeader from "../common/main_header.js";
import Benner from "./benner.js";
import Mainbutton from "./mainbutton.js";
import { Shoesitem0 } from "./Shoesitem.js";
import Footer from "../common/footer.js";

const AppContainer = styled.div`
  text-align: center;
  margin: auto;
  max-width: 1280px;
  padding: 0 20px; /* 좌우 패딩 추가 */
`;

const ContentContainer = styled.div`
  width: 100%;
  margin: auto;
  padding-top: 80px;
`;

const TitleContainer = styled.div`
  margin: 20px 0;
  text-align: left;

  h6 {
    font-size: 14px;
    color: #444;
  }

  h4 {
    font-size: 24px;
    color: #222;
  }
`;

const ShoesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 중앙 정렬 */
`;

const LoadMoreButton = styled.button`
  background-color: white;
  color: black;
  border: 1px solid black;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: black;
    color: white;
  }
`;

function App1() {
  let navigate = useNavigate();

  let [shoes, setShoes] = useState([]);
  const [count, setCount] = useState(3); // Initialize to show first 3 items
  const loadMore = () => {
    setCount(count + 3); // Increase count by 3
  };

  const axiosBaseURL = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // 이 부분 추가
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosBaseURL.get("http://192.168.0.13:3001/home");
        setShoes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContainer>
      <MainHeader />
      <ContentContainer>
        <Benner />
        <Mainbutton />
        <TitleContainer>
          <h6>Most Popular</h6>
          <h4 className="font__color-a">인기상품</h4>
        </TitleContainer>
        <ShoesGrid>
          {shoes.slice(0, count).map((shoes, i) => (
            <Shoesitem0 key={shoes.id} shoes={shoes} i={i + 1} />
          ))}
        </ShoesGrid>
        {count < shoes.length && (
          <div className="center-button">
            <LoadMoreButton onClick={loadMore}>더보기</LoadMoreButton>
          </div>
        )}
      </ContentContainer>
      <Footer />
    </AppContainer>
  );
}

export default App1;
