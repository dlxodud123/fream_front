import './../css/modal/sell_modal.css';
import { useEffect, useState } from "react";
import styled from 'styled-components';

const Sell_modal = (props) => {
    const [sellModal, setSellModal] = useState(false);    
    const [sellBtn, setSellBtn] = useState(0);

    let data = encodeURIComponent(JSON.stringify(props.main_info_shoes));

    useEffect(() => {
        setSellBtn(parseInt(props.final_size));
        props.setFinal_Size(props.final_size);
    }, [props.final_size]);

    useEffect(() => {
        if (props.final_size  === "모든 사이즈") {
            props.setFinal_Size("모든 사이즈");
        }else{
            props.setFinal_Size(sellBtn);
        }
    }, [])

    const Sell_modal_btn = styled.button`
        border: ${(props) => (props.active ? '1px black solid' : '1px rgba(0,0,0,0.1) solid')};
    `;
    const buy_link = () => {
        window.location.href = `/sell/${data}/${sellBtn}`;
    }
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(price);
    };

    return(
        <>  
            <button onClick={() => setSellModal(true)} style={{width:"275px", height:"60px", display:"flex", color:"white", backgroundColor:"rgb(65, 185, 121)", borderRadius:"10px", fontWeight:"bold", marginLeft:"10px"}}>
                <div style={{width:"50px", marginTop:"16px",marginLeft:"12px", textAlign:"left", fontSize:"20px"}}>판매</div>
                <div style={{width:"1px",height:"59px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>
                <div style={{marginLeft:"9px"}}>
                    <div style={{fontSize:"17px" ,height:"20px", marginTop:"8px"}} >{formatPrice(props.main_info_shoes.price)}원</div>
                    <div style={{fontWeight:"lighter", fontSize:"12px", textAlign:"left"}}>즉시 판매가</div>
                </div>
            </button>
            {   
                sellModal &&
                <div className={'sell_modal-container'}>
                    <div className={'sell_modal-content'}>
                        <div style={{height:"55px" , display:"flex"}}>
                            <p style={{marginLeft:"200px",marginTop:"20px" , fontWeight:"bold", fontSize:"20px"}}>판매하기</p>
                            <button className={'sell_modal-close-btn'} style={{width:"60px",marginLeft:"130px" ,border:"none", backgroundColor:"white", borderRadius:"20px"}} onClick={() => setSellModal(false)}>
                                <p style={{fontSize:"30px", marginTop:"5px", fontWeight:"lighter"}}>x</p>
                            </button>
                        </div>
                        <div className={'sell_modal-title'}> 
                            <img src={`${process.env.PUBLIC_URL}/images/${props.main_info_shoes.imgName}`} style={{height:"80px", marginLeft:"30px"}}></img>
                            <div style={{marginLeft:"15px", textAlign:"left"}}>
                                <div style={{fontWeight:"bold"}}>{props.main_info_shoes.prid}</div>
                                <div><span style={{fontWeight:"bold"}}>{props.main_info_shoes.nameEng}</span><br></br><span>{props.main_info_shoes.nameKor}</span></div>
                            </div>
                        </div>

                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex", marginTop:"10px"}}>
                            <Sell_modal_btn active={sellBtn === 220} onClick={() => setSellBtn(220)}><span className='span_font1'>220</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Sell_modal_btn active={sellBtn === 225} onClick={() => setSellBtn(225)}><span className='span_font1'>225</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Sell_modal_btn active={sellBtn === 230} onClick={() => setSellBtn(230)}><span className='span_font1'>230</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <Sell_modal_btn active={sellBtn === 235} onClick={() => setSellBtn(235)}><span className='span_font1'>235</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Sell_modal_btn active={sellBtn === 240} onClick={() => setSellBtn(240)}><span className='span_font1'>240</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Sell_modal_btn active={sellBtn === 245} onClick={() => setSellBtn(245)}><span className='span_font1'>245</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <Sell_modal_btn active={sellBtn === 250} onClick={() => setSellBtn(250)}><span className='span_font1'>250</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Sell_modal_btn active={sellBtn === 255} onClick={() => setSellBtn(255)}><span className='span_font1'>255</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Sell_modal_btn active={sellBtn === 260} onClick={() => setSellBtn(260)}><span className='span_font1'>260</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <Sell_modal_btn active={sellBtn === 265} onClick={() => setSellBtn(265)}><span className='span_font1'>265</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Sell_modal_btn active={sellBtn === 270} onClick={() => setSellBtn(270)}><span className='span_font1'>270</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Sell_modal_btn active={sellBtn === 275} onClick={() => setSellBtn(275)}><span className='span_font1'>275</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <Sell_modal_btn active={sellBtn === 280} onClick={() => setSellBtn(280)}><span className='span_font1'>280</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Sell_modal_btn active={sellBtn === 285} onClick={() => setSellBtn(285)}><span className='span_font1'>285</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                            <div style={{width:"10px"}}></div>
                            <Sell_modal_btn active={sellBtn === 290} onClick={() => setSellBtn(290)}><span className='span_font1'>290</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <Sell_modal_btn active={sellBtn === 295} onClick={() => setSellBtn(295)}><span className='span_font1'>295</span><br></br><span className='span_font2'>{formatPrice(props.main_info_shoes.price)}</span></Sell_modal_btn>
                        </div>
                        {
                            (!(props.final_size  === "모든 사이즈") || !(Number.isNaN(sellBtn))) ? 
                            <div>
                                <button onClick={() => buy_link()} style={{width:"420px", height:"65px", backgroundColor:'black', color:"#fff", fontWeight:"bold", marginTop:"10px"}}>{formatPrice(props.main_info_shoes.price)}</button>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                </div>
            }
        </>
    )
}
export default Sell_modal;