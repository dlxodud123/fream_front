import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../Auth/UserAuthContext";
import { useContext } from "react";

function StyleHeader() {
  let navigate = useNavigate();
  const { isLoggedIn, handleLogout } = useContext(UserAuthContext);
  return (
    <>
      <div className="header_contianer">
        <div className="top_inner">
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
                href="/#"
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
                href="/#"
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

        <div className="main_inner">
          <div
            style={{
              width: "200px",
              fontSize: "30px",
              fontWeight: "bold",
              marginLeft: "40px",
            }}
          >
            <a
              style={{ color: "black", textDecoration: "none" }}
              className="italic"
              href="/"
            >
              KREAM
            </a>
          </div>
          <div style={{}}>
            <div style={{ display: "flex", marginLeft: "650px" }}>
              <div style={{ fontSize: "22px", width: "130px" }}>
                <a style={{ color: "black", textDecoration: "none" }} href="/">
                  HOME
                </a>
              </div>
              <div style={{ fontSize: "22px", width: "130px" }}>
                <a style={{ color: "black", textDecoration: "none" }} href="/">
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
        <div style={{ paddingTop: "10px", fontSize: "23px" }} className="">
          <h1
            className="shop"
            onClick={() => {
              navigate("/shop");
            }}
          >
            Style
          </h1>
          <div style={{ display: "flex", marginLeft: "50px" }}>
            <div>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginRight: "40px",
                }}
                href="/shop"
              >
                전체
              </a>
            </div>

            <div>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginRight: "40px",
                }}
                href=""
              >
                신발
              </a>
            </div>

            <div>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginRight: "40px",
                }}
                href="/shop"
              >
                팔로잉
              </a>
            </div>
          </div>
          <div className="shop_inner"></div>
        </div>
      </div>
    </>
  );
}

export default StyleHeader;
