
import './css/main_header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate } from 'react-router-dom';

function MainHeader(){
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
              <a className='italic' style={{color:"black", textDecoration:"none"}} href="/">KREAM</a>
            </div>
            <div style={{}}>
              <div style={{display:"flex", marginLeft:"650px"}}>
                <div style={{fontSize:"22px", width:"130px"}}><a style={{color:"black", textDecoration:"none"}} href="/">HOME</a></div>
                <div style={{fontSize:"22px", width:"130px"}}><a style={{color:"black", textDecoration:"none"}} href="#">STYLE</a></div>
                <div style={{fontSize:"22px"}}><a style={{color:"black", textDecoration:"none"}} href="/shop">SHOP</a></div>
              </div>
            </div>
          </div>

          <div style={{paddingTop:'30px',fontSize:'23px'}}  className=''>
        <div style={{display:'flex', marginLeft:'50px'}} >
          <div>
            <a style={{color:"black", textDecoration:"none", marginRight:'40px'}} href="/" className="active">추천</a>
          </div>
          <div>
            <a style={{color:"black", textDecoration:"none", marginRight:'40px'}} href="/men">남성</a>
          </div>
          <div>
            <a style={{color:"black", textDecoration:"none" , marginRight:'40px'} } href="/women">여성</a>
          </div>
          <div>
            <a style={{color:"black", textDecoration:"none"} } href="/board">공지사항</a>
          </div>
        </div>
        
      </div>
        </div>
    </>
    );
}

export default MainHeader;


// function Header(){
//   let navigate = useNavigate();
//     return(
//         <>
//         <div style={{width:"1280px", margin:"auto"}}>
//         <nav >
//         <ul >
//           <li>
//             <a href="#">고객센터</a>
//           </li>
//           <li>
//             <a href="#">로그인</a>
//           </li>
//           <li>
//             <a href='/Mypage'>마이페이지</a>
//           </li>
//         </ul>
//       </nav>
//             <nav>
//               <p onClick={()=>{navigate('/home')}} className="kream">KREAM</p>
//               <ul>
//                 <li>
//                   <a href="/">home</a>
//                 </li>
//                 <li>
//                   <a href="#link-1">style</a>
//                 </li>
//                 <li>
//                   <a href="/shop">shop</a>
//                 </li>
//               </ul>
//             </nav>
//             <div>
//     <nav>
//         <ul>
//           <li>
//             <a href="/" className="active">추천</a>
//           </li>
//           <li>
//             <a href="/men">남성</a>
//           </li>
//           <li>
//             <a href="/women">여성</a>
//           </li>
//         </ul>
//       </nav>
//     </div>
//     </div>
//             </>
//     );
// }

// export default Header;
