import { Link, useNavigate } from "react-router-dom";


const MypageList = () => {
  const navigate = useNavigate();

  const myPageMain = () => {
    navigate('/myPage'); 
  };


    return(
    <div>
        <div className="mypage_List">
          <button className="moveMypage"
                  onClick={myPageMain}>
            <h2>마이페이지</h2>
          </button>
        </div>
        <div>
          <h2 className="snb_title">쇼핑 정보</h2>
            <ul className="menu">
              <li className="list-item">
                <Link to={"/my/buying"} className="myShoping">구매 내역</Link></li>
              <li className="list-item">
                <Link to={"/my/selling"} className="myShoping">판매 내역</Link></li>
              <li className="list-item">
                <Link to={"/my/inventory"} className="myShoping">보관 판매</Link></li>
              <li className="list-item">
                <Link to={"/my/saved"} className="myShoping">관심</Link></li>
            </ul>
        </div>
        <div className="section">
          <h2 className="snb_title">내 정보</h2>
            <ul className="menu">
              <li className="list-item">
                <Link to={"/my/profile"} className="myShoping">로그인 정보</Link></li>
              <li className="list-item">
                <Link to={"/my/profile-edit"} className="myShoping">프로필 관리</Link></li>
              <li className="list-item">
                <Link to={"/"} className="myShoping">판매자 등급</Link></li>
              <li className="list-item">
                <Link to={"/my/address"} className="myShoping">주소록</Link></li>
              <li className="list-item">
                <Link to={"/my/payment"} className="myShoping">결제 정보</Link></li>
              <li className="list-item">
                <Link to={"/my/account"} className="myShoping">판매 정산 계좌</Link></li>
              <li className="list-item">
                <Link to={"/"} className="myShoping">현금영수증 정보</Link></li>
              <li className="list-item">
                <Link to={"/my/point"} className="myShoping">포인트</Link></li>
              <li className="list-item">
                <Link to={"/"} className="myShoping">쿠폰</Link></li>
            </ul>
        </div>
    </div>

    )
}

export default MypageList;