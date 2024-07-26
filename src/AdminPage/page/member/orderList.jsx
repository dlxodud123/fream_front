import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  //목록의 컬럼이 될 값들을 설정
  //삭제 함수
  const [selectedIds, setSelectedIds] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        // "http://localhost:3001/adminPage/adminUser"
        // "http://localhost:3001/member/orders"
        "http://192.168.0.101:3001/member/orders"
      ); // 실제 API 엔드포인트로 변경 필요
      const orders = response.data;
      console.log("response.data:",response.data);
      const ordersWithUserNames = orders.map((order) => ({
        ...order,
        userName: order.user.username, // user 객체에서 username 추출
        products: order.orderItems
          .map((item) => item.product.nameKor)
          .join(", "), // orderItems에서 product 이름을 추출하여 합침
        productids: order.orderItems
          .map((item) => item.product.prid)
          .join(", "),
      }));
      console.log("ordersWithUserNames:", ordersWithUserNames);
      setRows(ordersWithUserNames);
      // setRows(response.data);
      console.log(response.data);
      console.log(" ordersWithUserNames:", ordersWithUserNames);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const refundOrder = async (orderId) => {
    try {
      await axios.put("http://localhost:3001/orders/refundOrder", { orderId });
      fetchData();
      setSelectedIds([]);
      alert("환불 완료");
    } catch (error) {
      console.error("Failed to refund order:", error);
      alert("환불 실패");
    }
  };
  const modifyOrder = () => {
    if (selectedIds.length === 1) {
      navigate(`/Member/modifyOrder/${selectedIds[0]}`);
    } else {
      setSelectedIds([]);
      alert("선택된 ID 배열을 비우고 하나만 입력해주세요.");
    }
  };

  //페이지 수
  const [pageSize, setPageSize] = useState(5);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    // 데이터를 가져오는 비동기 함수 정의
    fetchData();
  }, []);

  const columns = [
    { field: "orderId", headerName: "주문 ID", flex: 1 },
    { field: "orderCode", headerName: "주문 코드", flex: 1 },
    {
      field: "orderDate",
      headerName: "주문 날짜",
      type: "dateTime",
      flex: 1,
      valueGetter: ({ value }) => value && new Date(value),
    },
    { field: "userName", headerName: "구매자", flex: 1 },
    // { field: "sellerProductId", headerName: "판매자 제품 ID", flex: 1 },
    { field: "products", headerName: "제품", flex: 2 }, // 제품 이름들을 표시하는 컬럼 추가
  ];

  return (
    <Box m="20px">
      <Header title="주문 정보 관리" subtitle="주문 정보 확인" />
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
        {/* 정보수정 버튼 */}
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.greenAccent[400] }}
          onClick={modifyOrder}
          disabled={selectedIds.length !== 1}
        >
          주문 정보 확인
        </Button>
        {/* 정보삭제 버튼 */}
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.redAccent[600] }}
          onClick={() => refundOrder(selectedIds[0])}
          disabled={selectedIds.length === 0}
        >
          환불
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
            // DataGrid의 툴바 컨테이너의 버튼 텍스트 색상을 설정합니다.
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row.orderId}
          onSelectionModelChange={(ids) => {
            setSelectedIds(ids);
          }}
        />
      </Box>
    </Box>
  );
};

export default OrderList;
