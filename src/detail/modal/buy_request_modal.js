import "./../css/modal/buy_request_modal.css";
import { useState } from "react";
import img1 from "./../../img/img5.jpg"
import arrow_img from "./../../img/detail-page/arrow.png";

const Buy_request_modal = () => {
    const [buyModal, setBuyModal] = useState(false);
    const [pre_request, setPre_reqeust] = useState("");
    const [request, setRequest] = useState("요청사항 없음");

    const buy_link = () => {
        window.location.href = '/buy';
    }
    return(
        <>
            <button onClick={() => setBuyModal(true)} style={{width:"650px", height:"50px", marginLeft:"25px", marginTop:"10px", display:"flex"}}>
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
                            <button onClick={() => {setPre_reqeust("요청사항 없음")}} style={{width:"400px", height:"60px", border:"none", textAlign:"left"}}>요청사항 없음</button>
                            <div style={{width:"400px", height:"1px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>
                            <button onClick={() => {setPre_reqeust("문 앞에 놓아주세요")}} style={{width:"400px", height:"60px", border:"none", textAlign:"left"}}>문 앞에 놓아주세요</button>
                            <div style={{width:"400px", height:"1px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>
                            <button onClick={() => {setPre_reqeust("경비실에 맡겨 주세요")}} style={{width:"400px", height:"60px", border:"none", textAlign:"left"}}>경비실에 맡겨 주세요</button>
                            <div style={{width:"400px", height:"1px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>
                            <button onClick={() => {setPre_reqeust("파손 위험 상품입니다. 배송 시 주의해주세요")}} style={{width:"400px", height:"60px", border:"none", textAlign:"left"}}>파손 위험 상품입니다. 배송 시 주의해주세요</button>
                            <div style={{width:"400px", height:"1px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>
                        </div>
                        <div style={{display:"flex"}}>
                            <div>
                                <button onClick={() => {setBuyModal(false);}} style={{width:"130px", height:"45px", marginLeft:"105px"}}>취소</button>
                            </div>
                            <div>
                                <button onClick={() => {setRequest(pre_request); setBuyModal(false);}} style={{width:"130px", backgroundColor:"black", color:"white", fontWeight:"bold", height:"45px", marginLeft:"10px"}}>적용하기</button>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}
export default Buy_request_modal;