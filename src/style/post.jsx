import React from "react";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa"; // 하트 아이콘을 위해 react-icons 패키지 사용

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

const LikeButton = styled(FaHeart)`
  cursor: pointer;
  color: red;
`;

const Content = styled.div`
  padding: 10px;
  font-size: 14px;
`;

function Post({ imageUrl, profileUrl, username, content }) {
  return (
    <PostContainer className="post">
      <PostImage src={imageUrl} alt="Post" />
      <ProfileSection>
        <ProfilePic src={profileUrl} alt={username} />
        <Username>{username}</Username>
        <LikeButton />
      </ProfileSection>
      <Content>{content}</Content>
    </PostContainer>
  );
}

export default Post;
