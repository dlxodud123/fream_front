import {
  Box,
  Typography,
  useTheme,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  useGridApiContext,
  useGridApiRef,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const courierOptions = [
  { value: "HYUNDAI", label: "롯데택배", length: [10, 12, 13] },
  { value: "SAGAWA", label: "SC로지스", length: [9] },
  { value: "KGB", label: "로젠택배", length: [10, 11] },
  { value: "YELLOWCAP", label: "옐로우캡", length: [] },
  { value: "DONGBU", label: "동부택배", length: [] },
  { value: "EPOST", label: "우체국택배", length: [13] },
  { value: "CJGLS", label: "CJ대한통운", length: [10, 12] },
  { value: "HANJIN", label: "한진택배", length: [10, 12] },
  { value: "DAESIN", label: "대신택배", length: [13] },
  { value: "REGISTPOST", label: "우편등기", length: [13] },
  { value: "CHUNIL", label: "천일택배", length: [11] },
  { value: "ILYANG", label: "일양로지스", length: [8, 16] },
  { value: "CVSNET", label: "편의점택배", length: [10, 12] },
  { value: "KDEXP", label: "경동택배", length: [8, 16] },
  { value: "HONAM", label: "우리택배(구 호남택배)", length: [10, 14] },
  { value: "HDEXP", label: "합동택배", length: [8, 16] },
  // 추가적인 택배사 정보를 여기에 추가
];

const DeliveryList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const apiRef = useGridApiRef();
  //목록의 컬럼이 될 값들을 설정
  //삭제 함수
  const [selectedIds, setSelectedIds] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        // "http://localhost:3001/adminPage/adminUser"
        "http://localhost:3001/member/deliveries"
      ); // 실제 API 엔드포인트로 변경 필요
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const deleteDelivery = async () => {
    try {
      await axios.post("http://localhost:3001/member/deleteDelivery", {
        ids: selectedIds,
      });
      // 삭제 요청 후 데이터를 다시 가져옴
      fetchData();
      setSelectedIds([]);
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };
  const modifyDelivery = async () => {
    if (selectedIds.length > 0) {
      const updates = selectedIds
        .map((id) => {
          const row = rows.find((r) => r.deliveryId === id);
          const selectedCourier = courierOptions.find(
            (courier) => courier.value === row.courierName
          );

          if (selectedCourier && row.trackingNumber) {
            const isValidLength = selectedCourier.length.some(
              (len) => row.trackingNumber.length === len
            );

            if (isValidLength) {
              return {
                deliveryId: id,
                courierName: row.courierName,
                trackingNumber: row.trackingNumber,
              };
            } else {
              alert(
                `ID ${id}의 발송장 번호 길이가 ${selectedCourier.length.join(
                  ", "
                )} 중 하나가 아닙니다.`
              );
              return null;
            }
          } else {
            alert(`ID ${id}는 유효한 택배사와 발송장 번호가 필요합니다.`);
            return null;
          }
        })
        .filter((update) => update !== null);

      if (updates.length > 0) {
        try {
          await axios.put(
            "http://localhost:3001/member/modifyDelivery",
            updates
          );
          fetchData();
          alert("업데이트 완료");
        } catch (error) {
          console.error("Failed to update data:", error);
          alert("업데이트 실패");
        }
      }
    } else {
      alert("하나 이상의 ID를 선택해주세요.");
    }
  };

  //페이지 수
  const [pageSize, setPageSize] = useState(5);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    // 데이터를 가져오는 비동기 함수 정의
    fetchData();
  }, []);
  const handleProcessRowUpdate = (newRow, oldRow) => {
    const updatedRow = { ...oldRow, ...newRow };
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.deliveryId === oldRow.deliveryId ? updatedRow : row
      )
    );
    return updatedRow;
  };
  const handleCellEditStart = (params, event) => {
    if (params.field === "trackingNumber") {
      const row = rows.find((r) => r.deliveryId === params.id);
      if (!row.courierName) {
        event.defaultMuiPrevented = true; // Prevent entering edit mode
        alert("택배사를 먼저 선택해주세요.");
      }
    }
  };
  const handleCourierChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.deliveryId === id ? { ...row, [field]: value } : row
      )
    );
    // Focus를 발송장 번호 필드로 이동
    setTimeout(() => {
      const cell = document.querySelector(
        `[data-id="${id}"] [data-field="trackingNumber"]`
      );
      if (cell) {
        const event = new MouseEvent("dblclick", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        cell.dispatchEvent(event);
      }
    }, 0);
  };

  const columns = [
    { field: "deliveryId", headerName: "배달 ID", flex: 1 },
    { field: "deliveryStatus", headerName: "배달 상태", flex: 1 },
    { field: "deliveryAddress", headerName: "배달 주소", flex: 1 },
    {
      field: "courierName",
      headerName: "택배사",
      flex: 1,
      editable: true,
      renderCell: (params) => {
        const courier = courierOptions.find(
          (option) => option.value === params.value
        );
        return courier ? courier.label : "";
      },
      renderEditCell: (params) => (
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Select
            value={params.value}
            onChange={(e) => {
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: e.target.value,
              });
              handleCourierChange(params.id, params.field, e.target.value);
            }}
            sx={{ flexGrow: 1 }}
          >
            {courierOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ),
    },
    {
      field: "trackingNumber",
      headerName: "발송장 번호",
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params) => {
        const selectedCourier = courierOptions.find(
          (courier) => courier.value === params.row.courierName
        );
        if (selectedCourier) {
          const isValidLength = selectedCourier.length.some(
            (len) => params.props.value.length === len
          );
          return { ...params.props, error: !isValidLength };
        }
        return params.props;
      },
    },
    {
      field: "deliveryDate",
      headerName: "배달 날짜",
      type: "dateTime",
      flex: 1,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "orderId",
      headerName: "주문 ID",
      flex: 1,
      valueGetter: (params) => params.row.order.orderId,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="배송 정보 관리"
        subtitle="택배사 선택 후 송장을 입력해주세요.(택배사쪽을 두번 클릭하면 선택할 수 있습니다.)"
      />
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
        {/* 정보수정 버튼 */}
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.greenAccent[400] }}
          onClick={modifyDelivery}
          disabled={selectedIds.length !== 1}
        >
          발송장 등록
        </Button>
        {/* 정보삭제 버튼 */}
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.redAccent[600] }}
          onClick={deleteDelivery}
          disabled={selectedIds.length === 0}
        >
          정보 삭제
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
          getRowId={(row) => row.deliveryId}
          onSelectionModelChange={(ids) => {
            setSelectedIds(ids);
          }}
          processRowUpdate={handleProcessRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          onCellClick={() => {}}
          onCellEditStart={handleCellEditStart}
        />
      </Box>
    </Box>
  );
};

export default DeliveryList;
