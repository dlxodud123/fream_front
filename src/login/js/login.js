import "../css/Login.css";
import Header from "../../common/header";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../common/footer";
import { LoginForm } from "./RegisterCh.js";
import { useDispatch } from "react-redux";
import axios from "axios";
// const { setAdminAccess } = useAuth();
// import $ from "jquery";
// import { useAuth } from "../../AdminPage/adminAccess/adminAccess.jsx"
import $ from "jquery";
import { useAuth } from "../../AdminPage/adminAccess/adminAccess.jsx";

const KakaoLoginButton = ({ kakaoApiKey, redirectUri }) => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${redirectUri}&response_type=code`;

  return (
    <div className="text-center">
      <a href={kakaoAuthUrl} target="_blank">
        <img src="/images/kakao_login_medium_narrow.png" alt="카카오 로그인" />
      </a>
    </div>
  );
};

const kakaoLogin = (code) => {
  return function (dispathch, getState, { history }) {
    axios({
      method: "GET",
      url: `http://192.168.0.13:3000/auth?code=${code}`,
    })
      .then((res) => {
        console.log(res);
        const Access_Token = res.data.accessToken;
        localStorage.setItem("token", Access_Token);
        window.alert("1");
        history.replace("/"); //로그인성공시 화면전환
      })
      .catch((err) => {
        console.log("errr", err);
        window.alert("로그인 실패");
        history.replace("/login");
      });
  };
};

const LoginPage = () => {
  const dispathch = useDispatch();
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    const handleKakaoLogin = async () => {
      if (code) {
        const result = await dispathch(kakaoLogin(code));
        const token = result.payload?.accessToken;
        if (token) {
          navigate("/");
        } else {
          alert("로그인 실패");
        }
      }
    };
    handleKakaoLogin();
  }, [dispathch, navigate]);

  let [idEmail, setIdEmail] = useState(""); //입력한 아이디 값
  let [classCh, setclassCh] = useState("login_data");
  let [passw, setPassw] = useState("login_data"); //password class변경용
  let [newPassw, setNewPassw] = useState("");
  let msg = <p className="input_error">이메일 주소를 정확히 입력해 주세요</p>;
  const isButtonActive =
    classCh === "login_data" &&
    passw === "login_data" &&
    idEmail !== "" &&
    newPassw !== "";

  const { setAdminAccess } = useAuth();
  const [token, setToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idEmail === "admin@kream.com" && newPassw === "admin1234!!") {
      setAdminAccess(true);
      navigate("/LoginAdmin");
    } else {
      if (idEmail)
        $.ajax({
          url: "http://192.168.0.13:3001/auth/loginCheck",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({ userId: idEmail, userPw: newPassw }),
          xhrFields: {
            withCredentials: true,
          },
          success: function (data) {
            const jwtToken = data;
            if (jwtToken) {
              setToken(jwtToken);
              console.log("success");
              localStorage.setItem("jwtToken", jwtToken);
              navigate("/");
            } else {
              console.log("fail");
            }
          },
          error: function (xhr, status, error) {
            console.error("There was an error logging in!", error);
          },
        });
    }
  };

  return (
    <div className="login_all">
      <Header />
      <div className="login_modl">
        <div className="login_area">
          <div className="login_title">
            <h2>KREAM</h2>
            <p>KICKS RULE EVERYTHING AROUND ME</p>
          </div>

          <div className={classCh}>
            <p>이메일 주소</p>
            <input
              id="userId"
              type="email"
              placeholder="예)kream@kream.co.kr"
              onChange={(e) => {
                setIdEmail(e.target.value);
                {
                  const regex = /^[^@]+@[^@]+\.[^@]{1,}$/;
                  if (regex.test(idEmail)) {
                    setclassCh("login_data");
                    console.log(idEmail);
                  } else {
                    setclassCh("login_dataE");
                  }
                }
              }}
            ></input>
            {classCh == "login_dataE" ? msg : null}
          </div>

          <div className={passw}>
            <p>비밀번호</p>
            <input
              id="userPw"
              type="password"
              onChange={(a) => {
                setNewPassw(a.target.value);
                {
                  const pwPattern =
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{7,15}$/;
                  if (pwPattern.test(newPassw)) {
                    setPassw("login_data");
                    console.log(newPassw);
                  } else {
                    setPassw("passw");
                  }
                }
              }}
            ></input>
            {passw == "passw" ? (
              <div className="passEr">
                영문,숫자,특수문자를 조합해서 입력해주세요(8~16자)
              </div>
            ) : null}
          </div>

          <Button
            // className={loginBut${isButtonActive ? '_active' : ''}}
            variant="secondary"
            size="lg"
            onClick={handleSubmit}
          >
            로그인
          </Button>

          <Row className="row">
            <Col
              onClick={() => navigate("/join")}
              style={{ cursor: "pointer" }}
            >
              이메일 가입
            </Col>
            <Col onClick={() => navigate("/login/find_email")}>이메일 찾기</Col>
            <Col onClick={() => navigate("/login/find_password")}>
              비밀번호 찾기
            </Col>
          </Row>

          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() =>
              (window.location.href = "https://kauth.kakao.com/oauth/authorize")
            }
          >
            <span className="kaImg"></span>
            카카오 로그인
          </button>
          <div>
            <h1>카카오 로그인</h1>
            <KakaoLoginButton
              kakaoApiKey={"e48d04cb12e0ea1773f0278aa5044a44"}
              redirectUri={"http://localhost:3000/auth"}
            />
          </div>
          <div>
            <butC classCh="login_data" passw="login_data"></butC>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
