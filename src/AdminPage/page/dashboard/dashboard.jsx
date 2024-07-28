import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../header";
import DeliveryBox from "./DeliveryBox";
import EmailIcon from "@mui/icons-material/Email";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SellerBox from "./SellerBox";
import AccessBrowser from "../rate/AccessBrowser";
import AccessOS from "../rate/AccessOS";
import Calendar from "../adminList/calendar";
import DashboardCalendar from "./dashboardCalendar";
import StatBox from "./StatBox";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orderReadyCount, setOrderReadyCount] = useState(0);
  const [orderDeliveryCount, setOrderDeliveryCount] = useState(0);
  const [orderDoneCount, setOrderDoneCount] = useState(0);
  const [newSellCount, setnewSellCount] = useState(0);
  const [soldSellCount, setSoldSellCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [Browser, setBrowser] = useState(0);
  const [os, setOs] = useState(0);
  // const [ordersComparison, setOrdersComparison] = useState({
  //   twoDaysAgo: {},
  //   oneDayAgo: {},
  //   difference: {},
  // });
  // const [usersComparison, setUsersComparison] = useState({
  //   twoDaysAgo: {},
  //   oneDayAgo: {},
  //   difference: {},
  // });
  // const [stylesComparison, setStylesComparison] = useState({
  //   twoDaysAgo: {},
  //   oneDayAgo: {},
  //   difference: {},
  // });
  const [ordersToday, setOrdersToday] = useState({
    newOrdersToday: 0,
  });
  const [usersToday, setUsersToday] = useState({
    totalUsers: 0,
    newUsersToday: 0,
    userGrowthRate: 0,
  });
  const [stylesToday, setStylesToday] = useState({
    newStylesToday: 0,
  });
  useEffect(() => {
    const fetchOrdersReady = async () => {
      const orderReady = encodeURIComponent("주문된 상태");
      try {
        const response = await axios.get(
          `/api/member/deliveriesAlam?status=${orderReady}`
        );
        setOrderReadyCount(response.data.length);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    const fetchOrdersDelivery = async () => {
      const orderDelivery = encodeURIComponent("배송중");
      try {
        const response = await axios.get(
          `/api/member/deliveriesAlam?status=${orderDelivery}`
        );
        setOrderDeliveryCount(response.data.length);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    const fetchOrdersDone = async () => {
      const orderDone = encodeURIComponent("배송완료");
      try {
        const response = await axios.get(
          `/api/member/deliveriesAlam?status=${orderDone}`
        );
        setOrderDoneCount(response.data.length);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    const fetchUnsoldProducts = async () => {
      try {
        const response = await axios.get(
          "/api/admin/products/unsold"
        );
        console.log("신규판매:", response.data);
        setnewSellCount(response.data.length);
      } catch (error) {
        console.error("Error fetching unsold products", error);
      }
    };
    const fetchSoldProducts = async () => {
      try {
        const response = await axios.get(
          "/api/admin/products/sold"
        );
        console.log("신규판매:", response.data);
        setSoldSellCount(response.data.length);
      } catch (error) {
        console.error("Error fetching unsold products", error);
      }
    };
    // const fetchOrdersComparison = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:3001/dashboard/orders-daily-comparison"
    //     );
    //     console.log("Order:", response.data);
    //     setOrdersComparison(response.data);
    //   } catch (error) {
    //     console.error("Error fetching orders comparison", error);
    //   }
    // };

    // const fetchUsersComparison = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:3001/dashboard/users-daily-comparison"
    //     );
    //     console.log("User:", response.data);
    //     setUsersComparison(response.data);
    //   } catch (error) {
    //     console.error("Error fetching users comparison", error);
    //   }
    // };

    // const fetchStylesComparison = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:3001/dashboard/styles-daily-comparison"
    //     );
    //     console.log("Style:", response.data);
    //     setStylesComparison(response.data);
    //   } catch (error) {
    //     console.error("Error fetching styles comparison", error);
    //   }
    // };
    const fetchOrdersToday = async () => {
      try {
        const response = await axios.get(
          "/api/dashboard/orders-daily-comparison"
        );
        setOrdersToday(response.data);
        console.log("OrdersToday:", response.data);
      } catch (error) {
        console.error("Error fetching orders today", error);
      }
    };

    const fetchUsersToday = async () => {
      try {
        const response = await axios.get(
          "/api/dashboard/users-daily-comparison"
        );
        setUsersToday(response.data);
        console.log("UsersToday:", response.data);
      } catch (error) {
        console.error("Error fetching users today", error);
      }
    };

    const fetchStylesToday = async () => {
      try {
        const response = await axios.get(
          "/api/dashboard/styles-daily-comparison"
        );
        setStylesToday(response.data);
        console.log("StylesToday:", response.data);
      } catch (error) {
        console.error("Error fetching styles today", error);
      }
    };

    fetchOrdersReady();
    fetchOrdersDelivery();
    fetchOrdersDone();
    fetchUnsoldProducts();
    // fetchOrdersComparison();
    // fetchUsersComparison();
    // fetchStylesComparison();
    fetchOrdersToday();
    fetchUsersToday();
    fetchStylesToday();
  }, []);

  return (
    <Box m="20px" maxWidth={"1200px"} minWidth={"1200px"}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="대시보드" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* row1 */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <DeliveryBox
            title={orderReadyCount}
            subtitle="결제완료"
            progress="0.75"
            increase="+14%"
            icon={
              <DomainVerificationIcon
                sx={{ color: colors.greenAccent[600], fontSize: "50px" }}
              />
            }
          />
          <DeliveryBox
            title={orderDeliveryCount}
            subtitle="배송중"
            progress="0.75"
            increase="+14%"
            icon={
              <LocalShippingIcon
                sx={{ color: colors.greenAccent[600], fontSize: "50px" }}
              />
            }
          />
          <DeliveryBox
            title={orderDoneCount}
            subtitle="배송 완료"
            progress="0.75"
            increase="+14%"
            icon={
              <WhereToVoteIcon
                sx={{ color: colors.greenAccent[600], fontSize: "50px" }}
              />
            }
          />
        </Box>

        {/* 판매자  */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <SellerBox
            title={newSellCount}
            subtitle="상품 판매 대기"
            progress="0.75"
            increase="+14%"
            icon={
              <DomainVerificationIcon
                sx={{ color: colors.greenAccent[600], fontSize: "50px" }}
              />
            }
          />
          <SellerBox
            title={soldSellCount}
            subtitle="판매 완료"
            progress="0.75"
            increase="+14%"
            icon={
              <WhereToVoteIcon
                sx={{ color: colors.greenAccent[600], fontSize: "50px" }}
              />
            }
          />
        </Box>
        {/* row2 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            // title={usersComparison.difference.usersDifference}
            title={usersToday.newUsersToday}
            subtitle="신규회원"
            progress={usersToday.progress}
            increase={`${usersToday.userGrowthRate}%`}
            icon={
              <PeopleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            // title={stylesComparison.difference.stylesDifference}
            title={stylesToday.newStylesToday}
            subtitle="신규 스타일"
            progress={stylesToday.progress}
            increase={`${stylesToday.styleGrowthRate}%`}
            icon={
              <RateReviewIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="보류"
            subtitle="신규 문의"
            progress={usersToday.progress}
            increase={`${usersToday.userGrowthRate}%`}
            icon={
              <QuestionAnswerIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            // title={ordersComparison.difference.ordersDifference}
            title={ordersToday.newOrdersToday}
            subtitle="전날 대비 판매량"
            progress={ordersToday.progress}
            increase={`${ordersToday.orderGrowthRate}%`}
            icon={
              <StorefrontIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* row3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // overflow="visible" // 오버플로우 설정
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                접속자별 브라우저
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {Browser}명
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            height="250px"
            // m="-20px 0 0 0"
            m="0"
          >
            <AccessBrowser isDashboard={true} setBrowser={setBrowser} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          // overflow="visible" // 오버플로우 설정
        >
          <DashboardCalendar isDashboard={true} />
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // overflow="visible" // 오버플로우 설정
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                접속자별 운영체제
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {os}명
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            height="250px"
            // m="-20px 0 0 0"
            m="0"
          >
            <AccessOS isDashboard={true} setOs={setOs} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
