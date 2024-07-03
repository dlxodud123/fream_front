import './css/buy_form.css';
import Footer from "../common/footer";
import Header from "../common/header";
import Buy_request_modal from './modal/buy_request_modal';
import img from "../img/img5.jpg";
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import delivery_img1 from "./../img/detail-page/ship_imfo.png"
import delivery_img2 from "./../img/detail-page/ship_imfo2.png"
import naver_img from "./../img/detail-page/naver_pay.png";
import kakao_img from "./../img/detail-page/kakao_pay.png";
import toss_img from "./../img/detail-page/toss_pay.png";
import payco_img from "./../img/detail-page/payco_pay.png";
import { useParams } from 'react-router-dom';

const Buy_form = () => {

    let {size, data} = useParams(); 
    let parseData = JSON.parse(decodeURIComponent(data));

    let [deliveryBtn, setDeliveryBtn] = useState(1);
    let [paymentBtn, setPaymentBtn] = useState();

    const DeliveryButton = styled.button`
        height: 70px;
        width: 650px;
        border: ${(props) => (props.active ? '1px black solid' : '1px rgba(0,0,0,0.1) solid')};
    `;
    const PaymentButton = styled.button`
        height: 70px;
        width: 210px;
        border: ${(props) => (props.active ? '1px black solid' : '1px rgba(0,0,0,0.1) solid')};
    `;

    console.log(data[0]);

    return(
        <>
            <Header></Header>
            <div className='buy_all'>
                <div className="buy_container">
                    {size}
                    {parseData.price}
                    <div style={{height:"30px", backgroundColor:"#f4f4f4"}}/>
                    <div className='buy_content'>
                        <img style={{width:"100px",borderRadius:"15px" , float:"left", marginTop:"25px", marginBottom:"25px", marginLeft:"25px"}} src={img}>
                        </img>
                        <div style={{marginTop:"25px", marginLeft:"15px", width:"400px", textAlign:"left"}}>
                            <div style={{fontWeight:"bold"}}>
                                DZ4137-700
                            </div>
                            <div>
                                (W) Jordan 1 x Travis Scott Retro Low OG SP Canary
                            </div>
                            <div style={{color:"rgba(0,0,0,0.5)"}}>
                                (W) 조던 1 x 트래비스 스캇 레트로 로우 OG SP 카나리
                            </div>
                            <div style={{fontWeight:"bold"}}>
                                W220
                            </div>
                        </div>
                    </div>
                    <div style={{height:"15px", backgroundColor:"#f4f4f4"}}/>
                    <div className='buy_delivery'>
                        <div style={{width:"200px", paddingTop:"30px", marginLeft:"25px", textAlign:"left", fontSize:"20px", fontWeight:"bold"}}>
                            배송 주소
                        </div>
                        <div style={{display:"flex", paddingTop:"10px"}}>
                            <div style={{width:"100px", marginLeft:"25px", textAlign:"left", color:"rgba(0,0,0,0.5)"}}>받는 분</div><div>이태영</div>
                        </div>
                        <div style={{display:"flex", paddingTop:"5px"}}>
                            <div style={{width:"100px", marginLeft:"25px", textAlign:"left", color:"rgba(0,0,0,0.5)"}}>연락처</div><div>010-3858-5430</div>
                        </div>
                        <div style={{display:"flex", paddingTop:"5px"}}>
                            <div style={{width:"100px", marginLeft:"25px", textAlign:"left", color:"rgba(0,0,0,0.5)"}}>배송 주소</div><div>(01388) 서울 도봉구 해등로 242-11 (쌍문동, 성원아파트) 105동 502호</div>
                        </div>
                        <div style={{marginTop:"15px"}}>
                            <Buy_request_modal></Buy_request_modal>
                        </div>

                        <div style={{width:"650px", height:"1px", backgroundColor:"rgba(0,0,0,0.1)", marginLeft:"25px", marginTop:"20px"}} />

                        <div style={{width:"200px", paddingTop:"30px", marginLeft:"25px", textAlign:"left", fontSize:"20px", fontWeight:"bold"}}>
                            배송 방법
                        </div>
                        <div style={{marginTop:"10px", width:"700px"}}>
                            <DeliveryButton active={deliveryBtn === 1} onClick={() => setDeliveryBtn(1)}>
                                <div style={{display:"flex"}}>
                                    <div style={{marginLeft:"10px"}}>
                                        <img src={delivery_img1} style={{width:"60px"}}></img>
                                    </div>
                                    <div style={{marginLeft:"15px", marginTop:"10px"}}>
                                        <div style={{textAlign:'left', fontSize:"14px", display:"flex"}}>
                                            <div style={{fontWeight:"bold"}}>일반배송</div>&nbsp;
                                            <div>3,000원</div>
                                        </div>
                                        <div style={{textAlign:'left', color:"rgba(0,0,0,0.5)", fontSize:"13px"}}>검수 후 배송 ・ 5-7일 내 도착 예정</div>
                                    </div>
                                </div>
                            </DeliveryButton>
                        </div>
                        <div style={{marginTop:"5px"}}>
                            <DeliveryButton active={deliveryBtn === 2} onClick={() => setDeliveryBtn(2)}>
                            <div style={{display:"flex"}}>
                                <div style={{marginLeft:"10px"}}>
                                        <img src={delivery_img2} style={{width:"60px"}}></img>
                                </div>
                                <div style={{marginLeft:"15px", marginTop:"10px"}}>
                                    <div style={{textAlign:'left', fontSize:"14px", display:"flex"}}>
                                        <div style={{fontWeight:"bold"}}>창고보관</div>&nbsp;
                                        <div>첫 30일 무료</div>
                                    </div>
                                <div style={{textAlign:'left', color:"rgba(0,0,0,0.5)", fontSize:"13px"}}>배송 없이 창고에 보관 ・ 빠르게 판매 가능</div>
                                </div>
                            </div> 
                            </DeliveryButton>
                        </div>
                    </div>
                    <div style={{height:"15px", backgroundColor:"#f4f4f4"}}/>
                    <div className='buy_payment'>
                        <div style={{width:"200px", paddingTop:"30px", marginLeft:"25px", textAlign:"left", fontSize:"20px", fontWeight:"bold"}}>
                            결제 방식
                        </div>
                        <div style={{textAlign:"left", marginLeft:"25px", marginTop:"10px", display:"flex"}}>
                            <div>일반 결제</div>&nbsp;
                            <div style={{fontSize:"13px", color:"rgba(0,0,0,0.5)", marginTop:"2px"}}>일시불·할부</div>
                        </div>
                        <div style={{textAlign:"left", marginLeft:"25px", marginTop:"10px"}}>
                            <div style={{display:"flex"}}>
                                <PaymentButton active={paymentBtn === 1} onClick={() => setPaymentBtn(1)}>
                                    <div style={{float:"left", marginLeft:"15px"}}>신용카드</div>
                                </PaymentButton>
                                <PaymentButton active={paymentBtn === 2} onClick={() => setPaymentBtn(2)} style={{marginLeft:"10px"}}>
                                    <div style={{float:"left", marginLeft:"15px"}}>네이버페이</div>
                                    <img src={naver_img} style={{width:"50px", float:"right", marginRight:"13px", marginTop:"1px"}}></img>
                                </PaymentButton>
                                <PaymentButton active={paymentBtn === 3} onClick={() => setPaymentBtn(3)} style={{marginLeft:"10px"}}>
                                    <div style={{float:"left", marginLeft:"15px"}}>카카오페이</div>
                                    <img src={kakao_img} style={{width:"50px", float:"right", marginRight:"13px", marginTop:"2px"}}></img>
                                </PaymentButton>
                            </div>
                            <div style={{marginTop:"5px"}}>
                                <PaymentButton active={paymentBtn === 4} onClick={() => setPaymentBtn(4)}>
                                    <div style={{float:"left", marginLeft:"15px"}}>토스페이</div>
                                    <img src={toss_img} style={{width:"50px", float:"right", marginRight:"13px"}}></img>
                                </PaymentButton>
                                <PaymentButton active={paymentBtn === 5} onClick={() => setPaymentBtn(5)} style={{marginLeft:"10px"}}>
                                    <div style={{float:"left", marginLeft:"15px"}}>페이코</div>
                                    <img src={payco_img} style={{width:"50px", float:"right", marginRight:"13px", marginTop:"3px"}}></img>
                                </PaymentButton>
                            </div>
                            <div>
                                <div style={{fontSize:"12px", marginTop:"10px", color:"rgba(0,0,0,0.7)", width:"650px"}}>
                                    체결 후 결제 정보 변경은 불가하며 분할 납부 변경은 카드사 문의 바랍니다. 단, 카드사별 정책에 따라 분할 납부 변경 시 수수료가 발생할 수 있습니다.
                                </div>
                                <div style={{marginTop:"15px"}}>
                                    <div style={{display:"flex"}}>
                                        <div style={{color:"rgba(0,0,0,0.7)", width:"110px", fontSize:"12px"}}>우리카드</div>
                                        <div style={{color:"rgba(0,0,0,0.5)", fontSize:"12px"}}>KREAM카드 최대 5% 청구할인</div>
                                    </div>
                                    <div style={{display:"flex", marginTop:"5px"}}>
                                        <div style={{color:"rgba(0,0,0,0.7)", width:"110px", fontSize:"12px"}}>네이버페이</div>
                                        <div style={{color:"rgba(0,0,0,0.5)", fontSize:"12px"}}>최대 2.1% 네이버페이포인트 적립</div>
                                    </div>
                                    <div style={{display:"flex", marginTop:"5px"}}>
                                        <div style={{color:"rgba(0,0,0,0.7)", width:"110px", fontSize:"12px"}}>삼성카드</div>
                                        <div style={{color:"rgba(0,0,0,0.5)", fontSize:"12px"}}>10만원 이상 LINK 청구할인 3%</div>
                                    </div>
                                    <div style={{display:"flex", marginTop:"5px"}}>
                                        <div style={{color:"rgba(0,0,0,0.7)", width:"110px", fontSize:"12px"}}>현대카드</div>
                                        <div style={{color:"rgba(0,0,0,0.5)", fontSize:"12px"}}>18개월/24개월 특별 할부 혜택</div>
                                    </div>
                                    <div style={{display:"flex", marginTop:"5px"}}>
                                        <div style={{color:"rgba(0,0,0,0.7)", width:"110px", fontSize:"12px"}}>국민카드</div>
                                        <div style={{color:"rgba(0,0,0,0.5)", fontSize:"12px"}}>12개월/18개월 특별 할부 혜택</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{height:"15px", backgroundColor:"#f4f4f4"}}/>
                    <div className='buy_final_payment'>
                        <div style={{width:"200px", paddingTop:"30px", marginLeft:"25px", textAlign:"left", fontSize:"20px", fontWeight:"bold"}}>
                            최종 주문정보
                        </div>
                        <div style={{display:"flex", marginTop:"15px"}}>
                            <div style={{marginLeft:"25px", width:"500px", textAlign:"left", fontSize:"15px"}}>
                                즉시 구매가
                            </div>
                            <div style={{textAlign:"right", width:"150px", fontSize:"15px", fontWeight:"bold"}}>
                                340,000원
                            </div>
                        </div>
                        <div style={{display:"flex", marginTop:"15px"}}>
                            <div style={{marginLeft:"25px", width:"500px", textAlign:"left", fontSize:"15px", color:"rgba(0,0,0,0.5)"}}>
                                검수비
                            </div>
                            <div style={{textAlign:"right", width:"150px", fontSize:"15px"}}>
                                무료
                            </div>
                        </div>
                        <div style={{display:"flex", marginTop:"15px"}}>
                            <div style={{marginLeft:"25px", width:"500px", textAlign:"left", fontSize:"15px", color:"rgba(0,0,0,0.5)"}}>
                                수수료
                            </div>
                            <div style={{textAlign:"right", width:"150px", fontSize:"15px"}}>
                                11,200원
                            </div>
                        </div>
                        <div style={{display:"flex", marginTop:"15px"}}>
                            <div style={{marginLeft:"25px", width:"500px", textAlign:"left", fontSize:"15px", color:"rgba(0,0,0,0.5)"}}>
                                배송비
                            </div>
                            <div style={{textAlign:"right", width:"150px", fontSize:"15px"}}>
                                3,000원
                            </div>
                        </div>
                    </div>
                    <div className='buy_total_payment'>
                        <div style={{width:"200px", paddingTop:"30px", marginLeft:"25px", textAlign:"left", fontSize:"17px", fontWeight:"bold"}}>
                            총 결제금액
                        </div>
                        <div style={{paddingTop:"30px"}}>
                            <div style={{display:"flex",width:"450px", color:"rgb(241, 87, 70)", fontSize:"13px", paddingLeft:"249px"}}>
                                <div style={{fontWeight:"700"}}>주의!</div>&nbsp;<div>최근 거래가를 확인해주세요.</div>
                            </div>
                            <div style={{textAlign:"right", fontWeight:"bold", fontSize:"20px"}}>354,200원</div>
                        </div>
                    </div>
                    <div className='order_agreemnet_button'>
                        <button style={{width:"630px", backgroundColor:"black", color:"white", marginTop:"20px", fontWeight:"bold"}}>
                            354,200원・일반배송 결제하기
                        </button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Buy_form;