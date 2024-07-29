import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
//관리자 아이콘
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
//주문목록
import ListAltIcon from "@mui/icons-material/ListAlt";
//배송목록
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
//Q&A
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
//판매자
import StorefrontIcon from "@mui/icons-material/Storefront";
//상품 문의
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
//리뷰
import RateReviewIcon from "@mui/icons-material/RateReview";
//시간별
import AccessTimeIcon from "@mui/icons-material/AccessTime";
//브라우저
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
//클릭
import AdsClickIcon from "@mui/icons-material/AdsClick";
//판매량
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
//일정
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import * as PortOne from "@portone/browser-sdk/v2";
import axios from "axios";
import { useAuth } from "../../adminAccess/adminAccess";

// const admin = [
//   {
//     name: "Jun",
//     role: "mainAdmin",
//     img: "/adminPage/img/mainAdmin.png",
//   },
// ];
const apiKey = "4555333718886873";
const secretKey =
  "bAJaWBq6CWDYZn0HOXCi5cvDhTZLZrkVJUwWFBmHuvxGC5ZiFUqQz5qy2sOEd9yAOCIZ2vCwWxcRQCTC";
const getToken = async () => {
  try {
    const response = await axios.post(
      "https://api.iamport.kr/users/getToken",
      {
        imp_key: apiKey,
        imp_secret: secretKey,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const accessToken = response.data.response.access_token;
    return accessToken;
  } catch (error) {
    console.error("Failed to get token:", error);
    throw error;
  }
};

// 결제 취소 요청 함수
const cancelPayment = async (accessToken) => {
  try {
    const response = await axios.post(
      "https://api.iamport.kr/payments/cancel",
      {
        imp_uid: "imp_236865325136",
        merchant_uid: "payment-c78dc4a7-2e75-44ef-a071-0fb6b8ce",
        amount: 100, // 요청한 금액을 여기에 설정합니다.
        tax_free: 0, // 요청한 금액 중 비과세 금액을 설정합니다.
        vat_amount: 0, // 부가세 금액을 설정합니다.
        checksum: 100, // 실제 취소 금액의 총합을 설정합니다.
        reason: "테스트 결제",
        refund_holder: "김준형", // 환불 계좌 예금주
        refund_bank: "88", // 은행 코드
        refund_account: "110235801026", // 환불 계좌 번호
        refund_tel: "010-2236-6908", // 환불 연락처
        extra: [],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken,
        },
      }
    );
    console.log("Payment cancelled:", response.data);
  } catch (error) {
    console.error("Failed to cancel payment:", error);
  }
};

const Item = ({ view, title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{view}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { logout } = useAuth(); // 로그아웃 함수 가져오기
  const [admin, setAdmin] = useState(null); // 관리자 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchAdminInfo = async () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        try {
          const response = await axios.get("/api/adminPage/info", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("response.data:", response.data);
          setAdmin(response.data);
        } catch (error) {
          console.error("Failed to fetch admin info:", error);
          // logout();
        }
      }
      setLoading(false); // 로딩 상태 업데이트
    };

    fetchAdminInfo();
  }, [logout]);

  const { IMP } = window;
  IMP.init("imp25812042");
  async function onClickCertification() {
    console.log("인증시작");
    IMP.certification(
      {
        // param
        // 주문 번호
        pg: "PG사코드.{CPID}", //본인인증 설정이 2개이상 되어 있는 경우 필
        merchant_uid: "ORD20180131-0000011",
        // 모바일환경에서 popup:false(기본값) 인 경우 필수
        m_redirect_url: "{리디렉션 될 URL}",
        // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
        popup: false,
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          // 인증 성공 시 jQuery로 HTTP 요청
          console.log(rsp);
          // jQuery.ajax({
          //   url: "{서버의 인증 정보를 받는 endpoint}",
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   data: { imp_uid: rsp.imp_uid },
          // });
        } else {
          alert("인증에 실패하였습니다. 에러 내용: " + rsp.error_msg);
        }
      }
    );
  }
  async function onClickPayments() {
    console.log("결제구현");
    IMP.request_pay(
      {
        pg: "html5_inicis", // PG사 코드와 상점 ID
        pay_method: "card",
        merchant_uid: `payment-${crypto.randomUUID()}`, // 주문 고유 번호
        name: "노르웨이 회전 의자",
        amount: 100,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
      },
      function (response) {
        // 결제 종료 시 호출되는 콜백 함수
        if (response.success) {
          // 결제 성공 시 로직
          console.log("결제 성공:", response);
          // 결제 성공 후 처리할 로직을 작성하세요.
        } else {
          // 결제 실패 시 로직
          console.log("결제 실패:", response.error_msg);
          alert("결제에 실패하였습니다. 에러내용: " + response.error_msg);
        }
      }
    );
  }
  const handleLogout = () => {
    logout();
    Navigate("/Login"); // 로그아웃 후 로그인 페이지로 이동
  };

  async function onClickcancelPayments() {
    console.log("환불");
    const handleCancelPayment = async () => {
      try {
        const token = await getToken();
        await cancelPayment(token);
      } catch (error) {
        console.error("Error during payment cancellation process:", error);
      }
    };
    await handleCancelPayment();
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-sidebar": {
          height: "100%",
          overflow: "hidden",
        },
        "::-webkit-scrollbar": {},
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  FreamAdmin
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed ? (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`/api/adminPage/files/${admin.profilePicture}`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {admin.name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {admin.role}
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between", // 두 버튼 사이를 띄우기 위해 추가
                    marginTop: "20px",
                    paddingRight: "30px",
                    paddingLeft: "30px",
                  }}
                >
                  <button
                    style={{
                      background: `${colors.primary[400]}`,
                      color: colors.grey[100],
                      border: "none",
                      borderRadius: "10px", // 모서리를 둥글게 설정
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      onClickCertification();
                    }}
                  >
                    <Typography variant="h5" color={colors.blueAccent[300]}>
                      관리자 정보
                    </Typography>
                  </button>
                  <button
                    style={{
                      background: `${colors.primary[400]}`,
                      color: colors.grey[100],
                      border: "none",
                      borderRadius: "10px", // 모서리를 둥글게 설정
                      cursor: "pointer",
                    }}
                    onClick={handleLogout}
                  >
                    <Typography variant="h5" color={colors.redAccent[300]}>
                      로그아웃
                    </Typography>
                  </button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {/* {admin.name} */}
                </Typography>
              </Box>
              <button
                style={{
                  background: `${colors.primary[400]}`,
                  color: colors.grey[100],
                  border: "none",
                  borderRadius: "10px", // 모서리를 둥글게 설정
                  paddingLeft: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                <Typography variant="h7" color={colors.redAccent[300]}>
                  로그아웃
                </Typography>
              </button>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              view="대시보드"
              title="Dashboard"
              to="/Admin/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              관리자
            </Typography>
            <Item
              view="관리자 계정 관리"
              title="AdminList"
              to="/Admin/adminUser"
              icon={<AdminPanelSettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              view="일정관리"
              title="calendar"
              to="/Admin/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              회원
            </Typography>
            <Item
              view="회원관리"
              title="member"
              to="/Admin/member"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              view="주문관리"
              title="order"
              to="/Admin/order"
              icon={<ListAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              view="배송관리"
              title="delivery"
              to="/Admin/delivery"
              icon={<LocalShippingIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              view="사이트 Q&A"
              title="qna"
              to="/Admin/qna"
              icon={<QuestionMarkIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              판매자
            </Typography>
            <Item
              view="판매자 관리"
              title="seller"
              to="/Admin/seller"
              icon={<StorefrontIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              view="상품 관리"
              title="product"
              to="/Admin/product"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              view="상품 문의 관리"
              title="productQna"
              to="/Admin/productQna"
              icon={<QuestionAnswerIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              view="리뷰 관리"
              title="review"
              to="/Admin/review"
              icon={<RateReviewIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              통계
            </Typography>
            <Item
              view="시간별 접속 정보"
              title="accessTime"
              to="/Admin/accessTime"
              icon={<AccessTimeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              view="브라우저별 접속 정보"
              title="accessBrowser"
              to="/Admin/accessBrowser"
              icon={<TravelExploreIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              view="운영체제별 접속 정보"
              title="accessOS"
              to="/Admin/accessOS"
              icon={<TravelExploreIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              view="유입별 접속 정보"
              title="accessReferer"
              to="/Admin/accessReferer"
              icon={<TravelExploreIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              view="클릭수 통계"
              title="click"
              to="/Admin/accessClick"
              icon={<AdsClickIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              view="판매량 통계"
              title="salesRate"
              to="/Admin/salesRate"
              icon={<TrendingUpIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
