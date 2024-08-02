import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaBookmark,
  FaRegBookmark,
  FaSearch,
  FaEllipsisH,
  FaDownload,
} from "react-icons/fa"; // 아이콘 임포트
import StyleHeader from "./styleHeader";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../Auth/UserAuthContext";
import { Margin } from "@mui/icons-material";
import Footer from "../common/footer";
import PostItem from "./postItem";
import axios from "axios";
import Size_modal from "../detail/modal/size_modal";
// 모달 스타일
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: opacity 0.3s linear;
`;
const ModalOption = styled.div`
  text-align: center;
  padding: 10px;
  color: ${(props) =>
    props.color || "#333"}; // 기본 색상은 #333, prop으로 전달된 색상 사용
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const PostContainer = styled.div`
  max-width: 600px;
  background: #fff;
  margin: 1px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width
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

const FollowButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px;
`;

const MoreOptions = styled(FaEllipsisH)`
  cursor: pointer;
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
  color: ${(props) => (props.active ? "red" : "grey")};
  display: flex;
  align-items: center;
`;
const BookmarkButton = styled(FaRegBookmark)`
  cursor: pointer;
  color: ${(props) => (props.active ? "yellow" : "grey")};
  margin-right: 5px;
`;

const DownloadButton = styled(FaDownload)`
  cursor: pointer;
  color: black; // 기본 색상을 검정으로 설정
  // margin-right: 5px; // 오른쪽 여백 추가
  margin-left: 5px;
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
`;
const LeftIcons = styled.div`
  display: flex;
  align-items: center;
`;

const RightIcons = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

const IconText = styled.span`
  margin-left: 5px;
  margin-right: 20px;
  display: flex;
  align-items: center;
`;
const TimeAgo = styled.span`
  color: grey;
  font-size: 12px;
`;

const dummyPosts = {
  id: 1,
  imageUrl: "/images/kream_img002_1.jpg",
  profileUrl: "https://example.com/profile1.jpg",
  username: "user1",
  content: "Explore the newest trends with us!",
  date: "2023-07-18T12:00:00Z", // 예제 날짜
};
function getTimeDifference(date) {
  const now = new Date();
  const postDate = new Date(date);
  const diffInMs = now - postDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return diffInYears === 1 ? "1년 전" : `${diffInYears}년 전`;
  } else if (diffInDays > 0) {
    return diffInDays === 1 ? "1일 전" : `${diffInDays}일 전`;
  } else if (diffInHours > 0) {
    return diffInHours === 1 ? "1시간 전" : `${diffInHours}시간 전`;
  } else {
    return "Just now";
  }
}

