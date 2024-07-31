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

const ProductList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  //목록의 컬럼이 될 값들을 설정
  //삭제 함수
  const [selectedIds, setSelectedIds] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "/api/admin/products/list"
      ); // 실제 API 엔드포인트로 변경 필요
      console.log("Number of products received:", response.data.length);
      console.log(response.data);
      // setRows(response.data);
      if (Array.isArray(response.data)) {
        setRows(response.data);
        console.log("Rows set successfully");
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const deleteAdmin = async () => {
    try {
      console.log(selectedIds);
      await axios.post(
        "/api/admin/products/delete",
        selectedIds
      );
      // 삭제 요청 후 데이터를 다시 가져옴
      fetchData();
      setSelectedIds([]);
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };
  const modifyProduct = () => {
    if (selectedIds.length === 1) {
      navigate(`/admin/modifyProduct/${selectedIds[0]}`);
    } else {
      setSelectedIds([]);
      alert("선택된 ID 배열을 비우고 하나만 입력해주세요.");
    }
  };
  const RegisterProduct = () => {
    navigate("/admin/RegisterProduct");
  };

  //페이지 수
  const [pageSize, setPageSize] = useState(5);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    // 데이터를 가져오는 비동기 함수 정의
    fetchData();
  }, []);

  const columns = [
    { field: "prid", headerName: "제품 ID", flex: 1 },
    { field: "nameKor", headerName: "제품명 (한글)", flex: 1 },
    { field: "nameEng", headerName: "제품명 (영문)", flex: 1 },
    { field: "category", headerName: "카테고리", flex: 1 },
    { field: "brand", headerName: "브랜드", flex: 1 },
    { field: "color", headerName: "색상", flex: 1 },
    { field: "gender", headerName: "성별", flex: 1 },
    { field: "price", headerName: "가격", type: "number", flex: 1 },
    {
      field: "regDate",
      headerName: "등록 날짜",
      type: "dateTime",
      flex: 1,
      valueGetter: ({ value }) => value && new Date(value),
    },
  ];

  return (
    <Box m="20px">
      <Header title="상품 관리" subtitle="상품 정보 확인" />
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
        {/* 정보수정 버튼 */}
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.greenAccent[400] }}
          onClick={modifyProduct}
          disabled={selectedIds.length !== 1}
        >
          정보 수정
        </Button>
        {/* 정보삭제 버튼 */}
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.redAccent[600] }}
          onClick={deleteAdmin}
          disabled={selectedIds.length === 0}
        >
          정보 삭제
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.blueAccent[700] }}
          onClick={RegisterProduct}
        >
          상품 등록
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
          getRowId={(row) => row.prid}
          onSelectionModelChange={(ids) => {
            setSelectedIds(ids);
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductList;
