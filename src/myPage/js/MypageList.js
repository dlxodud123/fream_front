import { Link } from "react-router-dom";


const MypageList = () => {
    return(
    <div>
        <div className="mypage">
          <h2>마이페이지</h2>
        </div>
        <div>
          <h2 className="snb_title">쇼핑 정보</h2>
            <ul className="menu">
              <li className="list-item">
                <Link to={"/my/buying"}>구매 내역</Link></li>
              <li className="list-item">
                <Link to={"/my/selling"}>판매 내역</Link></li>
              <li className="list-item">
                <Link to={"/my/inventory"}>보관 판매</Link></li>
              <li className="list-item">
                <Link to={"/my/saved"}>관심</Link></li>
            </ul>
        </div>
        <div className="section">
          <h2 className="snb_title">내 정보</h2>
            <ul className="menu">
              <li className="list-item">
                <Link to={"/my/profile"}>로그인 정보</Link></li>
              <li className="list-item">
                <Link to={"/my/profile-edit"}>프로필 관리</Link></li>
              <li className="list-item">
                <Link to={"/my/seller-tier"}>판매자 등급</Link></li>
              <li className="list-item">
                <Link to={"/my/address"}>주소록</Link></li>
              <li className="list-item">
                <Link to={"/my/payment"}>결제 정보</Link></li>
              <li className="list-item">
                <Link to={"/my/account"}>판매 정산 계좌</Link></li>
              <li className="list-item">
                <Link to={"/my/receipt"}>현금영수증 정보</Link></li>
              <li className="list-item">
                <Link to={"/my/point"}>포인트</Link></li>
              <li className="list-item">
                <Link to={"/my/coupon"}>쿠폰</Link></li>
            </ul>
        </div>
    </div>

    )
}

export default MypageList;