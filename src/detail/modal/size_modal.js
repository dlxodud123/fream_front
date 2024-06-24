import "./../css/modal/size_modal.css";
import { useState } from "react";
import img from "./../../img/detail-page/enter.png";

const Size_modal = (props) => {
    const [sizeModal, setSizeModal] = useState(false);
    const [size, setSize] = useState("모든 사이즈");
    const [price, setPrice] = useState("190,000");

    return(
        <>
            <div className={'btn-wrapper'}>
                <button onClick={() => setSizeModal(true)} style={{width:"560px", height:"50px", fontWeight:"bold", display:"flex"}}>
                    <div style={{marginTop:"9px", marginLeft:"13px", display:"flex"}}><span style={{width:"270px", fontSize:"17px", fontWeight:"700", textAlign:"left", marginTop:"3px"}}>{size}</span><span style={{width:"260px", height:"50px", textAlign:"right"}}><img src={img} style={{width:"30px", marginBottom:"15px"}}></img></span></div>
                </button>
            </div>
            {
                sizeModal &&
                <div className={'size_modal-container'}>
                    <div className={'size_modal-content'}>
                        <div style={{marginBottom:"20px", display:"flex"}}>
                            <p style={{marginLeft:"220px",marginTop:"20px" , fontWeight:"bold", fontSize:"20px"}}>옵션</p>
                            <button className={'size_modal-close-btn'} style={{width:"60px",marginLeft:"150px" ,border:"none", backgroundColor:"white", borderRadius:"20px"}} onClick={() => setSizeModal(false)}>
                                <p style={{fontSize:"30px", marginTop:"5px", fontWeight:"lighter"}}>x</p>
                            </button>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <button onClick={() => {setSizeModal(false); setSize("모든 사이즈"); props.setFinal_Size("모든 사이즈")}}><span className='span_font1'>모든 사이즈</span><br></br><span className='span_font2' style={{color:"black"}}>구매입찰</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => {setSizeModal(false); setSize(220); setPrice("190,000"); props.setFinal_Size("220")}}><span className='span_font1'>220</span><br></br><span className='span_font2'>190,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => {setSizeModal(false); setSize(225); setPrice("200,000"); props.setFinal_Size("225")}}><span className='span_font1'>225</span><br></br><span className='span_font2'>200,000</span></button>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <button onClick={() => {setSizeModal(false); setSize(230); setPrice("210,000"); props.setFinal_Size("230")}}><span className='span_font1'>230</span><br></br><span className='span_font2'>210,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => {setSizeModal(false); setSize(235); setPrice("220,000"); props.setFinal_Size("235")}}><span className='span_font1'>235</span><br></br><span className='span_font2'>220,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => {setSizeModal(false); setSize(240); setPrice("230,000"); props.setFinal_Size("240")}}><span className='span_font1'>240</span><br></br><span className='span_font2'>230,000</span></button>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <button onClick={() => {setSizeModal(false); setSize(245); setPrice("240,000"); props.setFinal_Size("245")}}><span className='span_font1'>245</span><br></br><span className='span_font2'>240,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => {setSizeModal(false); setSize(250); setPrice("250,000"); props.setFinal_Size("250")}}><span className='span_font1'>250</span><br></br><span className='span_font2'>250,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => {setSizeModal(false); setSize(255); setPrice("260,000"); props.setFinal_Size("255")}}><span className='span_font1'>255</span><br></br><span className='span_font2'>260,000</span></button>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <button onClick={() => {setSizeModal(false); setSize(260); setPrice("270,000"); props.setFinal_Size("260")}}><span className='span_font1'>260</span><br></br><span className='span_font2'>270,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => {setSizeModal(false); setSize(265); setPrice("280,000"); props.setFinal_Size("265")}}><span className='span_font1'>265</span><br></br><span className='span_font2'>280,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => {setSizeModal(false); setSize(270); setPrice("290,000"); props.setFinal_Size("270")}}><span className='span_font1'>270</span><br></br><span className='span_font2'>290,000</span></button>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <button onClick={() => {setSizeModal(false); setSize(275); setPrice("300,000"); props.setFinal_Size("275")}}><span className='span_font1'>275</span><br></br><span className='span_font2'>300,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => {setSizeModal(false); setSize(280); setPrice("290,000"); props.setFinal_Size("280")}}><span className='span_font1'>280</span><br></br><span className='span_font2'>290,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => {setSizeModal(false); setSize(285); setPrice("280,000"); props.setFinal_Size("285")}}><span className='span_font1'>285</span><br></br><span className='span_font2'>280,000</span></button>
                        </div>
                        <div style={{width:"420px" ,height:"70px", marginLeft:"30px", display:"flex"}}>
                            <button onClick={() => {setSizeModal(false); setSize(290); setPrice("270,000"); props.setFinal_Size("290")}}><span className='span_font1'>290</span><br></br><span className='span_font2'>270,000</span></button>
                            <div style={{width:"10px"}}></div>
                            <button onClick={() => {setSizeModal(false); setSize(295); setPrice("230,000"); props.setFinal_Size("295")}}><span className='span_font1'>295</span><br></br><span className='span_font2'>230,000</span></button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Size_modal;