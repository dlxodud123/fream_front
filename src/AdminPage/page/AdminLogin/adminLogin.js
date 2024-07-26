import "./adminLogin.css";
import Header from "../../../common/header";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../adminAccess/adminAccess";

const AdminLogin = () => {
  let [id, setId] = useState(""); //입력한 아이디 값
  let [newPassw, setNewPassw] = useState("");
  let [classCh, setclassCh] = useState("login_data");
  let [passw, setPassw] = useState("login_data");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 페이지를 어둡게 하기 위해 오버레이를 활성화
    setIsLoading(true);
    // 데이터를 로드하거나 다른 작업 수행
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 예시: 2초 대기
      setIsLoading(false);
    };

    fetchData();
  }, []);

  let msg = <p className="input_error">이메일 주소를 정확히 입력해 주세요</p>;
  const isButtonActive =
    classCh === "login_data" &&
    passw === "login_data" &&
    id !== "" &&
    newPassw !== "";
  const navigate = useNavigate();
  const { setSuccessAdmin } = useAuth();

  const handleLogin = () => {
    // 일반 로그인 로직 추가
    axios
      .post("http://localhost:3001/adminPage/login", {
        // email: idEmail,
        // password: newPassw,
        userId: id,
        userPw: newPassw,
      })
      .then((response) => {
        console.log("관리자로그인:", response.data);
        const token = response.data;
        if (token) {
          // 토큰을 로컬 스토리지에 저장
          localStorage.setItem("adminToken", token);

          // 성공적으로 로그인한 후, 관리자 페이지로 이동
          setSuccessAdmin(true);
          navigate("/admin/");
        } else {
          alert("로그인 실패: " + response.data.message);
        }
      })
      .catch((error) => {
        // 에러 처리
        console.error("There was an error logging in!", error);
        alert("로그인 중 오류가 발생했습니다.");
      });
    // .then((response) => {
    //   // 성공 시 처리
    //   console.log(response.data);
    //   if (response.data == 1) {
    //     setSuccessAdmin(true);
    //     navigate("/admin/");
    //   } else {
    //     alert("로그인 실패: " + response.data.message);
    //   }
    // })
    // .catch((error) => {
    //   // 에러 처리
    //   console.error("There was an error logging in!", error);
    //   alert("로그인 중 오류가 발생했습니다.");
    // });
  };

  return (
    <div>
      {isLoading && <div className="overlay">Loading...</div>}
      <div className={`content ${isLoading ? "hidden" : ""}`}></div>

      <div className="login_all">
        <Header />
        <div className="login_modl">
          <div className="login_area">
            <div className="login_title">
              <h2>KREAM/Admin</h2>
              <p>KICKS RULE EVERYTHING AROUND ME</p>
            </div>

            <div className={classCh}>
              <p>관리자ID</p>
              <input
                type="text"
                placeholder="관리자ID"
                onChange={(e) => {
                  setId(e.target.value);
                }}
              ></input>
              {classCh == "login_dataE" ? msg : null}
            </div>

            <div className={passw}>
              <p>비밀번호</p>
              <input
                type="password"
                onChange={(a) => {
                  setNewPassw(a.target.value);
                }}
              ></input>
            </div>

            <Button
              className={`loginBut${isButtonActive ? "_active" : ""}`}
              variant="secondary"
              size="lg"
              onClick={() => handleLogin()}
            >
              로그인
            </Button>
          </div>
        </div>
        <div>{/* <butC classCh="login_data" passw="login_data"></butC> */}</div>
      </div>
    </div>
  );
};

export default AdminLogin;
