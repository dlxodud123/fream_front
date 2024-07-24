import "../css/Login.css";
import Header from "../../common/header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../common/footer";
import { LoginForm } from "./RegisterCh.js";
import { useDispatch  } from "react-redux";
import axios from "axios";
// const { setAdminAccess } = useAuth();
// import $ from "jquery";
// import { useAuth } from "../../AdminPage/adminAccess/adminAccess.jsx"
import $ from "jquery";
import { useAuth } from "../../AdminPage/adminAccess/adminAccess.jsx";

const KakaoLoginButton = ({ kakaoApiKey, redirectUri }) => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${redirectUri}&response_type=code`;

  const handleKakaoLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      kakaoAuthUrl,
      "kakaoLogin",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };
  return (
    <div className="btn btn-outline-dark">
      <button onClick={handleKakaoLogin} className="btn btn-outline-dark">
        <img
          className="kaImg"
          src={require("../../img/login-page/kakao-talk_3669973.png")}
          alt="카카오 로그인"
        />
        <span className="kakao-login-text">카카오 로그인</span>
      </button>
    </div>
  );
};



const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [idEmail, setIdEmail] = useState(""); //입력한 아이디 값
  let [classCh, setclassCh] = useState("login_data");
  let [passw, setPassw] = useState("login_data"); //password class변경용
  let [newPassw, setNewPassw] = useState("");
  let msg = <p className="input_error">이메일 주소를 정확히 입력해 주세요</p>;
  

  const { setAdminAccess } = useAuth();
  const [token, setToken] = useState("");

  
  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   const code = url.searchParams.get("code");

  //   const handleKakaoLogin = async () => {
  //     if (code) {
  //       const result = await dispatch(kakaoLogin(code));
  //       const token = result?.accessToken;
  //       if (token) {
  //         navigate("/");
  //         window.history.replaceState(null, null, '/'); // URL에서 인증 코드를 제거
  //       } else {
  //         alert("로그인 실패");
  //       }
  //     }
  //   };
  //   handleKakaoLogin();
  // }, [dispatch, navigate]);


  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'http://localhost:3000') {
        return; 
      }
  
      const { code } = event.data;
      if (code) {
        dispatch(kakaoLogin(code));
      }
    };
    console.log("dddddddddddddd",handleMessage)
  
    window.addEventListener('message', handleMessage);
  
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);
  
  const kakaoLogin = (code) => {
    return async (dispatch) => {
      try {
        const res = await axios.get(`http://192.168.0.13:3000/auth?code=${code}`);
        console.log("Response:", res);
  
        const Access_Token = res.data.accessToken;
        console.log("Access Token:", Access_Token);
  
        localStorage.setItem("token", Access_Token);
        dispatch({ type: "LOGIN_SUCCESS", payload: Access_Token });
        navigate("/"); // Redirect to the main page
      } catch (err) {
        console.log("Error:", err);
        window.alert("로그인 실패");
      }
    };
  };


  // const kakaoLogin = (code) => {
  //   return async function (dispatch) {
  //     try {
  //       const res = await axios.get(`http://192.168.0.13:3000/auth?code=${code}`);
  //       console.log("Response:", res);

  //       const Access_Token = res.data.accessToken;
  //       console.log("Access Token:", Access_Token);

  //       localStorage.setItem("token", Access_Token);
  //       dispatch({ type: "LOGIN_SUCCESS", payload: Access_Token });
  //       return { accessToken: Access_Token };

  //     } catch (err) {
  //       console.log("errr", err);
  //       window.alert("로그인 실패");
  //       return null;
  //     }
  //   };
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idEmail === "admin@kream.com" && newPassw === "admin1234!!") {
      setAdminAccess(true);
      navigate("/LoginAdmin");
    } else {
      //http://192.168.0.101:3001
      if (idEmail)
      $.ajax({
        url: "/api/auth/loginCheck",
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
  }
  const isButtonActive = classCh === "login_data" && passw === "login_data" &&
                         idEmail !== "" && newPassw !== "";

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

          <button
            className={`loginBut${isButtonActive ? "_active" : ""}`}
            variant="secondary"
            size="lg"
            onClick={handleSubmit}
          >
            로그인
          </button>
          <div className="loginComponent">
            <Row className="row">
              <Col
                onClick={() => navigate("/join")}
                style={{ cursor: "pointer" }}
              >
                이메일 가입
              </Col>
              <Col onClick={() => navigate("/login/find_email")}>
                이메일 찾기</Col>
              <Col onClick={() => navigate("/login/find_password")}>
                비밀번호 찾기
              </Col>
            </Row>
          </div>

          <KakaoLoginButton
            kakaoApiKey={"e48d04cb12e0ea1773f0278aa5044a44"}
            redirectUri={"http://localhost:3000/auth"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
