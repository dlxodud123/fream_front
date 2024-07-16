import React, { useState } from 'react';
import Header from "../../../common/header";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from "date-fns";
import TextField from '@mui/material/TextField';
import MypageList from "../MypageList";
import '../../css/buying/Buying.css';
import styled from '@emotion/styled';



const Buying = () => {

    let [buyCount, setBuyCount] = useState(0);
    let [afootCount, setAfootCount] = useState(0);
    let [endCount, setEndCount] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const currentDateLabel = format(new Date(), 'yyyy년 MM월 dd일');

    const StyledDatePicker = styled(DatePicker)`
    .MuiInputBase-root {
    color: red; // 여기에 원하는 CSS 스타일을 추가할 수 있습니다.}`;

    return(
        <div>

        <Header />
            <div className="container snb_area">
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
                            <div class="container text-center">
                                <div class="row">
                                    <div class="col">
                                        <div className="tab_box">
                                            <h4>{buyCount}</h4>
                                            <span>구매입찰</span>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div className="tab_box">
                                            <h4>{afootCount}</h4>
                                            <span>진행 중</span>
                                        </div>
                                    
                                    </div>
                                    <div class="col">
                                        <div className="tab_box">
                                            <h4>{endCount}</h4>
                                            <span>종료</span>
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
                                                sx={{width:"200px"}}
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
                                                sx={{width:"200px"}}
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
                                                onClick={()=>{}}
                                                >조회</button>
                                    </div>
                                </div>
                            </div>
                            <ul className='search_info'>
                                <li className=''>
                                    <p>한 번에 조회 가능한 기간은 최대 6개월입니다.</p>
                                </li>
                                <li>
                                    <p>기간별 조회 결과는 입찰일 기준으로 노출됩니다.</p>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )               
}

export default Buying;