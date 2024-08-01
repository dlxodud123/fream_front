import { useState } from 'react';
import './../css/modal/buy_history_modal.css';

const Buy_history_modal = (props) => {

    const [history_modal, setHistory_modal] = useState(false);

    return(
        <>
            <button onClick={() => setHistory_modal(true)} style={{width:"650px", height:"70px", fontWeight:600, fontSize:"21px", backgroundColor:"white", borderRadius:"10px", border:"1px solid rgba(0,0,0,0.2)"}}>구매 내역 상세보기</button>
            {
                history_modal ? (
                    <>
                        <div className='history_modal_container'>
                            <div className='history_modal_content'>
                                <div style={{display:"flex"}}>
                                    <div style={{width:"430px", marginTop:"10px", fontWeight:"bold", fontSize:"20px", marginLeft:"50px"}}>
                                        구매 내역
                                    </div>
                                    <div style={{width:"50px", height:"50px"}} onClick={() => setHistory_modal(false)}>
                                        <button style={{fontSize:"27px", border:"none", backgroundColor:"white"}}>x</button>
                                    </div>
                                </div>
                                <div style={{height:"10px"}}></div>

                                <div style={{}}>
                                    <div style={{width:"150px", height:"40px", fontWeight:"bold", textAlign:"left", fontSize:"19px", paddingLeft:"40px"}}>
                                        배송 주소
                                    </div>
                                    <div style={{borderBottom:"3px solid black", width:"400px", marginLeft:"40px"}}></div>
                                    <div style={{display:"flex"}}>
                                        <div style={{fontWeight:"600", textAlign:"left", width:"110px", marginLeft:"40px", height:"40px", marginTop:"10px"}}>
                                            받는 사람
                                        </div>
                                        <div style={{width:"290px", textAlign:"left", marginTop:"10px"}}>
                                            {/* 이태영 */}
                                            {props.data.buyerName}
                                        </div>
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <div style={{fontWeight:"600", textAlign:"left", width:"110px", marginLeft:"40px", height:"40px"}}>
                                            휴대폰 번호
                                        </div>
                                        <div style={{width:"290px", textAlign:"left"}}>
                                            {/* 010-1234-5678 */}
                                            {props.data.buyerTel}
                                        </div>
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <div style={{fontWeight:"600", textAlign:"left", width:"110px", marginLeft:"40px", height:"90px"}}>
                                            주소
                                        </div>
                                        <div style={{width:"290px", textAlign:"left"}}>
                                            {/* 서울 강남구 논현로34길 10 (도곡동) 1234 */}
                                            {props.data.buyerAddr}
                                        </div>
                                    </div>
                                </div>

                                <div style={{}}>
                                    <div style={{width:"200px", height:"40px", fontWeight:"bold", textAlign:"left", fontSize:"19px", paddingLeft:"40px"}}>
                                        배송 요청사항
                                    </div>
                                    <div style={{borderBottom:"3px solid black", width:"400px", marginLeft:"40px"}}></div>
                                    <div style={{display:"flex"}}>
                                        <div style={{fontWeight:"600", textAlign:"left", width:"110px", marginLeft:"40px", height:"90px", marginTop:"10px"}}>
                                            요청 사항
                                        </div>
                                        <div style={{width:"290px", textAlign:"left", marginTop:"10px"}}>
                                            {/* 파손 위험 상품입니다. 배송 시 주의해주세요 */}
                                            {props.data.request}
                                        </div>
                                    </div>
                                </div>

                                <div style={{}}>
                                    <div style={{width:"200px", height:"40px", fontWeight:"bold", textAlign:"left", fontSize:"19px", paddingLeft:"40px"}}>
                                        결제 정보
                                    </div>
                                    <div style={{borderBottom:"3px solid black", width:"400px", marginLeft:"40px"}}></div>
                                    <div style={{display:"flex"}}>
                                        <div style={{fontWeight:"600", textAlign:"left", width:"110px", marginLeft:"40px", height:"90px", marginTop:"10px"}}>
                                            신한카드
                                            {/* {props.data.cardName} */}
                                        </div>
                                        <div style={{width:"290px", textAlign:"left", marginTop:"10px"}}>
                                            559410*********0
                                            {/* {props.data.cardNumber} */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )
            }
        </>
    )
}

export default Buy_history_modal;