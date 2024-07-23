import React, { useState } from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // 하트 아이콘을 위해 react-icons 패키지 사용
import { useNavigate } from "react-router-dom";

// const PostContainer = styled.div`
//   max-width: 300px; // 최대 너비 설정
//   background: white;
//   border: 1px solid #dbdbdb;
//   margin: 1px;
//   border-radius: 10px;
//   overflow: hidden;
// `;
const PostContainer = styled.div`
  max-width: 300px;
  background: #fff;
  //   border: 1px solid #dbdbdb;
  margin: 1px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostImage = styled.img`
  width: 100%;
  display: block; // 이미지가 div의 전체 너비를 차지하도록
  height: 100%;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const ProfilePic = styled.img`
  width: 30px; // 프로필 사진의 크기
  height: 30px;
  border-radius: 50%; // 원형으로 만들기
  margin-right: 10px;
`;

const Username = styled.span`
  flex: 1; // 사용 가능한 공간을 모두 채움
  font-weight: bold;
`;

const Content = styled.div`
  padding: 10px;
  font-size: 14px;
`;
const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute; // 절대 위치 설정
  left: 10px; // 왼쪽에서 10px
  bottom: 10px; // 아래에서 10px
  display: flex;
  align-items: center;
`;
const LikeCount = styled.span`
  margin-left: 5px;
  color: white;
  font-size: 14px;
`;

function PostItem({ id, imageUrl, profileUrl, username, content }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // 좋아요 수 초기값 설정
  const navigate = useNavigate();

  const toggleLike = (e) => {
    e.stopPropagation(); // 부모 요소로의 클릭 이벤트 전파 방지
    setLiked((prevLiked) => {
      setLikeCount((prevCount) => (prevLiked ? prevCount - 1 : prevCount + 1));
      return !prevLiked;
    });
  };

  const handlePostClick = () => {
    navigate(`/post?id=${id}`);
  };
  return (
    <PostContainer className="post" onClick={handlePostClick}>
      <PostImage src={imageUrl} alt="Post" />
      <LikeButton onClick={toggleLike}>
        {liked ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
        <LikeCount>{likeCount}</LikeCount> {/* 좋아요 수 표시 */}
      </LikeButton>
    </PostContainer>
  );
}

export default PostItem;
