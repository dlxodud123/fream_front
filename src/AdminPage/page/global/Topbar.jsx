import {
  Autocomplete,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
// Material-UI에서 제공하는 UI 컴포넌트와 훅
import { useContext, useEffect, useState } from "react";
// React 훅
import { ColorModeContext, tokens } from "../../theme";
// 테마와 색상 토큰, 색상 모드 컨텍스트
import InputBase from "@mui/material/InputBase";
// Material-UI에서 제공하는 기본 입력 컴포넌트
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// 라이트 모드 아이콘
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// 다크 모드 아이콘
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// 알림 아이콘
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// 설정 아이콘
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// 사용자 아이콘
import SearchIcon from "@mui/icons-material/Search";
// 검색 아이콘
import { useNavigate } from "react-router-dom";
// React Router의 네비게이션 훅
// 자동완성 목록을 위한 페이지 목록
const pages = [
  "adminUser",
  "calendar",
  "member",
  "order",
  "delivery",
  "qna",
  "seller",
  "product",
  "productQna",
  "review",
  "accessTime",
  "accessBrowser",
  "accessClick",
  "salesRate",
];
//한글 검색을 위한 한글 매핑
const pageMapping = {
  대시보드: "dashboard",
  "관리자 계정 관리": "adminUser",
  일정관리: "calendar",
  회원관리: "member",
  주문관리: "order",
  배송관리: "delivery",
  "사이트 Q&A": "qna",
  "판매자 관리": "seller",
  상품관리: "product",
  "상품 문의 관리": "productQna",
  "리뷰 관리": "review",
  "시간별 접속 정보": "accessTime",
  "브라우저별 접속 정보": "accessBrowser",
  "운영체제별 접속 정보": "accessOS",
  "유입별 접속 정보": "accessReferer",
  "클릭수 통계": "accessClick",
  "판매량 통계": "salesRate",
};

const Topbar = () => {
  //테마 컴포넌트
  const theme = useTheme();
  // 현재 테마를 가져오는 훅
  const colors = tokens(theme.palette.mode);
  // 테마 모드에 따른 색상 토큰을 가져옴
  const colorMode = useContext(ColorModeContext);
  // 색상 모드 컨텍스트를 사용

  //검색 함수를 위한 기능
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  // const handleSearch = () => {
  //   if (searchQuery) {
  //     if (pages.includes(searchQuery)) {
  //       navigate(`${searchQuery}`);
  //     } else {
  //       navigate("dashboard");
  //     }
  //   }
  // };
  //한글검색을 위해 핸들함수 변경
  const handleSearch = (query) => {
    if (query) {
      let mappedQuery = pageMapping[query] || query;
      if (mappedQuery === query) {
        // query가 pageMapping에 해당하지 않으면 "dashboard"로 이동
        //이때 mappedQuery가 키값에 해당되지 않으면 query를 가지기 때문에
        //매핑 키 값이 아니라서 예외를 검색하면 대시보드 경로로 이동
        navigate("");
      } else {
        if (typeof mappedQuery === "object" && mappedQuery !== null) {
          mappedQuery = JSON.stringify(mappedQuery);
        }
        navigate(mappedQuery);
      }
    } else {
      navigate("dashboard");
    }
  };

  //자동완성 함수
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  // 현재 선택된 제안 인덱스 상태
  const handleInputChange = (e) => {
    const value = e.target.value;
    //입력된 값을 value에 넣는다.
    setSearchQuery(value);
    //입력된 값을 검색 쿼리에 넣어준다.
    //한글입력을 위해 분류
    const filteredSuggestions = Object.keys(pageMapping).filter((key) =>
      key.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);

    // setSuggestions(
    // pages.filter((page) => page.toLowerCase().includes(value.toLowerCase()))
    // );
    //페이지의 내용과 일치하는 내용만 필터링하여 Suggestion에 넣어준다.
    //value값을 소문자로 변환시켜서 page내부에 포함되어 있는 지 확인하도록 한다.
    //그리고 그 포함되어 있으면 그 데이터를 화면에 나타내주는 것.
    setActiveSuggestionIndex(0); // 새로운 입력이 있을 때 인덱스를 초기화
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    handleSearch(suggestion);
  };
  //setSuggestion에 입력된 값을 검색 쿼리에 넣어서 네비게이트로 이동시켜주고
  //배열을 비운다.

  //esc를 통해 검색창 종료
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSuggestions([]);
      } else if (e.key === "ArrowDown") {
        setActiveSuggestionIndex((prevIndex) =>
          Math.min(prevIndex + 1, suggestions.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        setActiveSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter" && suggestions.length > 0) {
        handleSuggestionClick(suggestions[activeSuggestionIndex]);
      } else if (e.key === "Enter") {
        handleSearch(searchQuery);
      }
      // } else if (e.key === "ArrowDown") {
      //   // 아래 방향 화살표 키 핸들링
      //   setActiveSuggestionIndex((prevIndex) => {
      //     const newIndex =
      //       prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex;
      //     setSearchQuery(suggestions[newIndex]); // 검색 쿼리를 선택된 제안으로 업데이트
      //     return newIndex;
      //   });
      // } else if (e.key === "ArrowUp") {
      //   // 위 방향 화살표 키 핸들링
      //   setActiveSuggestionIndex((prevIndex) => {
      //     const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
      //     setSearchQuery(suggestions[newIndex]); // 검색 쿼리를 선택된 제안으로 업데이트
      //     return newIndex;
      //   });
      // } else if (e.key === "Enter") {
      //   // 엔터 키 핸들링
      //   if (suggestions.length > 0 && suggestions[activeSuggestionIndex]) {
      //     handleSuggestionClick(suggestions[activeSuggestionIndex]);
      //   }
      // }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [suggestions, activeSuggestionIndex, searchQuery]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      position="relative"
    >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]} // 검색 바 배경색 설정
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <IconButton
          type="button"
          sx={{ p: 1 }}
          onClick={() => handleSearch(searchQuery)}
          //이때 () =>처리를 안하면 무한 루프가 발생할 수 있다.
          //렌더링마다 함수가 동작하기 때문이다.
        >
          <SearchIcon />
          {/* 검색 아이콘 */}
        </IconButton>
        {suggestions.length > 0 && (
          <Paper
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 1,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            <List>
              {suggestions.map((suggestion, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{
                    backgroundColor:
                      index === activeSuggestionIndex
                        ? colors.primary[300]
                        : "inherit",
                  }}
                >
                  <ListItemText primary={suggestion} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {/* {suggestions.length > 0 && (
          <Paper
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 1,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            <List>
              {suggestions.map((suggestion, index) => (
                <ListItem
                  ListItemButton
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{
                    backgroundColor:
                      index === activeSuggestionIndex
                        ? colors.primary[300]
                        : "inherit",
                  }} // 현재 선택된 제안 항목 스타일 적용
                >
                  <ListItemText primary={suggestion} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )} */}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon /> // 다크 모드 아이콘
          ) : (
            <LightModeOutlinedIcon /> // 라이트 모드 아이콘
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
          {/* // 알림 아이콘 */}
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
          {/* // 설정 아이콘 */}
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
          {/* // 사용자 아이콘 */}
        </IconButton>
      </Box>
    </Box>
  );
};
export default Topbar;
