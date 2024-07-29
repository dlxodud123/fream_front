import "./css/detail_info.css";
import { useContext, useEffect, useState } from "react";
import LineChart from "./LineChart.js";
import Size_modal from "../detail/modal/size_modal.js";
import Buy_modal from "../detail/modal/buy_modal.js";
import Sell_modal from "../detail/modal/sell_modal.js";
import ship_img from "./../img/detail-page/ship_imfo1.png";
import ship_img1 from "./../img/detail-page/ship_imfo.png";
import ship_img2 from "./../img/detail-page/ship_imfo2.png";
import point_img from "./../img/detail-page/point.png";
import guar_img from "./../img/detail-page/guar.png";
import guar_img1 from "./../img/detail-page/guar1.png";
import guar_img2 from "./../img/detail-page/guar2.png";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import Shopmodal from "../main/shopeitem/shopmodal.js";
import { UserAuthContext } from "../Auth/UserAuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Detail_info = (props) => {
  let [interestModal, setInterestModal] = useState(false);

  const { isLoggedIn, handleLogout } = useContext(UserAuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (interestModal && !isLoggedIn) {
        navigate('/login');
    }
  }, [interestModal, isLoggedIn, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  const formatGender = (gender) => {
    if (gender === "MAN") {
      return "";
    } else if (gender === "WOMAN") {
      return "(W)";
    } else {
      return "";
    }
  };


  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prid, setPrid] = useState(props.prid);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="detail_info_form">
      <div className="detail_info">
        <div className="price_container">
          <p
            style={{ fontSize: "15px", height: "2px", color: "rgb(34,34,34)" }}
          >
            즉시 구매가
          </p>
          <p
            style={{
              fontSize: "30px",
              height: "24px",
              color: "rgb(34,34,34)",
              fontWeight: "bold",
            }}
          >
            {formatPrice(props.main_info_shoes.price)}원
          </p>
        </div>
        <div className="title_container">
          <div>
            <p style={{ fontSize: "20px", marginBottom: "0px" }}>
              {formatGender(props.main_info_shoes.gender)}
              {props.main_info_shoes.nameEng}
            </p>
          </div>
          <div>
            <p style={{ color: "rgba(0,0,0,0.5)" }}>
              {formatGender(props.main_info_shoes.gender)}
              {props.main_info_shoes.nameKor}
            </p>
          </div>
        </div>

        <Size_modal
          final_size={props.final_size}
          setFinal_Size={props.setFinal_Size}
        ></Size_modal>
        <div></div>
        <div className="product_container">
          <div style={{}}>
            <div
              style={{
                textAlign: "left",
                color: "rgba(0,0,0,0.5)",
                fontSize: "11px",
              }}
            >
              최근 거래가
            </div>
            <div style={{ textAlign: "left" }}>
              {formatPrice(props.main_info_shoes.price)}원
            </div>
          </div>

          <div>
            <div
              style={{
                width: "1px",
                height: "40px",
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
            ></div>
          </div>

          <div style={{}}>
            <div
              style={{
                textAlign: "left",
                color: "rgba(0,0,0,0.5)",
                fontSize: "11px",
              }}
            >
              발매가
            </div>
            <div style={{ textAlign: "left" }}>
              {formatPrice(props.main_info_shoes.price)}원
            </div>
          </div>

          <div>
            <div
              style={{
                width: "1px",
                height: "40px",
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
            ></div>
          </div>

          <div style={{}}>
            <div
              style={{
                textAlign: "left",
                color: "rgba(0,0,0,0.5)",
                fontSize: "11px",
              }}
            >
              모델번호
            </div>
            <div style={{ textAlign: "left" }}>
              {props.main_info_shoes.prid}
            </div>
          </div>

          <div>
            <div
              style={{
                width: "1px",
                height: "40px",
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
            ></div>
          </div>

          <div style={{}}>
            <div
              style={{
                textAlign: "left",
                color: "rgba(0,0,0,0.5)",
                fontSize: "11px",
              }}
            >
              출시일
            </div>
            <div style={{ textAlign: "left" }}>24/06/11</div>
          </div>

          <div>
            <div
              style={{
                width: "1px",
                height: "40px",
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
            ></div>
          </div>

          <div style={{}}>
            <div
              style={{
                textAlign: "left",
                color: "rgba(0,0,0,0.5)",
                fontSize: "11px",
              }}
            >
              대표 색상
            </div>
            <div style={{ textAlign: "left" }}>
              {props.main_info_shoes.color}
            </div>
          </div>
        </div>
        <div className="division_btn_container">
          <Buy_modal
            detail_main_image={props.detail_main_image}
            main_info_shoes={props.main_info_shoes}
            final_size={props.final_size}
            setFinal_Size={props.setFinal_Size}
          ></Buy_modal>
          <Sell_modal
            detail_main_image={props.detail_main_image}
            main_info_shoes={props.main_info_shoes}
            final_size={props.final_size}
            setFinal_Size={props.setFinal_Size}
          ></Sell_modal>
        </div>
        <div style={{ height: "100px" }}>
          <button
            onClick={() => {
              setInterestModal(true);
              setShowModal(true);
            }}
            style={{
              width: "560px",
              height: "70px",
              marginTop: "15px",
              borderRadius: "10px",
              backgroundColor: "white",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <BsBookmarkFill size={22} />
            <label style={{}}>&nbsp;관심상품</label>
          </button>
{/* <<<<<<< HEAD
          {interestModal ? (
            <Shopmodal
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              closeModal={closeModal}
              showModal={showModal}
              prId={props.main_info_shoes.prid}
======= */}
          {interestModal && isLoggedIn ? (
            <Shopmodal isChecked={isChecked} 
            setIsChecked={setIsChecked} 
            closeModal={closeModal}
            showModal={showModal}
            prId={props.main_info_shoes.prid}
            ></Shopmodal>
          ) : (
            <></>
          )}
        </div>
        <div className="add_benefit">
          <div style={{ textAlign: "left", fontWeight: "bold" }}>추가 혜택</div>
          <div style={{ display: "flex", fontSize: "13px", marginTop: "16px" }}>
            <div
              style={{
                fontWeight: "lighter",
                color: "rgba(0,0,0,0.5)",
                width: "70px",
                textAlign: "left",
              }}
            >
              포인트
            </div>
            <div style={{ fontWeight: "bold" }}>계좌 간편결제 시 1% 적립</div>
          </div>
          <div style={{ display: "flex", fontSize: "13px", marginTop: "10px" }}>
            <div
              style={{
                fontWeight: "lighter",
                color: "rgba(0,0,0,0.5)",
                width: "70px",
                textAlign: "left",
              }}
            >
              결제
            </div>
            <div style={{ fontWeight: "bold" }}>
              계좌간편결제 최대 5만 포인트 적립 & 수수료 할인
            </div>
          </div>
        </div>
        <div
          style={{
            width: "560px",
            height: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        ></div>
        <div style={{ width: "560px", height: "20px" }}></div>

        <div className="ship_info">
          <div style={{ textAlign: "left", fontWeight: "bold" }}>배송 정보</div>
          <div style={{ display: "flex", marginTop: "16px" }}>
            <div>
              <img src={ship_img} style={{ width: "45px" }}></img>
            </div>
            <div
              style={{
                textAlign: "left",
                fontSize: "13px",
                marginLeft: "20px",
                marginTop: "3px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>빠른배송 5,000원</div>
              <div style={{ marginTop: "5px", color: "rgba(0,0,0,0.5)" }}>
                지금 결제 시 2일 뒤 도착 예정
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "16px" }}>
            <div>
              <img src={ship_img1} style={{ width: "50px" }}></img>
            </div>
            <div
              style={{
                textAlign: "left",
                fontSize: "13px",
                marginLeft: "15px",
                marginTop: "3px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>일반배송 3,000원</div>
              <div style={{ marginTop: "5px", color: "rgba(0,0,0,0.5)" }}>
                검수 후 배송 ・ 5-7일 내 도착 예정
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "16px" }}>
            <div>
              <img src={ship_img2} style={{ width: "50px" }}></img>
            </div>
            <div
              style={{
                textAlign: "left",
                fontSize: "13px",
                marginLeft: "15px",
                marginTop: "3px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>창고보관 첫 30일 무료</div>
              <div style={{ marginTop: "5px", color: "rgba(0,0,0,0.5)" }}>
                배송 없이 창고에 보관 ・ 빠르게 판매 가능
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: "560px", height: "35px" }}></div>
        <div
          style={{
            width: "560px",
            height: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        ></div>

        <div style={{ width: "560px", height: "160px", marginTop: "40px" }}>
          <img
            src={point_img}
            style={{ width: "560px", height: "100px" }}
          ></img>
        </div>

        {
          isLoggedIn ? (
            <>
              <div className="parentDiv">
                <LineChart></LineChart>
              </div>
            </>
            ) : (
            <>
              <div className="parentDiv">
                <div style={{opacity:"0.1"}}>
                  <LineChart></LineChart>
                </div>
              </div>
              <div style={{backgroundColor:"black", zIndex:"2", opacity:"1"}}>
                <div style={{width:"100px", height:"100px", border:"1px solid black",margin:'0px auto',marginTop:'-250px'}}>
                </div>
              </div>
            </>
          )
        }
        {/* <div className="parentDiv">
          <LineChart></LineChart>
        </div> */}
        {/* marginTop: "16px" */}

        <div className="guarantee">
          {
            isLoggedIn ? (
              <>
                <div style={{ display: "flex", marginTop: "16px" }}>
                  <div>
                    <img src={guar_img} style={{ width: "45px" }}></img>
                  </div>
                  <div
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                      marginLeft: "20px",
                      marginTop: "3px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>100% 정품 보증</div>
                    <div
                      style={{
                        marginTop: "5px",
                        color: "rgba(0,0,0,0.5)",
                        fontSize: "12px",
                      }}
                    >
                      KREAM에서 검수한 상품이 정품이 아닐 경우, 구매가의 3배를
                      보상합니다.
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "16px" }}>
                  <div>
                    <img
                      src={guar_img1}
                      style={{ width: "45px", marginTop: "7px" }}
                    ></img>
                  </div>
                  <div
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                      marginLeft: "20px",
                      marginTop: "3px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>엄격한 다중 검수</div>
                    <div
                      style={{
                        marginTop: "5px",
                        color: "rgba(0,0,0,0.5)",
                        fontSize: "12px",
                      }}
                    >
                      모든 상품은 검수센터에 도착한 후, 상품별 전문가 그룹의 체계적인
                      시스템을 거쳐 검수를 진행합니다.
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "16px" }}>
                  <div>
                    <img src={guar_img2} style={{ width: "45px" }}></img>
                  </div>
                  <div
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                      marginLeft: "20px",
                      marginTop: "3px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>정품 인증 패키지</div>
                    <div
                      style={{
                        marginTop: "5px",
                        color: "rgba(0,0,0,0.5)",
                        fontSize: "12px",
                      }}
                    >
                      검수에 합격한 경우에 한하여 KREAM의 정품 인증 패키지가 포함된
                      상품이 배송됩니다.
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", marginTop: "200px" }}>
            <div>
              <img src={guar_img} style={{ width: "45px" }}></img>
            </div>
            <div
              style={{
                textAlign: "left",
                fontSize: "13px",
                marginLeft: "20px",
                marginTop: "3px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>100% 정품 보증</div>
              <div
                style={{
                  marginTop: "5px",
                  color: "rgba(0,0,0,0.5)",
                  fontSize: "12px",
                }}
              >
                KREAM에서 검수한 상품이 정품이 아닐 경우, 구매가의 3배를
                보상합니다.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "16px" }}>
            <div>
              <img
                src={guar_img1}
                style={{ width: "45px", marginTop: "7px" }}
              ></img>
            </div>
            <div
              style={{
                textAlign: "left",
                fontSize: "13px",
                marginLeft: "20px",
                marginTop: "3px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>엄격한 다중 검수</div>
              <div
                style={{
                  marginTop: "5px",
                  color: "rgba(0,0,0,0.5)",
                  fontSize: "12px",
                }}
              >
                모든 상품은 검수센터에 도착한 후, 상품별 전문가 그룹의 체계적인
                시스템을 거쳐 검수를 진행합니다.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "16px" }}>
            <div>
              <img src={guar_img2} style={{ width: "45px" }}></img>
            </div>
            <div
              style={{
                textAlign: "left",
                fontSize: "13px",
                marginLeft: "20px",
                marginTop: "3px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>정품 인증 패키지</div>
              <div
                style={{
                  marginTop: "5px",
                  color: "rgba(0,0,0,0.5)",
                  fontSize: "12px",
                }}
              >
                검수에 합격한 경우에 한하여 KREAM의 정품 인증 패키지가 포함된
                상품이 배송됩니다.
              </div>
            </div>
          </div>
              </>
            )
          }
          

        </div>
      </div>
    </div>
  );
};
export default Detail_info;
