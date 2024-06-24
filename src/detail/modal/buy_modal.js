import './../css/modal/buy_modal.css';
import { useState } from "react";
import img1 from "./../../img/img5.jpg"

const Buy_modal = (props) => {
    const [buyModal, setBuyModal] = useState(false);

    const buy_link = () => {
        window.location.href = '/buy';
    }

    
    return(
        <>
            <button onClick={() => setBuyModal(true)} style={{width:"275px", height:"60px", display:"flex", color:"white", backgroundColor:"rgb(239, 98, 83)", borderRadius:"10px", fontWeight:"bold"}}>
                <div style={{width:"50px", marginTop:"16px",marginLeft:"12px", textAlign:"left", fontSize:"20px"}}>구매</div>
                <div style={{width:"1px",height:"59px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>
                <div style={{marginLeft:"9px"}}>
                    <div style={{fontSize:"17px" ,height:"20px", marginTop:"8px"}} >295,000원</div>
                    <div style={{fontWeight:"lighter", fontSize:"12px", textAlign:"left"}}>즉시 구매가</div>
                </div>
                
            </button>
            {   
                buyModal &&
                <div className={'buy_modal-container'}>
                    <div className={'buy_modal-content'}>
                        <div style={{height:"55px" , display:"flex"}}>
                        {props.final_size}
                            <p style={{marginLeft:"200px",marginTop:"20px" , fontWeight:"bold", fontSize:"20px"}}>구매하기</p>
                            <button className={'buy_modal-close-btn'} style={{width:"60px",marginLeft:"130px" ,border:"none", backgroundColor:"white", borderRadius:"20px"}} onClick={() => setBuyModal(false)}>
                                <p style={{fontSize:"30px", marginTop:"5px", fontWeight:"lighter"}}>x</p>
                            </button>
                        </div>
                        <div className={'buy_modal-title'}> 
                            <img src={img1} style={{height:"80px", marginLeft:"30px"}}></img>
                            <div style={{marginLeft:"15px", textAlign:"left"}}>
                                <div style={{fontWeight:"bold"}}>IH3261</div>
                                <div><span style={{fontWeight:"bold"}}>Adidas x Wales Bonner Samba Supplier</span><br></br><span>아디다스 x 웨일스 보너 삼바 서플라이어 컬러 </span></div>
                            </div>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px",marginTop:"15px", display:"flex"}}>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>220</span><br></br><span className='span_font2'>190,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>225</span><br></br><span className='span_font2'>200,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>230</span><br></br><span className='span_font2'>210,000</span></button>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>235</span><br></br><span className='span_font2'>220,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>240</span><br></br><span className='span_font2'>230,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>245</span><br></br><span className='span_font2'>240,000</span></button>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>250</span><br></br><span className='span_font2'>250,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>255</span><br></br><span className='span_font2'>260,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>260</span><br></br><span className='span_font2'>270,000</span></button>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>265</span><br></br><span className='span_font2'>280,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>270</span><br></br><span className='span_font2'>290,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>275</span><br></br><span className='span_font2'>300,000</span></button>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>280</span><br></br><span className='span_font2'>290,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>285</span><br></br><span className='span_font2'>280,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>290</span><br></br><span className='span_font2'>270,000</span></button>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <button onClick={() => setBuyModal(false)}><span className='span_font1'>295</span><br></br><span className='span_font2'>230,000</span></button>
                        </div>
                        <div>
                            <button onClick={() => buy_link()} style={{width:"420px", height:"65px", backgroundColor:'black', color:"#fff", fontWeight:"bold", marginLeft:"30px"}}>310,000</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Buy_modal;