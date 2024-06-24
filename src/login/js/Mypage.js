
const MyPage = () => {
    return (
      <div className="mypage-container">
        <div className="section">
          <h2 className="title">쇼핑 정보</h2>
          <ul className="list">
            <li className="list-item">구매 내역</li>
            <li className="list-item">판매 내역</li>
            <li className="list-item">보관 판매</li>
            <li className="list-item">관심</li>
          </ul>
        </div>
        <div className="section">
          <h2 className="title">내 정보</h2>
          <ul className="list">
            <li className="list-item">로그인 정보: my******@hanmail.net</li>
            <li className="list-item">프로필 관리</li>
            <li className="list-item">판매자 등급: 630P</li>
            <li className="list-item">주소록</li>
            <li className="list-item">결제 정보</li>
            <li className="list-item">판매 정산 계좌</li>
            <li className="list-item">현금영수증 정보</li>
          </ul>
        </div>
        <div className="section">
          <h2 className="title">포인트 / 쿠폰</h2>
          <ul className="list">
            <li className="list-item">포인트: 630P</li>
            <li className="list-item">쿠폰: 0</li>
          </ul>
        </div>
        <div className="section">
          <h2 className="title">내 폰 시세</h2>
          <ul className="list">
            <li className="list-item">친구 초대</li>
            <li className="list-item">공지사항</li>
          </ul>
        </div>
        <div className="section">
          <h2 className="title">보관 판매 내역</h2>
          <h3 className="subtitle">발송요청: 0</h3>
          <h3 className="subtitle">판매대기: 0</h3>
          <h3 className="subtitle">판매 중: 0</h3>
          <h3 className="subtitle">정산완료: 0</h3>
          <a href="#" className="more-link">보관 신청하기</a>
          <p>한 번에 신청하고 한 번에 발송하세요.</p>
        </div>
        <div className="section">
          <h2 className="title">구매 내역</h2>
          <ul className="list">
            <li className="list-item">
              <h3 className="subtitle">전체: 13</h3>
              <h3 className="subtitle">입찰 중: 0</h3>
              <h3 className="subtitle">진행 중: 0</h3>
              <h3 className="subtitle">종료: 13</h3>
            </li>
            <li className="list-item">
              Oofos OOriginal Black<br />
              240(US M5W7)<br />
              24/05/29<br />
              배송완료
              <a href="#" className="more-link">스타일 올리기</a>
            </li>
            <li className="list-item">
              Adidas Puffylette Magic Beige Core Black<br />
              265<br />
              23/12/20<br />
              배송완료
              <a href="#" className="more-link">스타일 올리기</a>
            </li>
            <li className="list-item">
              Adidas Puffylette Magic Beige Core Black<br />
              235<br />
              23/12/20<br />
              배송완료
              <a href="#" className="more-link">스타일 올리기</a>
            </li>
          </ul>
        </div>
        <div className="section">
          <h2 className="title">판매 내역</h2>
          <h3 className="subtitle">전체: 0</h3>
          <h3 className="subtitle">입찰 중: 0</h3>
          <h3 className="subtitle">진행 중: 0</h3>
          <h3 className="subtitle">종료: 0</h3>
          <p>거래 내역이 없습니다.</p>
        </div>
      </div>
    );
  };

  export default MyPage;