import './css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate } from 'react-router-dom';

function Detail_buy_header(){
  let navigate = useNavigate();
    return(
        <>
            <div className="header_contianer">
                <div className='top_inner'>
                <div style={{ display:"flex", marginLeft:"1008px", width:"232px"}}>
                    <div><a style={{color:"grey", textDecoration:"none", fontSize:"14px"}} href='#'>고객센터</a></div>
                    <div style={{marginLeft:"20px"}}><a style={{color:"grey", textDecoration:"none", fontSize:"14px"}} href='/myPage'>마이페이지</a></div>
                    <div style={{marginLeft:"20px"}}><a style={{color:"grey", textDecoration:"none", fontSize:"14px"}} href='/login'>로그인</a></div>
                </div>
                </div>

                <div className='main_inner'>
                <div style={{width:"200px", fontSize:"30px", fontWeight:"bold", marginLeft:"40px"}}>
                    <a className='italic' style={{color:"black", textDecoration:"none", fontSize:"30px"}} href="/">KREAM</a>
                </div>
                <div style={{width:"450px", fontWeight:"bold", fontSize:"25px", textAlign:"right"}}>배송/결제</div>
                <div>
                    <div style={{display:"flex", marginLeft:"200px"}}>
                        <div style={{fontSize:"22px", width:"130px"}}><a style={{color:"black", textDecoration:"none"}} href="/">HOME</a></div>
                        <div style={{fontSize:"22px", width:"130px"}}><a style={{color:"black", textDecoration:"none"}} href="#">STYLE</a></div>
                        <div style={{fontSize:"22px"}}><a style={{color:"black", textDecoration:"none"}} href="/shop">SHOP</a></div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Detail_buy_header;
