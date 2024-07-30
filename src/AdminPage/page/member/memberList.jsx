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

const MemberUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [totalCount,setTotalCount]=useState(0);
  //목록의 컬럼이 될 값들을 설정
  //삭제 함수
  const [selectedIds, setSelectedIds] = useState([]);
  const fetchData = async (page) => {
    try {
      const response = await axios.get(
        // "http://localhost:3001/adminPage/adminUser"
        `/api/member/memberuser?page=${page}&size=${pageSize}`
      ); // 실제 API 엔드포인트로 변경 필요
      setRows(response.data.content);
      setTotalCount(response.data.totalElements);
      // setPage(page);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  // const handleNext = () => {
  //   fetchData(page + 1); // 현재 페이지 + 1
  // };
  
  // const handlePrevious = () => {
  //   if (page > 0) fetchData(page - 1); // 현재 페이지 - 1
  // };
  const handlePageChange = (newPage) => {
    setPage(newPage); // 페이지 상태 업데이트
    fetchData(newPage); // 새 페이지의 데이터 가져오기
  };
  const deleteMember = async () => {
    try {
      await axios.post("/api/member/deleteMember", {
        ids: selectedIds,
      });
      // 삭제 요청 후 데이터를 다시 가져옴
      fetchData();
      setSelectedIds([]);
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };
  const modifyMember = () => {
    if (selectedIds.length === 1) {
      navigate(`/admin/member/modifyMember/${selectedIds[0]}`);
    } else {
      setSelectedIds([]);
      alert("선택된 ID 배열을 비우고 하나만 입력해주세요.");
    }
  };
  const createMember = () => {
    navigate("/admin/member/createMember");
  };

  //페이지 수
  const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(0);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    // 데이터를 가져오는 비동기 함수 정의
    fetchData(0);
  }, [pageSize]);

  const columns = [
    { field: "ulid", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "사용자 아이디", flex: 1 },
    {
      field: "userName",
      headerName: "이름",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "age",
      headerName: "나이",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    { field: "phone", headerName: "연락처", flex: 1 },
    { field: "email", headerName: "이메일", flex: 1 },
    {
      field: "address",
      headerName: "주소",
      flex: 1,
      renderCell: (params) => {
        const address = params.value;
        return address
          ? `${address.zipcode}, ${address.city}, ${address.street}`
          : "주소 정보 없음";
      },
    },
    {
      field: "roles",
      headerName: "권한",
      flex: 1,
      renderCell: (params) => params.value.join(", "),
    },
    {
      field: "lastLoginTime",
      headerName: "최근 접속",
      type: "dateTime",
      flex: 1,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "joinDate",
      headerName: "가입일",
      type: "date",
      flex: 1,
      valueGetter: ({ value }) => value && new Date(value),
    },
  ];

  return (
    <Box m="20px">
      <Header title="사용자 정보 관리" subtitle="사용자 정보 확인" />
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
        {/* 정보수정 버튼 */}
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.greenAccent[400] }}
          onClick={modifyMember}
          disabled={selectedIds.length !== 1}
        >
          정보 수정
        </Button>
        {/* 정보삭제 버튼 */}
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.redAccent[600] }}
          onClick={deleteMember}
          disabled={selectedIds.length === 0}
        >
          정보 삭제
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.blueAccent[700] }}
          onClick={createMember}
        >
          계정 생성
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
          rowCount={totalCount} // DataGrid에 전체 데이터 수를 전달
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // onPageChange={(newPage) => setPage(newPage)}
          onPageChange={handlePageChange}
           paginationMode="server"
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row.ulid}
          onSelectionModelChange={(ids) => {
            setSelectedIds(ids);
          }}
        />
      </Box>
    </Box>
  );
};

export default MemberUser;
