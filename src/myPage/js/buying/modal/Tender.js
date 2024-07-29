import {
  faCaretDown,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductPurchase from "./modal/ProductPurchase";
import StyleModal from "./StyleModel";

function ModalTender(props) {
  const navigate = useNavigate();
  const [sortDirection1, setSortDirection1] = useState("up");
  const [sortDirection2, setSortDirection2] = useState(null);
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("전체");
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false); // 스타일 모달 상태 추가
  const [selectedItemId, setSelectedItemId] = useState(null); // 선택된 item.id 상태 추가
  const openStyleModal = (id) => {
    setSelectedItemId(id); // 선택된 item.id 설정
    setIsStyleModalOpen(true); // 스타일 모달 열기
  };
  const closeStyleModal = () => setIsStyleModalOpen(false); // 스타일 모달 닫기
  const openModalProduct = () => setIsModalProductOpen(true);
  const closeModalProduct = () => setIsModalProductOpen(false);
  const [sortedBuyBreakdown, setSortedBuyBreakdown] = useState(
    props.buyBreakdown
  );
  useEffect(() => {
    console.log("Props BuyBreakdown: ", props.buyBreakdown);
    setSortedBuyBreakdown(props.buyBreakdown); // buyBreakdown prop을 초기 상태로 설정
  }, [props.buyBreakdown]);
  // 정렬 함수 수정
  const sortItems = (items, key, direction) => {
    return [...items].sort((a, b) => {
      // 문자열에서 ','를 제거하고 숫자로 변환합니다.
      const aValue = removeCommasAndParseFloat(a[key]);
      const bValue = removeCommasAndParseFloat(b[key]);
      // if (direction === 'up') {
      //     return a[key] - b[key]; // 오름차순
      // } else {
      //     return b[key] - a[key]; // 내림차순
      // }
      if (direction === "up") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  };
  const convertToDate = (dateString) => {
    // dateString이 "YY/MM/DD" 형식이라면, 이를 "YYYY-MM-DD" 형식으로 변환
    const parts = dateString.split("/");
    const year = `20${parts[0]}`; // 예시에서는 24로 시작하는 연도
    const month = parts[1];
    const day = parts[2];
    return new Date(`${year}-${month}-${day}`);
  };
  const removeCommasAndParseFloat = (str) => {
    // 정수나 소수점 숫자로 변환하기 전에 ','를 모두 제거합니다.
    const stringWithoutCommas = str.replace(/,/g, "");
    // parseFloat를 사용하여 문자열을 부동소수점 숫자로 변환합니다.
    return parseFloat(stringWithoutCommas);
  };
  const DatesortItems = (items, key, direction) => {
    return [...items].sort((a, b) => {
      const aValue =
        key === "expiryDate"
          ? convertToDate(a[key])
          : removeCommasAndParseFloat(a[key]);
      const bValue =
        key === "expiryDate"
          ? convertToDate(b[key])
          : removeCommasAndParseFloat(b[key]);

      if (direction === "up") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  };

  const sort_order1 = () => {
    const newDirection = sortDirection1 === "up" ? "down" : "up";
    setSortDirection1(newDirection);
    setSortDirection2(null); // 다른 항목 초기화
    const sortedItems = sortItems(sortedBuyBreakdown, "price", newDirection);
    console.log(sortedItems);
    setSortedBuyBreakdown(sortedItems);
  };

  const sort_order2 = () => {
    const newDirection = sortDirection2 === "up" ? "down" : "up";
    setSortDirection2(newDirection);
    setSortDirection1(null); // 다른 항목 초기화
    const sortedItems = DatesortItems(
      sortedBuyBreakdown,
      "expiryDate",
      newDirection
    );
    console.log(sortedItems);
    setSortedBuyBreakdown(sortedItems);
  };

  // SHOP 바로가기 함수
  const handleShopMove = () => {
    navigate("/shop");
  };

  return (
    <div>
      <div className="purchas_head">
        <div className="head_product">
          <button className="btn_buyFilter" onClick={openModalProduct}>
            {selectedButton}
            <FontAwesomeIcon icon={faCaretDown} className="buyIcon" />
          </button>
        </div>
        <div className="head_status">
          <div className="status_box">
            <button className="status_txt" onClick={sort_order1}>
              구매 희망가
              <span className="sortIcons">
                <FontAwesomeIcon
                  icon={faSortUp}
                  className={`sortUpIcon ${
                    sortDirection1 === "up" ? "active" : ""
                  }`}
                />
                <FontAwesomeIcon
                  icon={faSortDown}
                  className={`sortDownIcon ${
                    sortDirection1 === "down" ? "active" : ""
                  }`}
                />
              </span>
            </button>
          </div>
          <div className="status_box field">
            <button className="status_txt" onClick={sort_order2}>
              만료일
              <span className="sortIcons">
                <FontAwesomeIcon
                  icon={faSortUp}
                  className={`sortUpIcon ${
                    sortDirection2 === "up" ? "active" : ""
                  }`}
                />
                <FontAwesomeIcon
                  icon={faSortDown}
                  className={`sortDownIcon ${
                    sortDirection2 === "down" ? "active" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
      {props.buyBreakdown == null ? (
        <div className="empty_area">
          <p className="buyText">구매 입찰 내역이 없습니다.</p>
          <button className="emptyAddBtn" onClick={handleShopMove}>
            SHOP 바로가기
          </button>
        </div>
      ) : (
        <div>
          <ul>
            {sortedBuyBreakdown.map((item) => (
              <li key={item.id} className="buyListItem">
                <div className="buyListBox">
                  <div className="buyListImg">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={"200PX"}
                      height={"200px"}
                    />
                  </div>
                  <div className="shoes_inputBox">
                    <span>물품명: {item.name}</span>
                    <span style={{ color: "rgba(34,34,34,.5)" }}>
                      신발사이즈: {item.size}
                    </span>
                  </div>
                  <div className="details-right">
                    <div className="purchase_price">
                      <span>구매희망가: {item.price}</span>
                    </div>
                    <div className="jonglyoil">
                      <span>만료일: {item.expiryDate}</span>
                      <span>상태: {item.deliveryStatus}</span>
                      <button onClick={() => openStyleModal(item.productId)}>
                        스타일 작성
                      </button>{" "}
                      {/* 스타일 작성 버튼 */}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isModalProductOpen && (
        <ProductPurchase
          onClose={closeModalProduct}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      )}
      {isStyleModalOpen && (
        <StyleModal onClose={closeStyleModal} itemId={selectedItemId} />
      )}{" "}
      {/* 스타일 모달 컴포넌트 */}
    </div>
  );
}

export default ModalTender;
