import { useEffect, useState } from "react";
// useState 훅을 가져옵니다. 이를 통해 함수형 컴포넌트에서 상태를 관리할 수 있습니다.

import FullCalendar, { formatDate } from "@fullcalendar/react";
// FullCalendar 컴포넌트와 날짜 형식을 지정하는 함수 formatDate를 가져옵니다.

import dayGridPlugin from "@fullcalendar/daygrid";
// 일정을 월별 보기로 표시하는 Day Grid 플러그인을 가져옵니다.

import timeGridPlugin from "@fullcalendar/timegrid";
// 일정을 주별 및 일별 보기로 표시하는 Time Grid 플러그인을 가져옵니다.

import interactionPlugin from "@fullcalendar/interaction";
// 사용자 상호작용(예: 드래그 앤 드롭, 날짜 선택 등)을 처리하는 플러그인을 가져옵니다.

import listPlugin from "@fullcalendar/list";
// 일정을 리스트 형태로 표시하는 List 플러그인을 가져옵니다.

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
// Material-UI에서 Box, List, ListItem, ListItemText, Typography, useTheme 컴포넌트를 가져옵니다.

// import Header from "../../components/Header";
// 프로젝트의 Header 컴포넌트를 가져옵니다.

import { tokens } from "../../theme";
import axios from "axios";
// 테마의 색상을 가져오는 tokens 유틸리티를 가져옵니다.

