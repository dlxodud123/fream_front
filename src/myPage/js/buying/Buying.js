import Header from "../../../common/header";
import MypageList from "../MypageList";
import '../../css/buying/Buying.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from "date-fns";


const Buying = () => {

    let [buyCount, setBuyCount] = useState(0);
    let [afootCount, setAfootCount] = useState(0);
    let [endCount, setEndCount] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const currentDateLabel = format(new Date(), 'yyyy년 MM월 dd일');

    return(
        <div>

        <Header />
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <MypageList />
                    </div>
                    <div className="col-sm-9">
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
                                />
                              </LocalizationProvider>
                                {startDate && endDate && (
                                    <div>
                                        Selected Period: {startDate.toString()} - {endDate.toString()}
                                    </div>
                                )}
                                <div className="period_btn">
                                    <button className="btn_search"
                                            onClick={()=>{}}
                                            >조회</button>
                                </div>
                            </div>
                                            :::{startDate}{endDate}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )               
}

export default Buying;