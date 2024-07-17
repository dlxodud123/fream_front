import './../css/modal/buy_modal.css';
import { useEffect, useState } from "react";
import img1 from "./../../img/img5.jpg"
import styled from 'styled-components';

const Header_buy_modal = (props) => {
    const [buyModal, setBuyModal] = useState(false);    
    const [buyBtn, setBuyBtn] = useState();

    useEffect(() => {
        setBuyBtn(parseInt(props.final_size));
        props.setFinal_Size(props.final_size);
    }, [props.final_size]);

    const Buy_modal_btn = styled.button`
        width: 133px;
        height: 58px;
        border-radius: 10px;
        background-color: white;
        border: ${(props) => (props.active ? '1px black solid' : '1px rgba(0,0,0,0.1) solid')};
    `;
    const buy_link = () => {
        window.location.href = '/buy';
    }
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(price);
    };

    return(
        <>  
            <button onClick={() => setBuyModal(true)} style={{width:"275px", height:"60px", display:"flex", color:"white", backgroundColor:"rgb(239, 98, 83)", borderRadius:"10px", fontWeight:"bold", border:"none"}}>
                <div style={{width:"50px", marginTop:"16px",marginLeft:"12px", textAlign:"left", fontSize:"20px"}}>구매</div>
                <div style={{width:"1px",height:"59px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>
                <div style={{marginLeft:"9px"}}>
                    <div style={{fontSize:"17px" ,height:"20px", marginTop:"10px", textAlign:"left"}}>{formatPrice(props.main_info_shoes.price)}원</div>
                    <div style={{fontWeight:"lighter", fontSize:"12px", textAlign:"left"}}>즉시 구매가</div>
                </div>
            </button>
            {   
                buyModal &&
                <div className={'buy_modal-container'}>
                    <div className={'buy_modal-content'}>
                        <div style={{height:"55px" , display:"flex"}}>
                            <p style={{marginLeft:"200px",marginTop:"20px" , fontWeight:"bold", fontSize:"20px"}}>구매하기</p>
                            <button className={'buy_modal-close-btn'} style={{width:"60px",marginLeft:"130px" ,border:"none", backgroundColor:"white", borderRadius:"20px"}} onClick={() => setBuyModal(false)}>
                                <p style={{fontSize:"30px", marginTop:"5px", fontWeight:"lighter"}}>x</p>
                            </button>
                        </div>
                        <div className={'buy_modal-title'}> 
                            <img src={props.detail_main_image} style={{height:"80px", marginLeft:"30px", backgroundColor:"#f4f4f4"}}></img>
                            <div style={{marginLeft:"15px", textAlign:"left"}}>
                                <div style={{fontWeight:"bold"}}>{props.main_info_shoes.prid}</div>
                                <div><span style={{fontWeight:"bold"}}>{props.main_info_shoes.nameEng}</span><br></br><span>{props.main_info_shoes.nameKor}</span></div>
                            </div>
                        </div>

                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex", marginTop:"10px"}}>
                            <Buy_modal_btn active={buyBtn === 220} onClick={() => setBuyBtn(220)}><span className='span_font1'>220</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Buy_modal_btn active={buyBtn === 225} onClick={() => setBuyBtn(225)}><span className='span_font1'>225</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Buy_modal_btn active={buyBtn === 230} onClick={() => setBuyBtn(230)}><span className='span_font1'>230</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <Buy_modal_btn active={buyBtn === 235} onClick={() => setBuyBtn(235)}><span className='span_font1'>235</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Buy_modal_btn active={buyBtn === 240} onClick={() => setBuyBtn(240)}><span className='span_font1'>240</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Buy_modal_btn active={buyBtn === 245} onClick={() => setBuyBtn(245)}><span className='span_font1'>245</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <Buy_modal_btn active={buyBtn === 250} onClick={() => setBuyBtn(250)}><span className='span_font1'>250</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Buy_modal_btn active={buyBtn === 255} onClick={() => setBuyBtn(255)}><span className='span_font1'>255</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Buy_modal_btn active={buyBtn === 260} onClick={() => setBuyBtn(260)}><span className='span_font1'>260</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <Buy_modal_btn active={buyBtn === 265} onClick={() => setBuyBtn(265)}><span className='span_font1'>265</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Buy_modal_btn active={buyBtn === 270} onClick={() => setBuyBtn(270)}><span className='span_font1'>270</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Buy_modal_btn active={buyBtn === 275} onClick={() => setBuyBtn(275)}><span className='span_font1'>275</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <Buy_modal_btn active={buyBtn === 280} onClick={() => setBuyBtn(280)}><span className='span_font1'>280</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Buy_modal_btn active={buyBtn === 285} onClick={() => setBuyBtn(285)}><span className='span_font1'>285</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Buy_modal_btn active={buyBtn === 290} onClick={() => setBuyBtn(290)}><span className='span_font1'>290</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <Buy_modal_btn active={buyBtn === 295} onClick={() => setBuyBtn(295)}><span className='span_font1'>295</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Buy_modal_btn>
                        </div>
                        <div>
                            <button onClick={() => buy_link()} style={{width:"420px", height:"65px", backgroundColor:'black', color:"#fff", fontWeight:"bold", marginTop:"10px", marginLeft:"30px", borderRadius:"10px"}}>{formatPrice(props.main_info_shoes.price)}</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Header_buy_modal;