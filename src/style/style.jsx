import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../common/footer";
import styled from "styled-components";
import StyleHeader from "./styleHeader";
import { Height } from "@mui/icons-material";
import { Flex } from "antd";
import StyleCategoryCard from "./styleCategoryCard";
import Post from "./post";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded"; // imagesLoaded 임포트
import StylePostItem from "./stylePostItem";
import axios from "axios";

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 24px;
`;
const LiDecorated = styled.li`
  margin-left: 5px;
  list-style: none; // 기본 리스트 스타일 제거
  display: flex; // Flexbox를 사용하여 아이템을 수평 정렬
  align-items: center; // 세로 선과 텍스트를 중앙에 정렬
  &::before {
    content: "";
    display: block;
    width: 2px;
    height: 10px;
    background-color: #f0f0f0;
    margin-right: 10px; // 선과 텍스트 사이의 간격 조절
  }
`;
const StyledLink = styled.a`
  color: rgba(34, 34, 34, 0.8);
  font-size: 14px;
  letter-spacing: -0.21px;
  line-height: 17px;
  text-decoration: none; // 링크 밑줄 제거
`;
// const Container = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 20px;
//   padding: 20px;
//   justify-content: center;
//   width: 100%; // 전체 너비
//   max-width: 1200px; // 최대 너비
//   margin: 0 auto; // 중앙 정렬
// `;
const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  height: auto; // Masonry가 높이를 자동으로 설정하도록
`;
const dummyPosts = [
  {
    id: 1,
    imageUrl: "/images/kream_img002_1.jpg",
    profileUrl: "https://example.com/profile1.jpg",
    username: "user1",
    content: "Explore the newest trends with us!",
  },
  {
    id: 2,
    imageUrl: "/images/kream_img002_2.jpg",
    profileUrl: "https://example.com/profile2.jpg",
    username: "user2",
    content: "Check out our latest collection!",
  },
  {
    id: 3,
    imageUrl: "/images/kream_img002_3.jpg",
    profileUrl: "https://example.com/profile3.jpg",
    username: "user3",
    content: "Loving these new arrivals!",
  },
  {
    id: 4,
    imageUrl: "/images/kream_img003_1.jpg",
    profileUrl: "https://example.com/profile4.jpg",
    username: "user4",
    content: "Fresh drops this season!",
  },
  {
    id: 5,
    imageUrl: "/images/kream_img004_1.jpg",
    profileUrl: "https://example.com/profile5.jpg",
    username: "user5",
    content: "Our favorite picks for you.",
  },
  {
    id: 6,
    imageUrl: "/images/kream_img005_1.jpg",
    profileUrl: "https://example.com/profile6.jpg",
    username: "user6",
    content: "Style that speaks.",
  },
  {
    id: 7,
    imageUrl: "/images/kream_img005_2.jpg",
    profileUrl: "https://example.com/profile7.jpg",
    username: "user7",
    content: "Never go out of style!",
  },
  {
    id: 8,
    imageUrl: "/images/kream_img005_3.jpg",
    profileUrl: "https://example.com/profile8.jpg",
    username: "user8",
    content: "Stay trendy with our new collections.",
  },
  {
    id: 9,
    imageUrl: "/images/kream_img006_1.jpg",
    profileUrl: "https://example.com/profile9.jpg",
    username: "user9",
    content: "Must-haves for your wardrobe.",
  },
  {
    id: 10,
    imageUrl: "/images/kream_img007_1.jpg",
    profileUrl: "https://example.com/profile10.jpg",
    username: "user10",
    content: "The best of our seasonal sale!",
  },
];

function Style() {
  const containerRef = useRef(null);
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/styles");
        setData(response.data);
        console.log(response.data); // 상태 업데이트 후의 데이터를 로그로 출력
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Masonry 인스턴스 초기화
    const masonryInstance = new Masonry(containerRef.current, {
      itemSelector: ".post", // 이 클래스를 가진 요소들이 Masonry 레이아웃에 포함됩니다.
      columnWidth: ".post", // columnWidth를 .post의 너비로 설정
      //   columnWidth: 300,
      gutter: 1,
    });
    // 모든 이미지 로드 대기
    imagesLoaded(containerRef.current, function () {
      masonryInstance.layout(); // 이미지 로드 후 레이아웃 갱신
    });
    // 컴포넌트 언마운트 시 Masonry 인스턴스 정리
    return () => masonryInstance.destroy();
  }, []);

  const categories = [
    { id: 1, title: "7월추천", image: "/path/to/image1.jpg" },
    { id: 2, title: "팔로잉", image: "/path/to/image2.jpg" },
    // 여기에 더 많은 카테고리를 추가하세요.
  ];

  return (
    <>
      <StyleHeader />
      <div style={{ paddingTop: "120px", height: "3000px" }}>
        <div id="StyleContent" style={{}}>
          <div
            class="StyleBenner"
            style={{
              display: Flex,
              justifyContent: "space-between",
            }}
          >
            <List>
              {categories.map((category) => (
                <StyleCategoryCard
                  key={category.id}
                  image={category.image}
                  title={category.title}
                />
              ))}
            </List>
          </div>
        </div>
        <div
          style={{
            padding: "16px 0",
            borderBottom: "1px solid #f0f0f0",
            width: "1400px",
            margin: "0 auto",
          }}
        ></div>
        <div
          style={{
            display: "flex", // Flexbox 사용
            alignItems: "center", // 교차 축을 기준으로 중앙 정렬
            maxWidth: "1400px", // 최대 너비 제한
            width: "100%", // 부모 컨테이너의 전체 너비를 차지하도록 설정
            margin: "0 auto", // 중앙 정렬
            minWidth: "1400px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%", // 내부 div가 최상위 div의 전체 너비를 사용하도록 설정
            }}
          >
            <ul
              style={{
                display: "flex",
                justifyContent: "flex-end",
                Width: "100%",
              }}
            >
              <li style={{ listStyle: "none" }}>
                <StyledLink>인기순</StyledLink>
              </li>
              <LiDecorated>
                <StyledLink>최신순</StyledLink>
              </LiDecorated>
            </ul>
          </div>
        </div>
        <Container ref={containerRef}>
          {data.map((post) => (
            <StylePostItem
              key={post.id}
              id={post.id} // id를 prop으로 전달
              imageUrl={post.imageUrl.replace('localhost:3000', 'localhost:3001')}
              profileUrl={post.profileUrl}
              username={post.username}
              content={post.content}
              className="post" // 이 클래스명은 Masonry 인스턴스에 사용됩니다.
            />
          ))}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Style;