function Post({ imageUrl, profileUrl, username, content }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(25);
  const [style, setStyle] = useState(null);
  let navigate = useNavigate();
  const [user, setUser] = useState(null); // 사용자 상태 추가
  const [bookmarked, setBookmarked] = useState(false);
  const { isLoggedIn, handleLogout } = useContext(UserAuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sizeModalVisible, setSizeModalVisible] = useState(false); // Size modal 상태 추가
  const [selectedSize, setSelectedSize] = useState(null);
  const handleLike = () => {
    fetch(`/api/styles/like/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setLiked(!liked);
          setLikes((prev) => (liked ? prev - 1 : prev + 1));
        } else {
          console.error("Failed to toggle like");
        }
      })
      .catch((error) => console.error("Error toggling like:", error));
  };
  useEffect(() => {
    fetch(`/api/styles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("데이터:", data);
        setStyle(data);
        // setLoading(false);
      })
      axios
      .get(`/api/styles/by-style/${id}`)
      .then((response) => {
        
        setUser(response.data);
        console.log("유저정보:",response.data);
        setLoading(false); // 모든 데이터 로딩 완료
      })
      .catch((error) => console.error("Error fetching style:", error));
  }, [id]);


  const toggleBookmark = () => {
    setSizeModalVisible(true); // 북마크 버튼 클릭 시 사이즈 모달 열기
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    axios
      .post(
        `/api/wishes/toggle/${style.product.prid}/${selectedSize}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setBookmarked((prev) => !prev);
          setSizeModalVisible(false); // 모달 닫기
        } else {
          console.error("Failed to toggle bookmark");
        }
      })
      .catch((error) => console.error("Error toggling bookmark:", error));
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  // if (loading) return <div>Loading...</div>;
  return (
    <>
      <div
        className="top_inner"
        style={{
          marginBottom: "0px",
          paddingBottom: "0px",
          display: "flex", // Flexbox 사용
          justifyContent: "center", // 주 축을 기준으로 중앙 정렬
          alignItems: "center", // 교차 축을 기준으로 중앙 정렬
          width: "100%", // 부모 컨테이너의 전체 너비를 차지하도록 설정
        }}
      >
        <div style={{ display: "flex", marginLeft: "1008px", width: "232px" }}>
          <div>
            <a
              style={{
                color: "grey",
                textDecoration: "none",
                fontSize: "14px",
              }}
              href="/#"
            >
              고객센터
            </a>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <a
              style={{
                color: "grey",
                textDecoration: "none",
                fontSize: "14px",
              }}
              href="/#"
            >
              마이페이지
            </a>
          </div>
          {isLoggedIn ? (
            <div style={{ marginLeft: "20px" }}>
              <a
                style={{
                  color: "grey",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
                href="/login"
                onClick={handleLogout}
              >
                로그아웃
              </a>
            </div>
          ) : (
            <div style={{ marginLeft: "20px" }}>
              <a
                style={{
                  color: "grey",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
                href="/login"
              >
                로그인
              </a>
            </div>
          )}
        </div>
      </div>
      <div
        id="headerF"
        style={{
          display: "flex", // Flexbox 사용
          justifyContent: "center", // 주 축을 기준으로 중앙 정렬
          alignItems: "center", // 교차 축을 기준으로 중앙 정렬
          width: "100%", // 부모 컨테이너의 전체 너비를 차지하도록 설정
        }}
      >
        <div className="main_inner">
          <div
            style={{
              width: "200px",
              fontSize: "14px",
              fontWeight: "bold",
              // marginLeft: "40px",
            }}
          >
            <a
              style={{ color: "black", textDecoration: "none" }}
              className="italic"
              href="/"
            >
              KREAM
            </a>
          </div>
          <div style={{ width: "1000px" }}>
            <div style={{ display: "flex", marginLeft: "650px" }}>
              <div style={{ fontSize: "14px", width: "100px" }}>
                <a style={{ color: "black", textDecoration: "none" }} href="/">
                  HOME
                </a>
              </div>
              <div style={{ fontSize: "14px", width: "100px" }}>
                <a style={{ color: "black", textDecoration: "none" }} href="/">
                  STYLE
                </a>
              </div>
              <div style={{ fontSize: "14px", width: "100px" }}>
                <a
                  style={{ color: "black", textDecoration: "none" }}
                  href="/shop"
                >
                  SHOP
                </a>
              </div>
              <div style={{ fontSize: "14px" }}>
                <FaSearch style={{ marginLeft: "8px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Wrapper>
        <PostContainer>
          <ProfileSection>
            {/* <ProfilePic src={"/api"+user.profileUrl} alt={"사용자"} /> */}
            <ProfileInfo>
              {/* <Username>{user.userName}</Username> */}
              {/* <TimeAgo>{getTimeDifference(style.styleDate)}</TimeAgo> */}
            </ProfileInfo>
            <FollowButton>팔로잉</FollowButton>
            <MoreOptions onClick={toggleModal} />
            <ModalBackground show={modalVisible} onClick={toggleModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                {" "}
                {/* Stop propagation to prevent modal close when clicking inside */}
                <ModalOption color="blue">게시물 공유</ModalOption>
                <ModalOption color="red">프로필 차단</ModalOption>
                <ModalOption color="red">프로필 신고</ModalOption>
                <ModalOption onClick={toggleModal}>취소</ModalOption>
              </ModalContent>
            </ModalBackground>
          </ProfileSection>
          <PostImage
            // src={`/api/styles/image/${style.styleImgName}`}
            alt="Post"
          />
          <IconContainer>
            <LeftIcons>
              <DownloadButton />
            </LeftIcons>
            <RightIcons>
              <LikeButton onClick={handleLike} active={liked}>
                {liked ? <FaHeart /> : <FaRegHeart />}
                <IconText>{likes}</IconText>
              </LikeButton>
              <FaRegComment />
              <IconText>9</IconText>
              <BookmarkButton onClick={toggleBookmark} active={bookmarked}>
                {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
              </BookmarkButton>
              <IconText>12</IconText>
            </RightIcons>
          </IconContainer>
          {sizeModalVisible && (
            <Size_modal
              final_size={selectedSize}
              setFinal_Size={handleSizeSelect}
            />
          )}
          {/* <Content>{style.content}</Content> */}
          <div
            style={{
              padding: "16px 0",
              borderBottom: "1px solid #f0f0f6",
              width: "1400px",
              margin: "0 auto",
            }}
          ></div>
          <div
            style={{
              padding: "16px 0",
              borderBottom: "1px solid grey",
              width: "1400px",
              margin: "0 auto",
            }}
          ></div>
          <Username>{dummyPosts.username}</Username>님의 다른 스타일
          <PostItem></PostItem>
        </PostContainer>
      </Wrapper>
      <Footer></Footer>
    </>
  );
}

export default Post;
