import React, { useEffect, useState } from "react";
import Header from "../../../common/header";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, parseISO, subMonths } from "date-fns";
import TextField from "@mui/material/TextField";
import MypageList from "../MypageList";
import "../../css/buying/Buying.css";
import ModalTender from "./modal/Tender.js";
import ModalProgres from "./modal/Progres.js";
import ModalDealEnd from "./modal/DealEnd.js";
import Footer from "../../../common/footer";
import axios from "axios";

const Buying = () => {

  const [buyingData, setBuyingData] = useState([]);
  const transformData = (data) => {
    return data.map((item) => {
      const formattedOrderDate = format(parseISO(item.orderDate), "yyyy/MM/dd");
      console.log("formattedOrderDate:", formattedOrderDate);
      return {
        id: item.orderId,
        image: item.productMainImageUrl,
        name: item.productNameKor,
        size: "265", // 이 값은 현재 데이터에서 제공되지 않으므로 하드코딩하였습니다.
        price: item.price.toLocaleString(), // 가격을 콤마로 구분된 문자열로 변환합니다.
        expiryDate: formattedOrderDate,
        //   ? new Date(formattedOrderDate).toLocaleDateString()
        //   : "N/A", // deliveryDate가 null인 경우 "N/A"로 설정
        deliveryStatus: item.deliveryStatus,
        productId: item.productId,
      };
    });
  };

  const buyListData = () => {
    //데이터 받음
    // axios.get("http://localhost:3000/my/buying")
    const token = localStorage.getItem("jwtToken");
    axios
      .get("/api/orders/buy", {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
        },
      })
      .then((response) => {
        console.log("데이터 성공:", response.data);
        // 데이터를 변환
        const transformedData = transformData(response.data);

        // 변환된 데이터를 상태에 저장
        console.log("데이터 변환 성공:", transformedData);
        setBuyingData(transformedData);
      });
  };

  useEffect(() => {
    buyListData(); // 컴포넌트가 마운트될 때 데이터가지고옴
  }, []);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const sendDateRangeToBackend = async (start, end) => {
    try {
      await axios.post("/my/buying", { startDate: start, endDate: end });
      console.log("날짜 전송 확인");
      console.log("start", start);
      console.log("end", end);
    } catch (error) {
      console.error("문제", error);
      console.log("error start", start);
      console.log("error end", end);
    }
  };

  const handleMonthClick = (months) => {
    const end = new Date();
    const start = subMonths(end, months);
    const data = {
      startDate: start.toISOString(), //전송
      endDate: end.toISOString(),
    };
    const apiUrl = "/api/my/buying";
    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log("성공:", response.data);
      })
      .catch((error) => {
        console.error("실패...:", error);
      });
    setStartDate(start);
    setEndDate(end);
    sendDateRangeToBackend(start, end);
  };

  let [buyCount, setBuyCount] = useState(0); //카운트 값 넣어야 함...
  let [afootCount, setAfootCount] = useState(0);
  let [endCount, setEndCount] = useState(0);

  const currentDateLabel = format(new Date(), "yyyy년 MM월 dd일");
  const [col_buyBtn, setCol_buyBtn] = useState("col_buyBtn_on");
  const [progres, setProgres] = useState("progres");
  const [buyEnd, setBuyEnd] = useState("buyEnd");

  const [isModalTenderOpen, setIsModalTenderOpen] = useState(false);
  const [isModalProgresOpen, setIsModalProgresOpen] = useState(false);
  const [isModalDealEndOpen, setIsModalDealEndOpen] = useState(false);

  // Modal 열기/닫기 함수
  const openModalTender = () => setIsModalTenderOpen(true);
  const closeModalTender = () => setIsModalTenderOpen(false);

  const openModalProgres = () => setIsModalProgresOpen(true);
  const closeModalProgres = () => setIsModalProgresOpen(false);

  const openModalDealEnd = () => setIsModalDealEndOpen(true);
  const closeModalDealEnd = () => setIsModalDealEndOpen(false);

  const handleColbuy = () => {
    setBuyEnd("buyEnd");
    setProgres("progres");
    if (col_buyBtn === "col_buyBtn") {
      setCol_buyBtn("col_buyBtn_on");
    }
    openModalTender();
    closeModalProgres();
    closeModalDealEnd();
  };

  const handleColIng = () => {
    setCol_buyBtn("col_buyBtn");
    setBuyEnd("buyEnd");
    if (progres === "progres") {
      setProgres("progres_on");
    }
    openModalProgres();
    closeModalTender();
    closeModalDealEnd();
  };

  const handleBuyEnd = () => {
    setCol_buyBtn("col_buyBtn");
    setProgres("progres");
    if (buyEnd === "buyEnd") {
      setBuyEnd("buyEnd_on");
    }
    openModalDealEnd();
    closeModalTender();
    closeModalProgres();
  };
  useEffect(() => {
    openModalTender();
  }, []);

  return (
    <div>
      <Header />
      <div className="container_box">
        <div className="bd-sidebar">
          <MypageList />
        </div>
        <div className="box-container">
          <div className="content_title">
            <div className="titlePoint">
              <h3>구매내역</h3>
            </div>
          </div>
          <div className="list_tab_detail_tab">
            <div className="row">
              <div className="container text-center">
                <div className="col">
                  <div className={col_buyBtn}>
                    <button className="tab_box" onClick={handleColbuy} e>
                      <h4>{buyCount}</h4>
                      <span>구매입찰</span>
                    </button>
                  </div>
                </div>
                <div className="col">
                  <div className={progres}>
                    <button className="tab_box" onClick={handleColIng}>
                      <h4>{afootCount}</h4>
                      <span>진행 중</span>
                    </button>
                  </div>
                </div>
                <div className="col">
                  <div className={buyEnd}>
                    <button className="tab_box" onClick={handleBuyEnd}>
                      <h4>{endCount}</h4>
                      <span>종료</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="period_search">
            <div className="period_month">
              <ul className="month_list">
                <li className="mon_btn">
                  <button
                    className="month_link"
                    onClick={() => handleMonthClick(2)}
                  >
                    최근2개월
                  </button>
                </li>
                <li className="mon_btn">
                  <button
                    className="month_link"
                    onClick={() => handleMonthClick(4)}
                  >
                    4개월
                  </button>
                </li>
                <li className="mon_btn">
                  <button
                    className="month_link"
                    onClick={() => handleMonthClick(6)}
                  >
                    6개월
                  </button>
                </li>
              </ul>
            </div>
            <div className="period_calendar_wrapper">
              <div className="perion_calendar">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label={`${currentDateLabel}`}
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                      if (endDate && newValue > endDate) {
                        setEndDate(newValue);
                      }
                    }}
                    sx={{ width: "180px" }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <div className="d">~</div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label={`${currentDateLabel}`}
                    value={endDate}
                    minDate={startDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: "180px" }}
                  />
                </LocalizationProvider>
              </div>
              <div className="period_btn">
                <button
                  className="btn_search"
                  onClick={() => sendDateRangeToBackend}
                >
                  조회
                </button>
              </div>
            </div>
          </div>
          <ul className="search_info">
            <li className="info_item">
              <p style={{ margin: "0" }}>
                한 번에 조회 가능한 기간은 최대 6개월입니다.
              </p>
            </li>
            <li className="info_item">
              <p style={{ margin: "0" }}>
                기간별 조회 결과는 입찰일 기준으로 노출됩니다.
              </p>
            </li>
          </ul>
          <div>
            {isModalTenderOpen && (
              <ModalTender
                onClose={closeModalTender}
                buyBreakdown={buyingData}
              />
            )}
            {isModalProgresOpen && (
              <ModalProgres
                onClose={closeModalProgres}
                buyBreakdown={buyingData}
              />
            )}
            {isModalDealEndOpen && (
              <ModalDealEnd
                onClose={closeModalDealEnd}
                buyBreakdown={buyingData}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Buying;
