import './css/buy_form.css';
import Footer from "../common/footer";
import Detail_buy_header from '../common/detail_buy_header';
import Buy_request_modal from './modal/buy_request_modal';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import delivery_img1 from "./../img/detail-page/ship_imfo.png";
import delivery_img2 from "./../img/detail-page/ship_imfo2.png";
import naver_img from "./../img/detail-page/naver_pay.png";
import kakao_img from "./../img/detail-page/kakao_pay.png";
import toss_img from "./../img/detail-page/toss_pay.png";
import payco_img from "./../img/detail-page/payco_pay.png";
import { useParams } from 'react-router-dom';
import Buy_delivery_modal from './modal/buy_delivery_modal';

const Buy_form = () => {
    let [finalName, setFinalName] = useState();
    let [finalNumber, setFinalNumber] = useState('');
    let [finalZonecode, setFinalZonecode] = useState();
    let [finalRoadaddress, setFinalRoadaddress] = useState();
    let [finalBname, setFinalBname] = useState();
    let [finalBuildingname, setFinalBuildingname] = useState();
    let [finalBetterAddress, setFinalBetterAddress] = useState();
    let [finalSaveBtn, setFinalSaveBtn] = useState(false);
    let [finalCardBtn, setFinalCardBtn] = useState(false);

    let {size, data} = useParams(); 
    let parseData = JSON.parse(decodeURIComponent(data));

    let [deliveryBtn, setDeliveryBtn] = useState(1);
    let [paymentBtn, setPaymentBtn] = useState();

    let [NumberVal, setNumberVal] = useState();

    let [finalBtn, setFinalBtn] = useState(false);

    let [buy_request, setBuy_request] = useState("");

    const { IMP } = window;
    IMP.init("imp04577308");

    console.log(parseData.prid);
    console.log(size);
    console.log(finalName);
    console.log(finalNumber);
    console.log(finalZonecode);
    console.log(finalRoadaddress);
    console.log(finalBname);
    console.log(finalBuildingname);
    console.log(finalBetterAddress);
    console.log(buy_request);

    async function onClickPayments() {
        console.log("결제구현");
        IMP.request_pay(
          {
            pg: "html5_inicis", // PG사 코드와 상점 ID
            pay_method: "card",
            merchant_uid: `payment-${crypto.randomUUID()}`, // 주문 고유 번호
            name: "노르웨이 회전 의자",
            amount: 100,
            buyer_email: "gildong@gmail.com",
            buyer_name: "홍길동",
            buyer_tel: "010-4242-4242",
            buyer_addr: "서울특별시 강남구 신사동",
            buyer_postcode: "01181",
          },
          function (response) {
            // 결제 종료 시 호출되는 콜백 함수
            if (response.success) {
              // 결제 성공 시 로직
              console.log("결제 성공:", response);
              // 결제 성공 후 처리할 로직을 작성하세요.
            } else {
              // 결제 실패 시 로직
              console.log("결제 실패:", response.error_msg);
              alert("결제에 실패하였습니다. 에러내용: " + response.error_msg);
            }
          }
        );
      }

    const DeliveryButton = styled.button`
        height: 70px;
        width: 650px;   
        background-color: white;
        border-radius: 10px;
        border: ${(props) => (props.active ? '1px black solid' : '1px rgba(0,0,0,0.1) solid')};
    `;
    const PaymentButton = styled.button`
        height: 70px;
        width: 210px;
        background-color: white;
        border-radius: 10px;
        border: ${(props) => (props.active ? '1px black solid' : '1px rgba(0,0,0,0.1) solid')};
    `;

    useEffect(() => {
        if (finalNumber.length == 11) {
            
            const formatPhoneNumber4 = (number) => {
                const cleaned = ('' + number).replace(/\D/g, '');
                const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
                if (match) {
                    const maskedMiddle = match[2][0] + '***';
                    const maskedEnd = '*' + match[3].slice(1);
                    return `${match[1]}-${maskedMiddle}-${maskedEnd}`;
                }
                return number;
            };
            setNumberVal(formatPhoneNumber4(finalNumber));
        }else if (finalNumber.length == 10){

            const formatPhoneNumber3 = (number) => {
                const cleaned = ('' + number).replace(/\D/g, '');
                const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
                if (match) {
                    const maskedMiddle = match[2][0] + '**';
                    const maskedEnd = '*' + match[3].slice(1);
                    return `${match[1]}-${maskedMiddle}-${maskedEnd}`;
                }
                return number;
            };
            setNumberVal(formatPhoneNumber3(finalNumber));
        }
    }, [finalNumber])

    const formatBtn = () => {
        setFinalSaveBtn(false);
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(price);
    };

    useEffect(() => {
        console.log(finalSaveBtn);
        console.log(finalCardBtn);
        if (finalSaveBtn && finalCardBtn) {
            setFinalBtn(true);
        }else{
            setFinalBtn(false);
        }
    }, [finalSaveBtn, finalCardBtn, setFinalBtn]);

    const formatName = (str) => {
        return str[0] + '*'.repeat(str.length - 1);
    };

    return(
        <>
            <Detail_buy_header></Detail_buy_header>
            <div className='buy_all'>
                <div className="buy_container">
                    <div style={{height:"30px", backgroundColor:"#f4f4f4"}}/>
                    <div className='buy_content'>
                        <img style={{width:"100px",borderRadius:"15px" , float:"left", marginTop:"25px", marginBottom:"25px", marginLeft:"25px", backgroundColor:"rgb(244,244,244)"}} src={`${process.env.PUBLIC_URL}/images/${parseData.imgName}`}>
                        </img>
                        <div style={{marginTop:"25px", marginLeft:"15px", width:"400px", textAlign:"left"}}>
                            <div style={{fontWeight:"bold"}}>
                                {parseData.prid}
                            </div>
                            <div>
                                {parseData.nameEng}
                            </div>
                            <div style={{color:"rgba(0,0,0,0.5)"}}>
                                {parseData.nameKor}
                            </div>
                            <div style={{fontWeight:"bold"}}>
                                {size}
                            </div>
                        </div>
                    </div>
                    <div style={{height:"15px", backgroundColor:"#f4f4f4"}}/>
                    {finalSaveBtn ? (
                        <>
                            <div style={{height:"480px"}} className='buy_delivery'>
                                <div style={{display:"flex"}}>
                                    <div style={{width:"610px"}}>
                                        <div style={{width:"200px", paddingTop:"30px", marginLeft:"25px", textAlign:"left", fontSize:"20px", fontWeight:"bold"}}>
                                            배송 주소
                                        </div>
                                        <div style={{display:"flex", paddingTop:"10px"}}>
                                            <div style={{fontSize:"14px", width:"100px", marginLeft:"25px", textAlign:"left", color:"rgba(0,0,0,0.5)"}}>받는 분</div>
                                            <div style={{fontSize:"14px"}}>{formatName(finalName)}</div>
                                        </div>
                                        <div style={{display:"flex", paddingTop:"5px"}}>
                                            <div style={{fontSize:"14px",width:"100px", marginLeft:"25px", textAlign:"left", color:"rgba(0,0,0,0.5)"}}>연락처</div>
                                            <div style={{fontSize:"14px"}}>{NumberVal}</div>
                                        </div>
                                        <div style={{display:"flex", paddingTop:"5px"}}>
                                            <div style={{fontSize:"14px",width:"100px", marginLeft:"25px", textAlign:"left", color:"rgba(0,0,0,0.5)"}}>배송 주소</div>
                                            <div style={{fontSize:"14px"}}>({finalZonecode}) {finalRoadaddress} ({finalBname}, {finalBuildingname}) {finalBetterAddress}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={formatBtn} style={{width:"50px", height:"35px", marginTop:"80px", fontSize:"13px", color:"rgba(127,127,127,1)", borderRadius:"10px", border:"1px solid rgba(0,0,0,0.3)", backgroundColor:"white"}}>초기화</button>
                                    </div>
                                </div>

                                <div style={{marginTop:"15px"}}>
                                    <Buy_request_modal setBuy_request={setBuy_request}></Buy_request_modal>
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
                        </>
                    ) : (
                        <>
                            <div style={{height:"460px"}} className='buy_delivery'>
                                <div style={{width:"200px", paddingTop:"30px", marginLeft:"25px", textAlign:"left", fontSize:"20px", fontWeight:"bold"}}>
                                    배송 주소
                                </div>
                                <div>
                                    <Buy_delivery_modal setFinalName={setFinalName} setFinalNumber={setFinalNumber} setFinalZonecode={setFinalZonecode}
                                        setFinalRoadaddress={setFinalRoadaddress} setFinalBname={setFinalBname} setFinalBuildingname={setFinalBuildingname} 
                                        setFinalSaveBtn={setFinalSaveBtn} setFinalBetterAddress={setFinalBetterAddress}>
                                    </Buy_delivery_modal>
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
                        </>
                    )}

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
                                <PaymentButton active={paymentBtn === 1} onClick={() => {setPaymentBtn(1); setFinalCardBtn(true)}}>
                                    <div style={{float:"left", marginLeft:"15px"}}>신용카드</div>
                                </PaymentButton>
                                <PaymentButton active={paymentBtn === 2} onClick={() => {setPaymentBtn(2); setFinalCardBtn(true)}} style={{marginLeft:"10px"}}>
                                    <div style={{float:"left", marginLeft:"15px"}}>네이버페이</div>
                                    <img src={naver_img} style={{width:"50px", float:"right", marginRight:"13px", marginTop:"1px"}}></img>
                                </PaymentButton>
                                <PaymentButton active={paymentBtn === 3} onClick={() => {setPaymentBtn(3); setFinalCardBtn(true)}} style={{marginLeft:"10px"}}>
                                    <div style={{float:"left", marginLeft:"15px"}}>카카오페이</div>
                                    <img src={kakao_img} style={{width:"50px", float:"right", marginRight:"13px", marginTop:"2px"}}></img>
                                </PaymentButton>
                            </div>
                            <div style={{marginTop:"5px"}}>
                                <PaymentButton active={paymentBtn === 4} onClick={() => {setPaymentBtn(4); setFinalCardBtn(true)}}>
                                    <div style={{float:"left", marginLeft:"15px"}}>토스페이</div>
                                    <img src={toss_img} style={{width:"50px", float:"right", marginRight:"13px"}}></img>
                                </PaymentButton>
                                <PaymentButton active={paymentBtn === 5} onClick={() => {setPaymentBtn(5); setFinalCardBtn(true)}} style={{marginLeft:"10px"}}>
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
                                {formatPrice(parseData.price)}
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
                                무료
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
                            <div style={{textAlign:"right", fontWeight:"bold", fontSize:"20px"}}>{formatPrice(parseData.price+3000)}</div>
                        </div>
                    </div>
                    <div className='order_agreemnet_button'>
                        {finalBtn ? (
                            <>
                            <button onClick={() => onClickPayments()} style={{width:"630px",height:"58px", backgroundColor:"black", color:"white", marginTop:"20px", fontWeight:"bold", fontSize:"17px", borderRadius:"10px", border:"none"}}>
                                {formatPrice(parseData.price+3000)}원・일반배송 결제하기
                            </button>
                            </>
                        ) : (
                            <>
                            <button disabled style={{width:"630px", height:"58px", backgroundColor:"rgba(127,127,127,0.4)", border:"none",color:"white", marginTop:"20px", fontWeight:"bold", fontSize:"17px", borderRadius:"10px", border:"none"}}>
                                {formatPrice(parseData.price+3000)}원・일반배송 결제하기
                            </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Buy_form;