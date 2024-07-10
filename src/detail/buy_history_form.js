import './css/buy_history_form.css';
import Detail_buy_history_header from '../common/detail_buy_history_header';
import Footer from '../common/footer';
import img from './../img/img5.jpg'

const Buy_history_from = () => {

    return(
        <>
            <Detail_buy_history_header></Detail_buy_history_header>
            <div className='buy_history_all'>
                <div className='buy_history_container'>
                    <div style={{height:"30px", backgroundColor:"#f4f4f4"}}/>
                    <div className='buy_history_content'>
                        <div style={{height:"80px", fontSize:"30px", fontWeight:"bold", paddingTop:"20px"}}>즉시 구매가 완료되었습니다.</div>
                        <div style={{height:"80px"}}>
                            <div style={{fontWeight:"bold"}}>구매한 상품은 전문가의 검수 완료 후,</div>
                            <div style={{fontWeight:"bold"}}>안전하게 배송될 예정입니다.</div>
                        </div>
                        <div style={{height:"250px"}}>
                            <img src={img} style={{width:"220px", height:"220px", backgroundColor:"rgb(244,244,244)", borderRadius:"15px"}}></img>
                        </div>
                        <div style={{height:"80px"}}>
                            <button style={{width:"650px", height:"70px", fontWeight:400, fontSize:"19px"}}>구매 내역 상세보기</button>
                        </div>
                        <div style={{color:"grey", fontWeight:"bold"}}>즉시 구매는 취소가 불가능합니다.</div>
                    </div>
                    <div style={{backgroundColor:"rgb(250,250,250)", height:"150px"}}>
                        <div style={{height:"90px"}}>
                            <div style={{marginLeft:"30px",paddingTop:"30px", textAlign:"left" ,fontWeight:"bold", fontSize:"23px"}}>총 결제금액</div>
                        </div>
                        <div style={{height:"60px"}}>
                            <div style={{fontSize:"30px", textAlign:"right", marginRight:"30px", fontWeight:"bold", color:"rgb(239,98,83)"}}>174,900원</div>
                        </div>
                    </div>
                    <div style={{backgroundColor:"white", height:"270px"}}>
                        <div style={{display:"flex"}}>
                            <div style={{width:"200px", textAlign:"left", height:"80px", paddingTop:"20px", paddingLeft:"30px", fontWeight:"bold", fontSize:"20px"}}>즉시 구매가</div>
                            <div style={{width:"500px", paddingRight:"30px", textAlign:"right", paddingTop:"20px", fontSize:"20px", fontWeight:"bold"}}>171,900원</div>
                        </div>
                        <div style={{display:"flex"}}>
                            <div style={{width:"200px", color:"rgba(128,128,128,0.8)", textAlign:"left", height:"60px", paddingLeft:"30px", fontWeight:"bold", fontSize:"20px"}}>검수비</div>
                            <div style={{width:"500px", paddingRight:"30px", textAlign:"right", fontSize:"20px", fontWeight:"bold"}}>무료</div>
                        </div>
                        <div style={{display:"flex"}}>
                            <div style={{width:"200px", color:"rgba(128,128,128,0.8)", textAlign:"left", height:"60px", paddingLeft:"30px", fontWeight:"bold", fontSize:"20px"}}>수수료</div>
                            <div style={{width:"500px", paddingRight:"30px", textAlign:"right", fontSize:"20px", fontWeight:"bold"}}>0원</div>
                        </div>
                        <div style={{display:"flex"}}>
                            <div style={{width:"200px", color:"rgba(128,128,128,0.8)", textAlign:"left", height:"60px", paddingLeft:"30px", fontWeight:"bold", fontSize:"20px"}}>배송비</div>
                            <div style={{width:"500px", paddingRight:"30px", textAlign:"right", fontSize:"20px", fontWeight:"bold"}}>3000원</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Buy_history_from;