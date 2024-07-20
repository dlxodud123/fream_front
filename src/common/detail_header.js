import { useContext, useEffect, useState } from "react";
import "./css/detail_header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "./../img/shoes-img/menshoes0.webp";
import Header_buy_modal from "../detail/modal/header_buy_modal";
import Header_sell_modal from "../detail/modal/header_sell_modal";
import { UserAuthContext } from "../Auth/UserAuthContext";

function Detail_header(props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isLoggedIn, handleLogout } = useContext(UserAuthContext);

  const formatGender = (gender) => {
    if (gender === "MAN") {
      return "";
    } else if (gender === "WOMAN") {
      return "(W)";
    } else {
      return "";
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // console.log("zzzzzzzzz", props.detail_main_image);

  return (
    <>
      <div className="detail_header_contianer">
        <div className="detail_top_inner">
          <div
            style={{ display: "flex", marginLeft: "1008px", width: "232px" }}
          >
            <div>
              <a
                style={{
                  color: "grey",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
                href="#"
              >
                고객센터
              </a>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <a
                style={{
                  color: "grey",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
                href="/myPage"
              >
                마이페이지
              </a>
            </div>
            {isLoggedIn ? (
              <div style={{ marginLeft: "20px" }}>
                <a
                  style={{
                    color: "grey",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                  href="/login"
                  onClick={handleLogout}
                >
                  로그아웃
                </a>
              </div>
            ) : (
              <div style={{ marginLeft: "20px" }}>
                <a
                  style={{
                    color: "grey",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                  href="/login"
                >
                  로그인
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="detail_main_inner">
          <div style={{ width: "200px", fontSize: "30px", fontWeight: "bold" }}>
            <a
              className="italic"
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "30px",
              }}
              href="/"
            >
              KREAM
            </a>
          </div>
          <div>
            <div style={{ display: "flex", marginLeft: "680px" }}>
              <div style={{ fontSize: "22px", width: "130px" }}>
                <a style={{ color: "black", textDecoration: "none" }} href="/">
                  HOME
                </a>
              </div>
              <div style={{ fontSize: "22px", width: "130px" }}>
                <a
                  style={{ color: "black", textDecoration: "none" }}
                  href="/style"
                >
                  STYLE
                </a>
              </div>
              <div style={{ fontSize: "22px" }}>
                <a
                  style={{ color: "black", textDecoration: "none" }}
                  href="/shop"
                >
                  SHOP
                </a>
              </div>
            </div>
          </div>
        </div>
        {scrollPosition < 400 ? (
          <div></div>
        ) : (
          <div className="scroll_container">
            <div style={{ width: "660px", display: "flex" }}>
              <div>
                <img
                  src={props.detail_main_image[0]}
                  style={{
                    width: "65px",
                    height: "65px",
                    marginTop: "10px",
                    borderRadius: "10px",
                    backgroundColor: "#f4f4f4",
                  }}
                ></img>
              </div>
              <div style={{ marginLeft: "8px", marginTop: "12px" }}>
                <div style={{ fontSize: "18px" }}>
                  {formatGender(props.main_info_shoes.gender)}
                  {props.main_info_shoes.nameEng}
                </div>
                <div style={{ fontSize: "14px", color: "rgba(0,0,0,0.5)" }}>
                  {formatGender(props.main_info_shoes.gender)}
                  {props.main_info_shoes.nameKor}
                </div>
              </div>
            </div>
            <div style={{ width: "540px", display: "flex", marginTop: "14px" }}>
              <Header_buy_modal
                detail_main_image={props.detail_main_image}
                main_info_shoes={props.main_info_shoes}
                final_size={props.final_size}
                setFinal_Size={props.setFinal_Size}
              ></Header_buy_modal>
              <Header_sell_modal
                detail_main_image={props.detail_main_image}
                main_info_shoes={props.main_info_shoes}
                final_size={props.final_size}
                setFinal_Size={props.setFinal_Size}
              ></Header_sell_modal>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Detail_header;