const Calendar = (isDashboard = false) => {
  const theme = useTheme();
  // 현재 테마를 가져옵니다.

  const colors = tokens(theme.palette.mode);
  // 현재 테마 모드(light 또는 dark)에 맞는 색상 팔레트를 가져옵니다.

  const [currentEvents, setCurrentEvents] = useState([]);
  // 현재 일정(events)을 관리하기 위한 상태를 선언합니다.
  const [userId] = useState("mainadmin1");
  // 로그인된 사용자 ID로 변경 필요

  //처음 로딩 구간에서 데이터를 받아오도록
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `/api/schedules/${userId}`
        );
        setCurrentEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      }
    };

    fetchSchedules();
  }, [userId]);

  const handleDateClick = async (selected) => {
    // 날짜를 클릭했을 때 호출되는 함수입니다.
    const title = prompt("이벤트 이름을 입력하시오");
    // 새로운 이벤트의 제목을 입력받기 위해 사용자에게 프롬프트를 표시합니다.

    const calendarApi = selected.view.calendar;
    // 선택된 뷰의 캘린더 API를 가져옵니다.

    calendarApi.unselect();
    // 선택된 날짜를 해제합니다.

    // if (title) {
    //   // 제목이 입력된 경우
    //   calendarApi.addEvent({
    //     // 새로운 이벤트를 추가합니다.
    //     id: `${selected.dateStr}-${title}`,
    //     title,
    //     start: selected.startStr,
    //     end: selected.endStr,
    //     // end: new Date(selected.endStr), // endStr을 새로운 Date 객체로 생성하여 포함하지 않는 날짜 문제 해결
    //     // allDay: selected.allDay,
    //     end: selected.endStr,
    //     userId,
    //   });
    // }
    if (title) {
      const newEvent = {
        title,
        start: selected.startStr,
        end: selected.endStr,
        userId,
      };
      try {
        const response = await axios.post(
          "/api/schedules",
          newEvent
        );
        setCurrentEvents([...currentEvents, response.data]);
      } catch (error) {
        console.error("Failed to save event:", error);
      }
    }
  };

  const handleEventClick = async (selected) => {
    // 이벤트를 클릭했을 때 호출되는 함수입니다.
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    )
      try {
        await axios.delete(
          `/api/schedules/${selected.event.id}`
        );
        selected.event.remove();
        // 사용자에게 이벤트 삭제를 확인하고, 확인된 경우 이벤트를 제거합니다.
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
  };

  return (
    <Box m="20px" sx={{ minWidth: "1200px", maxWidth: "1200px" }}>
      {/* 박스 외부의 margin을 20px로 설정합니다. */}
      {/* <Header title="일정" subtitle="일정 관리" /> */}
      {/* Header 컴포넌트를 사용하여 제목과 부제목을 설정합니다. */}

      <Box display="flex" justifyContent="space-between">
        {/* 내부 박스를 플렉스 컨테이너로 설정하고, 자식 요소들을 양쪽 끝으로 배치합니다. */}

        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          // 플렉스 박스로 설정하여 해당 박스가 20%의 너비를 차지하도록 합니다.
          backgroundColor={colors.primary[400]}
          // 박스의 배경색을 현재 테마의 primary 색상으로 설정합니다.
          p="15px"
          // 박스 내부의 padding을 15px로 설정합니다.
          borderRadius="4px"
          // 박스의 모서리를 4px 둥글게 설정합니다.
        >
          <Typography variant="h5">일정</Typography>
          {/* 제목을 표시하는 Typography 컴포넌트입니다. */}
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  // 각 이벤트 항목의 배경색을 현재 테마의 greenAccent 색상으로 설정합니다.
                  margin: "10px 0",
                  // 각 이벤트 항목의 위아래 margin을 10px로 설정합니다.
                  borderRadius: "2px",
                  // 각 이벤트 항목의 모서리를 2px 둥글게 설정합니다.
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {/* 이벤트의 시작 날짜를 '년 월 일' 형식으로 표시합니다. */}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* 일정 목록 사이드바: 일정 이벤트 목록을 표시합니다. */}

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          {/* 플렉스 박스로 설정하여 해당 박스가 나머지 100%의 너비를 차지하도록 하며, 왼쪽 margin을 15px로 설정합니다. */}
          <FullCalendar
            height="75vh"
            // 캘린더의 높이를 75vh로 설정합니다.

            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            // 사용될 FullCalendar 플러그인들을 설정합니다.

            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            // 캘린더의 헤더 툴바를 설정합니다. 좌측에 이전, 다음, 오늘 버튼, 중앙에 제목, 우측에 월별, 주별, 일별, 월간 리스트 뷰 버튼을 배치합니다.

            initialView="dayGridMonth"
            // 초기 뷰를 월별 보기로 설정합니다.

            editable={true}
            // 이벤트를 드래그 앤 드롭으로 수정할 수 있도록 설정합니다.

            selectable={true}
            // 날짜를 선택할 수 있도록 설정합니다.

            selectMirror={true}
            // 선택할 때 미러 효과를 사용합니다.

            dayMaxEvents={true}
            // 하루에 표시할 최대 이벤트 수를 설정합니다.

            select={handleDateClick}
            // 날짜를 선택했을 때 호출될 함수로 handleDateClick을 설정합니다.

            eventClick={handleEventClick}
            // 이벤트를 클릭했을 때 호출될 함수로 handleEventClick을 설정합니다.

            // eventsSet={(events) => setCurrentEvents(events)}
            // 이벤트가 설정될 때 호출될 함수로 현재 이벤트를 업데이트합니다.
            events={currentEvents}
            // initialEvents={[
            //   //이부분에 일정을 DB에서 받아서 등록하면 될 꺼 같다.
            //   {
            //     id: "12315",
            //     title: "project-Fream start",
            //     start: "2024-06-25",
            //     end: "2024-06-25",
            //   },
            //   {
            //     id: "5123",
            //     title: "맛집찾자",
            //     date: "2024-06-30",
            //   },
            // ]}
            // 초기 이벤트를 설정합니다.
          />
        </Box>
        {/* FullCalendar 컴포넌트를 사용하여 인터랙티브한 캘린더를 표시합니다. */}
      </Box>
    </Box>
  );
};

export default Calendar;
// Calendar 컴포넌트를 내보내어 다른 파일에서 사용할 수 있게 합니다.
