import {useNavigate } from 'react-router-dom';




function Shoesheader(){
    let navigate = useNavigate();

    return(
        <div style={{width:"1280px", margin:"auto"}}>
        <nav className="navbar">
        <ul className="nav-item1">
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
                  <a className="active">home</a>
                </li>
                <li>
                  <a href="#link-1">style</a>
                </li>
                <li>
                  <a href="/shop">shop</a>
                </li>
              </ul>
            </nav>
            <h1 className="shop" onClick={()=>{navigate('/shop')}}>Shop</h1>
            <div className="shope-a">
    <nav>
      
        <ul>
          <li>
            <a href="/shop" className="active">전체</a>
          </li>
          <li>
            <a href="/shoes">신발</a>
          </li>
   
        </ul>
      </nav>
      
    </div>
    </div>
    )
}

export default Shoesheader;