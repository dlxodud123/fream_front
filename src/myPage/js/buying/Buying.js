import React, { useEffect, useState } from 'react';
import Header from "../../../common/header";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from "date-fns";
import TextField from '@mui/material/TextField';
import MypageList from "../MypageList";
import '../../css/buying/Buying.css';
import ModalTender from './modal/Tender.js';
import ModalProgres from './modal/Progres.js';
import ModalDealEnd from './modal/DealEnd.js';
import Footer from '../../../common/footer';


const Buying = () => {
    let [buyCount, setBuyCount] = useState(0);
    let [afootCount, setAfootCount] = useState(0);
    let [endCount, setEndCount] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const currentDateLabel = format(new Date(), 'yyyy년 MM월 dd일');
    
    const [col_buyBtn, setCol_buyBtn] =useState('col_buyBtn_on')
    const [progres, setProgres] = useState('progres');
    const [buyEnd, setBuyEnd] =useState('buyEnd')

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
        setBuyEnd('buyEnd');
        setProgres('progres');
        if (col_buyBtn === "col_buyBtn") {
            setCol_buyBtn('col_buyBtn_on');
        }
        openModalTender();
        closeModalProgres();
        closeModalDealEnd();
    };

    const handleColIng = () => {
        setCol_buyBtn('col_buyBtn');
        setBuyEnd('buyEnd');
        if (progres === "progres") {
            setProgres("progres_on");
        }
        openModalProgres();
        closeModalTender();
        closeModalDealEnd();
    };

    const handleBuyEnd = () => {
        setCol_buyBtn('col_buyBtn');
        setProgres('progres');
        if (buyEnd === "buyEnd") {
            setBuyEnd('buyEnd_on');
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
                    <div className="row" >
                    <div className="container text-center">
                            <div className="col">
                                <div className={col_buyBtn}>
                                    <button className="tab_box" 
                                            onClick={handleColbuy}
                                            e>
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
                                <button className="month_link">최근2개월</button></li>
                            <li className="mon_btn">
                                <button className="month_link">4개월</button></li>
                            <li className="mon_btn">
                                <button className="month_link">6개월</button></li>
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
                            {startDate && endDate && (
                                <div>
                                    Selected Period: {startDate.toString()} - {endDate.toString()}
                                </div>
                            )}
                        </div>
                        <div className="period_btn">
                            <button className="btn_search"
                                onClick={() => { }}
                            >조회</button>
                        </div>
                    </div>
                </div>
                <ul className='search_info'>
                    <li className='info_item'>
                        <p style={{ margin: '0' }}>한 번에 조회 가능한 기간은 최대 6개월입니다.</p>
                    </li>
                    <li className='info_item'>
                        <p style={{ margin: '0' }}>기간별 조회 결과는 입찰일 기준으로 노출됩니다.</p>
                    </li>
                </ul>
                <div>
                    {isModalTenderOpen && <ModalTender onClose={closeModalTender} />}
                    {isModalProgresOpen && <ModalProgres onClose={closeModalProgres} />}
                    {isModalDealEndOpen && <ModalDealEnd onClose={closeModalDealEnd} />}
                </div>
            </div>
        </div>
    <Footer />
    </div>
    )
}


export default Buying;
