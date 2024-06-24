import "./css/footer.css";
import footer_img1 from "./../img/common/footer_img1.png";
import footer_img2 from "./../img/common/footer_img2.png";
import footer_img3 from "./../img/common/footer_img3.png";

const Footer = () => {
    return(
        <>  
            <div style={{width:"1280px", height:"1px", margin:"auto", backgroundColor:"rgba(0,0,0,0.1)"}}></div>
            <div style={{display:"flex", width:"1280px", height:"360px", margin:"auto"}}>
                <div className="footer_info">
                    <div className="footer_title">
                        <div style={{width:"80px"}}>회사소개</div>
                        <div style={{width:"80px"}}>인재채용</div>
                        <div style={{width:"80px"}}>제휴제안</div>
                        <div style={{width:"80px"}}>이용약관</div>
                        <div style={{width:"140px", fontWeight:"bold"}}>개인정보처리방침</div>
                    </div>
                    <div className="footer_title_info">
                        <div style={{fontSize:"13px", color:"rgba(0,0,0,0.5)"}}>
                            크림 주식회사 · 대표 김창욱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사업자등록번호 : 570-88-01618 사업자정보확인&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;통신판매업 : 제 2021-성남분당C-0093호
                        </div>
                        <div style={{fontSize:"13px", color:"rgba(0,0,0,0.5)"}}>
                        사업장소재지 : 경기도 성남시 분당구 분당내곡로 131 판교테크원 타워1, 8층&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호스팅 서비스 : 네이버 클라우드 ㈜
                        </div>
                    </div>
                    <div className="footer_card_title">
                        <div style={{fontSize:"12px", fontWeight:"bold"}}>
                            신한은행 채무지급보증 안내
                        </div>
                        <div style={{fontSize:"12px", color:"rgba(0,0,0,0.5)"}}>
                            당사는 고객님의 현금 결제 금액에 대해 신한은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.서비스가입 사실 확인
                        </div>
                    </div>
                    <div className="footer_card_info">
                        <div style={{fontSize:"12px", color:"rgba(0,0,0,0.5)"}}>
                            크림(주)는 통신판매 중개자로서 통신판매의 당사자가 아닙니다. 본 상품은 개별판매자가 등록한 상품으로 상품, 상품정보, 거래에
                        </div>
                        <div style={{fontSize:"12px", color:"rgba(0,0,0,0.5)"}}>
                            관한 의무와 책임은 각 판매자에게 있습니다. 단, 이용약관 및 정책, 기타 거래 체결 과정에서 고지하는 내용 등에 따라 검수하고
                        </div>
                        <div style={{fontSize:"12px", color:"rgba(0,0,0,0.5)"}}>
                            보증하는 내용에 대한 책임은 크림(주)에 있습니다.
                        </div>
                    </div>
                </div>
                <div className="footer_call">
                    <div className="footer_img">
                        <img style={{width:"30px", marginRight:"20px"}} src={footer_img1}></img>
                        <img style={{width:"30px", marginRight:"20px"}} src={footer_img2}></img>
                        <img style={{width:"30px"}} src={footer_img3}></img>
                    </div>
                    <div className="footer_call_info">
                        <div style={{fontSize:"18px", fontWeight:"bold"}}>
                            고객센터 1588-7813
                        </div>
                        <div style={{fontSize:"14px", color:"rgba(0,0,0,0.5)", marginTop:"10px"}}>
                            운영시간 평일 10:00 - 18:00 (토∙일, 공휴일 휴무)
                        </div>
                        <div style={{fontSize:"14px", color:"rgba(0,0,0,0.5)"}}>
                            점심시간 평일 13:00 - 14:00
                        </div>
                        <div style={{fontSize:"14px", marginTop:"10px"}}>
                            1:1 문의하기는 앱에서만 가능합니다.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;