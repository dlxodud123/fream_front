import "./../css/modal/buy_request_modal.css";
import { useEffect, useState } from "react";
import arrow_img from "./../../img/detail-page/arrow.png";

const Buy_request_modal = (props) => {
    const [buyModal, setBuyModal] = useState(false);
    const [pre_request, setPre_reqeust] = useState("요청사항 없음");
    const [request, setRequest] = useState("요청사항 없음");
    const [requestBtn, setRequestBtn] = useState(1);

    console.log(request)

    useEffect(() => {
        if (props.setBuy_request) {
            props.setBuy_request(request);
        }
    }, [request, props.setBuy_request]);
    
    return(
        <>
            <button onClick={() => setBuyModal(true)} style={{width:"650px", height:"50px", marginLeft:"25px", marginTop:"10px", display:"flex", background:"white", borderRadius:"10px", border:"1px solid rgba(0,0,0,0.1)"}}>
                <div style={{width:"600px", marginLeft:"12px", marginTop:"13px", textAlign:"left"}}>{request}</div>
                <div style={{width:"25px", marginTop:"10px",textAlign:"right", fontWeight:"bold", float:"right"}}><img style={{width:"15px"}} src={arrow_img}></img></div>
            </button>
            {   
                buyModal &&
                <div className={'buy_request_modal-container'}>
                    <div className={'buy_request_modal-content'}>
                        <div style={{height:"55px" , display:"flex"}}>
                            <p style={{marginLeft:"180px",marginTop:"16px" , fontWeight:"bold", fontSize:"20px"}}>배송 요청사항</p>
                            <button className={'buy_request_modal-close-btn'} style={{width:"20px",marginLeft:"130px" ,border:"none", backgroundColor:"white", borderRadius:"20px"}} onClick={() => setBuyModal(false)}>
                                <p style={{fontSize:"30px", marginTop:"4px", fontWeight:"light", color:"rgba(0,0,0,0.5)"}}>x</p>
                            </button>
                        </div>
                        <div style={{width:"400px", height:"320px", marginLeft:"40px", marginTop:"20px"}}>

                            <button onClick={() => {setRequestBtn(1); setPre_reqeust("요청사항 없음")}} style={{width:"400px", height:"60px", border:"none", textAlign:"left", backgroundColor:"white"}}>
                                <div style={{display:"flex"}}>
                                    {
                                        requestBtn === 1 ? (
                                            <>
                                                <div style={{width:"350px", height:"30px", fontWeight:"bold", marginTop:"10px"}}>요청사항 없음</div>
                                                <div style={{width:"50px", height:"30px", fontSize:"20px", fontWeight:"bold", marginTop:"5px"}}>✔</div>
                                            </>
                                        ) : (
                                            <>
                                                <div style={{width:"350px", height:"30px", marginTop:"10px"}}>요청사항 없음</div>
                                                <div style={{width:"50px", height:"30px"}}></div>
                                            </>
                                        )
                                    }
                                </div>
                            </button>
                            <div style={{width:"400px", height:"1px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>

                            <button onClick={() => {setRequestBtn(2); setPre_reqeust("문 앞에 놓아주세요")}} style={{width:"400px", height:"60px", border:"none", textAlign:"left", backgroundColor:"white"}}>
                                <div style={{display:"flex"}}>
                                    {
                                        requestBtn === 2 ? (
                                            <>
                                                <div style={{width:"350px", height:"30px", fontWeight:"bold", marginTop:"10px"}}>문 앞에 놓아주세요</div>
                                                <div style={{width:"50px", height:"30px", fontSize:"20px", fontWeight:"bold", marginTop:"5px"}}>✔</div>
                                            </>
                                        ) : (
                                            <>
                                                <div style={{width:"350px", height:"30px", marginTop:"10px"}}>문 앞에 놓아주세요</div>
                                                <div style={{width:"50px", height:"30px"}}></div>
                                            </>
                                        )
                                    }
                                </div>
                            </button>
                            
                            <div style={{width:"400px", height:"1px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>
                            
                            <button onClick={() => {setRequestBtn(3); setPre_reqeust("경비실에 맡겨 주세요")}} style={{width:"400px", height:"60px", border:"none", textAlign:"left", backgroundColor:"white"}}>
                                <div style={{display:"flex"}}>
                                    {
                                        requestBtn === 3 ? (
                                            <>
                                                <div style={{width:"350px", height:"30px", fontWeight:"bold", marginTop:"10px"}}>경비실에 맡겨 주세요</div>
                                                <div style={{width:"50px", height:"30px", fontSize:"20px", fontWeight:"bold", marginTop:"5px"}}>✔</div>
                                            </>
                                        ) : (
                                            <>
                                                <div style={{width:"350px", height:"30px", marginTop:"10px"}}>경비실에 맡겨 주세요</div>
                                                <div style={{width:"50px", height:"30px"}}></div>
                                            </>
                                        )
                                    }
                                </div>
                            </button>
                            <div style={{width:"400px", height:"1px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>

                            <button onClick={() => {setRequestBtn(4); setPre_reqeust("파손 위험 상품입니다. 배송 시 주의해주세요")}} style={{width:"400px", height:"60px", border:"none", textAlign:"left", backgroundColor:"white"}}>
                                
                                <div style={{display:"flex"}}>
                                    {
                                        requestBtn === 4 ? (
                                            <>
                                                <div style={{width:"350px", height:"30px", fontWeight:"bold", marginTop:"10px"}}>파손 위험 상품입니다. 배송 시 주의해주세요</div>
                                                <div style={{width:"50px", height:"30px", fontSize:"20px", fontWeight:"bold", marginTop:"5px"}}>✔</div>
                                            </>
                                        ) : (
                                            <>
                                                <div style={{width:"350px", height:"30px", marginTop:"10px"}}>파손 위험 상품입니다. 배송 시 주의해주세요</div>
                                                <div style={{width:"50px", height:"30px"}}></div>
                                            </>
                                        )
                                    }
                                </div>
                            </button>
                            <div style={{width:"400px", height:"1px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>
                        </div>
                        <div style={{display:"flex"}}>
                            <div>
                                <button onClick={() => {setBuyModal(false);}} style={{width:"130px", height:"45px", marginLeft:"105px", borderRadius:"10px", border:"1px solid rgba(0,0,0,0.1)"}}>취소</button>
                            </div>
                            <div>
                                <button onClick={() => {setRequest(pre_request); setBuyModal(false);}} style={{width:"130px", backgroundColor:"black", color:"white", fontWeight:"bold", height:"45px", marginLeft:"10px", borderRadius:"10px", border:"none"}}>적용하기</button>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}
export default Buy_request_modal;