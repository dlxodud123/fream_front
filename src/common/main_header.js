import './css/main_header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate } from 'react-router-dom';

function Header(){
  let navigate = useNavigate();
    return(
        <>
        <div style={{width:"1280px", margin:"auto"}}>
        <nav >
        <ul >
          <li>
            <a href="#">고객센터</a>
          </li>
          <li>
            <a href="#">로그인</a>
          </li>
          <li>
            <a href='/Mypage'>마이페이지</a>
          </li>
        </ul>
      </nav>
            <nav>
              <p onClick={()=>{navigate('/home')}} className="kream">KREAM</p>
              <ul>
                <li>
                  <a href="/">home</a>
                </li>
                <li>
                  <a href="#link-1">style</a>
                </li>
                <li>
                  <a href="/shop">shop</a>
                </li>
              </ul>
            </nav>
            <div>
    <nav>
        <ul>
          <li>
            <a href="/" className="active">추천</a>
          </li>
          <li>
            <a href="/men">남성</a>
          </li>
          <li>
            <a href="/women">여성</a>
          </li>
        </ul>
      </nav>
    </div>
    </div>
            </>
    );
}

export default Header;
