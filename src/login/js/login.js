import "../css/Login.css";
import Header from "../../common/header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../../common/footer";
import { LoginForm } from "./RegisterCh.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import $ from "jquery";
import { useAuth } from "../../AdminPage/adminAccess/adminAccess.jsx";

const KakaoLoginButton = ({ kakaoApiKey, redirectUri }) => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${redirectUri}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoAuthUrl;
  };
  return (
    <div className="btn btn-outline-dark">
      <button onClick={handleKakaoLogin} 
              className="btn btn-outline-dark">
        <img
          className="kaImg"
          src={require("../../img/login-page/kakao-talk_3669973.png")}
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
  const [isButtonActive, setIsButtonActive] = useState(false);

  const { setAdminAccess } = useAuth();
  const [token, setToken] = useState("");

  // useEffect(() => {
  //   const handleMessage = (event) => {
  //     if (event.origin !== "http://localhost:3000") {
  //       return;
  //     }

  //     const { code } = event.data;
  //     if (code) {
  //       dispatch(kakaoLogin(code));
  //     }
  //   };

  //   window.addEventListener("message", handleMessage);

  //   return () => {
  //     window.removeEventListener("message", handleMessage);
  //   };
  // }, [dispatch]);


  // const kakaoLogin = (code) => {
  //   return async (dispatch) => {
  //     try {
  //       const res = await axios.get(
  //         `/api/auth?code=${code}`
  //       );
  //       console.log("Response:", res);

  //       const Access_Token = res.data.accessToken;
  //       console.log("Access Token:", Access_Token);

  //       localStorage.setItem("token", Access_Token);
  //       dispatch({ type: "LOGIN_SUCCESS", payload: Access_Token });
  //       navigate("/");
  //     } catch (err) {
  //       console.log("Error:", err);
  //       window.alert("로그인 실패");
  //     }
  //   };
  // };
  
  useEffect(() => {
    // 현재 URL에서 'code' 파라미터 추출
    const code = new URL(window.location.href).searchParams.get('code');
    console.log("jwt : " + code)
    
    if (code) {
      // 인가 코드를 백엔드 서버로 POST 요청하여 액세스 토큰 요청
      axios.post('/api/kakaoLogin', { code })
        .then(response => {
          // 서버로부터 받은 액세스 토큰을 로컬 스토리지에 저장
          // const Access_Token = response.data.jwtToken;
          // localStorage.setItem('jwtToken', Access_Token);
          console.log("카카오 response : ",response)
          const jwtToken = response.jwtToken;
          if (jwtToken) {
            setToken(jwtToken);
            console.log("success");
            localStorage.setItem("jwtToken", jwtToken);
            navigate("/");
          } else {
            console.log("fail");
          }
          // Redux 상태 업데이트
          // dispatch({ type: "LOGIN_SUCCESS", payload: jwtToken });
          
          // 홈 페이지로 리다이렉트
          navigate('/');
        })
        .catch(error => {
          console.error('로그인 실패:', error);
          window.alert('로그인 실패');
          
          // 에러 페이지로 리다이렉트
          navigate('/login');
        });
    }
  }, [dispatch, navigate]);


  const handleSubmit = (e) => {

    // const token = localStorage.getItem('jwtToken');

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
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (classCh === "login_data" && passw === "login_data" && idEmail !== "" && newPassw !== "") {
        setIsButtonActive(true);
      }
      handleSubmit(e);

    }
  };
  
  useEffect(() => {
    const isButtonActive = 
      classCh === "login_data" && 
      passw === "login_data" && 
      idEmail !== "" && 
      newPassw !== "";
    setIsButtonActive(isButtonActive);
  }, [classCh, passw, idEmail, newPassw]);


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
                const regex = /^[^@]+@[^@]+\.[^@]{1,}$/;
                if (regex.test(e.target.value)) {
                  setclassCh("login_data");
                } else {
                  setclassCh("login_dataE");
                }
              }}
              onKeyDown={handleKeyPress}
            />
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
              onKeyDown={handleKeyPress}
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
                이메일 찾기
              </Col>
              <Col onClick={() => navigate("/login/find_password")}>
                비밀번호 찾기
              </Col>
            </Row>
          </div>

          <KakaoLoginButton

            // // kakaoApiKey={"e48d04cb12e0ea1773f0278aa5044a44"}
            // kakaoApiKey={"2c38a672bc98d7bf79b19bbcaeb91eb6"}
            // // redirectUri={"/api/auth"}
            // redirectUri={"http://192.168.0.101:3001/kakaoLogin"}

            kakaoApiKey={"e48d04cb12e0ea1773f0278aa5044a44"}
            redirectUri={"/api/auth"}

          />
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;